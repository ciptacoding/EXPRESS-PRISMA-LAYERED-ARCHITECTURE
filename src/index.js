import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

dotenv.config();

const PORT = process.env.PORT;

// enabled cors
app.use(cors());

// express middleware to read json
app.use(express.json());

// test in route index
app.get("/", (req, res) => {
   res.send("Hello Sepuh, Gua baru belajar bikin res ya");
});

import productController from "./product/product.controller.js";
app.use("/products", productController); //"/products berfungsi sebagai prefix"

// port running
app.listen(PORT, () => {
   console.log("Express API running in port:" + PORT);
});

export { app };
