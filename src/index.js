import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
dotenv.config();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
   res.send("Hello Sepuh puh");
});

app.get("/products", async (req, res) => {
   const products = await prisma.product.findMany();

   res.send(products);
});

app.listen(PORT, () => {
   console.log("Express API running in port:" + PORT);
});
