const express = require("express");
const cors = require("cors");

require("dotenv").config();
const routes = require("./routes/product.routes"); 

const app = express();
app.use(cors());
app.use(express.json());
app.use('/products', routes);

const PORT = process.env.TIVAN_RDS_PORT;
app.listen(TIVAN_RDS_PORT, ()=>{
    console.log(`run serven in port ${TIVAN_RDS_PORT}`);
});

