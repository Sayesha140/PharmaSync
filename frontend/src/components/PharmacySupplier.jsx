import React, { useState } from 'react';

const PharmacySupplier = ({ selectedMenu, setSelectedMenu }) => {
  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: 'MedSupply Co.',
      contact: '+880 1712-345678',
      address: '123 Medical Street, Dhanmondi, Dhaka-1205',
      email: 'info@medsupply.com',
      totalPurchases: 15,
      totalAmount: 125000.50,
      lastPurchaseDate: '2024-08-20',
      status: 'Active'
    },
    {
      id: 2,
      name: 'PharmaCorp Ltd.',
      contact: '+880 1798-765432',
      address: '456 Healthcare Ave, Gulshan-2, Dhaka-1212',
      email: 'sales@pharmacorp.bd',
      totalPurchases: 22,
      totalAmount: 198750.00,
      lastPurchaseDate: '2024-08-18',
      status: 'Active'
    },
    {
      id: 3,
      name: 'HealthPlus Inc.',
      contact: '+880 1634-987654',
      address: '789 Wellness Road, Banani, Dhaka-1213',
      email: 'contact@healthplus.com',
      totalPurchases: 8,
      totalAmount: 67200.25,
      lastPurchaseDate: '2024-08-15',
      status: 'Active'
    },
    {
      id: 4,
      name: 'MediCore Solutions',
      contact: '+880 1587-321098',
      address: '321 Pharma Complex, Mohakhali, Dhaka-1212',
      email: 'orders@medicore.bd',
      totalPurchases: 18,
      totalAmount: 142300.75,
      lastPurchaseDate: '2024-08-22',
      status: 'Active'
    },
    {
      id: 5,
      name: 'DiabetCare Inc.',
      contact: '+880 1743-654321',
      address: '654 Diabetes Lane, Uttara, Dhaka-1230',
      email: 'info@diabetcare.com',
      totalPurchases: 12,
      totalAmount: 89600.00,
      lastPurchaseDate: '2024-07-30',
      status: 'Inactive'
    },
    {
      id: 6,
      name: 'CardioMed Ltd.',
      contact: '+880 1692-147258',
      address: '987 Heart Center, Mirpur-10, Dhaka-1216',
      email: 'supplies@cardiomed.bd',
      totalPurchases: 14,
      totalAmount: 156750.50,
      lastPurchaseDate: '2024-08-19',
      status: 'Active'
    },
    {
      id: 7,
      name: 'HeartCare Solutions',
      contact: '+880 1785-369147',
      address: '147 Cardiac Street, Wari, Dhaka-1203',
      email: 'sales@heartcare.com',
      totalPurchases: 9,
      totalAmount: 78900.25,
      lastPurchaseDate: '2024-08-16',
      status: 'Active'
    },
    {
      id: 8,
      name: 'PressureCare Inc.',
      contact: '+880 1658-741963',
      address: '258 Hypertension Road, Tejgaon, Dhaka-1215',
      email: 'info@pressurecare.bd',
      totalPurchases: 11,
      totalAmount: 94500.75,
      lastPurchaseDate: '2024-08-14',
      status: 'Active'
    },
    {
      id: 9,
      name: 'RespiroCare Ltd.',
      contact: '+880 1729-852741',
      address: '369 Respiratory Plaza, Panthapath, Dhaka-1205',
      email: 'orders@respirocare.com',
      totalPurchases: 16,
      totalAmount: 134200.00,
      lastPurchaseDate: '2024-08-21',
      status: 'Active'
    },
    {
      id: 10,
      name: 'AllergyFree Inc.',
      contact: '+880 1674-258963',
      address: '741 Allergy Center, Farmgate, Dhaka-1215',
      email: 'contact@allergyfree.bd',
      totalPurchases: 7,
      totalAmount: 52300.50,
      lastPurchaseDate: '2024-08-12',
      status: 'Active'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

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
      'Active': { bg: '#0B2D14', color: 'white' },
      'Inactive': { bg: '#6B7280', color: 'white' }
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

  const statusToggleStyle = {
    position: 'relative',
    display: 'inline-block',
    width: '40px',
    height: '20px'
  };

  const statusToggleInputStyle = {
    opacity: 0,
    width: 0,
    height: 0
  };

  const statusToggleSliderStyle = (isActive) => ({
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: isActive ? '#37A000' : '#ccc',
    transition: '.4s',
    borderRadius: '20px'
  });

  const statusToggleSliderBeforeStyle = (isActive) => ({
    position: 'absolute',
    content: '""',
    height: '16px',
    width: '16px',
    left: isActive ? '22px' : '2px',
    bottom: '2px',
    backgroundColor: 'white',
    transition: '.4s',
    borderRadius: '50%'
  });

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
    gridTemplateColumns: '1fr',
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
    resize: 'vertical'
  };

  const labelStyle = {
    fontSize: '12px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '4px',
    display: 'block'
  };

  const formatCurrency = (amount) => {
    return `৳${amount.toLocaleString('en-BD', { minimumFractionDigits: 2 })}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleAddSupplier = (newSupplier) => {
    setSuppliers([...suppliers, { 
      ...newSupplier, 
      id: Date.now(),
      totalPurchases: 0,
      totalAmount: 0,
      lastPurchaseDate: null,
      status: 'Active'
    }]);
    setShowAddForm(false);
  };

  const handleEditSupplier = (updatedSupplier) => {
    setSuppliers(suppliers.map(supplier => 
      supplier.id === updatedSupplier.id ? updatedSupplier : supplier
    ));
    setEditingSupplier(null);
  };

  const handleDeleteSupplier = (id) => {
    const supplier = suppliers.find(s => s.id === id);
    if (supplier && supplier.totalPurchases > 0) {
      alert('Cannot delete supplier with existing purchase history. Please contact administrator.');
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      setSuppliers(suppliers.filter(supplier => supplier.id !== id));
    }
  };

  const handleToggleSupplierStatus = (id) => {
    setSuppliers(suppliers.map(supplier => 
      supplier.id === id 
        ? { ...supplier, status: supplier.status === 'Active' ? 'Inactive' : 'Active' }
        : supplier
    ));
  };

  const AddEditForm = ({ supplier, onSave, onCancel }) => {
    const [formData, setFormData] = useState(supplier || {
      name: '', 
      contact: '', 
      address: '', 
      email: ''
    });

    const handleSubmit = () => {
      if (!formData.name || !formData.contact || !formData.email) {
        alert('Please fill in all required fields (Name, Contact, Email)');
        return;
      }
      onSave(formData);
    };

    return (
      <div style={modalStyle}>
        <div style={modalContentStyle}>
          <h3 style={{margin: '0 0 20px 0', fontSize: '18px'}}>
            {supplier ? 'Edit Supplier' : 'Add New Supplier'}
          </h3>
          
          <div style={formGridStyle}>
            <div>
              <label style={labelStyle}>Supplier Name *</label>
              <input
                style={inputStyle}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter supplier name"
              />
            </div>
            <div>
              <label style={labelStyle}>Contact Number *</label>
              <input
                style={inputStyle}
                value={formData.contact}
                onChange={(e) => setFormData({...formData, contact: e.target.value})}
                placeholder="+880 1XXX-XXXXXX"
              />
            </div>
            <div>
              <label style={labelStyle}>Email Address *</label>
              <input
                style={inputStyle}
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="supplier@example.com"
              />
            </div>
            <div>
              <label style={labelStyle}>Address</label>
              <textarea
                style={textareaStyle}
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                placeholder="Complete address with area and postal code"
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
              {supplier ? 'Update Supplier' : 'Add Supplier'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || supplier.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

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
            <h1 style={titleStyle}>Supplier Management</h1>
            <button 
              style={addButtonStyle}
              onClick={() => setShowAddForm(true)}
            >
              Add Supplier
            </button>
          </div>
          <p style={subtitleStyle}>Showing {filteredSuppliers.length} of {suppliers.length} suppliers</p>
          
          <div style={searchRowStyle}>
            <input
              style={searchInputStyle}
              placeholder="Search by name, contact, email, or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select 
              style={selectStyle}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div style={tableContainerStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={{...tableHeaderStyle, width: '20%'}}>Supplier Details</th>
                <th style={{...tableHeaderStyle, width: '15%'}}>Contact Info</th>
                <th style={{...tableHeaderStyle, width: '25%'}}>Address</th>
                <th style={{...tableHeaderStyle, width: '10%'}}>Orders</th>
                <th style={{...tableHeaderStyle, width: '12%'}}>Total Amount</th>
                <th style={{...tableHeaderStyle, width: '10%'}}>Last Purchase</th>
                <th style={{...tableHeaderStyle, width: '8%'}}>Status</th>
                <th style={{...tableHeaderStyle, width: '10%'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td style={tableCellStyle}>
                    <div style={{fontWeight: '600', color: '#1F2937', marginBottom: '2px'}}>{supplier.name}</div>
                    <div style={{fontSize: '10px', color: '#6B7280'}}>{supplier.email}</div>
                  </td>
                  <td style={tableCellStyle}>
                    <div style={{marginBottom: '2px'}}>{supplier.contact}</div>
                  </td>
                  <td style={tableCellStyle}>
                    <div style={{fontSize: '10px', lineHeight: '1.3'}}>{supplier.address}</div>
                  </td>
                  <td style={tableCellStyle}>
                    <div style={{fontWeight: '600'}}>{supplier.totalPurchases}</div>
                    <div style={{fontSize: '10px', color: '#6B7280'}}>orders</div>
                  </td>
                  <td style={tableCellStyle}>
                    <div style={{fontWeight: '600', color: '#0B2D14'}}>{formatCurrency(supplier.totalAmount)}</div>
                  </td>
                  <td style={tableCellStyle}>
                    {supplier.lastPurchaseDate ? formatDate(supplier.lastPurchaseDate) : 'Never'}
                  </td>
                  <td style={tableCellStyle}>
                    <label style={statusToggleStyle}>
                      <input
                        style={statusToggleInputStyle}
                        type="checkbox"
                        checked={supplier.status === 'Active'}
                        onChange={() => handleToggleSupplierStatus(supplier.id)}
                      />
                      <span style={statusToggleSliderStyle(supplier.status === 'Active')}>
                        <span style={statusToggleSliderBeforeStyle(supplier.status === 'Active')}></span>
                      </span>
                    </label>
                  </td>
                  <td style={tableCellStyle}>
                    <button 
                      style={actionButtonStyle}
                      onClick={() => setEditingSupplier(supplier)}
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button 
                      style={{...actionButtonStyle, color: '#DC2626'}}
                      onClick={() => handleDeleteSupplier(supplier.id)}
                      title="Delete"
                    >
                      🗑️
                    </button>
                    <button 
                      style={{...actionButtonStyle, color: '#0B2D14'}}
                      onClick={() => console.log('View details for:', supplier.name)}
                      title="View Purchase History"
                    >
                      📊
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={paginationStyle}>
            <span style={{fontSize: '12px', color: '#6B7280'}}>
              Showing 1 to {filteredSuppliers.length} of {suppliers.length} entries
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
            onSave={handleAddSupplier}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        {editingSupplier && (
          <AddEditForm
            supplier={editingSupplier}
            onSave={handleEditSupplier}
            onCancel={() => setEditingSupplier(null)}
          />
        )}
      </div>
    </div>
  );
};

export default PharmacySupplier;