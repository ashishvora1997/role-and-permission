# Roles and Permissions Node.js

A robust Node.js backend application implementing Role-Based Access Control (RBAC) with JWT authentication. This project demonstrates how to manage user roles, permissions, and specialized task access using Express, MySQL, and Sequelize.

## Features

-   **JWT Authentication**: Secure user registration and login with JSON Web Tokens.
-   **Role-Based Access Control (RBAC)**: Fine-grained access control using roles (SUPER_ADMIN, COMPANY_ADMIN, USER, VISITOR).
-   **User Management**: Create, update, and delete users. Assign roles to users.
-   **Task Management**: Create and view tasks based on assigned roles and permissions.
-   **Database**: Uses MySQL with Sequelize ORM for data modeling and migrations.
-   **Seed Data**: Automatically seeds default roles and a Super Admin user on startup.

## Tech Stack

-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Database**: MySQL
-   **ORM**: Sequelize
-   **Authentication**: `jsonwebtoken`, `bcrypt`
-   **Environment Management**: `dotenv`

## Prerequisites

-   [Node.js](https://nodejs.org/) (v14 or higher)
-   [MySQL](https://www.mysql.com/) Database

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ashishvora1997/role-and-permission.git
    cd roles-and-permissions
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Configuration:**
    Create a `.env` file in the root directory based on the following template:

    ```env
    PORT=5000
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=your_password
    DB_NAME=roles_db
    JWT_SECRET=your_jwt_secret_key
    ```

4.  **Database Setup:**
    Create a MySQL database matching your `DB_NAME`.

    ```sql
    CREATE DATABASE roles_db;
    ```
    *Note: The application will automatically sync tables and seed default data when started.*

## Usage

1.  **Start the development server:**
    ```bash
    npm run dev
    ```

2.  **Default Super Admin:**
    The application will create a default Super Admin user if one does not exist:
    -   **Email**: `test@gmail.com`
    -   **Password**: `Test@123`

## API Endpoints

### Authentication

| Method | Endpoint | Description | Public |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/users/register` | Register a new user | No (Super Admin only checks) |
| `POST` | `/api/users/login` | Login user and receive a JWT token | Yes |

### Users

| Method | Endpoint | Description | Roles Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/users` | Get a list of all users | (Check Middleware) |
| `DELETE` | `/api/users/:id` | Delete a user by ID | (Check Middleware) |
| `GET` | `/api/users/:id` | Get user roles by ID | (Check Middleware) |
| `POST` | `/api/users/:id/role-update` | Update roles for a user | (Check Middleware) |

### Roles

| Method | Endpoint | Description | Roles Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/roles` | Get all available roles | Authenticated User |
| `POST` | `/api/roles` | Add a new role | Authenticated User |
| `DELETE` | `/api/roles/:id` | Delete a role | Authenticated User |
| `POST` | `/api/roles/bulk` | Bulk add roles | Authenticated User |

### Tasks

| Method | Endpoint | Description | Roles Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/task` | Get a list of tasks | `TASK_VIEW`, `TASK_CREATE`, etc. |
| `POST` | `/api/task` | Create a new task | `TASK_CREATE` |

## License

This project is licensed under the ISC License.