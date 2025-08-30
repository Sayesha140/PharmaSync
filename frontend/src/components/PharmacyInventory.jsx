import React, { useState } from 'react';

const PharmacyInventory = ({ selectedMenu, setSelectedMenu }) => {
  const [medicines, setMedicines] = useState([
    {
      id: 1,
      name: 'Paracetamol',
      generic: 'Crocin',
      category: 'Pain Relief',
      supplier: 'MedSupply Co.',
      batchNo: 'PC0001',
      stock: 150,
      minStock: 30,
      pricing: '৳25.50',
      expiryDate: '12/15/2025',
      status: 'In Stock'
    },
    {
      id: 2,
      name: 'Amoxicillin',
      generic: 'Amoxil',
      category: 'Antibiotic',
      supplier: 'PharmaCorp Ltd.',
      batchNo: 'AM0002',
      stock: 12,
      minStock: 20,
      pricing: '৳180.00',
      expiryDate: '3/20/2025',
      status: 'Expired'
    },
    {
      id: 3,
      name: 'Ibuprofen',
      generic: 'Brufen',
      category: 'Pain Relief',
      supplier: 'HealthPlus Inc.',
      batchNo: 'IB0003',
      stock: 8,
      minStock: 15,
      pricing: '৳45.00',
      expiryDate: '9/10/2024',
      status: 'Expired'
    },
    {
      id: 4,
      name: 'Cetirizine',
      generic: 'Zyrtec',
      category: 'Antihistamine',
      supplier: 'MediCore Solutions',
      batchNo: 'CE0004',
      stock: 75,
      minStock: 25,
      pricing: '৳12.00',
      expiryDate: '7/30/2025',
      status: 'Expired'
    },
    {
      id: 5,
      name: 'Aspirin',
      generic: 'Dispirin',
      category: 'Pain Relief',
      supplier: 'MedSupply Co.',
      batchNo: 'ASP005',
      stock: 0,
      minStock: 30,
      pricing: '৳8.50',
      expiryDate: '6/12/2025',
      status: 'Expired'
    },
    {
      id: 6,
      name: 'Omeprazole',
      generic: 'Prilosec',
      category: 'Antacid',
      supplier: 'PharmaCorp Ltd.',
      batchNo: 'OM0006',
      stock: 89,
      minStock: 20,
      pricing: '৳95.00',
      expiryDate: '11/22/2025',
      status: 'In Stock'
    },
    {
      id: 7,
      name: 'Metformin',
      generic: 'Glucophage',
      category: 'Diabetes',
      supplier: 'DiabetCare Inc.',
      batchNo: 'MF0007',
      stock: 45,
      minStock: 25,
      pricing: '৳15.75',
      expiryDate: '8/15/2025',
      status: 'In Stock'
    },
    {
      id: 8,
      name: 'Lisinopril',
      generic: 'Prinivil',
      category: 'Blood Pressure',
      supplier: 'CardioMed Ltd.',
      batchNo: 'LS0008',
      stock: 67,
      minStock: 30,
      pricing: '৳32.25',
      expiryDate: '10/30/2025',
      status: 'In Stock'
    },
    {
      id: 9,
      name: 'Atorvastatin',
      generic: 'Lipitor',
      category: 'Cholesterol',
      supplier: 'HeartCare Solutions',
      batchNo: 'AT0009',
      stock: 23,
      minStock: 20,
      pricing: '৳85.00',
      expiryDate: '9/12/2025',
      status: 'In Stock'
    },
    {
      id: 10,
      name: 'Amlodipine',
      generic: 'Norvasc',
      category: 'Blood Pressure',
      supplier: 'CardioMed Ltd.',
      batchNo: 'AM0010',
      stock: 34,
      minStock: 25,
      pricing: '৳28.00',
      expiryDate: '12/05/2025',
      status: 'In Stock'
    },
    {
      id: 11,
      name: 'Losartan',
      generic: 'Cozaar',
      category: 'Blood Pressure',
      supplier: 'PressureCare Inc.',
      batchNo: 'LO0011',
      stock: 56,
      minStock: 30,
      pricing: '৳42.50',
      expiryDate: '11/18/2025',
      status: 'In Stock'
    },
    {
      id: 12,
      name: 'Montelukast',
      generic: 'Singulair',
      category: 'Asthma',
      supplier: 'RespiroCare Ltd.',
      batchNo: 'MT0012',
      stock: 18,
      minStock: 20,
      pricing: '৳125.00',
      expiryDate: '10/22/2025',
      status: 'Low Stock'
    },
    {
      id: 13,
      name: 'Loratadine',
      generic: 'Claritin',
      category: 'Antihistamine',
      supplier: 'AllergyFree Inc.',
      batchNo: 'LR0013',
      stock: 41,
      minStock: 25,
      pricing: '৳18.75',
      expiryDate: '9/28/2025',
      status: 'In Stock'
    },
    {
      id: 14,
      name: 'Sertraline',
      generic: 'Zoloft',
      category: 'Antidepressant',
      supplier: 'MindCare Solutions',
      batchNo: 'SE0014',
      stock: 29,
      minStock: 15,
      pricing: '৳150.00',
      expiryDate: '12/10/2025',
      status: 'In Stock'
    },
    {
      id: 15,
      name: 'Fluticasone',
      generic: 'Flonase',
      category: 'Nasal Spray',
      supplier: 'RespiroCare Ltd.',
      batchNo: 'FL0015',
      stock: 62,
      minStock: 20,
      pricing: '৳220.00',
      expiryDate: '8/30/2025',
      status: 'In Stock'
    },
    {
      id: 16,
      name: 'Ciprofloxacin',
      generic: 'Cipro',
      category: 'Antibiotic',
      supplier: 'AntiBio Corp.',
      batchNo: 'CP0016',
      stock: 38,
      minStock: 25,
      pricing: '৳65.00',
      expiryDate: '12/18/2025',
      status: 'In Stock'
    },
    {
      id: 17,
      name: 'Dexamethasone',
      generic: 'Decadron',
      category: 'Steroid',
      supplier: 'SteroidMed Inc.',
      batchNo: 'DX0017',
      stock: 14,
      minStock: 20,
      pricing: '৳78.25',
      expiryDate: '7/25/2025',
      status: 'Low Stock'
    },
    {
      id: 18,
      name: 'Azithromycin',
      generic: 'Zithromax',
      category: 'Antibiotic',
      supplier: 'PharmaCorp Ltd.',
      batchNo: 'AZ0018',
      stock: 91,
      minStock: 30,
      pricing: '৳195.00',
      expiryDate: '11/08/2025',
      status: 'In Stock'
    },
    {
      id: 19,
      name: 'Fexofenadine',
      generic: 'Allegra',
      category: 'Antihistamine',
      supplier: 'AllergyFree Inc.',
      batchNo: 'FX0019',
      stock: 52,
      minStock: 25,
      pricing: '৳35.00',
      expiryDate: '10/14/2025',
      status: 'In Stock'
    },
    {
      id: 20,
      name: 'Pantoprazole',
      generic: 'Protonix',
      category: 'Antacid',
      supplier: 'GastroMed Solutions',
      batchNo: 'PT0020',
      stock: 77,
      minStock: 30,
      pricing: '৳55.50',
      expiryDate: '9/30/2025',
      status: 'In Stock'
    },
    {
      id: 21,
      name: 'Salbutamol',
      generic: 'Ventolin',
      category: 'Bronchodilator',
      supplier: 'RespiroCare Ltd.',
      batchNo: 'SL0021',
      stock: 26,
      minStock: 20,
      pricing: '৳165.00',
      expiryDate: '8/22/2025',
      status: 'In Stock'
    },
    {
      id: 22,
      name: 'Prednisone',
      generic: 'Deltasone',
      category: 'Steroid',
      supplier: 'SteroidMed Inc.',
      batchNo: 'PR0022',
      stock: 33,
      minStock: 25,
      pricing: '৳48.75',
      expiryDate: '11/30/2025',
      status: 'In Stock'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  const statusBadgeStyle = (status) => {
    const colors = {
      'In Stock': { bg: '#0B2D14', color: 'white' },
      'Expired': { bg: '#DC2626', color: 'white' },
      'Low Stock': { bg: '#F59E0B', color: 'white' },
      'Out of Stock': { bg: '#6B7280', color: 'white' }
    };
    const style = colors[status] || { bg: '#6B7280', color: 'white' };
    
    return {
      backgroundColor: style.bg,
      color: style.color,
      padding: '2px 8px',
      borderRadius: '12px',
      fontSize: '10px',
      fontWeight: '500'
    };
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
    maxWidth: '500px',
    maxHeight: '90vh',
    overflow: 'auto'
  };

  const formGridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
    marginBottom: '20px'
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

  const getStatus = (medicine) => {
    if (medicine.stock === 0) return 'Out of Stock';
    if (medicine.stock <= medicine.minStock) return 'Low Stock';
    if (new Date(medicine.expiryDate) < new Date()) return 'Expired';
    return 'In Stock';
  };

  const handleAddMedicine = (newMedicine) => {
    setMedicines([...medicines, { ...newMedicine, id: Date.now() }]);
    setShowAddForm(false);
  };

  const handleEditMedicine = (updatedMedicine) => {
    setMedicines(medicines.map(med => 
      med.id === updatedMedicine.id ? updatedMedicine : med
    ));
    setEditingMedicine(null);
  };

  const handleDeleteMedicine = (id) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      setMedicines(medicines.filter(med => med.id !== id));
    }
  };

  const AddEditForm = ({ medicine, onSave, onCancel }) => {
    const [formData, setFormData] = useState(medicine || {
      name: '', generic: '', category: '', supplier: '', batchNo: '', 
      stock: '', minStock: '', pricing: '', expiryDate: ''
    });

    const handleSubmit = () => {
      onSave(formData);
    };

    return (
      <div style={modalStyle}>
        <div style={modalContentStyle}>
          <h3 style={{margin: '0 0 20px 0', fontSize: '18px'}}>
            {medicine ? 'Edit Medicine' : 'Add New Medicine'}
          </h3>
          
          <div style={formGridStyle}>
            <div>
              <label style={labelStyle}>Medicine Name</label>
              <input
                style={inputStyle}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter medicine name"
              />
            </div>
            <div>
              <label style={labelStyle}>Generic Name</label>
              <input
                style={inputStyle}
                value={formData.generic}
                onChange={(e) => setFormData({...formData, generic: e.target.value})}
                placeholder="Enter generic name"
              />
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select
                style={inputStyle}
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="">Select Category</option>
                <option value="Pain Relief">Pain Relief</option>
                <option value="Antibiotic">Antibiotic</option>
                <option value="Antihistamine">Antihistamine</option>
                <option value="Blood Pressure">Blood Pressure</option>
                <option value="Diabetes">Diabetes</option>
                <option value="Antacid">Antacid</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Supplier</label>
              <input
                style={inputStyle}
                value={formData.supplier}
                onChange={(e) => setFormData({...formData, supplier: e.target.value})}
                placeholder="Enter supplier name"
              />
            </div>
            <div>
              <label style={labelStyle}>Batch No.</label>
              <input
                style={inputStyle}
                value={formData.batchNo}
                onChange={(e) => setFormData({...formData, batchNo: e.target.value})}
                placeholder="Enter batch number"
              />
            </div>
            <div>
              <label style={labelStyle}>Stock Quantity</label>
              <input
                style={inputStyle}
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value) || 0})}
                placeholder="Enter stock quantity"
              />
            </div>
            <div>
              <label style={labelStyle}>Min Stock</label>
              <input
                style={inputStyle}
                type="number"
                value={formData.minStock}
                onChange={(e) => setFormData({...formData, minStock: parseInt(e.target.value) || 0})}
                placeholder="Min stock level"
              />
            </div>
            <div>
              <label style={labelStyle}>Pricing</label>
              <input
                style={inputStyle}
                value={formData.pricing}
                onChange={(e) => setFormData({...formData, pricing: e.target.value})}
                placeholder="৳0.00"
              />
            </div>
            <div>
              <label style={labelStyle}>Expiry Date</label>
              <input
                style={inputStyle}
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
              />
            </div>
          </div>

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
              onClick={handleSubmit}
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
              {medicine ? 'Update' : 'Add Medicine'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={containerStyle}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <div style={logoStyle}>PharmaSync</div>
        
        {['Dashboard', 'Inventory', 'Supplier', 'Sales', 'Report'].map((item) => (
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
            <h1 style={titleStyle}>Available Stock</h1>
            <button 
              style={addButtonStyle}
              onClick={() => setShowAddForm(true)}
            >
              Add Medicine
            </button>
          </div>
          <p style={subtitleStyle}>Showing 1 of 22 medicines</p>
          
          <div style={searchRowStyle}>
            <input
              style={searchInputStyle}
              placeholder="Search by name, brand, batch, or supplier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select style={selectStyle}>
              <option>All Categories</option>
              <option>Pain Relief</option>
              <option>Antibiotic</option>
              <option>Antihistamine</option>
              <option>Blood Pressure</option>
              <option>Diabetes</option>
            </select>
            <select style={selectStyle}>
              <option>All Status</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Expired</option>
              <option>Out of Stock</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div style={tableContainerStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={{...tableHeaderStyle, width: '20%'}}>Medicine Details</th>
                <th style={{...tableHeaderStyle, width: '12%'}}>Category</th>
                <th style={{...tableHeaderStyle, width: '15%'}}>Supplier</th>
                <th style={{...tableHeaderStyle, width: '10%'}}>Batch No.</th>
                <th style={{...tableHeaderStyle, width: '12%'}}>Stock</th>
                <th style={{...tableHeaderStyle, width: '10%'}}>Pricing</th>
                <th style={{...tableHeaderStyle, width: '10%'}}>Expiry Date</th>
                <th style={{...tableHeaderStyle, width: '8%'}}>Status</th>
                <th style={{...tableHeaderStyle, width: '13%'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicines
                .filter(med => 
                  med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  med.generic.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  med.supplier.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((medicine) => (
                <tr key={medicine.id}>
                  <td style={tableCellStyle}>
                    <div style={{fontWeight: '600', color: '#1F2937'}}>{medicine.name}</div>
                    <div style={{fontSize: '10px', color: '#6B7280'}}>{medicine.generic}</div>
                  </td>
                  <td style={tableCellStyle}>{medicine.category}</td>
                  <td style={tableCellStyle}>{medicine.supplier}</td>
                  <td style={tableCellStyle}>{medicine.batchNo}</td>
                  <td style={tableCellStyle}>
                    <div>{medicine.stock} units</div>
                    <div style={{fontSize: '10px', color: '#6B7280'}}>Min {medicine.minStock}</div>
                  </td>
                  <td style={tableCellStyle}>{medicine.pricing}</td>
                  <td style={tableCellStyle}>{medicine.expiryDate}</td>
                  <td style={tableCellStyle}>
                    <span style={statusBadgeStyle(getStatus(medicine))}>
                      {getStatus(medicine)}
                    </span>
                  </td>
                  <td style={tableCellStyle}>
                    <button 
                      style={actionButtonStyle}
                      onClick={() => setEditingMedicine(medicine)}
                      title="Edit"
                    >
                      ✏️
                    </button>
                    
                    <button 
                      style={{...actionButtonStyle, color: '#DC2626'}}
                      onClick={() => handleDeleteMedicine(medicine.id)}
                      title="Delete"
                    >
                        🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={paginationStyle}>
            <span style={{fontSize: '12px', color: '#6B7280'}}>
              Showing 1 to 22 of 22 entries
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
              }}>2</button>
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

        {/* Add/Edit Forms */}
        {showAddForm && (
          <AddEditForm
            onSave={handleAddMedicine}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        {editingMedicine && (
          <AddEditForm
            medicine={editingMedicine}
            onSave={handleEditMedicine}
            onCancel={() => setEditingMedicine(null)}
          />
        )}
      </div>
    </div>
  );
};

export default PharmacyInventory;