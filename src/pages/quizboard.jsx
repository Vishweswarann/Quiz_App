import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Quizboard() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    // Get the topic the user clicked on from localStorage
    const selectedTopic = localStorage.getItem('selectedTopic') || 'React Basics & Advanced';
    
    // Fetch questions FROM YOUR BACKEND
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/quiz/questions/${encodeURIComponent(selectedTopic)}`);
        
        if (response.ok) {
          const data = await response.json();
          // Shuffle options for each question so the correct answer isn't always in the same spot
          const formattedQuestions = data.map(q => {
            const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
            return { ...q, options: shuffledOptions };
          });
          setQuestions(formattedQuestions);
        } else {
          console.error("No questions found for this topic.");
        }
      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Timer Logic
  useEffect(() => {
    if (loading || questions.length === 0) return;
    if (timeLeft === 0) {
      handleAnswer(null); // Time's up!
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, loading, questions]);

  const handleAnswer = (selected) => {
    const currentQ = questions[currentIndex];
    let newScore = score;
    
    if (selected === currentQ.correctAnswer) {
      newScore = score + 1;
      setScore(newScore);
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setTimeLeft(30); // Reset timer for next question
    } else {
      // Quiz finished! Go to results page
      navigate('/results', { state: { finalScore: newScore, totalQuestions: questions.length } });
    }
  };

  if (loading) return <div className="page-container"><h2>Loading Interview Questions... ⏳</h2></div>;
  
  if (questions.length === 0) return (
    <div className="page-container" style={{ textAlign: 'center' }}>
      <h2>Oops! No questions found for this topic yet. 😅</h2>
      <button className="primary-btn" onClick={() => navigate('/dashboard')} style={{ marginTop: '20px', maxWidth: '200px' }}>
        Back to Dashboard
      </button>
    </div>
  );

  const currentQ = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="page-container">
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#666' }}>
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span style={{ color: timeLeft < 10 ? '#ff4d4d' : '#333', fontWeight: 'bold' }}>
              {timeLeft}s
          </span>
        </div>
        
        <h3 style={{ margin: '20px 0', lineHeight: '1.4' }}>
          {currentQ.question}
        </h3>
        
        <div className="options-list">
          {currentQ.options.map((opt, i) => (
            <button 
              key={i} 
              className="option-btn" 
              onClick={() => handleAnswer(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}