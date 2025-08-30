import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

function Login() {
  const [formData, setFormData] = useState({
    text: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Lógica de autenticación simple
    if (formData.text && formData.password) {
      setIsAuthenticated(true);
    }
  };

  if (isAuthenticated) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Welcome mr.Juan Varco</h2>
        <button onClick={() => setIsAuthenticated(false)}>
          Close
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h1>My parking</h1>
      <h2>Login</h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>User:</label>
          <input
            type="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>password:</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', marginTop: '5px' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: '10px', top: '50%' }}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button 
          type="submit"
          style={{ 
            width: '100%', 
            padding: '12px', 
            backgroundColor: '#007bff', 
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Start
        </button>
      </form>
    </div>
  );
}

export default Login;