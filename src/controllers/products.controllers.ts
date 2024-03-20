import { Request, Response } from "express";
import { Product } from "../entities/products.entity"
import { createProductService } from "../services/products/createProduct.service"
import deleteProductService from "../services/products/deleteProduct.service";
import listProductsService from "../services/products/listProducts.service";


export const createProductController = async (req: Request, res: Response): Promise<Response> => {
    const newProduct: Product = await createProductService(req.body)
    console.log("Produto criado:", newProduct);
    return res.status(201).json(newProduct)
}



export const listProductsController = async (req: Request, res: Response): Promise<Response> => {
    const products = await listProductsService()

    return res.status(200).json(products)
}

export const deleteProductController = async (req: Request, res: Response) => {
    const paramId: number = parseInt(req.params.id)

    await deleteProductService(paramId)

    return res.status(204).send()
}