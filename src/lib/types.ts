export interface StudentData {
  gpa: number;
  attendance_percentage: number;
  assignment_completion: number;
  study_hours: number;
  sleep_hours: number;
  screen_time: number;
  physical_activity: number;
  stress_level: number;
  mood: 'happy' | 'sad' | 'anxious' | 'neutral';
  social_interaction: number;
  exam_pressure: number;
}

export interface MentalHealthPrediction {
  classification: 'Healthy' | 'Moderate Stress' | 'High Risk';
  confidence: number;
  contributingFactors: Array<{ factor: string; importance: number }>;
  mentalHealthScore: number;
}

export interface StudentEntry extends StudentData {
  id: string;
  student_id: string;
  mental_health_score: number;
  mental_health_classification: string;
  confidence_score: number;
  created_at: string;
}

export interface Recommendation {
  id: string;
  entry_id: string;
  category: string;
  recommendation: string;
  priority: string;
  created_at: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}
