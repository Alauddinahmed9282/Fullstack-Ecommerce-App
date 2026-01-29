# 🌟 Magic Media - Social Media Platform

<div align="center">

A **modern, full-stack social media platform** built with cutting-edge web technologies. Connect with friends, share moments, and build meaningful relationships in a beautifully designed interface.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.6-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Express](https://img.shields.io/badge/Express-5.1.0-90C53F?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-13AA52?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

[Getting Started](#-installation--setup) • [Features](#-features) • [API Docs](#-api-endpoints) • [Troubleshooting](#-troubleshooting)

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation--setup)
- [API Endpoints](#-api-endpoints)
- [Usage Examples](#-usage-examples)
- [Security](#-security-features)
- [Troubleshooting](#-troubleshooting)

---

## ✨ Features

### 🎯 Core Functionality

- 🔐 **User Authentication** - Secure registration & login with bcrypt hashing
- 📸 **Create Posts** - Share images and captions with your audience
- ❤️ **Like System** - Interactive like/unlike functionality
- 💬 **Comments** - Engage through meaningful comments
- 👤 **User Profiles** - Personalized profiles with post history
- 👥 **Follow/Unfollow** - Connect and manage your network
- 🔍 **Suggested Users** - Discover and connect with new people
- 📤 **Image Upload** - Upload and store images with Multer

### 🎨 Frontend Features

- ✅ Modern UI with React and Tailwind CSS
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Lightning-fast with Next.js 15 & Turbopack
- ✅ Type-safe development with TypeScript
- ✅ Beautiful icons with Lucide React
- ✅ Smooth state management with React hooks

### 🔒 Backend Features

- ✅ Clean RESTful API architecture
- ✅ MongoDB integration with Mongoose
- ✅ CORS protection & security headers
- ✅ Comprehensive error handling
- ✅ Form validation with duplicate detection
- ✅ Request logging with Morgan

---

## 🛠️ Tech Stack

### Frontend

- **Next.js** 15.5.6 - React framework with SSR
- **React** 19.1.0 - UI library
- **Tailwind CSS** 4 - Utility-first CSS
- **Axios** 1.12.2 - HTTP client
- **Lucide React** 0.546.0 - SVG icons
- **TypeScript** 5 - Type-safe development

### Backend

- **Node.js** 16+ - JavaScript runtime
- **Express** 5.1.0 - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** 8.19.0 - MongoDB ODM
- **Bcrypt** 6.0.0 - Password hashing
- **Multer** 2.0.2 - File upload middleware
- **Helmet** 8.1.0 - Security headers
- **CORS** 2.8.5 - Cross-origin handling

---

## 📂 Project Structure

```
fullstack-social-app/
├── backend/
│   ├── index.js                  # Server entry
│   ├── .env                      # Configuration
│   ├── models/                   # MongoDB schemas
│   │   ├── User.js
│   │   ├── Post.js
│   │   └── Comment.js
│   ├── routers/                  # API routes
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── post.js
│   │   └── comment.js
│   ├── middleware/
│   │   └── upload.js             # File upload config
│   └── uploads/                  # Image storage
│
└── magic-media/                  # Next.js Frontend
    ├── app/                      # Next.js pages
    │   ├── layout.tsx
    │   ├── page.js
    │   └── globals.css
    ├── components/               # React components
    │   ├── SocialMediaApp.js
    │   ├── auth/                 # Login/Register
    │   ├── posts/                # Post features
    │   ├── profile/              # User profiles
    │   ├── users/                # User discovery
    │   └── layout/               # Navigation
    ├── lib/
    │   └── api.js                # API client
    └── public/                   # Static assets
```

---

## 🚀 Installation & Setup

### ✅ Prerequisites

- **Node.js** v16+ ([Download](https://nodejs.org))
- **MongoDB** ([Download](https://www.mongodb.com/try/download/community))
- **npm** or **yarn**

### 📦 Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file with:
# MONGOOSE_URL=mongodb://localhost:27017/magic-media
# PORT=8200
# NODE_ENV=development

# Start MongoDB (macOS with Homebrew)
brew services start mongodb-community

# Or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Start backend server
npm run dev

# Server runs on http://localhost:8200
```

### 🎨 Frontend Setup

```bash
# Navigate to frontend
cd magic-media

# Install dependencies
npm install

# Create .env.local with:
# NEXT_PUBLIC_API_URL=http://localhost:8200/backend/api
# NEXT_PUBLIC_IMAGE_URL=http://localhost:8200/uploads

# Start frontend
npm run dev

# App runs on http://localhost:3000

# Build for production
npm run build
npm start
```

---

## 📚 API Endpoints

### 🔐 Authentication

```
POST   /backend/api/auth/register     Register new user
POST   /backend/api/auth/login        Login user
```

### 📸 Posts

```
POST   /backend/api/posts/add                    Create post
GET    /backend/api/posts/getAllPost            Get all posts
GET    /backend/api/posts/getPost/:id           Get post by ID
GET    /backend/api/posts/getPostByUser/:id     Get user posts
PUT    /backend/api/posts/update/:id            Update post
DELETE /backend/api/posts/delete/:id            Delete post
PUT    /backend/api/posts/like/:id              Like/Unlike post
```

### 💬 Comments

```
POST   /backend/api/posts/comment/add                  Add comment
GET    /backend/api/posts/comment/getComments/:postId Get comments
DELETE /backend/api/posts/comment/delete/:id          Delete comment
```

### 👥 Users

```
GET    /backend/api/users/getAllUsers     Get all users
GET    /backend/api/users/getUser/:id     Get user profile
PUT    /backend/api/users/update/:id      Update profile
PUT    /backend/api/users/follow/:id      Follow user
PUT    /backend/api/users/unfollow/:id    Unfollow user
```

### 📋 Example API Calls

**Register:**

```bash
curl -X POST http://localhost:8200/backend/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "emailId": "john@example.com",
    "mobile": "9876543210",
    "password": "SecurePass123",
    "gender": "male"
  }'
```

**Create Post:**

```bash
curl -X POST http://localhost:8200/backend/api/posts/add \
  -F "userId=USER_ID" \
  -F "username=john_doe" \
  -F "description=Amazing sunset!" \
  -F "imageUrl=@/path/to/image.jpg"
```

---

## 📝 Usage Examples

### 1️⃣ Create Account

1. Go to http://localhost:3000
2. Click "Register"
3. Fill in: username (3+ chars), email, mobile (10 digits), password (6+ chars), gender
4. Click "Register"

### 2️⃣ Login

1. Enter email and password
2. Click "Login"

### 3️⃣ Create Post

1. Click "Create" in navbar
2. Write caption (max 500 chars)
3. Optionally upload image (JPG, PNG, GIF - max 5MB)
4. Click "Post"

### 4️⃣ Interact

- **❤️ Like:** Click heart icon
- **💬 Comment:** Click comment icon, type, press Enter
- **🗑️ Delete:** Click trash (your posts only)
- **✏️ Edit:** Click edit icon (your posts only)

### 5️⃣ Discover Users

1. View "Suggested Users" on right sidebar
2. Click profile picture to view posts
3. Click "Follow" to add to network

### 6️⃣ View Profile

1. Click "Profile" in navbar
2. See your posts and follower stats

---

## 🔐 Security Features

| Feature                   | Description                              |
| ------------------------- | ---------------------------------------- |
| 🔐 **Password Hashing**   | Bcrypt for secure storage                |
| ✅ **Input Validation**   | Form validation with duplicate detection |
| 🛡️ **CORS Protection**    | Prevents unauthorized requests           |
| 🔒 **Security Headers**   | Helmet.js HTTP headers                   |
| 📤 **File Upload Safety** | Multer with size/format restrictions     |
| 🗄️ **Database Security**  | MongoDB ready for authentication         |

---

## 🐛 Troubleshooting

### MongoDB Connection Error

```bash
# Start MongoDB
brew services start mongodb-community

# Or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Clear npm cache if issues persist
npm cache clean --force
```

### Port Already in Use

```bash
# Find process on port 8200
lsof -i :8200
kill -9 <PID>

# Find process on port 3000
lsof -i :3000
kill -9 <PID>
```

### Image Not Loading

- ✅ Backend running on port 8200
- ✅ `.env.local` has correct `NEXT_PUBLIC_IMAGE_URL`
- ✅ Image exists in `backend/uploads/`
- ✅ Clear browser cache

### CORS Errors

Backend configured for `http://localhost:3000`. For different port, update `backend/index.js`.

### Form Validation Issues

| Field    | Rules             |
| -------- | ----------------- |
| Username | Min 3 characters  |
| Email    | Valid format      |
| Mobile   | Exactly 10 digits |
| Password | Min 6 characters  |

---

## 🎯 Future Enhancements

- [ ] Advanced search & user search
- [ ] Real-time notifications
- [ ] Direct messaging
- [ ] Story feature
- [ ] Dark mode theme
- [ ] Video uploads
- [ ] Admin dashboard
- [ ] Production deployment

For detailed quick start, see [QUICK_START.md](./QUICK_START.md)

---

## 🤝 Contributing

1. 🍴 Fork the repository
2. 🌿 Create feature branch (`git checkout -b feature/AmazingFeature`)
3. 📝 Commit changes (`git commit -m 'Add AmazingFeature'`)
4. 📤 Push to branch (`git push origin feature/AmazingFeature`)
5. 🔀 Open Pull Request

---

## 📄 License

ISC License - see LICENSE file for details.

---

## 👨‍💻 About

**Magic Media** is a full-stack social media platform demonstrating modern web development with React, Next.js, Express.js, MongoDB, and Tailwind CSS.

Created with ❤️ by developers who believe in connecting people through technology.

---

## 📞 Support

- 📖 Check [QUICK_START.md](./QUICK_START.md) for setup
- 🔍 Review [Troubleshooting](#-troubleshooting) section
- 💬 Open an issue on the repository

---

<div align="center">

### ⭐ If this project is helpful, please give it a star!

**Happy Coding! 🚀**

Made with ❤️ for the developer community

</div>
