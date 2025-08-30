import React, { useState } from 'react';

const PharmacyPurchase = ({ selectedMenu, setSelectedMenu }) => {
  const [purchases, setPurchases] = useState([
    {
      id: 1,
      supplierId: 1,
      supplierName: 'MedSupply Co.',
      purchaseDate: '2024-08-25',
      totalAmount: 12500.00,
      items: [
        { medicineId: 1, medicineName: 'Paracetamol', boxQuantity: 10, unitsPerBox: 20, costPerBox: 500.00, batchNo: 'PC001', expiryDate: '2025-08-25' },
        { medicineId: 4, medicineName: 'Cetirizine', boxQuantity: 5, unitsPerBox: 10, costPerBox: 250.00, batchNo: 'CT001', expiryDate: '2025-09-15' }
      ]
    },
    {
      id: 2,
      supplierId: 2,
      supplierName: 'PharmaCorp Ltd.',
      purchaseDate: '2024-08-24',
      totalAmount: 18750.00,
      items: [
        { medicineId: 2, medicineName: 'Amoxicillin', boxQuantity: 8, unitsPerBox: 15, costPerBox: 1200.00, batchNo: 'AM002', expiryDate: '2025-07-20' },
        { medicineId: 6, medicineName: 'Metformin', boxQuantity: 15, unitsPerBox: 30, costPerBox: 450.00, batchNo: 'MF003', expiryDate: '2025-12-10' }
      ]
    },
    {
      id: 3,
      supplierId: 3,
      supplierName: 'HealthPlus Inc.',
      purchaseDate: '2024-08-23',
      totalAmount: 8900.00,
      items: [
        { medicineId: 3, medicineName: 'Ibuprofen', boxQuantity: 12, unitsPerBox: 25, costPerBox: 350.00, batchNo: 'IB004', expiryDate: '2025-06-30' },
        { medicineId: 8, medicineName: 'Atorvastatin', boxQuantity: 6, unitsPerBox: 10, costPerBox: 800.00, batchNo: 'AT005', expiryDate: '2025-11-15' }
      ]
    }
  ]);

  const [showNewPurchaseForm, setShowNewPurchaseForm] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  // Available suppliers
  const availableSuppliers = [
    { id: 1, name: 'MedSupply Co.' },
    { id: 2, name: 'PharmaCorp Ltd.' },
    { id: 3, name: 'HealthPlus Inc.' },
    { id: 4, name: 'MediCore Solutions' },
    { id: 5, name: 'CardioMed Ltd.' }
  ];

  // Available medicines
  const availableMedicines = [
    { id: 1, name: 'Paracetamol', genericName: 'Acetaminophen' },
    { id: 2, name: 'Amoxicillin', genericName: 'Amoxicillin Trihydrate' },
    { id: 3, name: 'Ibuprofen', genericName: 'Ibuprofen' },
    { id: 4, name: 'Cetirizine', genericName: 'Cetirizine Hydrochloride' },
    { id: 5, name: 'Omeprazole', genericName: 'Omeprazole' },
    { id: 6, name: 'Metformin', genericName: 'Metformin Hydrochloride' },
    { id: 7, name: 'Lisinopril', genericName: 'Lisinopril' },
    { id: 8, name: 'Atorvastatin', genericName: 'Atorvastatin Calcium' }
  ];

  // Styles (same as other pages)
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
    maxWidth: '900px',
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

  const NewPurchaseForm = ({ onSave, onCancel }) => {
    const [selectedSupplier, setSelectedSupplier] = useState('');
    const [purchaseItems, setPurchaseItems] = useState([]);
    const [selectedMedicine, setSelectedMedicine] = useState('');
    const [itemData, setItemData] = useState({
      boxQuantity: 1,
      unitsPerBox: 1,
      costPerBox: 0,
      batchNo: '',
      expiryDate: ''
    });

    const addMedicineItem = () => {
      if (!selectedMedicine || !itemData.batchNo || !itemData.expiryDate) {
        alert('Please fill in all medicine details');
        return;
      }

      const medicine = availableMedicines.find(m => m.id === parseInt(selectedMedicine));
      if (!medicine) return;

      const existingItem = purchaseItems.find(item => item.medicineId === medicine.id && item.batchNo === itemData.batchNo);
      if (existingItem) {
        alert('Medicine with same batch number already added');
        return;
      }

      const newItem = {
        medicineId: medicine.id,
        medicineName: medicine.name,
        boxQuantity: itemData.boxQuantity,
        unitsPerBox: itemData.unitsPerBox,
        costPerBox: itemData.costPerBox,
        batchNo: itemData.batchNo,
        expiryDate: itemData.expiryDate,
        totalCost: itemData.boxQuantity * itemData.costPerBox
      };

      setPurchaseItems([...purchaseItems, newItem]);
      setSelectedMedicine('');
      setItemData({
        boxQuantity: 1,
        unitsPerBox: 1,
        costPerBox: 0,
        batchNo: '',
        expiryDate: ''
      });
    };

    const removeItem = (index) => {
      setPurchaseItems(purchaseItems.filter((_, i) => i !== index));
    };

    const getTotalAmount = () => {
      return purchaseItems.reduce((total, item) => total + item.totalCost, 0);
    };

    const handleSave = () => {
      if (!selectedSupplier) {
        alert('Please select a supplier');
        return;
      }
      if (purchaseItems.length === 0) {
        alert('Please add at least one medicine to the purchase');
        return;
      }

      const supplier = availableSuppliers.find(s => s.id === parseInt(selectedSupplier));
      const newPurchase = {
        id: Date.now(),
        supplierId: supplier.id,
        supplierName: supplier.name,
        purchaseDate: new Date().toISOString().split('T')[0],
        totalAmount: getTotalAmount(),
        items: purchaseItems
      };

      onSave(newPurchase);
    };

    return (
      <div style={modalStyle}>
        <div style={modalContentStyle}>
          <h3 style={{margin: '0 0 20px 0', fontSize: '18px'}}>New Purchase Order</h3>
          
          {/* Supplier Selection */}
          <div style={{marginBottom: '20px', padding: '15px', backgroundColor: '#F9FAFB', borderRadius: '6px'}}>
            <h4 style={{margin: '0 0 15px 0', fontSize: '14px'}}>Supplier Information</h4>
            <div style={{display: 'flex', gap: '15px'}}>
              <div style={{flex: 1}}>
                <label style={labelStyle}>Select Supplier</label>
                <select
                  style={inputStyle}
                  value={selectedSupplier}
                  onChange={(e) => setSelectedSupplier(e.target.value)}
                >
                  <option value="">Choose Supplier</option>
                  {availableSuppliers.map(supplier => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Add Medicine Section */}
          <div style={{marginBottom: '20px', padding: '15px', backgroundColor: '#F9FAFB', borderRadius: '6px'}}>
            <h4 style={{margin: '0 0 15px 0', fontSize: '14px'}}>Add Medicine</h4>
            <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '10px', marginBottom: '15px'}}>
              <div>
                <label style={labelStyle}>Medicine</label>
                <select
                  style={inputStyle}
                  value={selectedMedicine}
                  onChange={(e) => setSelectedMedicine(e.target.value)}
                >
                  <option value="">Select Medicine</option>
                  {availableMedicines.map(med => (
                    <option key={med.id} value={med.id}>
                      {med.name} ({med.genericName})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Box Quantity</label>
                <input
                  style={inputStyle}
                  type="number"
                  min="1"
                  value={itemData.boxQuantity}
                  onChange={(e) => setItemData({...itemData, boxQuantity: parseInt(e.target.value) || 1})}
                />
              </div>
              <div>
                <label style={labelStyle}>Units per Box</label>
                <input
                  style={inputStyle}
                  type="number"
                  min="1"
                  value={itemData.unitsPerBox}
                  onChange={(e) => setItemData({...itemData, unitsPerBox: parseInt(e.target.value) || 1})}
                />
              </div>
              <div>
                <label style={labelStyle}>Cost per Box (৳)</label>
                <input
                  style={inputStyle}
                  type="number"
                  step="0.01"
                  value={itemData.costPerBox}
                  onChange={(e) => setItemData({...itemData, costPerBox: parseFloat(e.target.value) || 0})}
                />
              </div>
            </div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', alignItems: 'end'}}>
              <div>
                <label style={labelStyle}>Batch Number</label>
                <input
                  style={inputStyle}
                  value={itemData.batchNo}
                  onChange={(e) => setItemData({...itemData, batchNo: e.target.value})}
                  placeholder="Enter batch number"
                />
              </div>
              <div>
                <label style={labelStyle}>Expiry Date</label>
                <input
                  style={inputStyle}
                  type="date"
                  value={itemData.expiryDate}
                  onChange={(e) => setItemData({...itemData, expiryDate: e.target.value})}
                />
              </div>
              <button
                onClick={addMedicineItem}
                style={{
                  ...addButtonStyle,
                  height: '36px'
                }}
              >
                Add to Purchase
              </button>
            </div>
          </div>

          {/* Purchase Items */}
          {purchaseItems.length > 0 && (
            <div style={{marginBottom: '20px'}}>
              <h4 style={{margin: '0 0 10px 0', fontSize: '14px'}}>Purchase Items</h4>
              <table style={{...tableStyle, marginBottom: '10px'}}>
                <thead>
                  <tr>
                    <th style={{...tableHeaderStyle, width: '25%'}}>Medicine</th>
                    <th style={{...tableHeaderStyle, width: '12%'}}>Boxes</th>
                    <th style={{...tableHeaderStyle, width: '12%'}}>Units/Box</th>
                    <th style={{...tableHeaderStyle, width: '15%'}}>Cost/Box</th>
                    <th style={{...tableHeaderStyle, width: '15%'}}>Batch</th>
                    <th style={{...tableHeaderStyle, width: '12%'}}>Expiry</th>
                    <th style={{...tableHeaderStyle, width: '9%'}}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseItems.map((item, index) => (
                    <tr key={index}>
                      <td style={tableCellStyle}>{item.medicineName}</td>
                      <td style={tableCellStyle}>{item.boxQuantity}</td>
                      <td style={tableCellStyle}>{item.unitsPerBox}</td>
                      <td style={tableCellStyle}>{formatCurrency(item.costPerBox)}</td>
                      <td style={tableCellStyle}>{item.batchNo}</td>
                      <td style={tableCellStyle}>{formatDate(item.expiryDate)}</td>
                      <td style={tableCellStyle}>
                        <button
                          onClick={() => removeItem(index)}
                          style={{...actionButtonStyle, color: '#DC2626'}}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div style={{textAlign: 'right', fontSize: '16px', fontWeight: 'bold', color: '#0B2D14'}}>
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
              Create Purchase Order
            </button>
          </div>
        </div>
      </div>
    );
  };

  const PurchaseDetailsModal = ({ purchase, onClose }) => {
    return (
      <div style={modalStyle}>
        <div style={modalContentStyle}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
            <h3 style={{margin: 0, fontSize: '18px'}}>Purchase Order Details - #{purchase.id}</h3>
            <button onClick={onClose} style={{...actionButtonStyle, fontSize: '18px'}}>×</button>
          </div>

          <div style={{marginBottom: '20px', padding: '15px', backgroundColor: '#F9FAFB', borderRadius: '6px'}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px'}}>
              <div>
                <strong>Supplier:</strong> {purchase.supplierName}
              </div>
              <div>
                <strong>Purchase Date:</strong> {formatDate(purchase.purchaseDate)}
              </div>
              <div>
                <strong>Total Amount:</strong> {formatCurrency(purchase.totalAmount)}
              </div>
            </div>
          </div>

          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={{...tableHeaderStyle, width: '20%'}}>Medicine</th>
                <th style={{...tableHeaderStyle, width: '12%'}}>Boxes</th>
                <th style={{...tableHeaderStyle, width: '12%'}}>Units/Box</th>
                <th style={{...tableHeaderStyle, width: '15%'}}>Cost/Box</th>
                <th style={{...tableHeaderStyle, width: '15%'}}>Batch</th>
                <th style={{...tableHeaderStyle, width: '12%'}}>Expiry</th>
                <th style={{...tableHeaderStyle, width: '14%'}}>Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {purchase.items.map((item, index) => (
                <tr key={index}>
                  <td style={tableCellStyle}>{item.medicineName}</td>
                  <td style={tableCellStyle}>{item.boxQuantity}</td>
                  <td style={tableCellStyle}>{item.unitsPerBox}</td>
                  <td style={tableCellStyle}>{formatCurrency(item.costPerBox)}</td>
                  <td style={tableCellStyle}>{item.batchNo}</td>
                  <td style={tableCellStyle}>{formatDate(item.expiryDate)}</td>
                  <td style={tableCellStyle}>{formatCurrency(item.boxQuantity * item.costPerBox)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const handleNewPurchase = (newPurchase) => {
    setPurchases([newPurchase, ...purchases]);
    setShowNewPurchaseForm(false);
  };

  const filteredPurchases = purchases.filter(purchase => {
    const matchesSearch = purchase.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         purchase.items.some(item => 
                           item.medicineName.toLowerCase().includes(searchTerm.toLowerCase())
                         ) || purchase.id.toString().includes(searchTerm);
    
    const matchesDate = !dateFilter || purchase.purchaseDate === dateFilter;
    
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
            <h1 style={titleStyle}>Purchase Management</h1>
            <button 
              style={addButtonStyle}
              onClick={() => setShowNewPurchaseForm(true)}
            >
              New Purchase
            </button>
          </div>
          <p style={subtitleStyle}>Showing {filteredPurchases.length} of {purchases.length} purchase orders</p>
          
          <div style={searchRowStyle}>
            <input
              style={searchInputStyle}
              placeholder="Search by supplier, medicine name, or purchase ID..."
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
                <th style={{...tableHeaderStyle, width: '12%'}}>Purchase ID</th>
                <th style={{...tableHeaderStyle, width: '20%'}}>Supplier</th>
                <th style={{...tableHeaderStyle, width: '15%'}}>Date</th>
                <th style={{...tableHeaderStyle, width: '35%'}}>Items</th>
                <th style={{...tableHeaderStyle, width: '15%'}}>Total Amount</th>
                <th style={{...tableHeaderStyle, width: '13%'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPurchases.map((purchase) => (
                <tr key={purchase.id}>
                  <td style={tableCellStyle}>
                    <div style={{fontWeight: '600', color: '#1F2937'}}>#{purchase.id}</div>
                  </td>
                  <td style={tableCellStyle}>{purchase.supplierName}</td>
                  <td style={tableCellStyle}>{formatDate(purchase.purchaseDate)}</td>
                  <td style={tableCellStyle}>
                    <div style={{fontSize: '10px', lineHeight: '1.3'}}>
                      {purchase.items.slice(0, 2).map((item, index) => (
                        <div key={index}>
                          {item.medicineName} ({item.boxQuantity} boxes)
                        </div>
                      ))}
                      {purchase.items.length > 2 && (
                        <div style={{color: '#6B7280'}}>
                          +{purchase.items.length - 2} more items
                        </div>
                      )}
                    </div>
                  </td>
                  <td style={tableCellStyle}>
                    <div style={{fontWeight: '600', color: '#0B2D14'}}>
                      {formatCurrency(purchase.totalAmount)}
                    </div>
                  </td>
                  <td style={tableCellStyle}>
                    <button 
                      style={{...actionButtonStyle, color: '#0B2D14'}}
                      onClick={() => setSelectedPurchase(purchase)}
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
              Showing 1 to {filteredPurchases.length} of {purchases.length} entries
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
        {showNewPurchaseForm && (
          <NewPurchaseForm
            onSave={handleNewPurchase}
            onCancel={() => setShowNewPurchaseForm(false)}
          />
        )}

        {selectedPurchase && (
          <PurchaseDetailsModal
            purchase={selectedPurchase}
            onClose={() => setSelectedPurchase(null)}
          />
        )}
      </div>
    </div>
  );
};

export default PharmacyPurchase;