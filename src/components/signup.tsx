// AI-GEN START - OpenAI GPT-4
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Signup.css'; // Adjust the path as necessary

const Signup: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('User');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !password || !role || !profilePicture) {
      toast.error('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);
    formData.append('profilePicture', profilePicture);

    try {
      const response = await axios.post('http://localhost:3000/signUpUser', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        const user = { name, email, role, profilePictureUrl: response.data.profilePictureUrl }; // Construct the user object
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(user)); // Store user data
        toast.success('Signup successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast.error(response.data.message || 'Unexpected response from the server.');
      }
    } catch (err) {
      console.error("Error occurred:", err);
      if (axios.isAxiosError(err)) {
        if (err.response) {
          toast.error(err.response.data.message || 'Signup failed. Please try again.');
        } else if (err.request) {
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
    <div className="signup-page">
      <div className="background-overlay"></div>
      <h2 className="signup-header">Signup</h2>
      <div className="signup-container">
        <form onSubmit={handleSignup} className="signup-form">
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
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
          <label>
            Role:
            <select value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </label>
          <label>
            Profile Picture:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePicture(e.target.files ? e.target.files[0] : null)}
              required
            />
          </label>
          <button type="submit">Signup</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
// AI-GEN END
