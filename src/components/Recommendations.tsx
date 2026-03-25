import { Lightbulb, Target, AlertTriangle } from 'lucide-react';
import { RecommendationItem } from '../lib/recommendations';

interface RecommendationsProps {
  recommendations: RecommendationItem[];
  translations: any;
}

export function Recommendations({ recommendations, translations }: RecommendationsProps) {
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'medium':
        return <Target className="w-5 h-5 text-yellow-400" />;
      default:
        return <Lightbulb className="w-5 h-5 text-blue-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-500/50 bg-red-500/5';
      case 'medium':
        return 'border-yellow-500/50 bg-yellow-500/5';
      default:
        return 'border-blue-500/50 bg-blue-500/5';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
          {translations.recommendations}
        </h2>
        <p className="text-gray-400">Personalized AI-powered recommendations for your wellbeing</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className={`glass-card p-6 rounded-2xl border-2 ${getPriorityColor(rec.priority)} hover:scale-[1.02] transition-transform duration-300`}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className={`p-3 rounded-xl ${
                rec.priority === 'high' ? 'bg-red-500/20' :
                rec.priority === 'medium' ? 'bg-yellow-500/20' :
                'bg-blue-500/20'
              }`}>
                {getPriorityIcon(rec.priority)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${
                    rec.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                    rec.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-blue-500/20 text-blue-300'
                  }`}>
                    {rec.priority.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-500">{rec.category}</span>
                </div>
                <h3 className="text-xl font-semibold text-white">{rec.title}</h3>
              </div>
            </div>

            <ul className="space-y-3">
              {rec.recommendations.map((item, idx) => (
                <li key={idx} className="flex gap-3 text-gray-300">
                  <span className="text-blue-400 mt-1">•</span>
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
