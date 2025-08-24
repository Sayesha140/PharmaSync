import React from 'react';

const PharmaSyncLanding = ({ onNavigateToLogin }) => {
  const containerStyle = {
    height: '100vh',
    background: 'linear-gradient(180deg, #F9F9F9 0%, #D0ECD7 100%)',
    margin: 0,
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column'
  };

  const navStyle = {
    width: '100%',
    padding: '12px 32px',
    backgroundColor: '#C0DFC9'
  };

  const navContainerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  };

  const navLinksStyle = {
    display: 'flex',
    gap: '32px',
    listStyle: 'none',
    margin: 0,
    padding: 0
  };

  const navLinkStyle = {
    color: '#374151',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '14px',
    cursor: 'pointer'
  };

  const heroStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px 32px',
    flex: 1,
    width: '100%',
    boxSizing: 'border-box'
  };

  const leftContentStyle = {
    width: '45%',
    paddingRight: '40px'
  };

  const logoContainerStyle = {
    display: 'inline-block',
    padding: '16px 48px',
    borderRadius: '50px',
    backgroundColor: '#C0DFC9',
    marginBottom: '24px'
  };

  const titleStyle = {
    fontSize: '48px',
    fontWeight: 'bold',
    color: 'black',
    fontStyle: 'italic',
    margin: 0,
    fontFamily: 'Amita, serif'
  };

  const descriptionStyle = {
    color: '#374151',
    fontSize: '16px',
    lineHeight: '1.5',
    marginBottom: '24px',
    maxWidth: '400px'
  };

  const buttonStyle = {
    backgroundColor: 'black',
    color: 'white',
    padding: '10px 24px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer'
  };

  const rightContentStyle = {
    width: '55%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const imageContainerStyle = {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const backgroundCircleStyle = {
    position: 'absolute',
    width: '300px',
    height: '300px',
    backgroundColor: '#C0DFC9',
    borderRadius: '50%',
    opacity: 0.3,
    top: '-60px',
    left: '-60px',
    zIndex: 0
  };

  const imageBoxStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    width: '280px',
    position: 'relative',
    zIndex: 1
  };

  const imageStyle = {
    width: '100%',
    height: '180px',
    objectFit: 'contain',
    borderRadius: '4px'
  };

  const footerStyle = {
    padding: '16px 0',
    textAlign: 'center'
  };

  const footerTextStyle = {
    color: '#6B7280',
    fontSize: '14px',
    margin: 0
  };

  return (
    <div style={containerStyle}>
      {/* Navigation Bar */}
      <nav style={navStyle}>
        <div style={navContainerStyle}>
          <div style={navLinksStyle}>
            <a href="#" style={navLinkStyle}>ABOUT US</a>
            <a href="#" style={navLinkStyle}>FEATURES</a>
            <a href="#" style={navLinkStyle}>CONTACT</a>
            <a onClick={onNavigateToLogin} style={navLinkStyle}>LOG IN</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={heroStyle}>
        {/* Left Content */}
        <div style={leftContentStyle}>
          <div style={logoContainerStyle}>
            <h1 style={titleStyle}>PharmaSync</h1>
          </div>

          <p style={descriptionStyle}>
            PharmaSync handles the complex stuff automatically—expired medicine alerts, stock monitoring, and supplier coordination—so you never have to worry about safety violations or running out of essential medicines.
          </p>

          <button style={buttonStyle} onClick={() => console.log('Get Started clicked')}>
            GET STARTED
          </button>
        </div>

        {/* Right Content - Pharmacy Illustration */}
        <div style={rightContentStyle}>
          <div style={imageContainerStyle}>
            <div style={backgroundCircleStyle}></div>
            <div style={imageBoxStyle}>
              <img 
                src="/pharmacist-bro.png" 
                alt="Pharmacy illustration" 
                style={imageStyle}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={footerStyle}>
        <p style={footerTextStyle}>
          © 2025 PharmaSync. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default PharmaSyncLanding;