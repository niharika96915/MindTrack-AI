import { StudentData, MentalHealthPrediction } from './types';

export interface RecommendationItem {
  category: string;
  title: string;
  recommendations: string[];
  priority: 'high' | 'medium' | 'low';
}

export function generateRecommendations(
  data: StudentData,
  prediction: MentalHealthPrediction
): RecommendationItem[] {
  const recommendations: RecommendationItem[] = [];

  if (data.sleep_hours < 7) {
    recommendations.push({
      category: 'Sleep Improvement',
      title: 'Optimize Your Sleep Schedule',
      recommendations: [
        'Aim for 7-9 hours of sleep each night',
        'Create a consistent bedtime routine',
        'Avoid screens 1 hour before bed',
        'Keep your bedroom cool and dark',
        'Try relaxation techniques like deep breathing'
      ],
      priority: 'high'
    });
  }

  if (data.stress_level > 7) {
    recommendations.push({
      category: 'Stress Management',
      title: 'Reduce Your Stress Levels',
      recommendations: [
        'Practice mindfulness meditation for 10 minutes daily',
        'Break large tasks into smaller, manageable steps',
        'Take regular breaks during study sessions (Pomodoro Technique)',
        'Engage in physical exercise to release endorphins',
        'Talk to a counselor or trusted friend about your concerns'
      ],
      priority: 'high'
    });
  }

  if (data.study_hours < 3) {
    recommendations.push({
      category: 'Study Plan',
      title: 'Enhance Your Study Routine',
      recommendations: [
        'Set specific study goals for each session',
        'Use active learning techniques (practice problems, teaching others)',
        'Create a dedicated study space free from distractions',
        'Schedule study time during your peak focus hours',
        'Review material regularly using spaced repetition'
      ],
      priority: 'medium'
    });
  }

  if (data.screen_time > 8) {
    recommendations.push({
      category: 'Digital Detox',
      title: 'Reduce Screen Time',
      recommendations: [
        'Set app time limits on your devices',
        'Use the 20-20-20 rule: Every 20 minutes, look 20 feet away for 20 seconds',
        'Replace some screen time with outdoor activities',
        'Turn off non-essential notifications',
        'Designate screen-free times during meals and before bed'
      ],
      priority: 'high'
    });
  }

  if (data.physical_activity < 4) {
    recommendations.push({
      category: 'Physical Wellness',
      title: 'Increase Physical Activity',
      recommendations: [
        'Aim for at least 30 minutes of moderate exercise daily',
        'Take walking breaks between study sessions',
        'Try yoga or stretching exercises',
        'Join a sports club or fitness group',
        'Use stairs instead of elevators when possible'
      ],
      priority: 'medium'
    });
  }

  if (data.social_interaction < 4) {
    recommendations.push({
      category: 'Social Connection',
      title: 'Improve Social Interactions',
      recommendations: [
        'Schedule regular time with friends and family',
        'Join study groups or clubs related to your interests',
        'Participate in campus or community events',
        'Reach out to classmates for collaborative projects',
        'Consider volunteering to meet new people with shared values'
      ],
      priority: 'medium'
    });
  }

  if (data.gpa < 2.5 || data.assignment_completion < 70) {
    recommendations.push({
      category: 'Academic Support',
      title: 'Boost Academic Performance',
      recommendations: [
        'Attend office hours to clarify difficult concepts',
        'Form study groups with classmates',
        'Use campus tutoring resources',
        'Create a weekly schedule with dedicated time for each subject',
        'Break down assignments into smaller tasks with deadlines'
      ],
      priority: 'high'
    });
  }

  if (data.exam_pressure > 7) {
    recommendations.push({
      category: 'Exam Preparation',
      title: 'Manage Exam Anxiety',
      recommendations: [
        'Start preparing well in advance to avoid cramming',
        'Practice with past exam papers or sample questions',
        'Use positive self-talk and visualization techniques',
        'Ensure adequate sleep before exam day',
        'Arrive early to reduce last-minute stress'
      ],
      priority: 'high'
    });
  }

  if (prediction.classification === 'High Risk') {
    recommendations.unshift({
      category: 'Urgent Care',
      title: 'Seek Professional Support',
      recommendations: [
        'Consider speaking with a mental health professional',
        'Contact your campus counseling center',
        'Talk to a trusted advisor or mentor about your challenges',
        'Explore stress management workshops offered by your institution',
        'Remember: seeking help is a sign of strength, not weakness'
      ],
      priority: 'high'
    });
  }

  return recommendations;
}

