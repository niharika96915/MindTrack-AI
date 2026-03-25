import * as tf from '@tensorflow/tfjs';
import { StudentData, MentalHealthPrediction } from './types';

class MentalHealthPredictor {
  private model: tf.LayersModel | null = null;
  private isTraining = false;

  async initialize() {
    if (this.model || this.isTraining) return;

    this.isTraining = true;

    this.model = tf.sequential({
      layers: [
        tf.layers.dense({ inputShape: [11], units: 32, activation: 'relu' }),
        tf.layers.dropout({ rate: 0.2 }),
        tf.layers.dense({ units: 16, activation: 'relu' }),
        tf.layers.dropout({ rate: 0.2 }),
        tf.layers.dense({ units: 8, activation: 'relu' }),
        tf.layers.dense({ units: 3, activation: 'softmax' })
      ]
    });

    this.model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy']
    });

    await this.trainModel();
    this.isTraining = false;
  }

  private async trainModel() {
    const trainingData = this.generateSyntheticData(500);

    const xs = tf.tensor2d(trainingData.inputs);
    const ys = tf.tensor2d(trainingData.outputs);

    await this.model!.fit(xs, ys, {
      epochs: 50,
      batchSize: 32,
      shuffle: true,
      validationSplit: 0.2,
      verbose: 0
    });

    xs.dispose();
    ys.dispose();
  }

  private generateSyntheticData(samples: number) {
    const inputs: number[][] = [];
    const outputs: number[][] = [];

    for (let i = 0; i < samples; i++) {
      const gpa = Math.random() * 4;
      const attendance = Math.random() * 100;
      const assignments = Math.random() * 100;
      const studyHours = Math.random() * 12;
      const sleepHours = Math.random() * 12;
      const screenTime = Math.random() * 16;
      const activity = Math.random() * 10;
      const stress = Math.random() * 10;
      const social = Math.random() * 10;
      const examPressure = Math.random() * 10;
      const moodScore = Math.random();

      const healthScore = this.calculateHealthScore({
        gpa, attendance, assignments, studyHours,
        sleepHours, screenTime, activity, stress,
        social, examPressure, moodScore
      });

      inputs.push([
        gpa / 4, attendance / 100, assignments / 100,
        studyHours / 12, sleepHours / 12, screenTime / 16,
        activity / 10, stress / 10, moodScore,
        social / 10, examPressure / 10
      ]);

      if (healthScore >= 0.7) {
        outputs.push([1, 0, 0]);
      } else if (healthScore >= 0.4) {
        outputs.push([0, 1, 0]);
      } else {
        outputs.push([0, 0, 1]);
      }
    }

    return { inputs, outputs };
  }

  private calculateHealthScore(params: {
    gpa: number; attendance: number; assignments: number;
    studyHours: number; sleepHours: number; screenTime: number;
    activity: number; stress: number; social: number;
    examPressure: number; moodScore: number;
  }): number {
    const { gpa, attendance, assignments, studyHours, sleepHours,
            screenTime, activity, stress, social, examPressure, moodScore } = params;

    let score = 0;

    score += (gpa / 4) * 0.15;
    score += (attendance / 100) * 0.1;
    score += (assignments / 100) * 0.1;
    score += Math.min(studyHours / 6, 1) * 0.1;
    score += (sleepHours >= 7 && sleepHours <= 9 ? 1 : Math.max(0, 1 - Math.abs(sleepHours - 8) / 4)) * 0.15;
    score += Math.max(0, 1 - screenTime / 16) * 0.1;
    score += (activity / 10) * 0.1;
    score += (1 - stress / 10) * 0.1;
    score += moodScore * 0.05;
    score += (social / 10) * 0.05;
    score += (1 - examPressure / 10) * 0.1;

    return Math.max(0, Math.min(1, score));
  }

  async predict(data: StudentData): Promise<MentalHealthPrediction> {
    if (!this.model) {
      await this.initialize();
    }

    const moodScores: { [key: string]: number } = {
      happy: 1,
      neutral: 0.5,
      sad: 0.3,
      anxious: 0.2
    };

    const input = tf.tensor2d([[
      data.gpa / 4,
      data.attendance_percentage / 100,
      data.assignment_completion / 100,
      data.study_hours / 12,
      data.sleep_hours / 12,
      data.screen_time / 16,
      data.physical_activity / 10,
      data.stress_level / 10,
      moodScores[data.mood] || 0.5,
      data.social_interaction / 10,
      data.exam_pressure / 10
    ]]);

    const prediction = this.model!.predict(input) as tf.Tensor;
    const probabilities = await prediction.data();

    input.dispose();
    prediction.dispose();

    const maxProb = Math.max(...Array.from(probabilities));
    const classIndex = Array.from(probabilities).indexOf(maxProb);

    const classifications = ['Healthy', 'Moderate Stress', 'High Risk'] as const;
    const classification = classifications[classIndex];

    const factors = [
      { factor: 'Sleep Quality', importance: this.calculateSleepImpact(data.sleep_hours) },
      { factor: 'Stress Level', importance: data.stress_level / 10 },
      { factor: 'Academic Performance', importance: (4 - data.gpa) / 4 },
      { factor: 'Screen Time', importance: data.screen_time / 16 },
      { factor: 'Physical Activity', importance: (10 - data.physical_activity) / 10 },
      { factor: 'Exam Pressure', importance: data.exam_pressure / 10 },
      { factor: 'Social Interaction', importance: (10 - data.social_interaction) / 10 }
    ];

    factors.sort((a, b) => b.importance - a.importance);

    const mentalHealthScore = Math.round((1 - probabilities[2] - probabilities[1] * 0.5) * 100);

    return {
      classification,
      confidence: Math.round(maxProb * 100),
      contributingFactors: factors.slice(0, 5),
      mentalHealthScore
    };
  }

  private calculateSleepImpact(sleepHours: number): number {
    const optimal = 8;
    const deviation = Math.abs(sleepHours - optimal);
    return Math.min(1, deviation / 4);
  }
}

export const mlModel = new MentalHealthPredictor();
