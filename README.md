# 🧾 SkillSwap - Peer-to-Peer Microlearning Platform
SkillSwap is a revolutionary web application that enables users to **exchange skills instead of money**. 
It's a peer-to-peer microlearning platform where knowledge becomes currency, making education accessible to everyone.

**Example**: You teach me Canva basics, I teach you Excel tricks. No money involved, just pure skill exchange!

## 🎯 **Why SkillSwap is Unique**

- **Not just another course platform** - We focus on direct peer-to-peer learning
- **Practical & Personal** - Short, casual sessions between real people
- **Accessible Education** - Perfect for students who want to upskill but can't afford paid classes
- **Community Driven** - Built on the principle that everyone has something valuable to teach

## 💼 **Real-World Use Cases**

### 🎓 **For Students**
- A CS student good at DSA teaches algorithms in exchange for Web Development help
- Art student teaches digital illustration for programming fundamentals
- Language student offers English conversation practice for math tutoring

### 🏢 **Professional Development**
- Junior developer teaches Git basics for advanced JavaScript concepts
- Designer offers Figma training for SEO knowledge
- Marketing professional shares social media strategies for data analysis skills

### 🌟 **Community Learning**
- Perfect for colleges, coding bootcamps, and study groups
- Ideal for remote teams wanting to cross-train
- Great for friend circles looking to learn together

## 🛠️ **Core Features**

### 👤 **Comprehensive User Profiles**
- **Personal Information Management** - Major, location, website, and bio
- **Skills Portfolio** - "Skills I Have" & "Skills I Want to Learn" sections
- **Activity Dashboard** - Track courses enrolled, study groups joined, and resources shared
- **Profile Customization** - Easy edit functionality for keeping information current

### 🎓 **Study Groups & Communities**
- **Collaborative Learning Spaces** - Join groups like "React Mastery Group" and "Data Science Study Circle"
- **Group Categories** - Active Groups, Joined Groups, Online Groups, and In-Person Groups
- **Skill-Level Matching** - Groups tagged with difficulty levels (Intermediate, Advanced, etc.)
- **Community Leaders** - Groups led by experienced members and instructors

### 📊 **Activity Tracking & Stats**
- **Engagement Metrics** - Visual stats for courses enrolled (12), study groups (8), and resources shared (24)
- **Progress Monitoring** - Track your learning journey and contributions
- **Achievement System** - Build reputation through active participation

### 🔍 **Smart Discovery System**
- **Group Search & Filtering** - Find study groups with advanced search and filter options
- **Skill-Based Recommendations** - Discover relevant learning opportunities
- **Real-time Updates** - "Showing 5 of 5 study groups" with live data

### 🌐 **Seamless Navigation**
- **Multi-Page Architecture** - Dashboard, Sessions, Study Groups, and Profile sections
- **Responsive Design** - Clean, professional interface that works on all devices
- **Intuitive User Experience** - Easy-to-use navigation and clear visual hierarchy

## 🚀 **Tech Stack**

### **Frontend**
- **React** - Modern, component-based UI development
- **TailwindCSS** - Utility-first CSS framework for rapid styling
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

### **Backend**
- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Fast, unopinionated web framework
- **Socket.io** - Real-time communication for chat
- **Nodemailer** - Email notifications

### **Database & Authentication**
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - Elegant MongoDB object modeling
- **JWT** - Secure authentication tokens
- **bcrypt** - Password hashing

### **Deployment & Tools**
- **Vercel** - Frontend deployment and hosting
- **MongoDB Atlas** - Cloud database hosting

## 📦 **Installation & Setup**

### **Prerequisites**
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

### **Clone the Repository**
```bash
git clone https://github.com/yourusername/skillswap-platform.git
cd skillswap-platform
```

### **Backend Setup**
```bash
cd backend
npm install
```

Create `.env` file:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

Start backend server:
```bash
npm run dev
```

### **Frontend Setup**
```bash
cd frontend
npm install
npm start
```

## 🌐 **API Endpoints**

### **Authentication**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### **Skills & Matching**
- `GET /api/skills` - Get all available skills
- `POST /api/users/skills` - Update user skills
- `GET /api/matches` - Get skill matches for user

### **Sessions**
- `POST /api/sessions/request` - Request a learning session
- `GET /api/sessions` - Get user's sessions
- `PUT /api/sessions/:id/accept` - Accept session request
- `POST /api/sessions/:id/rate` - Rate completed session






