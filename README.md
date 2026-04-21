🧠 MindTrack AI
Student Performance & Mental Health Intelligence System

A production-ready full-stack AI application that leverages real machine learning to predict mental health risks and deliver personalized recommendations for students.

🚀 Features
🔹 Core Functionality

AI-Powered Mental Health Prediction
Utilizes TensorFlow.js neural network to classify mental health status (Healthy, Moderate Stress, High Risk)

Student Data Dashboard
Modern card-based UI to input academic, lifestyle, and behavioral data

Advanced Analytics
Interactive charts for performance trends, sleep vs productivity, and stress analysis

AI Chatbot Mentor
Context-aware chatbot providing personalized student guidance

Smart Recommendation Engine
Generates customized suggestions for:
Study planning
Sleep improvement
Stress management
Digital detox

PDF Report Generator
Download detailed analysis reports with insights and recommendations

Early Warning System
Detects burnout risk and alerts users proactively
Gamification System
Productivity Score
Healthy Mind Score
Wellness Streaks

Multi-language Support
English 🇬🇧 & Hindi 🇮🇳
AI Insight Cards

Displays relationships between sleep, stress, performance, and screen time

🛠️ Tech Stack
Frontend: React.js, TypeScript, Tailwind CSS
Backend/Database: Supabase (PostgreSQL)
Machine Learning: TensorFlow.js (Neural Network)
Charts: Chart.js + React Chart.js 2
PDF: jsPDF + autoTable
Animations: Framer Motion

📊 Data Collection

📘 Academic Data
GPA
Attendance
Assignment Completion

🌿 Lifestyle Data
Study Hours
Sleep Duration
Screen Time
Physical Activity
Social Interaction

🧠 Mental Health Indicators
Stress Level
Mood (Happy / Sad / Anxious / Neutral)
Exam Pressure

🤖 Machine Learning Model

A real neural network (not rule-based):

Input Layer: 11 features
Hidden Layers: 32 → 16 → 8 (ReLU + Dropout)
Output Layer: 3 neurons (Softmax)
Loss Function: Categorical Cross-Entropy

📌 Output
Mental Health Classification
Confidence Score (%)
Feature Importance
Mental Health Score (0–100)

📈 Key Modules
🔍 Mental Health Prediction
Classifies user into 3 categories
Shows confidence level
Highlights top contributing factors

📊 Analytics Dashboard
Performance Trend Graph
Sleep vs Productivity Chart
Stress vs Performance Analysis

💬 AI Chatbot
Personalized responses
Covers sleep, stress, study, motivation, etc.
Smooth conversational UI

🎯 Recommendation System
Categories include:
Sleep Improvement
Stress Management
Study Planning
Physical Wellness
Priority Levels: High / Medium / Low

🎮 Gamification
Productivity Score (0–100)
Healthy Mind Score (0–100)
Wellness Streak Tracking

⚠️ Early Warning System
Detects burnout risk
Shows alerts when risk ≥ 40%
Suggests immediate actions

📄 PDF Report
Full student analysis
Mental health summary
Recommendations
Professional formatting

🎨 UI & Design
🌑 Dark futuristic theme
💠 Glassmorphism UI
✨ Smooth animations & transitions
📱 Fully responsive design
🌌 Animated background
🗄️ Database Schema

Tables
students → User profiles
student_entries → Input data + ML results
recommendations → Generated suggestions
chat_history → Chatbot logs

✔️ Row Level Security (RLS) enabled

⚙️ How to Use
Enter student data in the dashboard
Click “Analyze My Data”
View insights on dashboard:
Mental health score
Charts & analytics
Recommendations
Use chatbot for guidance 💬
Download PDF report 📄
Switch language 🌐

📌 Sample Scenarios

🟢 Healthy
High GPA, good sleep, low stress
→ Stable performance

🟡 Moderate Stress
Average academics, medium stress
→ Needs improvement

🔴 High Risk
Low GPA, high stress, poor sleep
→ Immediate attention required

⚠️ Disclaimer
This project is for educational purposes only
Not a replacement for professional mental health care
Consult a professional for serious concerns

🔮 Future Enhancements
User authentication (JWT / OAuth)
Google login integration
Progress tracking & history
Wearable device integration
Mobile app version
Admin dashboard for institutions
AI-powered chatbot (OpenAI integration)

📄 License

Educational Project
Not intended for clinical or commercial use without validation









