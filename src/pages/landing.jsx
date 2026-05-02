// src/pages/Landing.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginModal from '../components/loginmodal';

const topics = [
	{ name: 'React Basics & Advanced', icon: '⚛️', color: '#61DAFB', questions: 150 },
	{ name: 'Node.js', icon: '🟢', color: '#339933', questions: 120 },
	{ name: 'MongoDB', icon: '🍃', color: '#47A248', questions: 80 },
	{ name: 'Data Structures', icon: '📊', color: '#FF6B6B', questions: 200 },
	{ name: 'Algorithms', icon: '🧮', color: '#9B59B6', questions: 180 },
	{ name: 'System Design', icon: '🏗️', color: '#E67E22', questions: 90 },
	{ name: 'OOP Concepts', icon: '🎯', color: '#3498DB', questions: 100 },
	{ name: 'Git & GitHub', icon: '📦', color: '#F05032', questions: 70 },
	{ name: 'Linux Commands', icon: '🐧', color: '#FCC624', questions: 85 },
	{ name: 'HTTP & Networking', icon: '🌐', color: '#1ABC9C', questions: 95 },
	{ name: 'Go', icon: '🔵', color: '#00ADD8', questions: 110 },
];

const features = [
	{ icon: '🎯', title: 'Track Progress', desc: 'Monitor your learning journey with detailed analytics' },
	{ icon: '🏆', title: 'Earn Badges', desc: 'Unlock achievements as you master new topics' },
	{ icon: '🔥', title: 'Daily Streaks', desc: 'Keep your momentum with daily practice reminders' },
	{ icon: '📈', title: 'Performance Insights', desc: 'Identify weak areas and focus your efforts' },
];

export default function Landing() {
	const [showLogin, setShowLogin] = useState(false);
	const navigate = useNavigate();

	const handleTopicClick = (topicName) => {
		// Store selected topic and navigate to quiz
		localStorage.setItem('selectedTopic', topicName);
		navigate('/quiz');
	};

	return (
		<div className="landing-page">
			{/* Navigation Bar */}
			<nav className="navbar">
				<div className="nav-brand">
					<span className="logo">🎓</span>
					<span className="brand-name">QuizMaster</span>
				</div>
				<div className="nav-links">
					<a href="#topics" className="nav-link">Topics</a>
					<a href="#features" className="nav-link">Features</a>
					<button className="nav-btn secondary" onClick={() => setShowLogin(true)}>
						Sign In
					</button>
					<button className="nav-btn primary" onClick={() => setShowLogin(true)}>
						Get Started
					</button>
				</div>
			</nav>

			{/* Hero Section */}
			<section className="hero">
				<div className="hero-content">
					<div className="hero-text">
						<h1 className="hero-title">
							Master Tech Interviews with
							<span className="gradient-text"> QuizMaster</span>
						</h1>
						<p className="hero-subtitle">
							Practice 1,200+ interview questions across 11 tech topics.
							Track your progress, earn badges, and land your dream job!
						</p>
						<div className="hero-cta">
							<button className="cta-btn primary" onClick={() => document.getElementById('topics').scrollIntoView({ behavior: 'smooth' })}>
								Start Practicing Free
							</button>
							<button className="cta-btn secondary" onClick={() => setShowLogin(true)}>
								Sign In to Save Progress
							</button>
						</div>
						<div className="hero-stats">
							<div className="stat">
								<span className="stat-number">1,200+</span>
								<span className="stat-label">Questions</span>
							</div>
							<div className="stat">
								<span className="stat-number">11</span>
								<span className="stat-label">Topics</span>
							</div>
							<div className="stat">
								<span className="stat-number">500+</span>
								<span className="stat-label">Students</span>
							</div>
						</div>
					</div>
					<div className="hero-illustration">
						<div className="floating-card card-1">
							<span className="card-icon">🏆</span>
							<span className="card-text">Achievement Unlocked!</span>
						</div>
						<div className="floating-card card-2">
							<span className="card-icon">🔥</span>
							<span className="card-text">7 Day Streak!</span>
						</div>
						<div className="floating-card card-3">
							<span className="card-icon">⚛️</span>
							<span className="card-text">React Master</span>
						</div>
						<div className="hero-graphic">
							<div className="study-illustration">
								<div className="person person-1">👨‍💻</div>
								<div className="person person-2">👩‍💻</div>
								<div className="laptop">💻</div>
								<div className="code-snippet">{'{ }'}</div>
								<div className="code-snippet-2">{'</>'}</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Topics Section */}
			<section id="topics" className="topics-section">
				<div className="section-header">
					<h2 className="section-title">Choose Your Topic</h2>
					<p className="section-subtitle">Select a category and start practicing interview questions</p>
				</div>
				<div className="topics-grid">
					{topics.map((topic) => (
						<div
							key={topic.name}
							className="topic-card-landing"
							onClick={() => handleTopicClick(topic.name)}
							style={{ '--topic-color': topic.color }}
						>
							<div className="topic-icon-wrapper" style={{ backgroundColor: `${topic.color}20` }}>
								<span className="topic-icon">{topic.icon}</span>
							</div>
							<h3 className="topic-name">{topic.name}</h3>
							<span className="topic-questions">{topic.questions} questions</span>
							<div className="topic-progress">
								<span className="start-text">Start Quiz →</span>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Features Section */}
			<section id="features" className="features-section">
				<div className="section-header">
					<h2 className="section-title">Why QuizMaster?</h2>
					<p className="section-subtitle">Everything you need to prepare for your technical interviews</p>
				</div>
				<div className="features-grid">
					{features.map((feature) => (
						<div key={feature.title} className="feature-card">
							<div className="feature-icon">{feature.icon}</div>
							<h3 className="feature-title">{feature.title}</h3>
							<p className="feature-desc">{feature.desc}</p>
						</div>
					))}
				</div>
			</section>


			{/* Footer */}
			<footer className="footer">
				<div className="footer-content">
					<div className="footer-brand">
						<span className="logo">🎓</span>
						<span className="brand-name">QuizMaster</span>
					</div>
					<p className="footer-text">© 2026 QuizMaster. Built for students, by students.</p>
				</div>
			</footer>

			{/* Login Modal */}
			{showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
		</div>
	);
}
