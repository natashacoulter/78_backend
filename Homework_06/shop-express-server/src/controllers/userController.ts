import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { users } from "../data/users";
import { CreateUserDto, UpdateUserDto, User } from "../types/user";

// GET /users
export const getAllUsers = (req: Request, res: Response): void => {
  res.status(200).json(users);
};

// GET /users/:id
export const getUserById = (req: Request, res: Response): void => {
  const { id } = req.params;
  const user = users.find((u) => u.id === id);

  if (!user) {
    res.status(404).json({ message: `User with id ${id} not found` });
    return;
  }

  res.status(200).json(user);
};

// POST /users
export const createUser = (req: Request, res: Response): void => {
  const { name, email, password, role }: CreateUserDto = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "name, email and password are required" });
    return;
  }

  const emailTaken = users.some((u) => u.email === email);
  if (emailTaken) {
    res.status(409).json({ message: `User with email ${email} already exists` });
    return;
  }

  const newUser: User = {
    id: uuidv4(),
    name,
    email,
    password,
    role: role === "admin" ? "admin" : "user",
    createdAt: new Date(),
  };

  users.push(newUser);
  res.status(201).json(newUser);
};

// PUT /users/:id
export const updateUser = (req: Request, res: Response): void => {
  const { id } = req.params;
  const updates: UpdateUserDto = req.body;

  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex === -1) {
    res.status(404).json({ message: `User with id ${id} not found` });
    return;
  }

  const existingUser = users[userIndex];

  const updatedUser: User = {
    ...existingUser,
    name: updates.name ?? existingUser.name,
    email: updates.email ?? existingUser.email,
    password: updates.password ?? existingUser.password,
    role: updates.role ?? existingUser.role,
  };

  users[userIndex] = updatedUser;
  res.status(200).json(updatedUser);
};

// DELETE /users/:id
export const deleteUser = (req: Request, res: Response): void => {
  const { id } = req.params;
  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    res.status(404).json({ message: `User with id ${id} not found` });
    return;
  }

  const [deletedUser] = users.splice(userIndex, 1);
  res.status(200).json({ message: "User deleted", user: deletedUser });
};
