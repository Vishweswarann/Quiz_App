// src/pages/Topics.jsx
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ALL_TOPICS = [
  { name: 'React Basics & Advanced', icon: '⚛️', color: '#61DAFB', description: 'Components, Hooks, State Management, and more' },
  { name: 'Node.js', icon: '🟢', color: '#339933', description: 'Event Loop, Streams, File System, and Modules' },
  { name: 'MongoDB', icon: '🍃', color: '#47A248', description: 'CRUD Operations, Aggregation, Indexing, and Schema Design' },
  { name: 'Data Structures', icon: '📊', color: '#FF6B6B', description: 'Arrays, Linked Lists, Trees, Graphs, and Hash Tables' },
  { name: 'Algorithms', icon: '🧮', color: '#9B59B6', description: 'Sorting, Searching, Dynamic Programming, and Complexity' },
  { name: 'System Design', icon: '🏗️', color: '#E67E22', description: 'Scalability, Load Balancing, Caching, and Databases' },
  { name: 'OOP Concepts', icon: '🎯', color: '#3498DB', description: 'Encapsulation, Inheritance, Polymorphism, and Abstraction' },
  { name: 'Git & GitHub', icon: '📦', color: '#F05032', description: 'Version Control, Branching, Merging, and Collaboration' },
  { name: 'Linux Commands', icon: '🐧', color: '#FCC624', description: 'File System, Permissions, Processes, and Shell Scripting' },
  { name: 'HTTP & Networking', icon: '🌐', color: '#1ABC9C', description: 'REST APIs, HTTP Methods, Status Codes, and Security' },
  { name: 'Go', icon: '🔵', color: '#00ADD8', description: 'Goroutines, Channels, Interfaces, and Concurrency' },
];

const calculateTopicProgress = (topicProgress) => {
  if (!topicProgress) return 0;
  const { quizzesTaken = 0, totalScore = 0, totalQuestions = 0 } = topicProgress;
  if (totalQuestions === 0) return 0;
  const accuracy = (totalScore / totalQuestions) * 100;
  const quizProgress = Math.min((quizzesTaken / 5) * 50, 50);
  const accuracyProgress = (accuracy / 100) * 50;
  return Math.round(quizProgress + accuracyProgress);
};

export default function Topics() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ topicProgress: {} });
  const [filter, setFilter] = useState('all'); // 'all', 'started', 'completed'

  useEffect(() => {
    const savedStats = localStorage.getItem('quizStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  const handleStartQuiz = (topicName) => {
    localStorage.setItem('selectedTopic', topicName);
    navigate('/quiz');
  };

  const getTopicsWithData = () => {
    return ALL_TOPICS.map(topic => {
      const progress = stats.topicProgress?.[topic.name]
        ? calculateTopicProgress(stats.topicProgress[topic.name])
        : 0;
      const hasData = stats.topicProgress?.[topic.name]?.quizzesTaken > 0;
      const isCompleted = progress >= 90;
      return { ...topic, progress, hasData, isCompleted };
    });
  };

  const filteredTopics = () => {
    const topics = getTopicsWithData();
    switch (filter) {
      case 'started':
        return topics.filter(t => t.hasData);
      case 'completed':
        return topics.filter(t => t.isCompleted);
      default:
        return topics;
    }
  };

  const topics = filteredTopics();
  const startedCount = getTopicsWithData().filter(t => t.hasData).length;
  const completedCount = getTopicsWithData().filter(t => t.isCompleted).length;

  return (
    <div className="topics-page">
      {/* Navigation */}
      <nav className="dashboard-nav">
        <div className="nav-brand" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
          <span className="logo">🎓</span>
          <span className="brand-name">QuizMaster</span>
        </div>
        <div className="nav-links">
          <button className="nav-btn secondary" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </button>
        </div>
      </nav>

      <div className="topics-container">
        {/* Header */}
        <div className="topics-header">
          <h1>All Topics</h1>
          <p>Choose a topic to start practicing interview questions</p>
        </div>

        {/* Stats Overview */}
        <div className="topics-stats">
          <div className="topics-stat-item">
            <span className="topics-stat-number">{ALL_TOPICS.length}</span>
            <span className="topics-stat-label">Total Topics</span>
          </div>
          <div className="topics-stat-item">
            <span className="topics-stat-number">{startedCount}</span>
            <span className="topics-stat-label">Started</span>
          </div>
          <div className="topics-stat-item">
            <span className="topics-stat-number">{completedCount}</span>
            <span className="topics-stat-label">Completed</span>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="topics-filter">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Topics
          </button>
          <button
            className={`filter-btn ${filter === 'started' ? 'active' : ''}`}
            onClick={() => setFilter('started')}
          >
            In Progress
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>

        {/* Topics Grid */}
        <div className="topics-list-grid">
          {topics.map((topic) => (
            <div
              key={topic.name}
              className={`topic-list-card ${!topic.hasData ? 'topic-not-started' : ''} ${topic.isCompleted ? 'topic-completed' : ''}`}
              style={{ '--topic-color': topic.color }}
            >
              <div className="topic-list-header">
                <div className="topic-list-icon-wrapper" style={{ backgroundColor: `${topic.color}20` }}>
                  <span className="topic-list-icon">{topic.icon}</span>
                </div>
                <div className="topic-list-info">
                  <h3>{topic.name}</h3>
                  <p>{topic.description}</p>
                </div>
              </div>

              <div className="topic-list-progress">
                <div className="topic-list-progress-header">
                  <span className="topic-list-progress-label">Progress</span>
                  <span className="topic-list-progress-value">{topic.progress}%</span>
                </div>
                <div className="topic-list-progress-bar">
                  <div
                    className="topic-list-progress-fill"
                    style={{ width: `${topic.progress}%` }}
                  />
                </div>
              </div>

              <div className="topic-list-footer">
                {topic.isCompleted ? (
                  <span className="completed-badge">✓ Completed</span>
                ) : topic.hasData ? (
                  <span className="in-progress-badge">In Progress</span>
                ) : (
                  <span className="not-started-badge">Not Started</span>
                )}
                <button
                  className="topic-list-btn"
                  onClick={() => handleStartQuiz(topic.name)}
                >
                  {topic.hasData ? 'Continue' : 'Start'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
