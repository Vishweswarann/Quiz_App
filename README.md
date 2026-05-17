# Quiz App 🎯

A modern, interactive quiz application built with **React + Vite** frontend and **Express.js + MongoDB** backend. Take quizzes, track your progress, and improve your knowledge!

**Live Demo**: [https://quiz-app-d1t6.vercel.app](https://quiz-app-d1t6.vercel.app)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## Overview

**Quiz App** is a full-stack web application that allows users to:
- Take interactive quizzes on various topics
- Track quiz performance and scores
- User authentication and profile management
- Create and manage quiz collections
- View detailed analytics and progress

The application is deployed on **Vercel** for seamless cloud hosting with serverless backend functions.

---

## Features

### Frontend
✅ **Modern React UI**
- Built with React 19.2.4
- Fast builds with Vite
- React Router for smooth navigation
- Responsive design

✅ **Quiz Functionality**
- Interactive quiz interface
- Real-time score calculation
- Progress tracking
- Question shuffling
- Answer validation

✅ **User Experience**
- Clean, intuitive interface
- Fast performance
- Mobile-friendly design
- Smooth animations

### Backend
✅ **User Management**
- User authentication with JWT
- Secure password hashing (bcryptjs)
- User registration and login
- Profile management

✅ **Quiz Operations**
- Create and manage quizzes
- Store quiz questions and answers
- Track user responses
- Calculate scores and statistics

✅ **Data Persistence**
- MongoDB database
- Mongoose ODM for data modeling
- CORS enabled for cross-origin requests

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19.2.4 | UI library |
| React DOM | 19.2.4 | React rendering |
| React Router | 7.14.0 | Client-side routing |
| Vite | 8.0.1 | Build tool & dev server |
| ESLint | 9.39.4 | Code quality |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Express.js | 5.2.1 | Web framework |
| MongoDB | 7.2.0 | Database |
| Mongoose | 9.6.1 | ODM library |
| JWT | 9.0.3 | Authentication |
| bcryptjs | 3.0.3 | Password hashing |
| CORS | 2.8.6 | Cross-origin requests |

### Deployment
- **Vercel**: Frontend hosting & serverless backend

---

## Installation

### Prerequisites
- Node.js 16.0 or higher
- npm or yarn
- MongoDB (local or cloud Atlas)

### Frontend Setup

1. **Clone the repository**
```bash
git clone https://github.com/Vishweswarann/Quiz_App.git
cd Quiz_App
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

4. **Build for production**
```bash
npm run build
```

5. **Preview production build**
```bash
npm run preview
```

### Backend Setup

1. **Navigate to API directory**
```bash
cd api
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env` file** in the `api` directory:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/quiz_db
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

4. **Start backend server**
```bash
node index.js
```

The API will run on `http://localhost:5000`

---

## Project Structure

```
Quiz_App/
├── src/                          # Frontend source code
│   ├── main.jsx                  # React entry point
│   ├── App.jsx                   # Main App component
│   ├── components/               # Reusable components
│   │   ├── Quiz.jsx
│   │   ├── QuestionCard.jsx
│   │   ├── ScoreDisplay.jsx
│   │   └── ...
│   ├── pages/                    # Page components
│   │   ├── Home.jsx
│   │   ├── QuizPage.jsx
│   │   ├── ResultsPage.jsx
│   │   └── ...
│   ├── hooks/                    # Custom React hooks
│   ├── utils/                    # Utility functions
│   ├── styles/                   # CSS/styling
│   └── App.css
│
├── api/                          # Backend server
│   ├── index.js                  # Express server entry
│   ├── routes/                   # API routes
│   │   ├── auth.js              # Authentication routes
│   │   ├── quiz.js              # Quiz routes
│   │   └── user.js              # User routes
│   ├── models/                   # Mongoose schemas
│   │   ├── User.js
│   │   ├── Quiz.js
│   │   └── UserProgress.js
│   ├── middleware/               # Express middleware
│   │   └── auth.js              # JWT verification
│   ├── controllers/              # Route controllers
│   └── .env                      # Environment variables
│
├── public/                       # Static assets
├── index.html                    # HTML template
├── package.json                  # Frontend dependencies
├── vite.config.js               # Vite configuration
├── vercel.json                  # Vercel deployment config
├── eslint.config.js             # ESLint rules
└── .gitignore
```

---

## Getting Started

### 1. Create a Quiz
```javascript
// POST /api/quizzes
{
  "title": "JavaScript Basics",
  "description": "Test your JavaScript knowledge",
  "questions": [
    {
      "text": "What is JavaScript?",
      "options": ["Language", "Framework", "Library"],
      "correctAnswer": 0
    }
  ]
}
```

### 2. Take a Quiz
Navigate to the quiz page and answer all questions.

### 3. View Results
See your score, correct answers, and detailed feedback.

### 4. Track Progress
Check your profile to see all completed quizzes and statistics.

---

## API Documentation

### Authentication Endpoints

#### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "user123",
  "email": "user@example.com",
  "password": "securepassword"
}

