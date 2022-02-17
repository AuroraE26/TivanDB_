const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

require("dotenv").config();
const productRoutes = require("./routes/product.routes");
const salesRoutes = require("./routes/sales.routes");
const detailsRoutes = require("./routes/details.routes");

//Setting
app.set("port", process.env.TIVAN_API_PORT || 3001);

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/productos", productRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/details", detailsRoutes);

app.listen(port, () => {
  console.log(`run serven in port ${port}`);
});
