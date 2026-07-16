import { v4 as uuidv4 } from "uuid";
import { Product } from "../types/product";

// Simple in-memory "database" - resets every time the server restarts.
export const products: Product[] = [
  {
    id: uuidv4(),
    title: "Wireless Headphones",
    description: "Over-ear Bluetooth headphones with noise cancellation",
    price: 89.99,
    stock: 25,
    category: "electronics",
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    title: "Cotton T-Shirt",
    description: "Basic crew-neck t-shirt, 100% cotton",
    price: 14.99,
    stock: 100,
    category: "clothing",
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    title: "The Pragmatic Programmer",
    description: "Classic book on software craftsmanship",
    price: 34.5,
    stock: 15,
    category: "books",
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    title: "Ceramic Mug",
    description: "12oz ceramic coffee mug",
    price: 9.99,
    stock: 60,
    category: "home",
    createdAt: new Date(),
  },
];
