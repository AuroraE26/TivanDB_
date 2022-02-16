const express = require("express");
const cors = require("cors");

require("dotenv").config();
const productRoutes = require("./routes/product.routes"); 
const salesRoutes = require("./routes/sales.routes"); 
const detailsRoutes = require("./routes/details.routes"); 

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/productos', productRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/details', detailsRoutes);

const PORT = process.env.TIVAN_API_PORT;
app.listen(PORT, ()=>{
    console.log(`run serven in port ${PORT}`);
});

