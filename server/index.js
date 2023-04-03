import express from "express";
import bodyParser from "body-parser";
import pkg from 'body-parser';
const { urlencoded } = pkg;
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js"

//data imports
// import User from "./models/user.js";
// import {dataUser, dataProduct, dataProductStat} from "./data/index.js";

// import Product from "./models/product.js";

// import ProductStat from "./models/productStat.js";


/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors());

/*Routing*/
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes)

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    app.listen(PORT, ()=> console.log(`Server Port: ${PORT}`))
    //Solo agregar la siguiente línea de código la primera vez
    // User.insertMany(datauser)    Crea tabla en base de datos
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
}).catch((error)=>console.log(error, "did not connect"))