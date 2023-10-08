// Layer repository berfungsi sebagai alata berkomunikasi dengan database
// Boleh pake orm, boleh juga raw query
// Supaya apa? supaya kalo mau ganti-ganti ORM tinggal edit di file ini aja

import { prisma } from "../db/index.js";

const findProducts = async () => {
   const products = await prisma.product.findMany();

   return products;
};

const findProductById = async (id) => {
   const product = await prisma.product.findUnique({
      where: {
         id: id,
      },
   });
   return product;
};

const insertProduct = async (productData) => {
   const product = await prisma.product.create({
      data: {
         name: productData.name,
         description: productData.description,
         price: productData.price,
         image: productData.image,
      },
   });

   return product;
};

const deleteProduct = async (id) => {
   await prisma.product.delete({
      where: {
         id: id,
      },
   });
};

const editProduct = async (id, productData) => {
   const product = await prisma.product.update({
      where: {
         id: id,
      },
      data: {
         name: productData.name,
         description: productData.description,
         price: productData.price,
         image: productData.image,
      },
   });

   return product;
};

export {
   findProducts,
   findProductById,
   insertProduct,
   deleteProduct,
   editProduct,
};
