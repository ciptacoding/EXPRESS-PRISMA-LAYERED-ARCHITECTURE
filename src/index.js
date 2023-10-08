import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
dotenv.config();

const PORT = process.env.PORT;

// express middleware to read json
app.use(express.json());

// test in route index
app.get("/", (req, res) => {
   res.send("Hello Sepuh, Gua baru belajar bikin res ya");
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

// update using method PUT
app.put("/products/:id", async (req, res) => {
   const productId = req.params.id;
   const productData = req.body;

   if (
      !(
         productData.name &&
         productData.description &&
         productData.price &&
         productData.image
      )
   ) {
      return res.status(400).send("Some field are missing");
   }

   const product = await prisma.product.update({
      where: {
         id: parseInt(productId),
      },
      data: {
         name: productData.name,
         description: productData.description,
         price: productData.price,
         image: productData.image,
      },
   });

   res.send({
      data: product,
      message: "Product has been updated",
   });
});

// update using method PATCH
app.patch("/products/:id", async (req, res) => {
   const productId = req.params.id;
   const productData = req.body;

   const product = await prisma.product.update({
      where: {
         id: parseInt(productId),
      },
      data: {
         name: productData.name,
         description: productData.description,
         price: productData.price,
         image: productData.image,
      },
   });

   res.send({
      data: product,
      message: "Product has been updated",
   });
});

// get products by id
app.get("/products/:id", async (req, res) => {
   const productId = req.params.id;

   const product = await prisma.product.findUnique({
      where: {
         id: parseInt(productId),
      },
   });

   if (!product) {
      return res.status(400).send("Product not found!");
   }

   res.send(product);
});

// port running
app.listen(PORT, () => {
   console.log("Express API running in port:" + PORT);
});
