
import React from 'react';
import quizData from '@/data/quiz-data.json';
import { Button } from '../ui/button';
import { Download } from 'lucide-react';

export const QuizDataDownload: React.FC = () => {
  const handleDownload = () => {
    // Create a blob from the quiz data
    const jsonString = JSON.stringify(quizData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    
    // Create a download link and trigger it
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'quiz-data.json';
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  return (
    <Button 
      onClick={handleDownload}
      className="bg-[#465aea] hover:bg-[#3a4aca] text-white flex items-center gap-2"
    >
      <Download size={16} />
      Download Quiz Data
    </Button>
  );
};