Response: { token, user }
```

#### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}

Response: { token, user }
```

### Quiz Endpoints

#### Get All Quizzes
```bash
GET /api/quizzes
Authorization: Bearer <token>

Response: [{ id, title, description, questionCount }]
```

#### Get Single Quiz
```bash
GET /api/quizzes/:id
Authorization: Bearer <token>

Response: { id, title, questions: [...] }
```

#### Create Quiz
```bash
POST /api/quizzes
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Quiz Title",
  "description": "Quiz Description",
  "questions": [...]
}

Response: { id, title, ... }
```

#### Submit Quiz Answers
```bash
POST /api/quizzes/:id/submit
Authorization: Bearer <token>
Content-Type: application/json

{
  "answers": [0, 1, 2, ...] // Answer indices for each question
}

Response: { score, totalQuestions, percentage, feedback }
```

### User Endpoints

#### Get User Profile
```bash
GET /api/users/profile
Authorization: Bearer <token>

Response: { username, email, quizzesCompleted, totalScore }
```

#### Get User Progress
```bash
GET /api/users/progress
Authorization: Bearer <token>

Response: [{ quizId, score, completedAt, ... }]
```

---

## Configuration

### Environment Variables

**Frontend** (`.env` in root):
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Quiz App
```

**Backend** (`api/.env`):
```env
# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/quiz_db

# Authentication
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=development

# CORS
ALLOWED_ORIGINS=http://localhost:5173,https://quiz-app-d1t6.vercel.app
```

### Vite Configuration
The app is configured with:
- React plugin for JSX support
- Fast HMR (Hot Module Replacement)
- Optimized build output

### ESLint Configuration
Code quality rules are enforced using:
- `@eslint/js`
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`

Run linting:
```bash
npm run lint
```

---

## Deployment

### Deploy to Vercel

1. **Push to GitHub**
```bash
git push origin main
```

2. **Connect to Vercel**
- Go to [vercel.com](https://vercel.com)
- Import the Quiz_App repository
- Configure environment variables
- Deploy

3. **Configure Backend**
- Backend routes are serverless functions in the `/api` directory
- Vercel automatically deploys them as serverless functions
- API calls route through `/api/*` endpoints

### Environment Setup on Vercel
Add these environment variables in Vercel dashboard:
```
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
```

### Vercel Configuration
The `vercel.json` file handles:
- API rewrites for backend routes
- Frontend asset serving
- Serverless function deployment

---

## Scripts

### Frontend Scripts
```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

### Backend Scripts (in api/ directory)
```bash
npm test          # Run tests (currently undefined)
node index.js     # Start the server
```

---

## Key Features Explained

### Quiz Taking Flow
1. User selects a quiz from the list
2. Questions are displayed one by one (or all on one page)
3. User selects answers
4. Quiz is submitted for grading
5. Results are displayed with score and feedback

### User Authentication
- JWT-based authentication
- Password hashing with bcryptjs
- Protected API routes require valid token
- Sessions persist across page reloads

### Progress Tracking
- All quiz attempts are recorded
- User can view history of completed quizzes
- Statistics show overall performance
- Detailed feedback on each attempt

---

## Performance Optimizations

- ✅ Vite for ultra-fast builds
- ✅ React Router for efficient routing
- ✅ Code splitting for faster initial load
- ✅ MongoDB indexing for quick queries
- ✅ JWT token caching on client
- ✅ CORS properly configured

---

## Troubleshooting

### Issue: "Cannot connect to MongoDB"
**Solution**: Verify MongoDB connection string in `.env` and ensure MongoDB is running

### Issue: "CORS errors when calling API"
**Solution**: Ensure API URL is correctly set in environment variables and backend CORS is configured

### Issue: "Token expired"
**Solution**: User needs to login again. Implement refresh token logic for better UX

### Issue: "Build fails"
**Solution**: 
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Testing

Currently, no tests are configured. To add tests:

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom

# Update package.json scripts
"test": "vitest"
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Follow ESLint rules
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused

---

## Future Enhancements 🚀

- [ ] Real-time quiz collaboration
- [ ] Quiz difficulty levels
- [ ] Category-based quizzes
- [ ] Leaderboards
- [ ] Quiz timer feature
- [ ] Export results as PDF
- [ ] Dark mode
- [ ] Mobile app with React Native
- [ ] Question bank management
- [ ] Analytics dashboard
- [ ] Email notifications
- [ ] Social sharing features

---

## License

This project is open source and available under the ISC License.

---

## Support & Contact

For issues, questions, or suggestions:
- Open an issue on [GitHub](https://github.com/Vishweswarann/Quiz_App)
- Check existing issues for solutions
- Review the documentation

---

## Author

**Vishweswarann** - [GitHub Profile](https://github.com/Vishweswarann)

---

## Acknowledgments

- React and Vite communities for excellent tools
- MongoDB for reliable database solutions
- Vercel for seamless deployment

---

**Last Updated**: May 2026  
**Status**: Active Development

```javascript
// Made with ❤️ by Vishweswarann
```
