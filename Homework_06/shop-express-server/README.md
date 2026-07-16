# shop-express-server (Homework_06)

Simple Express + TypeScript server with a `Users` entity.

## Structure

```
shop-express-server/
├── src/
│   ├── types/user.ts          # User, CreateUserDto, UpdateUserDto types
│   ├── data/users.ts          # in-memory "database" (array), seeded with 2 users
│   ├── controllers/userController.ts   # CRUD logic
│   ├── routes/userRoutes.ts   # /users routes
│   └── index.ts               # app entry point
├── postman/
│   └── shop-express-server.postman_collection.json
├── package.json
├── tsconfig.json
└── .gitignore
```

## Setup

```bash
npm install
npm run dev
```

Server starts at `http://localhost:3000`.

## User model

| field     | type                 |
|-----------|----------------------|
| id        | string (uuid)        |
| name      | string                |
| email     | string                |
| password  | string                |
| role      | "user" \| "admin"    |
| createdAt | Date                  |

## Routes

| Method | Path         | Description         | Body                                             |
|--------|--------------|----------------------|---------------------------------------------------|
| GET    | /users       | List all users       | -                                                   |
| GET    | /users/:id   | Get a single user    | -                                                   |
| POST   | /users       | Create a user         | `{ name, email, password, role? }`                 |
| PUT    | /users/:id   | Update a user         | any subset of `{ name, email, password, role }`    |
| DELETE | /users/:id   | Delete a user         | -                                                   |

## Testing with Postman

1. Open Postman.
2. Import `postman/shop-express-server.postman_collection.json`.
3. Make sure the server is running (`npm run dev`).
4. Run the requests in order: **Get all users** → **Create user** (this auto-saves the new id into the `userId` collection variable) → **Get user by id** → **Update user** → **Delete user**.
