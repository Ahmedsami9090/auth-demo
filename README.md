# 🚀 Auth Demo

A simple authentication demo featuring **NestJS** for the backend and **React** for the frontend. This project includes user login, signup, and protected profile access, implementing modern authentication practices.

## ✨ Features

- 🔐 **Authentication System** (Signup & Login)  
- 🔒 **Protected Routes** (Profile access requires authentication)  
- ⚡ **React Frontend** with `react-router-dom`  
- 🚀 **NestJS Backend** for handling authentication  
- 🌊 **State Management** with `Redux Toolkit`  
- 🔄 **API Calls** managed by `Axios`  
- 📋 **Form Handling** using `Formik` + Validation with `Yup`  
- 🎨 **Styled with TailwindCSS**  

---

## 🏗 Tech Stack

### Backend 🛠  
- **NestJS** - Backend framework  
- **JWT Authentication** - Secure user authentication  
- **TypeScript** - For type safety  
- **Express** - Underlying server  
- **Mongoose** - For Database management 
- **Bcrypt** - To secure documents on Database 


### Frontend 🎨  
- **React** - UI library  
- **React Router** - Navigation and protected routes  
- **Redux Toolkit** - State management  
- **Axios** - API requests  
- **Formik & Yup** - Form handling & validation  
- **TailwindCSS** - Styling  

---

## 🚀 Getting Started

### 🖥 Backend Setup (NestJS)
1. **Clone the repository**  
   ```sh
   git clone https://github.com/Ahmedsami9090/auth-demo.git
   cd auth-demo/BE
   ```
2. **Install dependencies**  
   ```sh
   npm install
   ```
3. **Start the server**  
   ```sh
   npm run start:dev
   ```
4. The backend will run at `http://localhost:3001`.  

---

### 🌐 Frontend Setup (React)
1. **Navigate to the frontend folder**  
   ```sh
   cd ../FE
   ```
2. **Install dependencies**  
   ```sh
   npm install
   ```
3. **Start the development server**  
   ```sh
   npm run dev
   ```
4. The frontend will be available at `http://localhost:5173`.  

---

## 🔑 API Endpoints (Backend)
| Method | Endpoint      | Description         | Auth Required |
|--------|-------------|---------------------|--------------|
| `GET`  | `/`          |   Homepage          | ❌ No |
| `POST` | `/users/signup`| User registration | ❌ No |
| `POST` | `/auth/login` | User login         | ❌ No |
| `GET`  | `/auth/profile` | Fetch user profile | ✅ Yes |

---


## 📜 License  
This project is open-source.  

---

## 📬 Contact  
For any questions or contributions, feel free to open an issue or reach out!  

---
