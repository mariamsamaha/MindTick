# MindTick

## Overview

This is a **Node.js-based RESTful API** for a task management system, designed to manage users and tasks with role-based access control. Users can register, log in, manage tasks, and track progress via checklists. Admins have additional capabilities like user management and report generation. The API supports task assignments, dashboard statistics, Excel report exports, and profile image uploads.

The application uses **Express.js** for routing, **MongoDB** with Mongoose for data storage, **JWT** for authentication, and **Multer** for file uploads. It is designed for scalability and includes role-based authorization (admin vs. member).

## ✨ Features

### 🔐 User Authentication
- Register and log in with JWT-based authentication
- Role-based access: admins (via invite token) and members
- Profile management (view/update profile, upload profile images)

### 📋 Task Management
- Create, read, update, and delete tasks
- Assign tasks to multiple users with priority (Low/Medium/High) and status (Pending/In Progress/Completed)
- Manage task checklists and automatically update progress/status

### 👥 User Management (admin-only)
- List all members with task counts (pending, in progress, completed)
- View or delete individual users

### 📊 Dashboard Statistics
- **Admin dashboard**: Total tasks, pending, in progress, completed, overdue, and charts for task distribution and priority levels
- **User dashboard**: Personalized task statistics and recent tasks

### 📈 Reports (admin-only)
- Export tasks and user task summaries to Excel format

### 📁 File Uploads
- Upload profile images (JPEG, PNG, JPG) stored in the `uploads/` directory

### 🔒 Role-Based Authorization
- Protected routes with JWT and admin-only access for sensitive operations

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Database** | MongoDB with Mongoose ODM |
| **Authentication** | JSON Web Tokens (jsonwebtoken), bcryptjs for password hashing |
| **File Handling** | Multer for image uploads |
| **Excel Exports** | exceljs |
| **Other Libraries** | dotenv (environment variables), cors (cross-origin requests) |

## 📋 Prerequisites

- **Node.js**: v14 or higher
- **MongoDB**: Local instance or cloud (e.g., MongoDB Atlas)
- **Environment Variables**: Create a `.env` file in the root directory

### Environment Variables

```env
MONGO_URL=mongodb://localhost:27017/taskdb  # MongoDB connection string
JWT_SECRET=your_jwt_secret_key              # Secret for JWT signing
ADMIN_INVITE_TOKEN=your_admin_invite_token  # Token for admin registration
PORT=5000                                   # Server port (optional)
CLIENT_URL=http://localhost:3000            # Frontend URL for CORS (optional)
```

## 🚀 Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/task-management-api.git](https://github.com/mariamsamaha/MindTick.git)
   ```

2. **Navigate to the project directory:**
   ```bash
   cd task-management-api
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Create a `.env` file** with the variables listed in Prerequisites.

5. **Create an uploads directory** for storing uploaded images:
   ```bash
   mkdir uploads
   ```

## 🎯 Usage

### Starting the Server

```bash
npm start
```

The server will run on `http://localhost:5000` (or the port specified in `.env`).

**API Base URL:** `http://localhost:5000/api`

### Testing the API

**No frontend required!** This API is designed to be fully testable and functional as a standalone backend service.

A comprehensive Postman collection is available in the `/postman` folder for easy testing of all endpoints. You can also use curl, Thunder Client, or any other API testing tool.

## 📡 API Endpoints

### 🔐 Authentication (`/api/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/register` | Register a user (include `adminInviteToken` for admin role) | Public |
| `POST` | `/login` | Log in and receive a JWT | Public |
| `GET` | `/profile` | Get user profile | Protected |
| `PUT` | `/profile` | Update user profile | Protected |
| `POST` | `/upload-image` | Upload a profile image (JPEG/PNG/JPG) | Protected |

### 👥 Users (`/api/users`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `GET` | `/` | List all members with task counts | Admin Only |
| `GET` | `/:id` | Get user details by ID | Protected |
| `DELETE` | `/:id` | Delete a user | Admin Only |

### 📋 Tasks (`/api/tasks`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `GET` | `/` | Get tasks (filtered by status; admins see all, members see assigned) | Protected |
| `GET` | `/:id` | Get task by ID | Protected |
| `POST` | `/` | Create a task | Admin Only |
| `PUT` | `/:id` | Update task details | Protected |
| `PUT` | `/:id/status` | Update task status | Assigned users or Admin |
| `PUT` | `/:id/checklist` | Update task checklist and progress | Protected |
| `DELETE` | `/:id` | Delete a task | Admin Only |
| `GET` | `/dashboard` | Admin dashboard with task statistics and charts | Admin Only |
| `GET` | `/user-dashboard` | User dashboard with personalized task stats | Protected |

### 📈 Reports (`/api/reports`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `GET` | `/export/tasks` | Export tasks to Excel | Admin Only |
| `GET` | `/export/users` | Export user task summary to Excel | Admin Only |

### 🔑 Authentication

Protected routes require a **Bearer token** in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

Admin-only routes require the user to have the **admin role**.

### 📝 Example Request

**Register User:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
-H "Content-Type: application/json" \
-d '{
  "name":"John Doe",
  "email":"john@example.com",
  "password":"secret123",
  "adminInviteToken":"your_admin_invite_token"
}'
```

## 🗄️ Data Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  profileImageUrl: String,
  role: String (admin/member),
  timestamps: true
}
```

### Task Model
```javascript
{
  title: String,
  description: String,
  priority: String (Low/Medium/High),
  status: String (Pending/In Progress/Completed),
  dueDate: Date,
  assignedTo: [ObjectId], // Array of User IDs
  createdBy: ObjectId, // User ID
  attachments: [String], // Array of strings
  todoChecklist: [{ text: String, completed: Boolean }],
  progress: Number (0-100),
  timestamps: true
}
```

## 📁 Project Structure

```
├── config/
│   └── db.js                 # MongoDB connection setup
├── controllers/
│   ├── authController.js     # User registration, login, profile management
│   ├── taskController.js     # Task CRUD, checklist/status updates, dashboards
│   ├── userController.js     # User management (admin-only)
│   └── reportController.js   # Excel report generation
├── models/
│   ├── Task.js               # Task schema
│   └── User.js               # User schema
├── middlewares/
│   ├── authMiddleware.js     # JWT authentication and admin authorization
│   └── uploadMiddleware.js   # Multer configuration for image uploads
├── routes/
│   ├── authRoutes.js         # Authentication and profile routes
│   ├── userRoutes.js         # User management routes
│   ├── taskRoutes.js         # Task management routes
│   └── reportRoutes.js       # Report export routes
├── postman/                  # Postman collection and environment files
├── uploads/                  # Directory for storing uploaded images
├── server.js                 # Main entry point
├── .env                      # Environment variables
└── README.md
```

## 🏃‍♂️ Running Locally

1. Ensure **MongoDB** is running (locally or via a cloud provider)
2. Start the server:
   ```bash
   npm start
   ```
3. Test endpoints using **Postman**, curl, or a frontend application

> **Note:** CORS allows connections from `CLIENT_URL` or any origin if not specified.

## 🤝 Contributing

1. **Fork** the repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. **Commit** your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. **Push** to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a **Pull Request**

## 📄 License

MIT License

## 👩‍💻Author

**Mariam Samaha**  
B.Sc. in Computer Science 
Zewail City University, Egypt

---

**Happy Coding! 🚀**
