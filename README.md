# 🌟 Magic Media - Social Media Platform

A modern, feature-rich social media platform built with cutting-edge web technologies. Connect with friends, share moments, and build meaningful relationships in a beautifully designed interface.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![Express](https://img.shields.io/badge/Express-5.1-green?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green?style=flat-square&logo=mongodb)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)

## 🚀 Quick Start

For a fast setup guide, see [QUICK_START.md](./QUICK_START.md) - it includes step-by-step instructions and testing procedures.

## ✨ Features

### 🎯 Core Functionality

- **User Authentication** - Secure registration and login with bcrypt password hashing
- **Create Posts** - Share images and captions with your audience
- **Like System** - Interactive like/unlike functionality
- **Comments** - Engage with posts through meaningful comments
- **User Profiles** - Personalized user profiles with post history
- **Follow/Unfollow** - Connect with users and manage your network
- **Suggested Users** - Discover and connect with new users
- **Image Upload** - Upload and store images with Multer

### 🎨 Frontend Features

- **Modern UI** - Built with React and Tailwind CSS
- **Responsive Design** - Works seamlessly across all devices
- **Fast Performance** - Optimized with Next.js 15 and Turbopack
- **Type-Safe** - TypeScript support for better development experience
- **Interactive Components** - Smooth user interactions with Lucide React icons

### 🔒 Backend Features

- **RESTful API** - Clean and organized API endpoints
- **CORS Support** - Secure cross-origin resource sharing
- **Security Headers** - Protected with Helmet.js
- **Database Logging** - Request logging with Morgan
- **Error Handling** - Robust error management throughout the app
- **Form Validation** - Input validation with duplicate detection

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15.5.6
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS 4
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Language**: TypeScript/JavaScript

### Backend

- **Runtime**: Node.js
- **Framework**: Express 5.1.0
- **Database**: MongoDB with Mongoose 8.19.0
- **Authentication**: bcrypt
- **File Upload**: Multer 2.0.2
- **Security**: Helmet, CORS
- **Logging**: Morgan
- **Environment**: dotenv

## 📋 Project Structure

```
fullstack-social-app/
├── backend/                    # Express API Server
│   ├── models/                # MongoDB schemas
│   │   ├── User.js           # User model
│   │   ├── Post.js           # Post model
│   │   └── Comment.js        # Comment model
│   ├── routers/              # API routes
│   │   ├── auth.js           # Authentication endpoints
│   │   ├── users.js          # User management endpoints
│   │   ├── post.js           # Post CRUD endpoints
│   │   └── comment.js        # Comment endpoints
│   ├── middleware/           # Custom middleware
│   │   └── upload.js         # File upload configuration
│   ├── uploads/              # Uploaded images storage
│   ├── index.js              # Express app initialization
│   └── package.json          # Backend dependencies
│
└── magic-media/              # Next.js Frontend
    ├── app/                  # Next.js app directory
    │   ├── layout.tsx        # Root layout
    │   ├── page.js          # Home page
    │   ├── globals.css      # Global styles
    │   └── favicon.ico
    ├── components/          # React components
    │   ├── SocialMediaApp.js
    │   ├── auth/            # Authentication pages
    │   │   ├── LoginPage.js
    │   │   └── RegisterPage.js
    │   ├── posts/           # Post-related components
    │   │   ├── HomePage.js
    │   │   ├── CreatePostPage.js
    │   │   └── PostCard.js
    │   ├── profile/         # User profile components
    │   │   └── ProfilePage.tsx
    │   ├── users/           # User discovery components
    │   │   └── SuggestedUsers.tsx
    │   └── layout/          # Layout components
    │       └── Navbar.js
    ├── lib/                 # Utility functions
    │   └── api.js          # API client configuration
    ├── public/              # Static assets
    ├── package.json         # Frontend dependencies
    ├── tsconfig.json        # TypeScript configuration
    ├── next.config.ts       # Next.js configuration
    └── postcss.config.js    # PostCSS configuration
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or remote connection string)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**

   ```bash
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create `.env` file**

   ```env
   MONGOOSE_URL=mongodb://localhost:27017/magic-media
   PORT=8200
   NODE_ENV=development
   ```

4. **Start MongoDB** (if not running)

   ```bash
   # macOS with Homebrew
   brew services start mongodb-community

   # Or with Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

5. **Start the server**

   ```bash
   # Development mode with hot reload
   npm run dev

   # Production mode
   npm start
   ```

The backend will run on `http://localhost:8200`

### Frontend Setup

1. **Navigate to frontend directory**

   ```bash
   cd magic-media
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create `.env.local` file**

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8200/backend/api
   NEXT_PUBLIC_IMAGE_URL=http://localhost:8200/uploads
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

The frontend will run on `http://localhost:3000`

## 📚 API Endpoints

### Authentication

- `POST /backend/api/auth/register` - Register a new user
- `POST /backend/api/auth/login` - Login user

### Posts

- `POST /backend/api/posts/add` - Create a new post (with image upload)
- `GET /backend/api/posts/getAllPost` - Get all posts
- `GET /backend/api/posts/getPost/:id` - Get specific post by ID
- `GET /backend/api/posts/getPostByUser/:id` - Get posts by user ID
- `PUT /backend/api/posts/update/:id` - Update a post
- `DELETE /backend/api/posts/delete/:id` - Delete a post
- `PUT /backend/api/posts/like/:id` - Like/Unlike a post

### Comments

- `POST /backend/api/posts/comment/add` - Add comment to post
- `GET /backend/api/posts/comment/getComments/:postId` - Get post comments
- `DELETE /backend/api/posts/comment/delete/:id` - Delete a comment

### Users

- `GET /backend/api/users/getAllUsers` - Get all users
- `GET /backend/api/users/getUser/:id` - Get user profile
- `PUT /backend/api/users/update/:id` - Update user profile
- `PUT /backend/api/users/follow/:id` - Follow a user
- `PUT /backend/api/users/unfollow/:id` - Unfollow a user

## 🔐 Security Features

- **Password Hashing**: Bcrypt for secure password storage
- **Input Validation**: Comprehensive form validation with duplicate email/mobile detection
- **CORS Protection**: Configured CORS to prevent unauthorized requests
- **Security Headers**: Helmet.js for HTTP security headers
- **Database Security**: MongoDB connection with authentication ready
- **File Upload Safety**: Multer configured with size and format restrictions

## 📝 Usage Examples

### Create a Post

1. Click the "Create" button in the navbar
2. Write a caption (up to 500 characters)
3. Optionally add an image (JPG, PNG, GIF, max 5MB)
4. Click "Post"

### Like a Post

- Click the heart icon on any post to like/unlike

### Leave a Comment

- Click the comment section and type your message
- Press Enter to submit your comment

### Discover Users

- Check the "Suggested Users" section on the right sidebar
- Click a user's profile picture to view their posts
- Click the follow/unfollow button to manage your network

### View Your Profile

- Click "Profile" in the navbar
- See your posts and follower/following statistics

## 🐛 Troubleshooting

### MongoDB Connection Error

**Error**: `MongoDB connection error: connect ECONNREFUSED`

**Solution**:

- Start MongoDB service: `brew services start mongodb-community`
- Or use Docker: `docker run -d -p 27017:27017 --name mongodb mongo:latest`
- Update `MONGOOSE_URL` in `.env` if using a remote database

### Port Already in Use

**Port 8200 (Backend)**:

```bash
lsof -i :8200
kill -9 <PID>
```

**Port 3000 (Frontend)**:

```bash
lsof -i :3000
kill -9 <PID>
```

### Image Not Loading

- Verify backend is running on port 8200
- Check `.env.local` has correct `NEXT_PUBLIC_IMAGE_URL`
- Ensure image file exists in `backend/uploads/`
- Clear browser cache if needed

### CORS Errors

- Backend already has CORS configured for `http://localhost:3000`
- If using a different port, update the CORS origin in `backend/index.js`

### Form Validation Errors

- **Username**: minimum 3 characters
- **Email**: must be in valid format (user@example.com)
- **Mobile**: must be exactly 10 digits
- **Password**: minimum 6 characters, must match confirmation

## 🎯 Getting Started

1. Clone the repository
2. Follow the Backend Setup instructions
3. Follow the Frontend Setup instructions
4. Navigate to `http://localhost:3000` in your browser
5. Create an account or login
6. Start sharing posts and connecting with others!

## 🚧 Future Enhancements

- [ ] Edit post functionality
- [ ] User search feature
- [ ] Real-time notifications
- [ ] Direct messaging
- [ ] Story feature
- [ ] Dark mode theme
- [ ] User profiles with bio
- [ ] Video uploads
- [ ] Admin dashboard
- [ ] Deploy to production (Vercel + Heroku)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👨‍💻 Author

Created with ❤️ by Syftet

---

## 📞 Support

If you encounter any issues or have questions, please refer to [QUICK_START.md](./QUICK_START.md) for troubleshooting or open an issue on the repository.

## 🎉 Acknowledgments

- Next.js for the amazing React framework
- Express.js for the robust backend framework
- MongoDB for flexible data storage
- Tailwind CSS for beautiful styling
- All open-source contributors

---

**Happy Coding! 🚀** Feel free to star ⭐ if you find this project useful!
