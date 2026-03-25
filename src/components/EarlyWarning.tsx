import { AlertTriangle, Activity } from 'lucide-react';
import { StudentData, MentalHealthPrediction } from '../lib/types';

interface EarlyWarningProps {
  data: StudentData;
  prediction: MentalHealthPrediction;
  translations: any;
}

export function EarlyWarning({ data, prediction, translations }: EarlyWarningProps) {
  const calculateBurnoutRisk = () => {
    let riskScore = 0;
    let warnings: string[] = [];

    if (data.sleep_hours < 6) {
      riskScore += 25;
      warnings.push('Severe sleep deprivation detected');
    }

    if (data.stress_level > 8) {
      riskScore += 25;
      warnings.push('Critical stress levels');
    }

    if (data.study_hours > 10) {
      riskScore += 15;
      warnings.push('Excessive study hours without breaks');
    }

    if (data.physical_activity < 2) {
      riskScore += 15;
      warnings.push('Minimal physical activity');
    }

    if (data.social_interaction < 3) {
      riskScore += 10;
      warnings.push('Social isolation detected');
    }

    if (data.exam_pressure > 8) {
      riskScore += 10;
      warnings.push('Extreme exam pressure');
    }

    if (prediction.classification === 'High Risk') {
      riskScore += 20;
      warnings.push('Mental health at high risk');
    }

    return { riskScore: Math.min(riskScore, 100), warnings };
  };

  const { riskScore, warnings } = calculateBurnoutRisk();
  const showWarning = riskScore >= 40;

  if (!showWarning) {
    return null;
  }

  return (
    <div className="mb-8 animate-pulse-slow">
      <div className={`glass-card p-6 rounded-2xl border-2 ${
        riskScore >= 70 ? 'border-red-500 bg-red-500/10' :
        riskScore >= 50 ? 'border-orange-500 bg-orange-500/10' :
        'border-yellow-500 bg-yellow-500/10'
      }`}>
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl ${
            riskScore >= 70 ? 'bg-red-500/20' :
            riskScore >= 50 ? 'bg-orange-500/20' :
            'bg-yellow-500/20'
          }`}>
            <AlertTriangle className={`w-6 h-6 ${
              riskScore >= 70 ? 'text-red-400' :
              riskScore >= 50 ? 'text-orange-400' :
              'text-yellow-400'
            }`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className={`text-xl font-bold ${
                riskScore >= 70 ? 'text-red-400' :
                riskScore >= 50 ? 'text-orange-400' :
                'text-yellow-400'
              }`}>
                {translations.earlyWarning}
              </h3>
              <span className={`text-sm font-semibold px-3 py-1 rounded ${
                riskScore >= 70 ? 'bg-red-500/30 text-red-200' :
                riskScore >= 50 ? 'bg-orange-500/30 text-orange-200' :
                'bg-yellow-500/30 text-yellow-200'
              }`}>
                Risk: {riskScore}%
              </span>
            </div>
            <p className="text-white font-semibold mb-4">{translations.burnoutRisk}</p>
            <p className="text-gray-300 mb-4">{translations.takeAction}</p>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-white">Identified Warning Signs:</p>
              <ul className="space-y-1">
                {warnings.map((warning, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-300">
                    <Activity className="w-4 h-4 text-red-400" />
                    {warning}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 p-4 bg-gray-800/50 rounded-xl">
              <p className="text-sm text-white font-semibold mb-2">Immediate Actions:</p>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• Schedule time to rest and recover</li>
                <li>• Consider talking to a counselor or trusted mentor</li>
                <li>• Prioritize sleep and reduce workload if possible</li>
                <li>• Engage in stress-relief activities (exercise, meditation)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
