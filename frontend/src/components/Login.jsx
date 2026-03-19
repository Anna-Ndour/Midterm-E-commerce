import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(`Welcome back, ${data.user.username}!`);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      navigate('/');
    } else {
      alert(data.error || "Login failed");
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("Impossible to connect to the server.");
  }
   

  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '20px' }}>Welcome Back</h2>
        <p style={{ textAlign: 'center', color: '#7f8c8d', marginBottom: '30px' }}>
          Please enter your details to sign in.
        </p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Email Address</label>
            <input 
              type="email" 
              placeholder="name@company.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              style={inputStyle} 
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              style={inputStyle} 
            />
          </div>

          <button type="submit" style={buttonStyle}>
            Sign In
          </button>

          <div style={{ textAlign: 'center', marginTop: '15px' }}>
            <a href="#" style={{ color: '#3498db', textDecoration: 'none', fontSize: '0.9rem' }}>
              Forgot password?
            </a>
          </div>
        </form>

        <div style={{ textAlign: 'center', marginTop: '30px', color: '#7f8c8d' }}>
          Don't have an account?{' '}
          <span 
            onClick={() => navigate('/signup')} 
            style={{ color: '#3498db', cursor: 'pointer', fontWeight: 'bold' }}>
            Sign Up
          </span>
        </div>
        
      </div>
    </div>
  );
}


const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  padding: '40px 20px',
  backgroundColor: '#f4f7f6'
};

const cardStyle = {
  backgroundColor: 'white',
  padding: '40px',
  borderRadius: '15px',
  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: '400px'
};

const inputGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px'
};

const labelStyle = {
  fontSize: '0.9rem',
  fontWeight: 'bold',
  color: '#34495e'
};

const inputStyle = {
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #dcdde1',
  fontSize: '1rem',
  outline: 'none',
  transition: 'border-color 0.3s'
};

const buttonStyle = {
  backgroundColor: '#3498db',
  color: 'white',
  border: 'none',
  padding: '14px',
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginTop: '10px',
  transition: 'background 0.3s'
};

export default Login;