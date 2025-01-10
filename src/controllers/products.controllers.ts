import { Request, Response } from "express";
import { Product } from "../entities/products.entity";
import deleteProductService from "../services/products/deleteProduct.service";
import listProductsService from "../services/products/listProducts.service";
import patchProductService from "../services/products/patchProduct.service";
import { AppError } from "../errors";
import { IProductUpdate } from "../interfaces/product.interface";
import createProductService from "../services/products/createProduct.service";

export const createProductController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newProduct: Product = await createProductService(req.body);

  console.log("testeeee", newProduct)
  return res.status(201).json(newProduct);
};

export const listProductsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const products = await listProductsService();

  return res.status(200).json(products);
};

export const deleteProductController = async (req: Request, res: Response) => {
  const paramId: number = parseInt(req.params.id);

  await deleteProductService(paramId);

  return res.status(204).send();
};

export const patchProductController = async (req: Request, res: Response) => {
  const paramId: number = parseInt(req.params.id);
  const data: IProductUpdate = req.body;

  const updatedProduct = await patchProductService(paramId, data);

  if (updatedProduct) {
    return res.status(200).json(updatedProduct);
  } else {
    throw new AppError("Produto não encontrado", 404);
  }
};
