// AI-GEN START - OpenAI GPT-4
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Home.css'; // Ensure this path is correct

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  profilePictureUrl?: string;
}

const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.error('You must be logged in to view this page.');
      navigate('/login');
    } else {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        toast.error('Failed to fetch user data. Please try again.');
        navigate('/login');
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleData = () => {
    navigate('/data');
  };

  return (
    <div className="home-page">
      <video autoPlay muted loop className="home-video">
        <source src="/Home.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
      <div className="home-content">
        <h2>Home Page</h2>
        {user && (
          <div>
            <p><strong>Welcome,</strong> <em><u>{user.name}</u></em></p>
            <p>You are logged in as <strong>{user.role}</strong>. How are you doing today?</p>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
        )}
        <div className="home-actions">
          <button onClick={handleLogout}>Logout</button>
          {user?.role === 'Admin' && (
            <form action="http://localhost:3000/adminPage" method="GET">
              <button type="submit">Go to Admin Page</button>
            </form>
          )}
          <button onClick={handleData}>Data</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
// AI-GEN END
