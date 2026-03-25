# MindTrack AI - Student Performance & Mental Health Intelligence System

A production-ready full-stack AI application that uses real machine learning to predict mental health risks and provide personalized recommendations for students.

## Features

### Core Functionality
- **Real ML-Powered Mental Health Prediction**: Uses TensorFlow.js with a neural network model to classify mental health status (Healthy, Moderate Stress, High Risk)
- **Student Data Dashboard**: Beautiful card-based UI for collecting academic, lifestyle, and behavioral data
- **Advanced Analytics**: Interactive charts showing performance trends, sleep vs productivity, and stress analysis
- **AI Chatbot Mentor**: Context-aware chatbot providing personalized advice based on student data
- **Recommendation Engine**: Generates personalized study plans, sleep tips, wellness suggestions, and digital detox strategies
- **PDF Report Generator**: Creates downloadable reports with comprehensive analysis
- **Early Warning System**: Predicts burnout risk and displays alerts when risk threshold is exceeded
- **Gamification**: Tracks productivity score, healthy mind score, and wellness streaks
- **Multi-language Support**: English and Hindi language options
- **AI Insight Cards**: Shows relationships between sleep, stress, performance, and screen time

### Technology Stack
- **Frontend**: React.js with TypeScript, Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **ML/AI**: TensorFlow.js with neural network architecture
- **Charts**: Chart.js with React Chart.js 2
- **PDF Generation**: jsPDF with autoTable
- **Animations**: Framer Motion
- **UI Theme**: Dark futuristic design with glassmorphism effects

## Data Collection

The application collects:
- **Academic Data**: GPA, attendance percentage, assignment completion rate
- **Lifestyle Data**: Study hours, sleep hours, screen time, physical activity, social interaction
- **Mental Health Indicators**: Stress level, mood (happy/sad/anxious/neutral), exam pressure

## Machine Learning Model

The application uses a real neural network model (not rule-based) with the following architecture:
- Input layer: 11 features (normalized student data)
- Hidden layers: 32 → 16 → 8 neurons with ReLU activation and dropout
- Output layer: 3 neurons with softmax activation (Healthy, Moderate Stress, High Risk)
- Trained on synthetic data using categorical cross-entropy loss
- Provides confidence scores and feature importance analysis

## Key Features Explained

### Mental Health Prediction
- Uses all 11 input features to predict mental health classification
- Provides confidence score (percentage)
- Identifies top 5 contributing factors with importance weights
- Calculates mental health score (0-100)

### Analytics Dashboard
- Performance trend line chart (mental health score vs academic performance)
- Sleep vs productivity bar chart
- Stress vs performance doughnut chart
- Animated visualizations with hover effects

### AI Chatbot
- Context-aware responses based on current student data
- Provides advice for: sleep, stress, study habits, motivation, time management, social interaction, exams, screen time, exercise
- Conversational interface with typing indicators
- Floating button with smooth animations

### Recommendations
- Dynamically generated based on data analysis
- Categories: Sleep Improvement, Stress Management, Study Plan, Digital Detox, Physical Wellness, Social Connection, Academic Support, Exam Preparation
- Priority levels: High, Medium, Low
- Actionable tips with evidence-based suggestions

### Gamification
- **Productivity Score**: Calculated from GPA, attendance, assignments, and study hours (0-100)
- **Healthy Mind Score**: Mental health score from ML model (0-100)
- **Wellness Streak**: Based on meeting healthy lifestyle criteria (days count)

### Early Warning System
- Monitors for burnout risk based on multiple factors
- Shows warning when risk score ≥ 40%
- Lists identified warning signs
- Provides immediate action items

### PDF Report
- Comprehensive mental health and performance report
- Includes: student summary, mental health assessment, academic/lifestyle data, contributing factors, key issues, personalized recommendations
- Professional formatting with color-coded risk levels
- Disclaimer about professional medical advice

## Design

The application features a **dark futuristic theme** with:
- Black background with neon blue and purple gradients
- Glassmorphism cards (transparent backgrounds with backdrop blur)
- Smooth animations and transitions
- Hover effects on interactive elements
- Animated starfield background
- Fully responsive design (mobile-first)
- Custom scrollbars with gradient styling

## Database Schema

### Tables
- **students**: Stores student profiles
- **student_entries**: Stores each data submission with ML predictions
- **recommendations**: Stores generated recommendations for each entry
- **chat_history**: Stores chatbot conversation history

All tables have Row Level Security (RLS) enabled with appropriate policies.

## Usage

1. **Input Data**: Fill out the card-based form with your academic, lifestyle, and mental health data
2. **Analyze**: Click "Analyze My Data" to run ML prediction
3. **View Dashboard**: Automatically redirected to analytics dashboard showing:
   - Early warning alerts (if applicable)
   - Gamification scores
   - AI insight cards
   - Mental health score and classification
   - Interactive charts
   - Personalized recommendations
4. **Chat**: Use the floating chatbot button to ask questions and get advice
5. **Download Report**: Click "Download Report" to generate a PDF
6. **Language Toggle**: Switch between English and Hindi using the globe button

## Sample Data Scenarios

### Healthy Student
- GPA: 3.5+, Attendance: 90%+, Sleep: 7-9 hours, Stress: <5, Good activity levels
- Result: "Healthy" classification with 80%+ confidence

### Moderate Stress
- GPA: 2.8-3.2, Attendance: 75-85%, Sleep: 6-7 hours, Stress: 5-7, Some activity
- Result: "Moderate Stress" classification with recommendations for improvement

### High Risk
- GPA: <2.5, Attendance: <70%, Sleep: <6 hours, Stress: 8+, Low activity, High screen time
- Result: "High Risk" classification with urgent care recommendations and early warning alert

## Important Notes

- This application is for **informational and educational purposes only**
- It is **NOT a substitute for professional mental health care**
- If experiencing severe mental health concerns, consult a qualified healthcare professional
- The ML model is trained on synthetic data and should be validated with real clinical data for production use

## Future Enhancements (Optional)

- User authentication with JWT
- Google/social login integration
- Report history tracking
- Real-time notifications
- Weekly progress tracking with historical data
- Export data to CSV
- Integration with wearable devices for activity/sleep tracking
- Multi-institution support with admin dashboard
- Peer comparison (anonymized)
- Integration with OpenAI API for enhanced chatbot responses

## License

Educational/Demo Project - Not for clinical use without proper validation
