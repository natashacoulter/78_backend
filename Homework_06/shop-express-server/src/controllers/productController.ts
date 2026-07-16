import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { products } from "../data/products";
import { CreateProductDto, UpdateProductDto, Product, ProductCategory } from "../types/product";

const VALID_CATEGORIES: ProductCategory[] = ["electronics", "clothing", "books", "home"];

// GET /products
export const getAllProducts = (req: Request, res: Response): void => {
  res.status(200).json(products);
};

// GET /products/:id
export const getProductById = (req: Request, res: Response): void => {
  const { id } = req.params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    res.status(404).json({ message: `Product with id ${id} not found` });
    return;
  }

  res.status(200).json(product);
};

// POST /products
export const createProduct = (req: Request, res: Response): void => {
  const { title, description, price, stock, category }: CreateProductDto = req.body;

  if (!title || !description || price === undefined || stock === undefined || !category) {
    res.status(400).json({
      message: "title, description, price, stock and category are required",
    });
    return;
  }

  if (!VALID_CATEGORIES.includes(category)) {
    res.status(400).json({
      message: `category must be one of: ${VALID_CATEGORIES.join(", ")}`,
    });
    return;
  }

  const newProduct: Product = {
    id: uuidv4(),
    title,
    description,
    price,
    stock,
    category,
    createdAt: new Date(),
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
};

// PUT /products/:id
export const updateProduct = (req: Request, res: Response): void => {
  const { id } = req.params;
  const updates: UpdateProductDto = req.body;

  const productIndex = products.findIndex((p) => p.id === id);
  if (productIndex === -1) {
    res.status(404).json({ message: `Product with id ${id} not found` });
    return;
  }

  if (updates.category && !VALID_CATEGORIES.includes(updates.category)) {
    res.status(400).json({
      message: `category must be one of: ${VALID_CATEGORIES.join(", ")}`,
    });
    return;
  }

  const existingProduct = products[productIndex];

  const updatedProduct: Product = {
    ...existingProduct,
    title: updates.title ?? existingProduct.title,
    description: updates.description ?? existingProduct.description,
    price: updates.price ?? existingProduct.price,
    stock: updates.stock ?? existingProduct.stock,
    category: updates.category ?? existingProduct.category,
  };

  products[productIndex] = updatedProduct;
  res.status(200).json(updatedProduct);
};

// DELETE /products/:id
export const deleteProduct = (req: Request, res: Response): void => {
  const { id } = req.params;
  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    res.status(404).json({ message: `Product with id ${id} not found` });
    return;
  }

  const [deletedProduct] = products.splice(productIndex, 1);
  res.status(200).json({ message: "Product deleted", product: deletedProduct });
};
