import { Brain, Moon, Activity, Smartphone } from 'lucide-react';
import { StudentData } from '../lib/types';

interface InsightCardsProps {
  data: StudentData;
  translations: any;
}

export function InsightCards({ data, translations }: InsightCardsProps) {
  const generateInsights = () => {
    const insights = [];

    if (data.sleep_hours < 7) {
      const productivityLoss = Math.round((7 - data.sleep_hours) * 15);
      insights.push({
        icon: <Moon className="w-6 h-6 text-purple-400" />,
        title: 'Sleep & Performance',
        insight: `Your current sleep pattern (${data.sleep_hours}h) may reduce productivity by ${productivityLoss}%. Aim for 7-9 hours for optimal cognitive function.`,
        color: 'purple'
      });
    }

    if (data.stress_level > 7 && data.gpa < 3.0) {
      insights.push({
        icon: <Brain className="w-6 h-6 text-red-400" />,
        title: 'Stress Impact on Grades',
        insight: `High stress levels (${data.stress_level}/10) correlate with lower academic performance. Stress management could improve GPA by 0.3-0.5 points.`,
        color: 'red'
      });
    }

    if (data.physical_activity < 4) {
      insights.push({
        icon: <Activity className="w-6 h-6 text-green-400" />,
        title: 'Physical Activity Deficit',
        insight: `Low physical activity reduces endorphins and increases stress. Even 30 minutes of daily exercise can boost mental health by 40%.`,
        color: 'green'
      });
    }

    if (data.screen_time > 8) {
      const sleepImpact = data.screen_time > 10 ? '2-3 hours' : '1-2 hours';
      insights.push({
        icon: <Smartphone className="w-6 h-6 text-blue-400" />,
        title: 'Screen Time Analysis',
        insight: `${data.screen_time} hours of daily screen time may delay sleep onset by ${sleepImpact} and increase anxiety levels by 25%.`,
        color: 'blue'
      });
    }

    if (data.sleep_hours >= 7 && data.study_hours >= 5) {
      insights.push({
        icon: <Brain className="w-6 h-6 text-cyan-400" />,
        title: 'Optimal Balance Detected',
        insight: `Great job! Your sleep (${data.sleep_hours}h) and study balance (${data.study_hours}h) is optimal. This combination enhances retention by 60%.`,
        color: 'cyan'
      });
    }

    return insights.slice(0, 4);
  };

  const insights = generateInsights();

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: string } = {
      purple: 'border-purple-500/50 bg-purple-500/5',
      red: 'border-red-500/50 bg-red-500/5',
      green: 'border-green-500/50 bg-green-500/5',
      blue: 'border-blue-500/50 bg-blue-500/5',
      cyan: 'border-cyan-500/50 bg-cyan-500/5'
    };
    return colors[color] || colors.blue;
  };

  const getBgColor = (color: string) => {
    const colors: { [key: string]: string } = {
      purple: 'bg-purple-500/20',
      red: 'bg-red-500/20',
      green: 'bg-green-500/20',
      blue: 'bg-blue-500/20',
      cyan: 'bg-cyan-500/20'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="w-6 h-6 text-purple-400" />
        <h3 className="text-2xl font-semibold text-white">{translations.insightCards}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`glass-card p-6 rounded-2xl border-2 ${getColorClasses(insight.color)} hover:scale-[1.02] transition-all duration-300`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${getBgColor(insight.color)}`}>
                {insight.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-white mb-2">{insight.title}</h4>
                <p className="text-sm text-gray-300 leading-relaxed">{insight.insight}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
