# Quick Start Guide

## Prerequisites

- Node.js v16+ and npm
- MongoDB running locally (or update .env with remote connection string)
- Git (optional)

---

## 🚀 Getting Started

### Step 1: Start MongoDB

```bash
# On macOS with Homebrew
brew services start mongodb-community

# Or if you have Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Step 2: Start Backend Server

```bash
cd backend

# Install dependencies (if not already done)
npm install

# Start development server with auto-reload
npm run dev

# Server will run on http://localhost:8200
```

**Expected output:**

```
app is running on 8200
MongoDB database connected
```

### Step 3: Start Frontend (New Terminal)

```bash
cd magic-media

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev

# Open browser and navigate to http://localhost:3000
```

**Expected output:**

```
▲ Next.js 15.5.6
- Local: http://localhost:3000
```

---

## 📝 How to Test the App

### 1. Register a New Account

- Navigate to http://localhost:3000
- Click "Register" button
- Fill in all required fields:
  - Username (min 3 characters)
  - Email (valid format)
  - Mobile (10 digits)
  - Password (min 6 characters)
  - Confirm password
  - Gender
- Click "Register"

### 2. Login

- Enter your email and password
- Click "Login"

### 3. Create a Post

- Click "Create" in navbar
- Write a caption (up to 500 characters)
- Optionally add an image (JPG, PNG, GIF, max 5MB)
- Click "Post"

### 4. Interact with Posts

- **Like**: Click the heart icon on any post
- **Comment**: Click the comment icon, type your comment, press Enter
- **Delete**: Click trash icon on your own post or comment

### 5. Discover Users

- See suggested users on the right sidebar
- Click profile picture to view their posts
- Click follow/unfollow button

### 6. View Your Profile

- Click "Profile" in navbar
- See your posts and follower/following stats

---

## 🐛 Troubleshooting

### MongoDB Connection Error

**Error:** `MongoDB connection error: connect ECONNREFUSED`
**Solution:** Start MongoDB service or update MONGOOSE_URL in .env

### Port Already in Use

**Port 8200 (Backend):**

```bash
lsof -i :8200
kill -9 <PID>
```

**Port 3000 (Frontend):**

```bash
lsof -i :3000
kill -9 <PID>
```

### Image Not Loading

- Verify backend is running on port 8200
- Check .env.local has correct NEXT_PUBLIC_IMAGE_URL
- Ensure image file exists in backend/uploads/

### CORS Errors

- Backend already has CORS configured for http://localhost:3000
- If using different port, update index.js CORS origin

### Form Validation Errors

- Username: min 3 characters
- Email: must be valid format (user@example.com)
- Mobile: must be 10 digits
- Password: min 6 characters, must match confirmation

---

## 📚 Project Structure Overview

```
fullstack-social-app/
├── backend/                 # Express.js API
│   ├── .env                # Database configuration
│   ├── index.js            # Main server file
│   ├── models/             # MongoDB schemas
│   ├── routers/            # API endpoints
│   ├── middleware/         # File upload config
│   └── uploads/            # Uploaded images
│
└── magic-media/            # Next.js Frontend
    ├── .env.local          # API configuration
    ├── lib/api.js          # API client with all endpoints
    ├── app/                # Next.js pages
    ├── components/         # React components
    │   ├── auth/          # Login/Register
    │   ├── posts/         # Post related
    │   ├── users/         # User discovery
    │   ├── profile/       # User profile
    │   └── layout/        # Navigation
    └── public/            # Static assets
```

---

## 🔑 Key Features Fixed

✅ **Authentication**

- Proper input validation
- Duplicate email/mobile detection
- Password confirmation
- Secure password hashing

✅ **Posts**

- Create with images
- Like/Unlike
- Comments with timestamps
- Delete functionality
- Sorted by newest first

✅ **Users**

- Follow/Unfollow
- User discovery
- Profile viewing
- Follower counts

✅ **Error Handling**

- Form validation
- API error messages
- Loading states
- Empty states

---

## 📞 API Documentation

All API endpoints are documented in `BUG_FIXES_SUMMARY.md`

Base URL: `http://localhost:8200/backend/api`

### Example Requests:

**Register:**

```bash
curl -X POST http://localhost:8200/backend/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john",
    "emailId": "john@example.com",
    "mobile": "9876543210",
    "password": "password123",
    "gender": "male"
  }'
```

**Login:**

```bash
curl -X POST http://localhost:8200/backend/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "emailId": "john@example.com",
    "password": "password123"
  }'
```

**Create Post:**

```bash
curl -X POST http://localhost:8200/backend/api/posts/add \
  -F "userId=<userID>" \
  -F "username=john" \
  -F "description=Hello World" \
  -F "imageUrl=@/path/to/image.jpg"
```

---

## 🎯 Next Steps (Optional Enhancements)

- [ ] Add edit post functionality
- [ ] Add user search
- [ ] Add real-time notifications
- [ ] Add dark mode
- [ ] Add user profiles with bio
- [ ] Add story feature
- [ ] Add direct messaging
- [ ] Deploy to production (Vercel + Heroku)

---

## 💾 Environment Variables Reference

### Backend (.env)

```
MONGOOSE_URL=mongodb://localhost:27017/magic-media
PORT=8200
NODE_ENV=development
```

### Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:8200/backend/api
NEXT_PUBLIC_IMAGE_URL=http://localhost:8200/uploads
```

---

**All bugs are fixed and all APIs are fully integrated! 🎉**

Happy coding! If you encounter any issues, refer to the BUG_FIXES_SUMMARY.md file for detailed information.
