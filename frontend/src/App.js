import React, { useState } from 'react';
import PharmaSyncLanding from './components/PharmaSyncLanding';
import PharmacyLogin from './components/Login';
import PharmacyDashboard from './components/PharmacyDashboard';
import PharmacyMedicine from './components/PharmacyMedicine';
import PharmacyPurchase from './components/PharmacyPurchase';
import PharmacyInventory from './components/PharmacyInventory';
import PharmacySupplier from './components/PharmacySupplier';
import PharmacySales from './components/PharmacySales';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedMenu, setSelectedMenu] = useState('Dashboard');

  const navigateToLogin = () => {
    setCurrentPage('login');
  };

  const navigateToDashboard = () => {
    setCurrentPage('dashboard');
    setSelectedMenu('Dashboard');
  };

  const handleMenuNavigation = (menuItem) => {
    setSelectedMenu(menuItem);
    if (menuItem === 'Dashboard') {
      setCurrentPage('dashboard');
    } else if (menuItem === 'Medicine') {
      setCurrentPage('medicine');
    } else if (menuItem === 'Purchase') {
      setCurrentPage('purchase');
    } else if (menuItem === 'Inventory') {
      setCurrentPage('inventory');
    } else if (menuItem === 'Supplier') {
      setCurrentPage('supplier');
    } else if (menuItem === 'Sales') {
      setCurrentPage('sales');
    }
  };

  return (
    <div className="App">
      {currentPage === 'landing' && (
        <PharmaSyncLanding onNavigateToLogin={navigateToLogin} />
      )}
      {currentPage === 'login' && (
        <PharmacyLogin onNavigateToDashboard={navigateToDashboard} />
      )}
      {currentPage === 'dashboard' && (
        <PharmacyDashboard 
          selectedMenu={selectedMenu}
          setSelectedMenu={handleMenuNavigation}
        />
      )}
      {currentPage === 'medicine' && (
        <PharmacyMedicine 
          selectedMenu={selectedMenu}
          setSelectedMenu={handleMenuNavigation}
        />
      )}
      {currentPage === 'purchase' && (
        <PharmacyPurchase 
          selectedMenu={selectedMenu}
          setSelectedMenu={handleMenuNavigation}
        />
      )}
      {currentPage === 'inventory' && (
        <PharmacyInventory 
          selectedMenu={selectedMenu}
          setSelectedMenu={handleMenuNavigation}
        />
      )}
      {currentPage === 'supplier' && (
        <PharmacySupplier 
          selectedMenu={selectedMenu}
          setSelectedMenu={handleMenuNavigation}
        />
      )}
      {currentPage === 'sales' && (
        <PharmacySales 
          selectedMenu={selectedMenu}
          setSelectedMenu={handleMenuNavigation}
        />
      )}
    </div>
  );
}

export default App;