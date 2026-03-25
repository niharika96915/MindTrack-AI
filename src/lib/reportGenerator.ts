import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { StudentData, MentalHealthPrediction } from './types';
import { RecommendationItem } from './recommendations';

export function generatePDFReport(
  studentName: string,
  data: StudentData,
  prediction: MentalHealthPrediction,
  recommendations: RecommendationItem[]
) {
  const doc = new jsPDF();

  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, 210, 40, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text('MindTrack AI', 105, 20, { align: 'center' });

  doc.setFontSize(12);
  doc.text('Mental Health & Performance Report', 105, 30, { align: 'center' });

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(16);
  doc.text('Student Summary', 20, 55);

  doc.setFontSize(11);
  doc.text(`Name: ${studentName}`, 20, 65);
  doc.text(`Report Date: ${new Date().toLocaleDateString()}`, 20, 72);

  doc.setFontSize(16);
  doc.text('Mental Health Assessment', 20, 90);

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'Healthy':
        return [34, 197, 94];
      case 'Moderate Stress':
        return [234, 179, 8];
      case 'High Risk':
        return [239, 68, 68];
      default:
        return [156, 163, 175];
    }
  };

  const color = getClassificationColor(prediction.classification);
  doc.setFillColor(color[0], color[1], color[2]);
  doc.roundedRect(20, 95, 170, 25, 3, 3, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.text(`Status: ${prediction.classification}`, 25, 105);
  doc.text(`Mental Health Score: ${prediction.mentalHealthScore}/100`, 25, 113);

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.text('Academic & Lifestyle Data', 20, 135);

  const academicData = [
    ['GPA', `${data.gpa.toFixed(2)}/4.0`],
    ['Attendance', `${data.attendance_percentage}%`],
    ['Assignment Completion', `${data.assignment_completion}%`],
    ['Study Hours/Day', `${data.study_hours} hours`]
  ];

  autoTable(doc, {
    startY: 140,
    head: [['Metric', 'Value']],
    body: academicData,
    theme: 'grid',
    headStyles: { fillColor: [59, 130, 246] },
    margin: { left: 20, right: 20 }
  });

  const lifestyleData = [
    ['Sleep Hours', `${data.sleep_hours} hours`],
    ['Screen Time', `${data.screen_time} hours/day`],
    ['Physical Activity', `${data.physical_activity}/10`],
    ['Stress Level', `${data.stress_level}/10`],
    ['Social Interaction', `${data.social_interaction}/10`]
  ];

  autoTable(doc, {
    startY: (doc as any).lastAutoTable.finalY + 10,
    head: [['Metric', 'Value']],
    body: lifestyleData,
    theme: 'grid',
    headStyles: { fillColor: [59, 130, 246] },
    margin: { left: 20, right: 20 }
  });

  doc.addPage();

  doc.setFontSize(16);
  doc.text('Key Contributing Factors', 20, 20);

  const factorsData = prediction.contributingFactors.map((factor, index) => [
    `${index + 1}. ${factor.factor}`,
    `${(factor.importance * 100).toFixed(0)}%`
  ]);

  autoTable(doc, {
    startY: 25,
    head: [['Factor', 'Impact Level']],
    body: factorsData,
    theme: 'striped',
    headStyles: { fillColor: [139, 92, 246] },
    margin: { left: 20, right: 20 }
  });

  doc.setFontSize(16);
  doc.text('Key Issues Identified', 20, (doc as any).lastAutoTable.finalY + 15);

  const issues: string[] = [];
  if (data.sleep_hours < 7) issues.push('Insufficient sleep hours');
  if (data.stress_level > 7) issues.push('High stress levels');
  if (data.attendance_percentage < 80) issues.push('Poor attendance');
  if (data.physical_activity < 4) issues.push('Low physical activity');
  if (data.screen_time > 8) issues.push('Excessive screen time');
  if (data.social_interaction < 4) issues.push('Limited social interaction');
  if (data.exam_pressure > 7) issues.push('High exam pressure');

  let issueY = (doc as any).lastAutoTable.finalY + 25;
  doc.setFontSize(11);
  issues.forEach(issue => {
    doc.text(`• ${issue}`, 25, issueY);
    issueY += 7;
  });

  if (recommendations.length > 0) {
    doc.addPage();

    doc.setFontSize(16);
    doc.text('Personalized Recommendations', 20, 20);

    let recY = 30;

    recommendations.forEach(rec => {
      if (recY > 270) {
        doc.addPage();
        recY = 20;
      }

      doc.setFontSize(14);
      doc.setTextColor(59, 130, 246);
      doc.text(rec.title, 20, recY);
      recY += 7;

      doc.setFontSize(10);
      doc.setTextColor(107, 114, 128);
      doc.text(`Category: ${rec.category} | Priority: ${rec.priority.toUpperCase()}`, 20, recY);
      recY += 7;

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);

      rec.recommendations.forEach(r => {
        const lines = doc.splitTextToSize(`• ${r}`, 170);
        lines.forEach((line: string) => {
          if (recY > 280) {
            doc.addPage();
            recY = 20;
          }
          doc.text(line, 25, recY);
          recY += 5;
        });
      });

      recY += 5;
    });
  }

  doc.addPage();
  doc.setFontSize(14);
  doc.text('Important Note', 20, 20);
  doc.setFontSize(10);
  const disclaimer = 'This report is generated by an AI system for informational purposes only. It is not a substitute for professional medical or psychological advice. If you are experiencing severe mental health concerns, please consult with a qualified healthcare professional or counselor.';
  const disclaimerLines = doc.splitTextToSize(disclaimer, 170);
  let disclaimerY = 30;
  disclaimerLines.forEach((line: string) => {
    doc.text(line, 20, disclaimerY);
    disclaimerY += 7;
  });

  doc.setFontSize(9);
  doc.setTextColor(107, 114, 128);
  doc.text('Generated by MindTrack AI - Student Mental Health Intelligence System', 105, 280, { align: 'center' });

  doc.save(`MindTrack_Report_${new Date().toISOString().split('T')[0]}.pdf`);
}
