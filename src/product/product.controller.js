// Product layer  untuk handle request dan response
// biasanya juga handle validasi body

import express from "express";

import {
   getAllProducts,
   getProductById,
   createProduct,
   deleteProductById,
   editProductById,
} from "./product.services.js";

const router = express.Router();

// get all data products
router.get("/", async (req, res) => {
   const products = await getAllProducts();

   res.send(products);
});

// get products by id
router.get("/:id", async (req, res) => {
   try {
      const productId = req.params.id;
      const product = await getProductById(parseInt(productId));

      res.send(product);
   } catch (error) {
      res.status(400).send(error.message);
   }
});

// store new data product
router.post("/", async (req, res) => {
   try {
      const newProductData = req.body;
      const product = await createProduct(newProductData);

      res.send({
         data: product,
         message: "create product success",
      });
   } catch (error) {
      res.status(400).send(error.message);
   }
});

// delete product by id
router.delete("/:id", async (req, res) => {
   try {
      const productId = req.params.id; //id in url is string
      await deleteProductById(parseInt(productId));

      res.send("Product Deleted");
   } catch (error) {
      res.status(400).send(error.message);
   }
});

// update using method PUT
router.put("/:id", async (req, res) => {
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

   const product = await editProductById(parseInt(productId), productData);

   res.send({
      data: product,
      message: "Product has been updated",
   });
});

// update using method PATCH
router.patch("/:id", async (req, res) => {
   try {
      const productId = req.params.id;
      const productData = req.body;

      const product = await editProductById(parseInt(productId), productData);

      res.send({
         data: product,
         message: "Product has been updated",
      });
   } catch (error) {
      res.status(400).send(error.message);
   }
});

export default router;
