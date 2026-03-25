import { Trophy, Heart, Flame, TrendingUp } from 'lucide-react';
import { StudentData, MentalHealthPrediction } from '../lib/types';

interface GamificationProps {
  data: StudentData;
  prediction: MentalHealthPrediction;
  translations: any;
}

export function Gamification({ data, prediction, translations }: GamificationProps) {
  const calculateProductivityScore = () => {
    const gpaScore = (data.gpa / 4) * 30;
    const attendanceScore = (data.attendance_percentage / 100) * 25;
    const assignmentScore = (data.assignment_completion / 100) * 25;
    const studyScore = Math.min((data.study_hours / 8) * 20, 20);
    return Math.round(gpaScore + attendanceScore + assignmentScore + studyScore);
  };

  const calculateHealthyMindScore = () => {
    return prediction.mentalHealthScore;
  };

  const calculateStreak = () => {
    const conditions = [
      data.sleep_hours >= 7 && data.sleep_hours <= 9,
      data.stress_level <= 6,
      data.physical_activity >= 5,
      data.study_hours >= 4,
      data.screen_time <= 8
    ];
    const metConditions = conditions.filter(Boolean).length;
    return Math.floor((metConditions / conditions.length) * 7);
  };

  const productivityScore = calculateProductivityScore();
  const healthyMindScore = calculateHealthyMindScore();
  const streak = calculateStreak();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="glass-card p-6 rounded-2xl border-2 border-blue-500/30 hover:border-blue-500/60 transition-colors">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-blue-500/20 rounded-xl">
            <Trophy className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <div className="text-sm text-gray-400">{translations.productivityScore}</div>
            <div className="text-3xl font-bold text-blue-400">{productivityScore}</div>
          </div>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-1000"
            style={{ width: `${productivityScore}%` }}
          />
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl border-2 border-purple-500/30 hover:border-purple-500/60 transition-colors">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-purple-500/20 rounded-xl">
            <Heart className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <div className="text-sm text-gray-400">{translations.healthyMindScore}</div>
            <div className="text-3xl font-bold text-purple-400">{healthyMindScore}</div>
          </div>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000"
            style={{ width: `${healthyMindScore}%` }}
          />
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl border-2 border-orange-500/30 hover:border-orange-500/60 transition-colors">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-orange-500/20 rounded-xl">
            <Flame className="w-6 h-6 text-orange-400" />
          </div>
          <div>
            <div className="text-sm text-gray-400">{translations.currentStreak}</div>
            <div className="text-3xl font-bold text-orange-400">
              {streak} <span className="text-lg">{translations.days}</span>
            </div>
          </div>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-1000"
            style={{ width: `${(streak / 7) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
