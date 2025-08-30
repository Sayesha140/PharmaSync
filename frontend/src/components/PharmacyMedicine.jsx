import React, { useState } from 'react';

const PharmacyMedicine = ({ selectedMenu, setSelectedMenu }) => {
  const [medicines, setMedicines] = useState([
    {
      id: 1,
      name: 'Paracetamol',
      genericName: 'Acetaminophen',
      category: 'Pain Relief',
      dosageForm: 'Tablet',
      sellPrice: 25.50,
      description: 'Pain reliever and fever reducer',
      active: 1
    },
    {
      id: 2,
      name: 'Amoxicillin',
      genericName: 'Amoxicillin Trihydrate',
      category: 'Antibiotic',
      dosageForm: 'Capsule',
      sellPrice: 180.00,
      description: 'Broad-spectrum antibiotic for bacterial infections',
      active: 1
    },
    {
      id: 3,
      name: 'Ibuprofen',
      genericName: 'Ibuprofen',
      category: 'Pain Relief',
      dosageForm: 'Tablet',
      sellPrice: 45.00,
      description: 'Non-steroidal anti-inflammatory drug (NSAID)',
      active: 1
    },
    {
      id: 4,
      name: 'Cetirizine',
      genericName: 'Cetirizine Hydrochloride',
      category: 'Antihistamine',
      dosageForm: 'Tablet',
      sellPrice: 12.00,
      description: 'Antihistamine for allergy relief',
      active: 1
    },
    {
      id: 5,
      name: 'Omeprazole',
      genericName: 'Omeprazole',
      category: 'Antacid',
      dosageForm: 'Capsule',
      sellPrice: 95.00,
      description: 'Proton pump inhibitor for acid reflux',
      active: 1
    },
    {
      id: 6,
      name: 'Metformin',
      genericName: 'Metformin Hydrochloride',
      category: 'Diabetes',
      dosageForm: 'Tablet',
      sellPrice: 15.75,
      description: 'Type 2 diabetes medication',
      active: 0
    },
    {
      id: 7,
      name: 'Lisinopril',
      genericName: 'Lisinopril',
      category: 'Blood Pressure',
      dosageForm: 'Tablet',
      sellPrice: 32.25,
      description: 'ACE inhibitor for high blood pressure',
      active: 1
    },
    {
      id: 8,
      name: 'Atorvastatin',
      genericName: 'Atorvastatin Calcium',
      category: 'Cholesterol',
      dosageForm: 'Tablet',
      sellPrice: 85.00,
      description: 'Statin for cholesterol management',
      active: 1
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dosageFilter, setDosageFilter] = useState('');

  const categories = ['Pain Relief', 'Antibiotic', 'Antihistamine', 'Antacid', 'Diabetes', 'Blood Pressure', 'Cholesterol', 'Bronchodilator', 'Nasal Spray', 'Steroid'];
  const dosageForms = ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Cream', 'Ointment', 'Drop', 'Inhaler', 'Nasal Spray'];

  // Styles (same structure as other pages)
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
    maxWidth: '600px',
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

  const textareaStyle = {
    ...inputStyle,
    minHeight: '60px',
    resize: 'vertical',
    gridColumn: 'span 2'
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

  const checkUniqueness = (medicine, medicines, excludeId = null) => {
    return !medicines.some(m => 
      m.id !== excludeId &&
      m.name.toLowerCase() === medicine.name.toLowerCase() &&
      m.genericName.toLowerCase() === medicine.genericName.toLowerCase() &&
      m.category === medicine.category &&
      m.dosageForm === medicine.dosageForm
    );
  };

  const handleAddMedicine = (newMedicine) => {
    if (!checkUniqueness(newMedicine, medicines)) {
      alert('A medicine with the same name, generic name, category, and dosage form already exists.');
      return;
    }

    const medicine = {
      ...newMedicine,
      id: Date.now()
    };
    setMedicines([...medicines, medicine]);
    setShowAddForm(false);
  };

  const handleEditMedicine = (updatedMedicine) => {
    if (!checkUniqueness(updatedMedicine, medicines, updatedMedicine.id)) {
      alert('A medicine with the same name, generic name, category, and dosage form already exists.');
      return;
    }

    setMedicines(medicines.map(med => 
      med.id === updatedMedicine.id ? updatedMedicine : med
    ));
    setEditingMedicine(null);
  };

  const handleDeleteMedicine = (id) => {
    if (window.confirm('Are you sure you want to delete this medicine? This will affect inventory, purchase, and sales records.')) {
      setMedicines(medicines.filter(med => med.id !== id));
    }
  };

  const AddEditForm = ({ medicine, onSave, onCancel }) => {
    const [formData, setFormData] = useState(medicine || {
      name: '',
      genericName: '',
      category: '',
      dosageForm: '',
      sellPrice: '',
      description: ''
    });

    const handleSubmit = () => {
      if (!formData.name || !formData.genericName || !formData.category || !formData.dosageForm) {
        alert('Please fill in all required fields (Name, Generic Name, Category, Dosage Form)');
        return;
      }
      if (!formData.sellPrice || formData.sellPrice <= 0) {
        alert('Please enter a valid sell price');
        return;
      }
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
              <label style={labelStyle}>Medicine Name *</label>
              <input
                style={inputStyle}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter medicine name"
              />
            </div>
            <div>
              <label style={labelStyle}>Generic Name *</label>
              <input
                style={inputStyle}
                value={formData.genericName}
                onChange={(e) => setFormData({...formData, genericName: e.target.value})}
                placeholder="Enter generic name"
              />
            </div>
            <div>
              <label style={labelStyle}>Category *</label>
              <select
                style={inputStyle}
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Dosage Form *</label>
              <select
                style={inputStyle}
                value={formData.dosageForm}
                onChange={(e) => setFormData({...formData, dosageForm: e.target.value})}
              >
                <option value="">Select Dosage Form</option>
                {dosageForms.map(form => (
                  <option key={form} value={form}>{form}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Sell Price (৳) *</label>
              <input
                style={inputStyle}
                type="number"
                step="0.01"
                min="0.01"
                value={formData.sellPrice}
                onChange={(e) => setFormData({...formData, sellPrice: parseFloat(e.target.value) || ''})}
                placeholder="0.00"
              />
            </div>
            <div></div>
            <div>
              <label style={labelStyle}>Description</label>
              <textarea
                style={textareaStyle}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Enter medicine description or usage instructions"
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
              {medicine ? 'Update Medicine' : 'Add Medicine'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !categoryFilter || medicine.category === categoryFilter;
    const matchesDosage = !dosageFilter || medicine.dosageForm === dosageFilter;
    
    return matchesSearch && matchesCategory && matchesDosage;
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
            <h1 style={titleStyle}>Medicine Catalog</h1>
            <button 
              style={addButtonStyle}
              onClick={() => setShowAddForm(true)}
            >
              Add Medicine
            </button>
          </div>
          <p style={subtitleStyle}>Showing {filteredMedicines.length} of {medicines.length} medicines</p>
          
          <div style={searchRowStyle}>
            <input
              style={searchInputStyle}
              placeholder="Search by name, generic name, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select 
              style={selectStyle}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select 
              style={selectStyle}
              value={dosageFilter}
              onChange={(e) => setDosageFilter(e.target.value)}
            >
              <option value="">All Dosage Forms</option>
              {dosageForms.map(form => (
                <option key={form} value={form}>{form}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div style={tableContainerStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={{...tableHeaderStyle, width: '22%'}}>Medicine Details</th>
                <th style={{...tableHeaderStyle, width: '16%'}}>Category</th>
                <th style={{...tableHeaderStyle, width: '14%'}}>Dosage Form</th>
                <th style={{...tableHeaderStyle, width: '12%'}}>Sell Price</th>
                <th style={{...tableHeaderStyle, width: '26%'}}>Description</th>
                <th style={{...tableHeaderStyle, width: '10%'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedicines.map((medicine) => (
                <tr key={medicine.id}>
                  <td style={tableCellStyle}>
                    <div style={{fontWeight: '600', color: '#1F2937', marginBottom: '2px'}}>{medicine.name}</div>
                    <div style={{fontSize: '10px', color: '#6B7280'}}>{medicine.genericName}</div>
                  </td>
                  <td style={tableCellStyle}>{medicine.category}</td>
                  <td style={tableCellStyle}>{medicine.dosageForm}</td>
                  <td style={{...tableCellStyle, fontWeight: '600', color: '#0B2D14'}}>
                    {formatCurrency(medicine.sellPrice)}
                  </td>
                  <td style={tableCellStyle}>
                    <div style={{fontSize: '10px', lineHeight: '1.3'}}>
                      {medicine.description || 'No description'}
                    </div>
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
              Showing 1 to {filteredMedicines.length} of {medicines.length} entries
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

export default PharmacyMedicine;