/*
  # MindTrack AI Database Schema
  
  1. New Tables
    - `students`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text, unique)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `student_entries`
      - `id` (uuid, primary key)
      - `student_id` (uuid, foreign key)
      - `gpa` (numeric)
      - `attendance_percentage` (numeric)
      - `assignment_completion` (numeric)
      - `study_hours` (numeric)
      - `sleep_hours` (numeric)
      - `screen_time` (numeric)
      - `physical_activity` (numeric)
      - `stress_level` (numeric)
      - `mood` (text)
      - `social_interaction` (numeric)
      - `exam_pressure` (numeric)
      - `mental_health_score` (numeric)
      - `mental_health_classification` (text)
      - `confidence_score` (numeric)
      - `created_at` (timestamp)
    
    - `recommendations`
      - `id` (uuid, primary key)
      - `entry_id` (uuid, foreign key)
      - `category` (text)
      - `recommendation` (text)
      - `priority` (text)
      - `created_at` (timestamp)
    
    - `chat_history`
      - `id` (uuid, primary key)
      - `student_id` (uuid, foreign key)
      - `message` (text)
      - `response` (text)
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated access
*/

CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS student_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  gpa numeric NOT NULL,
  attendance_percentage numeric NOT NULL,
  assignment_completion numeric NOT NULL,
  study_hours numeric NOT NULL,
  sleep_hours numeric NOT NULL,
  screen_time numeric NOT NULL,
  physical_activity numeric NOT NULL,
  stress_level numeric NOT NULL,
  mood text NOT NULL,
  social_interaction numeric NOT NULL,
  exam_pressure numeric NOT NULL,
  mental_health_score numeric DEFAULT 0,
  mental_health_classification text DEFAULT 'Pending',
  confidence_score numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_id uuid REFERENCES student_entries(id) ON DELETE CASCADE,
  category text NOT NULL,
  recommendation text NOT NULL,
  priority text DEFAULT 'medium',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS chat_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  message text NOT NULL,
  response text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to students"
  ON students FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public insert to students"
  ON students FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow public update to students"
  ON students FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public read access to student_entries"
  ON student_entries FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public insert to student_entries"
  ON student_entries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow public read access to recommendations"
  ON recommendations FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public insert to recommendations"
  ON recommendations FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow public read access to chat_history"
  ON chat_history FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public insert to chat_history"
  ON chat_history FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_student_entries_student_id ON student_entries(student_id);
CREATE INDEX IF NOT EXISTS idx_student_entries_created_at ON student_entries(created_at);
CREATE INDEX IF NOT EXISTS idx_recommendations_entry_id ON recommendations(entry_id);
CREATE INDEX IF NOT EXISTS idx_chat_history_student_id ON chat_history(student_id);