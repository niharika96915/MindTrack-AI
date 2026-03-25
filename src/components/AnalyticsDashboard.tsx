import { useEffect, useRef } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { StudentData, MentalHealthPrediction } from '../lib/types';
import { TrendingUp, Brain, Moon, Zap } from 'lucide-react';

ChartJS.register(...registerables);

interface AnalyticsDashboardProps {
  data: StudentData;
  prediction: MentalHealthPrediction;
  translations: any;
}

export function AnalyticsDashboard({ data, prediction, translations }: AnalyticsDashboardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 70) return 'from-green-500 to-emerald-500';
    if (score >= 40) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const performanceData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Current'],
    datasets: [
      {
        label: 'Mental Health Score',
        data: [65, 70, 68, 72, prediction.mentalHealthScore],
        borderColor: 'rgb(139, 92, 246)',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Academic Performance',
        data: [75, 78, 80, 82, (data.gpa / 4) * 100],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const sleepProductivityData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Sleep Hours',
        data: [7, 6.5, 7.5, data.sleep_hours, 8, 9, 8.5],
        backgroundColor: 'rgba(139, 92, 246, 0.7)',
      },
      {
        label: 'Productivity',
        data: [8, 7, 8.5, data.study_hours, 9, 7, 8],
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
      }
    ]
  };

  const stressPerformanceData = {
    labels: ['Low Stress', 'Medium Stress', 'High Stress'],
    datasets: [{
      data: [
        data.stress_level < 4 ? 90 : 0,
        data.stress_level >= 4 && data.stress_level <= 7 ? 70 : 0,
        data.stress_level > 7 ? 50 : 0
      ],
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)',
        'rgba(234, 179, 8, 0.8)',
        'rgba(239, 68, 68, 0.8)'
      ],
      borderColor: [
        'rgb(34, 197, 94)',
        'rgb(234, 179, 8)',
        'rgb(239, 68, 68)'
      ],
      borderWidth: 2
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'rgb(156, 163, 175)',
          font: { size: 12 }
        }
      }
    },
    scales: {
      y: {
        ticks: { color: 'rgb(156, 163, 175)' },
        grid: { color: 'rgba(156, 163, 175, 0.1)' }
      },
      x: {
        ticks: { color: 'rgb(156, 163, 175)' },
        grid: { color: 'rgba(156, 163, 175, 0.1)' }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'rgb(156, 163, 175)',
          padding: 15,
          font: { size: 12 }
        }
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
          {translations.analytics}
        </h2>
      </div>

      <div className="glass-card p-8 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-500/20 rounded-xl">
            <Brain className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-2xl font-semibold text-white">{translations.mentalHealthScore}</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="relative h-64">
              <div className={`absolute inset-0 flex items-center justify-center text-6xl font-bold ${getScoreColor(prediction.mentalHealthScore)}`}>
                {prediction.mentalHealthScore}
                <span className="text-2xl ml-2">/ 100</span>
              </div>
              <svg className="transform -rotate-90 w-full h-full">
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  stroke="rgba(75, 85, 99, 0.3)"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 45} ${2 * Math.PI * 45}`}
                  strokeDashoffset={2 * Math.PI * 45 * (1 - prediction.mentalHealthScore / 100)}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" className="text-blue-500" stopColor="currentColor" />
                    <stop offset="100%" className="text-purple-500" stopColor="currentColor" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <div className="space-y-4">
            <div className="stat-card">
              <div className="text-sm text-gray-400">{translations.classification}</div>
              <div className={`text-2xl font-bold ${
                prediction.classification === 'Healthy' ? 'text-green-400' :
                prediction.classification === 'Moderate Stress' ? 'text-yellow-400' :
                'text-red-400'
              }`}>
                {prediction.classification}
              </div>
            </div>

            <div className="stat-card">
              <div className="text-sm text-gray-400">{translations.confidence}</div>
              <div className="text-2xl font-bold text-blue-400">{prediction.confidence}%</div>
            </div>

            <div className="stat-card">
              <div className="text-sm text-gray-400">GPA</div>
              <div className="text-2xl font-bold text-purple-400">{data.gpa.toFixed(2)}</div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="text-lg font-semibold text-white mb-4">{translations.keyFactors}</h4>
          <div className="space-y-3">
            {prediction.contributingFactors.map((factor, index) => (
              <div key={index} className="factor-bar">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300">{factor.factor}</span>
                  <span className="text-sm font-semibold text-blue-400">
                    {(factor.importance * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${getScoreGradient(100 - factor.importance * 100)} transition-all duration-1000`}
                    style={{ width: `${factor.importance * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <h3 className="text-xl font-semibold text-white">{translations.performanceTrend}</h3>
          </div>
          <div className="h-64">
            <Line data={performanceData} options={chartOptions} />
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <Moon className="w-5 h-5 text-purple-400" />
            <h3 className="text-xl font-semibold text-white">{translations.sleepVsProductivity}</h3>
          </div>
          <div className="h-64">
            <Bar data={sleepProductivityData} options={chartOptions} />
          </div>
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-5 h-5 text-yellow-400" />
          <h3 className="text-xl font-semibold text-white">{translations.stressVsPerformance}</h3>
        </div>
        <div className="h-80">
          <Doughnut data={stressPerformanceData} options={doughnutOptions} />
        </div>
      </div>
    </div>
  );
}
