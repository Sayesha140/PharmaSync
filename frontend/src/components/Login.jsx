import React, { useState } from 'react';

const PharmacyLogin = ({ onNavigateToLanding }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    console.log('Login attempt:', formData);
    // Add your login logic here
  };

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    fontFamily: 'Arial, sans-serif'
  };

  const leftSectionStyle = {
    width: '40%',
    backgroundColor: '#0B2D14',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '48px',
    position: 'relative',
    overflow: 'hidden'
  };

  const rightSectionStyle = {
    width: '60%',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '48px'
  };

  const welcomeTextStyle = {
    textAlign: 'center',
    marginBottom: '32px',
    zIndex: 10
  };

  const welcomeTitleStyle = {
    fontSize: '36px',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '16px',
    margin: 0
  };

  const welcomeSubtitleStyle = {
    color: '#D1FAE5',
    fontSize: '18px',
    lineHeight: '1.5',
    margin: 0
  };

  const imageContainerStyle = {
    backgroundColor: 'white',
    borderRadius: '24px',
    padding: '32px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    maxWidth: '320px',
    zIndex: 10
  };

  const placeholderStyle = {
    width: '100%',
    height: '256px',
    backgroundColor: '#F3F4F6',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color: '#6B7280'
  };

  const formContainerStyle = {
    width: '100%',
    maxWidth: '384px'
  };

  const formTitleStyle = {
    fontSize: '28px',
    fontWeight: '600',
    color: '#4C4646',
    textAlign: 'center',
    marginBottom: '32px',
    margin: '0 0 32px 0'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #F5F5F5',
    borderRadius: '12px',
    backgroundColor: '#F5F5F5',
    color: '#4C4646',
    fontSize: '16px',
    marginBottom: '24px',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box'
  };

  const checkboxContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '24px'
  };

  const checkboxStyle = {
    height: '16px',
    width: '16px',
    accentColor: '#0B2D14',
    marginRight: '8px'
  };

  const checkboxLabelStyle = {
    color: '#595252',
    fontSize: '16px'
  };

  const loginButtonStyle = {
    width: '100%',
    backgroundColor: '#0B2D14',
    color: 'white',
    padding: '12px 16px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    transition: 'opacity 0.3s ease',
    marginBottom: '24px'
  };

  const forgotPasswordStyle = {
    textAlign: 'center'
  };

  const forgotPasswordLinkStyle = {
    color: '#0B2D14',
    fontSize: '14px',
    textDecoration: 'none',
    transition: 'opacity 0.3s ease'
  };

  return (
    <div style={containerStyle}>
      {/* Left Section - Green Background */}
      <div style={leftSectionStyle}>
        {/* Welcome Text */}
        <div style={welcomeTextStyle}>
          <h1 style={welcomeTitleStyle}>Welcome Back!!</h1>
          <p style={welcomeSubtitleStyle}>
            you can sign in to access with your<br />
            existing account.
          </p>
        </div>

        {/* Pharmacy Illustration Container */}
        <div style={imageContainerStyle}>
          {/* Placeholder for your pharmacy image */}
          <div style={placeholderStyle}>
            <svg width="64" height="64" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <p style={{fontSize: '14px', textAlign: 'center', margin: '8px 0 0 0'}}>
              Add your pharmacy<br />illustration here
            </p>
          </div>
          
          {/* Uncomment and use this when you add your image */}
          {/* 
          <img 
            src="/pharmacist-bro.png" 
            alt="Pharmacy illustration" 
            style={{width: '100%', height: '256px', objectFit: 'contain', borderRadius: '8px'}}
          />
          */}
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div style={rightSectionStyle}>
        <div style={formContainerStyle}>
          <h2 style={formTitleStyle}>Login Your Account</h2>

          <div>
            {/* Username/Email Field */}
            <input
              type="text"
              name="username"
              placeholder="Username or Email Address"
              value={formData.username}
              onChange={handleInputChange}
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#0B2D14'}
              onBlur={(e) => e.target.style.borderColor = '#F5F5F5'}
            />

            {/* Password Field */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#0B2D14'}
              onBlur={(e) => e.target.style.borderColor = '#F5F5F5'}
            />

            {/* Remember Me Checkbox */}
            <div style={checkboxContainerStyle}>
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                style={checkboxStyle}
              />
              <label htmlFor="rememberMe" style={checkboxLabelStyle}>
                Remember Me
              </label>
            </div>

            {/* Login Button */}
            <button
              onClick={handleSubmit}
              style={loginButtonStyle}
              onMouseOver={(e) => e.target.style.opacity = '0.9'}
              onMouseOut={(e) => e.target.style.opacity = '1'}
            >
              LOGIN
            </button>
          </div>

          {/* Additional Links */}
          <div style={forgotPasswordStyle}>
            <a 
              href="#" 
              style={forgotPasswordLinkStyle}
              onMouseOver={(e) => e.target.style.opacity = '0.8'}
              onMouseOut={(e) => e.target.style.opacity = '1'}
            >
              Forgot your password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyLogin;