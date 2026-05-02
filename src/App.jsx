// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Quizboard from './pages/quizboard';
import Results from './pages/results';
import './App.css';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/login" element={<Login />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/quiz" element={<Quizboard />} />
				<Route path="/results" element={<Results />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
