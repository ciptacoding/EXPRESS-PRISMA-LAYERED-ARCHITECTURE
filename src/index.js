import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
dotenv.config();

const PORT = process.env.PORT;

// express middleware to read json
app.use(express.json());

app.get("/", (req, res) => {
   res.send("Hello Sepuh puh");
});

// get all data products
app.get("/products", async (req, res) => {
   const products = await prisma.product.findMany();

   res.send(products);
});

// store new data product
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

// delete product by id
app.delete("/products/:id", async (req, res) => {
   const productId = req.params.id; //id in url is string

   await prisma.product.delete({
      where: {
         id: parseInt(productId),
      },
   });

   res.send("Product Deleted");
});

// port running
app.listen(PORT, () => {
   console.log("Express API running in port:" + PORT);
});
