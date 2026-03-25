import { useState, useEffect } from 'react';
import { Brain, Download, Globe } from 'lucide-react';
import { InputDashboard } from './components/InputDashboard';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { Recommendations } from './components/Recommendations';
import { Chatbot } from './components/Chatbot';
import { Gamification } from './components/Gamification';
import { InsightCards } from './components/InsightCards';
import { EarlyWarning } from './components/EarlyWarning';
import { StudentData, MentalHealthPrediction } from './lib/types';
import { mlModel } from './lib/mlModel';
import { generateRecommendations, RecommendationItem } from './lib/recommendations';
import { generatePDFReport } from './lib/reportGenerator';
import { translations, Language } from './lib/translations';
import { supabase } from './lib/supabase';

type View = 'input' | 'dashboard';

function App() {
  const [view, setView] = useState<View>('input');
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [prediction, setPrediction] = useState<MentalHealthPrediction | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [studentId, setStudentId] = useState<string>('');

  const t = translations[language];

  useEffect(() => {
    mlModel.initialize();
    initializeStudent();
  }, []);

  const initializeStudent = async () => {
    const storedId = localStorage.getItem('studentId');
    if (storedId) {
      setStudentId(storedId);
    } else {
      const { data, error } = await supabase
        .from('students')
        .insert([{ name: 'Demo Student', email: `student${Date.now()}@demo.com` }])
        .select()
        .single();

      if (data) {
        setStudentId(data.id);
        localStorage.setItem('studentId', data.id);
      }
    }
  };

  const handleDataSubmit = async (data: StudentData) => {
    setIsAnalyzing(true);
    setStudentData(data);

    try {
      const result = await mlModel.predict(data);
      setPrediction(result);

      const recs = generateRecommendations(data, result);
      setRecommendations(recs);

      if (studentId) {
        const { data: entryData } = await supabase
          .from('student_entries')
          .insert([{
            student_id: studentId,
            ...data,
            mental_health_score: result.mentalHealthScore,
            mental_health_classification: result.classification,
            confidence_score: result.confidence
          }])
          .select()
          .single();

        if (entryData) {
          const recInserts = recs.map(rec => ({
            entry_id: entryData.id,
            category: rec.category,
            recommendation: rec.recommendations.join('\n'),
            priority: rec.priority
          }));

          await supabase.from('recommendations').insert(recInserts);
        }
      }

      setTimeout(() => {
        setIsAnalyzing(false);
        setView('dashboard');
      }, 2000);
    } catch (error) {
      console.error('Analysis error:', error);
      setIsAnalyzing(false);
    }
  };

  const handleDownloadReport = () => {
    if (studentData && prediction) {
      generatePDFReport('Demo Student', studentData, prediction, recommendations);
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>

      <header className="relative z-10 border-b border-gray-800 bg-black/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                  {t.appTitle}
                </h1>
                <p className="text-sm text-gray-400">{t.appSubtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl transition-colors"
              >
                <Globe className="w-5 h-5 text-gray-400" />
                <span className="text-white text-sm">{language === 'en' ? 'हिं' : 'EN'}</span>
              </button>

              {view === 'dashboard' && (
                <>
                  <button
                    onClick={() => setView('input')}
                    className="px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl text-white transition-colors"
                  >
                    {t.inputDashboard}
                  </button>
                  <button
                    onClick={handleDownloadReport}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 rounded-xl text-white transition-opacity"
                  >
                    <Download className="w-5 h-5" />
                    {t.downloadReport}
                  </button>
                </>
              )}

              {view === 'input' && studentData && (
                <button
                  onClick={() => setView('dashboard')}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 rounded-xl text-white transition-opacity"
                >
                  {t.viewAnalytics}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {isAnalyzing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-t-blue-500 border-r-purple-600 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                <Brain className="absolute inset-0 m-auto w-12 h-12 text-blue-400 animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Analyzing Your Data...</h3>
              <p className="text-gray-400">Our AI is processing your mental health indicators</p>
            </div>
          </div>
        )}

        {view === 'input' && (
          <InputDashboard onSubmit={handleDataSubmit} translations={t} />
        )}

        {view === 'dashboard' && studentData && prediction && (
          <>
            <div className="max-w-7xl mx-auto px-4 py-8">
              <EarlyWarning data={studentData} prediction={prediction} translations={t} />
              <Gamification data={studentData} prediction={prediction} translations={t} />
              <InsightCards data={studentData} translations={t} />
            </div>
            <AnalyticsDashboard data={studentData} prediction={prediction} translations={t} />
            <Recommendations recommendations={recommendations} translations={t} />
          </>
        )}
      </main>

      <Chatbot studentData={studentData} translations={t} />

      <footer className="relative z-10 border-t border-gray-800 bg-black/30 backdrop-blur-md mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-400 text-sm">
          <p>MindTrack AI &copy; 2024 - Powered by TensorFlow.js & Advanced ML Algorithms</p>
          <p className="mt-2">This tool is for informational purposes only and not a substitute for professional mental health care.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
