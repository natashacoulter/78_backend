import { v4 as uuidv4 } from "uuid";
import { User } from "../types/user";

// Simple in-memory "database" - resets every time the server restarts.
export const users: User[] = [
  {
    id: uuidv4(),
    name: "Alice Johnson",
    email: "alice@example.com",
    password: "password123",
    role: "admin",
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    name: "Bob Smith",
    email: "bob@example.com",
    password: "password123",
    role: "user",
    createdAt: new Date(),
  },
];
