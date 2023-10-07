import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
   res.send("Hello Sepuh puh");
});

app.get("/products", async (req, res) => {
   const products = await prisma.product.findMany();

   res.send(products);
});

app.post("/products", async (req, res) => {
   const newProductData = req.body;

   const product = await prisma.product.create({
      data: {
         name: newProductData.name,
         description: newProductData.description,
         image: newProductData.image,
         price: newProductData.price,
      },
   });

   res.send({
      data: product,
      message: "create product success",
   });
});

app.listen(PORT, () => {
   console.log("Express API running in port:" + PORT);
});
