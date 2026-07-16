export type UserRole = "user" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
}

// Shape of the body when creating a user (no id / createdAt - server generates those)
export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

// Shape of the body when updating a user - all fields optional
export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
}
