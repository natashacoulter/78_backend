export type ProductCategory = "electronics" | "clothing" | "books" | "home";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  category: ProductCategory;
  createdAt: Date;
}

// Shape of the body when creating a product (no id / createdAt - server generates those)
export interface CreateProductDto {
  title: string;
  description: string;
  price: number;
  stock: number;
  category: ProductCategory;
}

// Shape of the body when updating a product - all fields optional
export interface UpdateProductDto {
  title?: string;
  description?: string;
  price?: number;
  stock?: number;
  category?: ProductCategory;
}
