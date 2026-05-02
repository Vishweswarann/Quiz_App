// src/pages/results.jsx
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Get the selected topic from localStorage
const getSelectedTopic = () => {
  return localStorage.getItem('selectedTopic') || 'General';
};

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(true);

  // Grab the state passed from the quizboard
  const finalScore = location.state?.finalScore || 0;
  const totalQuestions = location.state?.totalQuestions || 0;
  
  // Calculate percentage & XP
  const percentage = totalQuestions > 0 ? (finalScore / totalQuestions) * 100 : 0;
  const xpEarned = totalQuestions > 0 ? (finalScore * 50) + 25 : 0;

  // Save stats to Backend on mount
  useEffect(() => {
    const saveResultsToBackend = async () => {
      const token = localStorage.getItem('token');
      const topic = getSelectedTopic();

      // If no token or no questions were answered, don't try to save
      if (!token || totalQuestions === 0) {
        setIsSaving(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/user/update-stats', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Send token for security
          },
          body: JSON.stringify({
            xpEarned: xpEarned,
            topic: topic,
            score: finalScore,
            totalQuestions: totalQuestions
          })
        });

        if (response.ok) {
          console.log("Stats successfully saved to MongoDB!");
        } else {
          console.error("Failed to save stats to database.");
        }
      } catch (error) {
        console.error("Network error while saving stats:", error);
      } finally {
        setIsSaving(false);
      }
    };

    saveResultsToBackend();
  }, [finalScore, totalQuestions, xpEarned]);

  return (
    <div className="page-container">
      <div className="card results-card">
        <h2>Quiz Complete! 🎉</h2>
        <div style={{ margin: '30px 0' }}>
          <h1 style={{ fontSize: '48px', color: '#007bff' }}>
            {finalScore} / {totalQuestions}
          </h1>
          <p style={{ fontSize: '18px', marginTop: '10px', color: '#666' }}>
            You scored {percentage.toFixed(0)}%
          </p>
        </div>
        
        {/* XP Earned */}
        <div className="xp-earned">
          <span className="xp-icon-large">⚡</span>
          <div className="xp-earned-text">
            <span className="xp-label">XP Earned</span>
            <span className="xp-amount">+{xpEarned}</span>
          </div>
        </div>

        {/* Performance Message */}
        <div className="performance-message">
          {percentage === 100 && (
            <><span className="perf-emoji">🏆</span><span>Perfect Score! You're a master!</span></>
          )}
          {percentage >= 80 && percentage < 100 && (
            <><span className="perf-emoji">🌟</span><span>Great job! Keep it up!</span></>
          )}
          {percentage >= 60 && percentage < 80 && (
            <><span className="perf-emoji">👍</span><span>Good effort! Review and try again!</span></>
          )}
          {percentage < 60 && (
            <><span className="perf-emoji">💪</span><span>Keep practicing! You'll get there!</span></>
          )}
        </div>

        <button 
          className="primary-btn results-btn" 
          onClick={() => navigate('/dashboard')}
          disabled={isSaving}
        >
          {isSaving ? "Saving Progress..." : "Back to Dashboard"}
        </button>
      </div>
    </div>
  );
}