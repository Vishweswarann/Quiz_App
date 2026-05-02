// src/pages/dashboard.jsx
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// All available topics with their metadata
const ALL_TOPICS = [
  { name: 'React Basics & Advanced', icon: '⚛️', color: '#61DAFB' },
  { name: 'Node.js', icon: '🟢', color: '#339933' },
  { name: 'MongoDB', icon: '🍃', color: '#47A248' },
  { name: 'Data Structures', icon: '🧱', color: '#FF6B6B' },
  { name: 'Algorithms', icon: '⚙️', color: '#9B59B6' },
  { name: 'System Design', icon: '🏗️', color: '#E67E22' },
  { name: 'OOP Concepts', icon: '🎯', color: '#3498DB' },
  { name: 'Git & GitHub', icon: '🐙', color: '#F05032' },
  { name: 'Linux Commands', icon: '🐧', color: '#FCC624' },
  { name: 'HTTP & Networking', icon: '🌐', color: '#1ABC9C' },
  { name: 'Go', icon: '🐹', color: '#00ADD8' },
];

// Badge level calculation based on quizzes completed
const getBadgeInfo = (count) => {
  if (count >= 50) return { level: 'Gold', icon: '🏆', color: '#FFD700', next: null, max: 50 };
  if (count >= 20) return { level: 'Silver', icon: '🥈', color: '#C0C0C0', next: 'Gold', max: 50 };
  return { level: 'Bronze', icon: '🥉', color: '#CD7F32', next: 'Silver', max: 20 };
};

// Get today's date string
const getTodayString = () => {
  return new Date().toISOString().split('T')[0];
};

// Calculate topic progress percentage
const calculateTopicProgress = (topicProgress) => {
  if (!topicProgress) return 0;
  const { quizzesTaken, totalScore, totalQuestions } = topicProgress;
  if (totalQuestions === 0) return 0;
  const accuracy = (totalScore / totalQuestions) * 100;
  const quizProgress = Math.min((quizzesTaken / 5) * 50, 50); // Max 50% from quizzes
  const accuracyProgress = (accuracy / 100) * 50; // Max 50% from accuracy
  return Math.round(quizProgress + accuracyProgress);
};

// Format date for display
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  return date.toLocaleDateString();
};

