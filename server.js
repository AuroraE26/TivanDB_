const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

require("dotenv").config();
const authRouter = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const salesRoutes = require("./routes/order.routes");
const detailsRoutes = require("./routes/details.routes");

const app = express();

//setting
app.set("port", process.env.TIVAN_API_PORT || 3001);

//middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//routes

app.use("/api/", authRouter);
app.use("/api/productos", productRoutes);
app.use("/api/order", salesRoutes);
app.use("/api/details", detailsRoutes);

app.listen(app.get("port"), () => {
  console.log(`Server running in port ${app.get("port")}`);
});
