import express, { Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "shop-express-server is running" });
});

app.use("/users", userRoutes);
app.use("/products", productRoutes);

// Fallback for unknown routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