export default function Dashboard() {
  const navigate = useNavigate();
  
  // Initialize with empty/null values
  const [stats, setStats] = useState({
    xp: 0,
    quizzesCompleted: 0,
    dailyGoal: { current: 0, target: 10, date: getTodayString() },
    streak: 0,
    topicProgress: {},
    quizHistory: [],
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [showAllTopics, setShowAllTopics] = useState(false);

  // Load stats from Backend on mount
  useEffect(() => {
    const fetchUserStats = async () => {
      const token = localStorage.getItem('token');
      
      // If user is not logged in, redirect to login or show empty state
      if (!token) {
        setIsLoading(false);
        navigate('/'); // Optional: send them back to landing page if not logged in
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/user/stats', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const userData = await response.json();
          
          setStats(prevStats => ({
            ...prevStats,
            xp: userData.stats?.xp || 0,
            quizzesCompleted: userData.stats?.quizzesCompleted || 0,
            streak: userData.stats?.streak || 0,
            topicProgress: userData.topicProgress ? Object.fromEntries(Object.entries(userData.topicProgress)) : {},
            // We keep empty history for now unless you add it to the backend later
            quizHistory: userData.quizHistory || [] 
          }));
        } else {
          // If token is expired or invalid
          console.error("Session expired. Please log in again.");
          localStorage.removeItem('token');
          navigate('/');
        }
      } catch (error) {
        console.error("Network error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserStats();
  }, [navigate]);

  const handleStartQuiz = (topicName) => {
    if (topicName) {
      localStorage.setItem('selectedTopic', topicName);
    }
    navigate('/quiz');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const badgeInfo = getBadgeInfo(stats.quizzesCompleted);
  const progressToNext = badgeInfo.next
    ? (stats.quizzesCompleted / badgeInfo.max) * 100
    : 100;
    
  const dailyProgressPercent = Math.min(
    (stats.dailyGoal.current / stats.dailyGoal.target) * 100,
    100
  );

  // Get topics by progress for display
  const getTopicsToDisplay = () => {
    const topicsWithProgress = ALL_TOPICS.map(topic => {
      const progress = stats.topicProgress?.[topic.name]
        ? calculateTopicProgress(stats.topicProgress[topic.name])
        : 0;
      const hasData = stats.topicProgress?.[topic.name]?.quizzesTaken > 0;
      return { ...topic, progress, hasData };
    });

    const sortedTopics = topicsWithProgress.sort((a, b) => {
      if (b.hasData !== a.hasData) return b.hasData ? 1 : -1;
      return b.progress - a.progress;
    });

    return showAllTopics ? sortedTopics : sortedTopics.slice(0, 4);
  };

  const displayedTopics = getTopicsToDisplay();
  const hasQuizzes = stats.quizzesCompleted > 0;

  if (isLoading) {
    return (
      <div className="dashboard-page">
        <div className="loading-container">Loading your stats...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      {/* Navigation */}
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <span className="logo">🧠</span>
          <span className="brand-name">QuizMaster</span>
        </div>
        <div className="nav-user">
          <div className="xp-display">
            <span className="xp-icon">⚡</span>
            <span className="xp-value">{stats.xp.toLocaleString()} XP</span>
          </div>
          <div className="streak-display">
            <span className="streak-icon">🔥</span>
            <span className="streak-value">{stats.streak} day{stats.streak !== 1 ? 's' : ''}</span>
          </div>
          <button 
            onClick={handleLogout} 
            style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#ff4d4d', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-container">
        {/* Welcome Section */}
        {!hasQuizzes && (
          <section className="welcome-section">
            <div className="welcome-card">
              <span className="welcome-icon">🎯</span>
              <h2>Welcome to QuizMaster!</h2>
              <p>Start your first quiz to begin tracking your progress and earning XP!</p>
              <button className="welcome-btn" onClick={() => handleStartQuiz('React Basics & Advanced')}>
                Take Your First Quiz
              </button>
            </div>
          </section>
        )}

        {/* Stats Overview Section */}
        <section className="stats-section">
          <h2 className="section-title">{hasQuizzes ? 'Your Progress' : 'Your Stats'}</h2>
          <div className="stats-grid">
            {/* XP Card */}
            <div className="stat-card xp-card">
              <div className="stat-icon">⚡</div>
              <div className="stat-content">
                <span className="stat-label">Total XP</span>
                <span className={`stat-value xp-value-large ${!stats.xp ? 'empty-value' : ''}`}>
                  {stats.xp.toLocaleString()}
                </span>
                <span className="stat-subtitle">
                  {stats.xp > 0 ? `Level ${Math.floor(stats.xp / 500) + 1}` : 'Start earning XP!'}
                </span>
              </div>
              {stats.xp > 0 && (
                <div className="xp-progress-ring">
                  <svg viewBox="0 0 36 36">
                    <defs>
                      <linearGradient id="xp-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f093fb" />
                        <stop offset="100%" stopColor="#f5576c" />
                      </linearGradient>
                    </defs>
                    <path
                      className="xp-ring-bg"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="xp-ring-fill"
                      strokeDasharray={`${((stats.xp % 500) / 500) * 100}, 100`}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="xp-level">{Math.floor(stats.xp / 500) + 1}</span>
                </div>
              )}
            </div>

            {/* Quizzes Completed with Badge */}
            <div className="stat-card badge-card">
              <div className="stat-icon">{badgeInfo.icon}</div>
              <div className="stat-content">
                <span className="stat-label">Quizzes Completed</span>
                <span className={`stat-value ${!stats.quizzesCompleted ? 'empty-value' : ''}`}>
                  {stats.quizzesCompleted}
                </span>
                <span className="badge-label" style={{ color: badgeInfo.color }}>
                  {stats.quizzesCompleted > 0 ? `${badgeInfo.level} Badge` : 'No badge yet'}
                </span>
              </div>
              {badgeInfo.next && (
                <div className="badge-progress">
                  <div className="badge-progress-bar">
                    <div
                      className="badge-progress-fill"
                      style={{ width: `${progressToNext}%`, backgroundColor: badgeInfo.color }}
                    />
                  </div>
                  <span className="badge-progress-text">
                    {stats.quizzesCompleted}/{badgeInfo.max} to {badgeInfo.next}
                  </span>
                </div>
              )}
              {!badgeInfo.next && stats.quizzesCompleted > 0 && (
                <span className="badge-max">Max badge achieved! 🌟</span>
              )}
            </div>

            {/* Daily Progress */}
            <div className="stat-card daily-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-content">
                <span className="stat-label">Today's Goal</span>
                <span className={`stat-value ${stats.dailyGoal.current === 0 ? 'empty-value' : ''}`}>
                  {stats.dailyGoal.current}/{stats.dailyGoal.target}
                </span>
                <span className="stat-subtitle">questions answered</span>
              </div>
              <div className="daily-progress-container">
                <div className="daily-progress-bar">
                  <div
                    className="daily-progress-fill"
                    style={{ width: `${dailyProgressPercent}%` }}
                  />
                </div>
                <span className="daily-progress-text">
                  {stats.dailyGoal.current === 0
                    ? 'Answer questions to start!'
                    : `${Math.round(dailyProgressPercent)}% complete`}
                </span>
                {stats.dailyGoal.current >= stats.dailyGoal.target && (
                  <span className="daily-complete">✨ Goal reached!</span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        {hasQuizzes && (
          <section className="quick-actions">
            <button className="action-btn primary" onClick={() => handleStartQuiz('React Basics & Advanced')}>
              <span className="action-icon">🚀</span>
              <span className="action-text">Start New Quiz</span>
            </button>
            <button className="action-btn secondary" onClick={() => handleStartQuiz('General')}>
              <span className="action-icon">⚔️</span>
              <span className="action-text">Daily Challenge</span>
            </button>
          </section>
        )}

        {/* Topics Section */}
        <section className="topics-section-dashboard">
          <h2 className="section-title">
            {hasQuizzes ? 'Continue Learning' : 'Available Topics'}
          </h2>
          <div className="topic-grid-dashboard">
            {displayedTopics.map((topic) => (
              <div
                key={topic.name}
                className={`topic-card-dashboard ${!topic.hasData ? 'topic-empty' : ''}`}
                style={{ '--topic-color': topic.color }}
              >
                <div className="topic-header">
                  <span className="topic-icon">{topic.icon}</span>
                  <h3>{topic.name}</h3>
                </div>
                <div className="topic-progress-bar">
                  <div
                    className="topic-progress-fill"
                    style={{ width: `${topic.progress}%` }}
                  />
                </div>
                <span className="topic-progress-text">
                  {topic.hasData ? `${topic.progress}% complete` : 'Not started yet'}
                </span>
                <button
                  className="topic-btn"
                  onClick={() => handleStartQuiz(topic.name)}
                >
                  {topic.hasData ? 'Continue ➡️' : 'Start 🚀'}
                </button>
              </div>
            ))}
          </div>
          <button
            className="view-all-topics-btn"
            onClick={() => setShowAllTopics(!showAllTopics)}
          >
            {showAllTopics ? 'Show Less ⬆️' : 'View All Topics ⬇️'}
          </button>
        </section>

      </div>
    </div>
  );
}