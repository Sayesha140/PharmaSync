import React, { useState } from 'react';

const PharmacySales = ({ selectedMenu, setSelectedMenu }) => {
  const [sales, setSales] = useState([
    {
      id: 1,
      saleDate: '2024-08-25',
      totalAmount: 847.50,
      items: [
        { medicineId: 1, medicineName: 'Paracetamol', quantity: 3, unitPrice: 25.50, subtotal: 76.50 },
        { medicineId: 6, medicineName: 'Omeprazole', quantity: 2, unitPrice: 95.00, subtotal: 190.00 },
        { medicineId: 9, medicineName: 'Atorvastatin', quantity: 1, unitPrice: 85.00, subtotal: 85.00 }
      ]
    },
    {
      id: 2,
      saleDate: '2024-08-25',
      totalAmount: 1250.75,
      items: [
        { medicineId: 18, medicineName: 'Azithromycin', quantity: 1, unitPrice: 195.00, subtotal: 195.00 },
        { medicineId: 15, medicineName: 'Fluticasone', quantity: 2, unitPrice: 220.00, subtotal: 440.00 },
        { medicineId: 14, medicineName: 'Sertraline', quantity: 4, unitPrice: 150.00, subtotal: 600.00 }
      ]
    },
    {
      id: 3,
      saleDate: '2024-08-24',
      totalAmount: 523.25,
      items: [
        { medicineId: 7, medicineName: 'Metformin', quantity: 5, unitPrice: 15.75, subtotal: 78.75 },
        { medicineId: 8, medicineName: 'Lisinopril', quantity: 3, unitPrice: 32.25, subtotal: 96.75 },
        { medicineId: 10, medicineName: 'Amlodipine', quantity: 4, unitPrice: 28.00, subtotal: 112.00 }
      ]
    },
    {
      id: 4,
      saleDate: '2024-08-24',
      totalAmount: 892.00,
      items: [
        { medicineId: 16, medicineName: 'Ciprofloxacin', quantity: 2, unitPrice: 65.00, subtotal: 130.00 },
        { medicineId: 21, medicineName: 'Salbutamol', quantity: 3, unitPrice: 165.00, subtotal: 495.00 },
        { medicineId: 12, medicineName: 'Montelukast', quantity: 1, unitPrice: 125.00, subtotal: 125.00 }
      ]
    },
    {
      id: 5,
      saleDate: '2024-08-23',
      totalAmount: 376.50,
      items: [
        { medicineId: 1, medicineName: 'Paracetamol', quantity: 6, unitPrice: 25.50, subtotal: 153.00 },
        { medicineId: 4, medicineName: 'Cetirizine', quantity: 8, unitPrice: 12.00, subtotal: 96.00 },
        { medicineId: 13, medicineName: 'Loratadine', quantity: 4, unitPrice: 18.75, subtotal: 75.00 }
      ]
    }
  ]);

  const [showNewSaleForm, setShowNewSaleForm] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  // Available medicines for new sale
  const availableMedicines = [
    { id: 1, name: 'Paracetamol', price: 25.50, stock: 150 },
    { id: 4, name: 'Cetirizine', price: 12.00, stock: 75 },
    { id: 6, name: 'Omeprazole', price: 95.00, stock: 89 },
    { id: 7, name: 'Metformin', price: 15.75, stock: 45 },
    { id: 8, name: 'Lisinopril', price: 32.25, stock: 67 },
    { id: 9, name: 'Atorvastatin', price: 85.00, stock: 23 },
    { id: 10, name: 'Amlodipine', price: 28.00, stock: 34 },
    { id: 12, name: 'Montelukast', price: 125.00, stock: 18 },
    { id: 13, name: 'Loratadine', price: 18.75, stock: 41 },
    { id: 14, name: 'Sertraline', price: 150.00, stock: 29 },
    { id: 15, name: 'Fluticasone', price: 220.00, stock: 62 },
    { id: 16, name: 'Ciprofloxacin', price: 65.00, stock: 38 },
    { id: 18, name: 'Azithromycin', price: 195.00, stock: 91 },
    { id: 21, name: 'Salbutamol', price: 165.00, stock: 26 }
  ];

  // Styles
  const containerStyle = {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
    overflow: 'hidden'
  };

  const sidebarStyle = {
    width: '160px',
    backgroundColor: '#0B2D14',
    display: 'flex',
    flexDirection: 'column',
    padding: '15px 0',
    flexShrink: 0
  };

  const logoStyle = {
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    padding: '0 15px',
    marginBottom: '20px',
    fontFamily: 'Amita, serif'
  };

  const menuItemStyle = (isSelected) => ({
    color: isSelected ? '#0B2D14' : 'white',
    backgroundColor: isSelected ? 'white' : 'transparent',
    padding: '8px 15px',
    cursor: 'pointer',
    fontSize: '13px',
    border: 'none',
    textAlign: 'left',
    transition: 'all 0.3s ease',
    margin: '1px 8px',
    borderRadius: '3px'
  });

  const mainContentStyle = {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: '15px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  };

  const headerStyle = {
    backgroundColor: 'white',
    padding: '15px 20px',
    borderRadius: '6px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    marginBottom: '15px',
    flexShrink: 0
  };

  const headerTopStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px'
  };

  const titleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1F2937',
    margin: 0
  };

  const addButtonStyle = {
    backgroundColor: '#37A000',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500'
  };

  const subtitleStyle = {
    fontSize: '12px',
    color: '#6B7280',
    margin: '0 0 15px 0'
  };

  const searchRowStyle = {
    display: 'flex',
    gap: '15px',
    alignItems: 'center'
  };

  const searchInputStyle = {
    flex: 1,
    padding: '8px 12px',
    border: '1px solid #D1D5DB',
    borderRadius: '4px',
    fontSize: '13px',
    outline: 'none'
  };

  const selectStyle = {
    padding: '8px 12px',
    border: '1px solid #D1D5DB',
    borderRadius: '4px',
    fontSize: '13px',
    backgroundColor: 'white',
    minWidth: '120px'
  };

  const tableContainerStyle = {
    backgroundColor: 'white',
    borderRadius: '6px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    flex: 1,
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '12px',
    tableLayout: 'fixed'
  };

  const tableHeaderStyle = {
    backgroundColor: '#F9FAFB',
    padding: '10px 8px',
    textAlign: 'left',
    fontWeight: '600',
    color: '#374151',
    fontSize: '11px',
    borderBottom: '1px solid #E5E7EB',
    position: 'sticky',
    top: 0
  };

  const tableCellStyle = {
    padding: '10px 8px',
    borderBottom: '1px solid #E5E7EB',
    color: '#1F2937',
    fontSize: '11px',
    verticalAlign: 'top',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };

  const actionButtonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    margin: '0 2px',
    color: '#6B7280'
  };

  const paginationStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 15px',
    borderTop: '1px solid #E5E7EB',
    flexShrink: 0
  };

  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  };

  const modalContentStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    width: '90%',
    maxWidth: '800px',
    maxHeight: '90vh',
    overflow: 'auto'
  };

  const inputStyle = {
    padding: '8px 12px',
    border: '1px solid #D1D5DB',
    borderRadius: '4px',
    fontSize: '13px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    fontSize: '12px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '4px',
    display: 'block'
  };

  const formatCurrency = (amount) => {
    return `৳${amount.toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const NewSaleForm = ({ onSave, onCancel }) => {
    const [saleItems, setSaleItems] = useState([]);
    const [selectedMedicine, setSelectedMedicine] = useState('');
    const [quantity, setQuantity] = useState(1);

    const addMedicine = () => {
      if (!selectedMedicine) return;
      
      const medicine = availableMedicines.find(m => m.id === parseInt(selectedMedicine));
      if (!medicine) return;
      
      if (quantity > medicine.stock) {
        alert('Insufficient stock');
        return;
      }

      const existingItem = saleItems.find(item => item.medicineId === medicine.id);
      if (existingItem) {
        alert('Medicine already added to this sale');
        return;
      }

      const newItem = {
        medicineId: medicine.id,
        medicineName: medicine.name,
        quantity: quantity,
        unitPrice: medicine.price,
        subtotal: quantity * medicine.price
      };

      setSaleItems([...saleItems, newItem]);
      setSelectedMedicine('');
      setQuantity(1);
    };

    const removeItem = (medicineId) => {
      setSaleItems(saleItems.filter(item => item.medicineId !== medicineId));
    };

    const getTotalAmount = () => {
      return saleItems.reduce((total, item) => total + item.subtotal, 0);
    };

    const handleSave = () => {
      if (saleItems.length === 0) {
        alert('Please add at least one medicine to the sale');
        return;
      }

      const newSale = {
        id: Date.now(),
        saleDate: new Date().toISOString().split('T')[0],
        totalAmount: getTotalAmount(),
        items: saleItems
      };

      onSave(newSale);
    };

    return (
      <div style={modalStyle}>
        <div style={modalContentStyle}>
          <h3 style={{margin: '0 0 20px 0', fontSize: '18px'}}>New Sale</h3>
          
          {/* Add Medicine Section */}
          <div style={{marginBottom: '20px', padding: '15px', backgroundColor: '#F9FAFB', borderRadius: '6px'}}>
            <h4 style={{margin: '0 0 15px 0', fontSize: '14px'}}>Add Medicine</h4>
            <div style={{display: 'flex', gap: '10px', alignItems: 'end'}}>
              <div style={{flex: 2}}>
                <label style={labelStyle}>Medicine</label>
                <select
                  style={inputStyle}
                  value={selectedMedicine}
                  onChange={(e) => setSelectedMedicine(e.target.value)}
                >
                  <option value="">Select Medicine</option>
                  {availableMedicines.map(med => (
                    <option key={med.id} value={med.id}>
                      {med.name} (Stock: {med.stock}) - {formatCurrency(med.price)}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{flex: 1}}>
                <label style={labelStyle}>Quantity</label>
                <input
                  style={inputStyle}
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                />
              </div>
              <button
                onClick={addMedicine}
                style={{
                  ...addButtonStyle,
                  height: '36px'
                }}
              >
                Add
              </button>
            </div>
          </div>

          {/* Sale Items */}
          {saleItems.length > 0 && (
            <div style={{marginBottom: '20px'}}>
              <h4 style={{margin: '0 0 10px 0', fontSize: '14px'}}>Sale Items</h4>
              <table style={{...tableStyle, marginBottom: '10px'}}>
                <thead>
                  <tr>
                    <th style={{...tableHeaderStyle, width: '30%'}}>Medicine</th>
                    <th style={{...tableHeaderStyle, width: '15%'}}>Quantity</th>
                    <th style={{...tableHeaderStyle, width: '20%'}}>Unit Price</th>
                    <th style={{...tableHeaderStyle, width: '20%'}}>Subtotal</th>
                    <th style={{...tableHeaderStyle, width: '15%'}}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {saleItems.map((item) => (
                    <tr key={item.medicineId}>
                      <td style={tableCellStyle}>{item.medicineName}</td>
                      <td style={tableCellStyle}>{item.quantity}</td>
                      <td style={tableCellStyle}>{formatCurrency(item.unitPrice)}</td>
                      <td style={tableCellStyle}>{formatCurrency(item.subtotal)}</td>
                      <td style={tableCellStyle}>
                        <button
                          onClick={() => removeItem(item.medicineId)}
                          style={{...actionButtonStyle, color: '#DC2626'}}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div style={{textAlign: 'right', fontSize: '14px', fontWeight: 'bold'}}>
                Total Amount: {formatCurrency(getTotalAmount())}
              </div>
            </div>
          )}

          <div style={{display: 'flex', gap: '10px', justifyContent: 'flex-end'}}>
            <button
              onClick={onCancel}
              style={{
                padding: '8px 16px',
                border: '1px solid #D1D5DB',
                borderRadius: '4px',
                backgroundColor: 'white',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              style={{
                padding: '8px 16px',
                backgroundColor: '#37A000',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Complete Sale
            </button>
          </div>
        </div>
      </div>
    );
  };

  const SaleDetailsModal = ({ sale, onClose }) => {
    return (
      <div style={modalStyle}>
        <div style={modalContentStyle}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
            <h3 style={{margin: 0, fontSize: '18px'}}>Sale Details - #{sale.id}</h3>
            <button onClick={onClose} style={{...actionButtonStyle, fontSize: '18px'}}>×</button>
          </div>

          <div style={{marginBottom: '20px', padding: '15px', backgroundColor: '#F9FAFB', borderRadius: '6px'}}>
            <div style={{display: 'flex', gap: '30px'}}>
              <div>
                <strong>Sale Date:</strong> {formatDate(sale.saleDate)}
              </div>
              <div>
                <strong>Total Amount:</strong> {formatCurrency(sale.totalAmount)}
              </div>
              <div>
                <strong>Items:</strong> {sale.items.length}
              </div>
            </div>
          </div>

          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={{...tableHeaderStyle, width: '35%'}}>Medicine Name</th>
                <th style={{...tableHeaderStyle, width: '15%'}}>Quantity</th>
                <th style={{...tableHeaderStyle, width: '25%'}}>Unit Price</th>
                <th style={{...tableHeaderStyle, width: '25%'}}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {sale.items.map((item, index) => (
                <tr key={index}>
                  <td style={tableCellStyle}>{item.medicineName}</td>
                  <td style={tableCellStyle}>{item.quantity}</td>
                  <td style={tableCellStyle}>{formatCurrency(item.unitPrice)}</td>
                  <td style={tableCellStyle}>{formatCurrency(item.subtotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const handleNewSale = (newSale) => {
    setSales([newSale, ...sales]);
    setShowNewSaleForm(false);
  };

  const filteredSales = sales.filter(sale => {
    const matchesSearch = sale.items.some(item => 
      item.medicineName.toLowerCase().includes(searchTerm.toLowerCase())
    ) || sale.id.toString().includes(searchTerm);
    
    const matchesDate = !dateFilter || sale.saleDate === dateFilter;
    
    return matchesSearch && matchesDate;
  });

  return (
    <div style={containerStyle}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <div style={logoStyle}>PharmaSync</div>
        
        {['Dashboard', 'Medicine', 'Purchase', 'Inventory', 'Supplier', 'Sales'].map((item) => (
          <button
            key={item}
            style={menuItemStyle(selectedMenu === item)}
            onClick={() => setSelectedMenu(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div style={mainContentStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div style={headerTopStyle}>
            <h1 style={titleStyle}>Sales Management</h1>
            <button 
              style={addButtonStyle}
              onClick={() => setShowNewSaleForm(true)}
            >
              New Sale
            </button>
          </div>
          <p style={subtitleStyle}>Showing {filteredSales.length} of {sales.length} sales transactions</p>
          
          <div style={searchRowStyle}>
            <input
              style={searchInputStyle}
              placeholder="Search by sale ID or medicine name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <input
              style={selectStyle}
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div style={tableContainerStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={{...tableHeaderStyle, width: '10%'}}>Sale ID</th>
                <th style={{...tableHeaderStyle, width: '15%'}}>Date</th>
                <th style={{...tableHeaderStyle, width: '45%'}}>Items</th>
                <th style={{...tableHeaderStyle, width: '15%'}}>Total Amount</th>
                <th style={{...tableHeaderStyle, width: '15%'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map((sale) => (
                <tr key={sale.id}>
                  <td style={tableCellStyle}>
                    <div style={{fontWeight: '600', color: '#1F2937'}}>#{sale.id}</div>
                  </td>
                  <td style={tableCellStyle}>{formatDate(sale.saleDate)}</td>
                  <td style={tableCellStyle}>
                    <div style={{fontWeight: '600', marginBottom: '2px'}}>
                      {sale.items.length} item{sale.items.length > 1 ? 's' : ''}
                    </div>
                    <div style={{fontSize: '10px', color: '#6B7280'}}>
                      {sale.items[0].medicineName}
                      {sale.items.length > 1 && ` +${sale.items.length - 1} more`}
                    </div>
                  </td>
                  <td style={tableCellStyle}>
                    <div style={{fontWeight: '600', color: '#0B2D14'}}>
                      {formatCurrency(sale.totalAmount)}
                    </div>
                  </td>
                  <td style={tableCellStyle}>
                    <button 
                      style={{...actionButtonStyle, color: '#0B2D14'}}
                      onClick={() => setSelectedSale(sale)}
                      title="View Details"
                    >
                      📋
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={paginationStyle}>
            <span style={{fontSize: '12px', color: '#6B7280'}}>
              Showing 1 to {filteredSales.length} of {sales.length} entries
            </span>
            <div style={{display: 'flex', gap: '5px'}}>
              <button style={{
                padding: '4px 8px',
                border: '1px solid #D1D5DB',
                backgroundColor: 'white',
                borderRadius: '3px',
                fontSize: '11px',
                cursor: 'pointer'
              }}>Previous</button>
              <button style={{
                padding: '4px 8px',
                border: '1px solid #37A000',
                backgroundColor: '#37A000',
                color: 'white',
                borderRadius: '3px',
                fontSize: '11px'
              }}>1</button>
              <button style={{
                padding: '4px 8px',
                border: '1px solid #D1D5DB',
                backgroundColor: 'white',
                borderRadius: '3px',
                fontSize: '11px',
                cursor: 'pointer'
              }}>Next</button>
            </div>
          </div>
        </div>

        {/* Modals */}
        {showNewSaleForm && (
          <NewSaleForm
            onSave={handleNewSale}
            onCancel={() => setShowNewSaleForm(false)}
          />
        )}

        {selectedSale && (
          <SaleDetailsModal
            sale={selectedSale}
            onClose={() => setSelectedSale(null)}
          />
        )}
      </div>
    </div>
  );
};

export default PharmacySales;