// src/pages/Login.jsx
import { useNavigate } from 'react-router-dom'; // 1. Import the hook

export default function Login() {
  const navigate = useNavigate(); // 2. Initialize the navigation tool

  // 3. Create a function that runs when the button is clicked
  const handleLogin = () => {
    // Note: Later, we will check the username/password here using Node.js.
    // For now, since we are just building the UI, we will skip straight to the dashboard!
    navigate('/dashboard'); 
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2>Login to Quiz App</h2>
        <div className="input-group">
          <input type="text" placeholder="Enter Username" />
        </div>
        <div className="input-group">
          <input type="password" placeholder="Enter Password" />
        </div>
        
        {/* 4. Attach the function to the button's onClick event */}
        <button className="primary-btn" onClick={handleLogin}>
          Start Learning
        </button>
      </div>
    </div>
  );
}