export function generateChatResponse(message: string, data: StudentData | null): string {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('sleep') || lowerMessage.includes('tired')) {
    if (data && data.sleep_hours < 7) {
      return "I noticed you're getting less than 7 hours of sleep. This can significantly impact your mental health and academic performance. Try establishing a consistent sleep schedule - go to bed and wake up at the same time daily. Avoid caffeine after 2 PM and create a relaxing bedtime routine. Quality sleep is one of the most powerful tools for reducing stress and improving focus.";
    }
    return "Good sleep is crucial for mental health and academic success! Aim for 7-9 hours nightly. Create a sleep-friendly environment: keep your room cool, dark, and quiet. Avoid screens an hour before bed as blue light disrupts melatonin production. Consider reading, gentle stretching, or meditation before sleep.";
  }

  if (lowerMessage.includes('stress') || lowerMessage.includes('anxious') || lowerMessage.includes('overwhelm')) {
    if (data && data.stress_level > 7) {
      return "Your stress levels are quite high, and I want to help. Try the 4-7-8 breathing technique: breathe in for 4 seconds, hold for 7, exhale for 8. Repeat 4 times. This activates your parasympathetic nervous system. Also, break your tasks into smaller chunks - accomplishing small goals releases dopamine and reduces overwhelm. Remember to take breaks!";
    }
    return "Stress is a normal part of student life, but managing it is key. Practice mindfulness - even 5 minutes of focused breathing can help. Physical exercise is a powerful stress reliever. Try the Pomodoro Technique: 25 minutes of focused work, 5-minute break. Don't hesitate to reach out to friends, family, or counselors when needed.";
  }

  if (lowerMessage.includes('study') || lowerMessage.includes('focus') || lowerMessage.includes('concentration')) {
    return "To boost focus and study effectiveness: 1) Use active recall - test yourself instead of just re-reading. 2) Practice spaced repetition - review material at increasing intervals. 3) Eliminate distractions - put phone in another room. 4) Study in 25-50 minute blocks with breaks. 5) Teach concepts to others - it solidifies understanding. 6) Stay hydrated and take short walks between sessions to refresh your mind.";
  }

  if (lowerMessage.includes('motivat') || lowerMessage.includes('give up') || lowerMessage.includes('quit')) {
    return "You've got this! Remember why you started. Every expert was once a beginner. Break big goals into tiny, achievable steps. Celebrate small wins - they build momentum. On tough days, do just one small task. Progress isn't linear - setbacks are part of growth. Connect with your 'future self' - visualize achieving your goals. You're stronger than you think, and this challenging period will pass!";
  }

  if (lowerMessage.includes('time') || lowerMessage.includes('manage') || lowerMessage.includes('schedule')) {
    return "Time management is a skill that improves with practice! Try these strategies: 1) Use time-blocking - assign specific time slots to tasks. 2) Prioritize with the Eisenhower Matrix (urgent vs important). 3) Plan tomorrow tonight - wake up with clarity. 4) Batch similar tasks together. 5) Learn to say 'no' to non-essential commitments. 6) Use tools like calendars and to-do lists. 7) Build in buffer time for unexpected issues.";
  }

  if (lowerMessage.includes('social') || lowerMessage.includes('friend') || lowerMessage.includes('lonely')) {
    if (data && data.social_interaction < 4) {
      return "I notice your social interaction has been limited. Human connection is vital for mental health! Start small: message one friend today, join one study group, or attend one campus event this week. Quality matters more than quantity. Even brief positive interactions boost mood and reduce stress. Remember, many students feel isolated - reaching out helps both of you!";
    }
    return "Social connections are essential for wellbeing! Join clubs aligned with your interests, participate in study groups, or volunteer. If you're introverted, that's okay - focus on deeper connections with a few people rather than many superficial ones. Regular video calls with family can help too. Building community takes time, so be patient with yourself.";
  }

  if (lowerMessage.includes('exam') || lowerMessage.includes('test') || lowerMessage.includes('grade')) {
    if (data && data.exam_pressure > 7) {
      return "Exam anxiety is real, but manageable! Start preparing early to avoid panic. Break study material into topics and create a realistic schedule. Practice with past papers under timed conditions. Before the exam: sleep well, eat a good breakfast, arrive early. During: read all instructions carefully, start with questions you know, manage your time. Remember: one exam doesn't define you!";
    }
    return "Exam preparation tips: 1) Start early - cramming increases anxiety and reduces retention. 2) Use active learning - practice problems, flashcards, teaching others. 3) Create a study schedule that covers all topics. 4) Take care of yourself - sleep, nutrition, exercise. 5) Practice exam techniques and timing. 6) Stay positive - you've prepared, trust yourself!";
  }

  if (lowerMessage.includes('screen') || lowerMessage.includes('phone') || lowerMessage.includes('social media')) {
    if (data && data.screen_time > 8) {
      return "Your screen time is quite high! Excessive screen use can disrupt sleep, increase anxiety, and reduce productivity. Try: 1) Set app time limits. 2) Keep phone out of bedroom. 3) Use website blockers during study time. 4) Replace some screen time with outdoor activities. 5) Practice the 20-20-20 rule for eye health. Start with small changes - even reducing by 30 minutes daily helps!";
    }
    return "Digital wellness is important! Set boundaries with technology: designate screen-free times (meals, before bed), turn off non-essential notifications, use grayscale mode to reduce appeal, and be intentional about social media use. Replace scrolling time with reading, exercise, or face-to-face interactions. Your brain will thank you!";
  }

  if (lowerMessage.includes('exercise') || lowerMessage.includes('physical') || lowerMessage.includes('activity')) {
    return "Physical activity is amazing for mental health! It releases endorphins, reduces stress hormones, improves sleep, and boosts focus. You don't need intense workouts - even a 15-minute walk helps! Try: walking to class, taking stairs, doing YouTube workout videos, joining intramural sports, or yoga. Find activities you enjoy so you'll stick with them. Movement is medicine!";
  }

  if (lowerMessage.includes('gpa') || lowerMessage.includes('grades') || lowerMessage.includes('performance')) {
    return "Academic performance reflects effort, not worth! To improve: attend all classes, review notes daily (not just before exams), ask questions, use office hours, join study groups, and start assignments early. Focus on understanding, not memorizing. If struggling, seek help immediately - tutoring, academic advisors, professors. Remember: growth mindset matters more than current grades!";
  }

  return "I'm here to support you! I can help with study strategies, stress management, sleep improvement, time management, motivation, and overall mental wellness. What specific area would you like to focus on? Remember, small changes lead to big improvements over time. You're doing great by seeking support!";
}
