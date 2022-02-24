const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Authentication = require("../usercase/auth.case");

const comparePassword = async (receivedPassword, password) => {
  return await bcrypt.compare(receivedPassword, password);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Authentication.findUserByEmail(email).catch((err) =>
    console.error(err)
  );
  console.log(user);
  if (user) {
    const isEqual = await comparePassword(password, user.password);
    if (isEqual) {
      const token = jwt.sign(user.idUsuario, process.env.JWT_SECRET_KEY);
      res.json({ token });
    } else {
      res.json({ message: "Wrong credentials" });
    }
  } else {
    res.status(404).json({ message: "Not found credentials" });
  }
};

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

exports.register = async (req, res) => {
  const { email, password, nombre } = req.body;

  // check if the mail exists
  const mailExists = await Authentication.findUserByEmail(email).catch((err) =>
    console.error(err)
  );

  if (mailExists) {
    return res.status(400).json({
      message: "This email is already registered",
    });
  }

  const dataEncrypted = await encryptPassword(password);
  const userCreated = await Authentication.createUser(
    email,
    dataEncrypted,
    nombre
  );

  if (userCreated) {
    res.status(201).json({
      message: "User created",
    });
  } else {
    res.status(400).json({ message: "User not created" });
  }
};
