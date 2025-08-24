import React, { useState } from 'react';
import PharmaSyncLanding from './components/PharmaSyncLanding';
import PharmacyLogin from './components/PharmacyLogin';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  return (
    <div className="App">
      {currentPage === 'landing' ? (
        <PharmaSyncLanding onNavigateToLogin={() => setCurrentPage('login')} />
      ) : (
        <PharmacyLogin />
      )}
    </div>
  );
}

export default App;