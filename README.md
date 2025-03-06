# 🛍️ E-commerce Backend (Node.js + Express + MongoDB)

![Node.js](https://img.shields.io/badge/Node.js-16.x-green?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-blue?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green?style=for-the-badge&logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange?style=for-the-badge&logo=jsonwebtokens)
![Multer](https://img.shields.io/badge/Multer-File%20Uploads-red?style=for-the-badge)
![Helmet](https://img.shields.io/badge/Security-Helmet-yellow?style=for-the-badge)

## 📌 Overview
This is a **full-fledged E-commerce backend** built using **Node.js, Express.js, and MongoDB**. It includes authentication, product management, order processing, and security features.

## 🚀 Features

✅ **User Authentication (JWT-based login & signup)**  
✅ **Admin & User Roles**  
✅ **CRUD Operations for Products & Orders**  
✅ **Search, Filtering, and Pagination**  
✅ **File Uploads with Multer**  
✅ **Security Features (Helmet, CORS, Rate Limiting, Input Validation)**  
✅ **Logging & Error Handling (Winston & Morgan)**  
✅ **Optimized MongoDB Queries (Aggregation & Indexing)**  

---

## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Token)
- **File Uploads**: Multer
- **Security**: Helmet, CORS, Express Rate Limiting
- **Logging**: Morgan, Winston

---

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/shaya-141/Ecom-Backend-Master.git
cd Ecom-Backend-Master
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Setup Environment Variables
Create a **.env** file in the root directory and add:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_API_KEY=your_cloudinary_key  # Optional for image hosting
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

### 4️⃣ Run the Server
```sh
npm start  # or nodemon for development mode
```

---

## 🔥 API Endpoints

### 🏠 **Auth Routes**
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login and get JWT token |

### 👤 **User Routes**
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/users/profile` | Get user profile |
| PUT | `/api/users/update` | Update user profile |
| GET | `/api/users/all` | Get all users (Admin) |

### 📦 **Product Routes**
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/products/upload` | Upload a new product (Admin) |
| DELETE | `/api/products/remove/:id` | Delete a product (Admin) |
| PUT | `/api/products/update/:id` | Update product details (Admin) |
| GET | `/api/products/details/:id` | Get single product details |
| GET | `/api/products/all` | Get all products |
| GET | `/api/products/search?query=` | Search products |
| GET | `/api/products/category/:category` | Get products by category |

### 📦 **Order Routes**
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/orders/create` | Create a new order |
| GET | `/api/orders/all` | Get all orders (Admin) |
| GET | `/api/orders/myorders` | Get logged-in user's orders |
| PUT | `/api/orders/update/:id` | Update order status (Admin) |

---

## 🛡️ Security Features
✅ **Helmet** → Secure HTTP headers  
✅ **CORS** → Cross-Origin Resource Sharing  
✅ **Rate Limiting** → Prevent brute-force attacks  
✅ **Input Validation (Joi)** → Prevent SQL/XSS attacks  
✅ **JWT Authentication** → Secure user access  

---

## 📝 Logging 
✅ **Winston & Morgan** for logging requests and errors  


---

## 📌 Future Improvements
🔹 **Unit & Integration Testing (Jest, Supertest)**  
🔹 **Caching (Redis) for performance boost**  
🔹 **GraphQL support for optimized queries**  
🔹 **Background jobs (BullMQ) for order processing**  

---

## 💻 Contributing
Contributions are welcome! Feel free to fork this repo and submit a PR.

---

## 🤝 Contact
📧 Email: [mdshayan5909@gmail.com](mailto:mdshayan5909@gmail.com)  
🔗 GitHub: [shaya-141](https://github.com/shaya-141)  
