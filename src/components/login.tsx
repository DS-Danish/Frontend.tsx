// AI-GEN START - OpenAI GPT-4
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Login.css'; // Ensure this path is correct

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/loginUser', { email, password });

      if (response.status === 200) {
        toast.success(response.data.message);
        localStorage.setItem('authToken', response.data.token);
        // Decode token to get user information
        const user = JSON.parse(atob(response.data.token.split('.')[1]));
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/home');
      } else {
        toast.error('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response.data.message || 'Login failed. Please try again.');
        } else if (error.request) {
          toast.error('No response received from the server. Please try again later.');
        } else {
          toast.error('Request error. Please try again.');
        }
      } else {
        toast.error('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="login-page">
      <h2 className="login-header">Login</h2>
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Login</button>
          <p className="signup-link">Don't have an account? <Link to="/signup">Signup here</Link></p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
// AI-GEN END
