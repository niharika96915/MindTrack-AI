import { useState } from 'react';
import { StudentData } from '../lib/types';
import { Brain, BookOpen, Heart, Activity } from 'lucide-react';

interface InputDashboardProps {
  onSubmit: (data: StudentData) => void;
  translations: any;
}

export function InputDashboard({ onSubmit, translations }: InputDashboardProps) {
  const [formData, setFormData] = useState<StudentData>({
    gpa: 3.5,
    attendance_percentage: 85,
    assignment_completion: 90,
    study_hours: 5,
    sleep_hours: 7,
    screen_time: 6,
    physical_activity: 5,
    stress_level: 5,
    mood: 'neutral',
    social_interaction: 5,
    exam_pressure: 5
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateField = (field: keyof StudentData, value: number | string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
          {translations.inputDashboard}
        </h2>
        <p className="text-gray-400">Enter your data for AI-powered mental health analysis</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="glass-card p-8 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <BookOpen className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white">{translations.academicData}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="input-card">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {translations.gpa}
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="4"
                value={formData.gpa}
                onChange={(e) => updateField('gpa', parseFloat(e.target.value))}
                className="input-field"
                required
              />
              <div className="mt-2 text-xs text-gray-500">Current: {formData.gpa.toFixed(2)}/4.0</div>
            </div>

            <div className="input-card">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {translations.attendance} (%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.attendance_percentage}
                onChange={(e) => updateField('attendance_percentage', parseInt(e.target.value))}
                className="slider"
              />
              <div className="mt-2 text-xs text-gray-500">{formData.attendance_percentage}%</div>
            </div>

            <div className="input-card">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {translations.assignments} (%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.assignment_completion}
                onChange={(e) => updateField('assignment_completion', parseInt(e.target.value))}
                className="slider"
              />
              <div className="mt-2 text-xs text-gray-500">{formData.assignment_completion}%</div>
            </div>

            <div className="input-card">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {translations.studyHours}
              </label>
              <input
                type="number"
                min="0"
                max="24"
                step="0.5"
                value={formData.study_hours}
                onChange={(e) => updateField('study_hours', parseFloat(e.target.value))}
                className="input-field"
                required
              />
              <div className="mt-2 text-xs text-gray-500">{formData.study_hours} hours</div>
            </div>
          </div>
        </div>

        <div className="glass-card p-8 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Activity className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white">{translations.lifestyleData}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="input-card">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {translations.sleepHours}
              </label>
              <input
                type="number"
                min="0"
                max="24"
                step="0.5"
                value={formData.sleep_hours}
                onChange={(e) => updateField('sleep_hours', parseFloat(e.target.value))}
                className="input-field"
                required
              />
              <div className="mt-2 text-xs text-gray-500">{formData.sleep_hours} hours</div>
            </div>

            <div className="input-card">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {translations.screenTime}
              </label>
              <input
                type="number"
                min="0"
                max="24"
                step="0.5"
                value={formData.screen_time}
                onChange={(e) => updateField('screen_time', parseFloat(e.target.value))}
                className="input-field"
                required
              />
              <div className="mt-2 text-xs text-gray-500">{formData.screen_time} hours</div>
            </div>

            <div className="input-card">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {translations.physicalActivity}
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={formData.physical_activity}
                onChange={(e) => updateField('physical_activity', parseInt(e.target.value))}
                className="slider"
              />
              <div className="mt-2 text-xs text-gray-500">{formData.physical_activity}/10</div>
            </div>

            <div className="input-card">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {translations.socialInteraction}
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={formData.social_interaction}
                onChange={(e) => updateField('social_interaction', parseInt(e.target.value))}
                className="slider"
              />
              <div className="mt-2 text-xs text-gray-500">{formData.social_interaction}/10</div>
            </div>
          </div>
        </div>

        <div className="glass-card p-8 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-pink-500/20 rounded-xl">
              <Heart className="w-6 h-6 text-pink-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white">{translations.mentalHealthData}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="input-card">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {translations.stressLevel}
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={formData.stress_level}
                onChange={(e) => updateField('stress_level', parseInt(e.target.value))}
                className="slider"
              />
              <div className="mt-2 text-xs text-gray-500">{formData.stress_level}/10</div>
            </div>

            <div className="input-card">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {translations.examPressure}
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={formData.exam_pressure}
                onChange={(e) => updateField('exam_pressure', parseInt(e.target.value))}
                className="slider"
              />
              <div className="mt-2 text-xs text-gray-500">{formData.exam_pressure}/10</div>
            </div>

            <div className="input-card md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                {translations.mood}
              </label>
              <div className="grid grid-cols-4 gap-3">
                {['happy', 'neutral', 'sad', 'anxious'].map((mood) => (
                  <button
                    key={mood}
                    type="button"
                    onClick={() => updateField('mood', mood)}
                    className={`mood-button ${formData.mood === mood ? 'active' : ''}`}
                  >
                    {translations[`mood${mood.charAt(0).toUpperCase() + mood.slice(1)}`] || mood}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="btn-primary px-12 py-4 text-lg font-semibold rounded-xl flex items-center gap-3 group"
          >
            <Brain className="w-6 h-6 group-hover:animate-pulse" />
            {translations.analyzeData}
          </button>
        </div>
      </form>
    </div>
  );
}
