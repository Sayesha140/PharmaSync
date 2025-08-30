import React from 'react';

const PharmaSyncLanding = ({ onNavigateToLogin }) => {
  const containerStyle = {
    height: '100vh',
    background: 'linear-gradient(180deg, #F9F9F9 0%, #D0ECD7 100%)',
    margin: 0,
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  };

  const navStyle = {
    width: '100%',
    padding: '16px 32px',
    backgroundColor: '#C0DFC9',
    flexShrink: 0
  };

  const navContainerStyle = {
    maxWidth: '1400px',
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

  const contentStyle = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%',
    padding: '0 40px'
  };

  const leftContentStyle = {
    width: '40%',
    paddingLeft: '40px'
  };

  const logoContainerStyle = {
    display: 'inline-block',
    padding: '16px 50px',
    borderRadius: '50px',
    backgroundColor: '#C0DFC9',
    marginBottom: '30px'
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
    marginBottom: '30px',
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
    width: '60%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const imageStyle = {
    width: '500px',
    height: 'auto',
    objectFit: 'contain',
    opacity: 0.9,
    filter: 'brightness(0.95)'
  };

  const separatorStyle = {
    width: '100%',
    borderTop: '1px solid white',
    opacity: 0.5,
    flexShrink: 0
  };

  const footerStyle = {
    padding: '12px 0',
    textAlign: 'center',
    flexShrink: 0
  };

  const footerTextStyle = {
    color: '#6B7280',
    fontSize: '12px',
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

      {/* Main Content */}
      <div style={contentStyle}>
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

        {/* Right Content - Pharmacy Image */}
        <div style={rightContentStyle}>
          <img 
            src="/landing.png"
            alt="Pharmacy illustration" 
            style={imageStyle}
          />
        </div>
      </div>

      {/* White line separator */}
      <div style={separatorStyle}></div>

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