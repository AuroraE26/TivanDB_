const sql = require("../database/config");
const Authentication = require("../models/auth.model");

Authentication.findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM usuarios WHERE email = "${email}"`, (err, res) => {
      if (err) {
        return reject(err);
      }
      if (res.length) {
        return resolve(res[0]);
      }
      return reject(new Error("Not found"));
    });
  });
};

Authentication.createUser = (email, password) => {
  return new Promise((resolve, reject) => {
    sql.query(
      `INSERT INTO usuarios SET email = "${email}", password ="${password}"`,
      (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve({ idUser: res.insertId, email: email });
      }
    );
  });
};

Authentication.findUserById = (id) => {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT * FROM usuarios WHERE idUsuario = "${id}"`,
      (err, res) => {
        if (err) {
          return reject(err);
        }
        if (res.length) {
          return resolve(res[0]);
        }
        return reject(new Error("Not found"));
      }
    );
  });
};

module.exports = Authentication;
