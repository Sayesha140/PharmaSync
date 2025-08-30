import React, { useState } from 'react';

const PharmacyDashboard = ({ selectedMenu, setSelectedMenu }) => {
 

  // Sample data
  const salesData = [
    { name: 'Panadol A', value: 45 },
    { name: 'Vitamin C', value: 38 },
    { name: 'napa', value: 25 },
    { name: 'Test Med', value: 23 },
    { name: 'NADOL 500mg', value: 22 },
    { name: 'Paracetamol', value: 18 },
    { name: 'Paracetamol', value: 12 },
    { name: 'Panadol', value: 8 },
    { name: 'brufen', value: 6 },
    { name: 'NAPA', value: 4 }
  ];

  const todaysReport = [
    { label: 'Total Sales', amount: 0 },
    { label: 'Total Purchase', amount: 0 }
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    backgroundColor: 'white',
    padding: '10px 15px',
    borderRadius: '6px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    flexShrink: 0
  };

  const cardContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
    marginBottom: '15px',
    flexShrink: 0
  };

  const metricCardStyle = (bgColor) => ({
    backgroundColor: 'white',
    borderRadius: '6px',
    padding: '15px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    borderLeft: `4px solid ${bgColor}`,
    textAlign: 'left'
  });

  const metricTitleStyle = {
    color: '#6B7280',
    fontSize: '11px',
    margin: '0 0 8px 0',
    textTransform: 'uppercase',
    fontWeight: '500'
  };

  const metricValueStyle = {
    color: '#1F2937',
    fontSize: '28px',
    fontWeight: 'bold',
    margin: '0 0 8px 0'
  };

  const showDetailsButtonStyle = {
    color: '#0B2D14',
    fontSize: '11px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    padding: 0
  };

  const showDetailsStyle = {
    color: '#0B2D14',
    fontSize: '11px',
    textDecoration: 'none',
    cursor: 'pointer'
  };

  const chartContainerStyle = {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '12px',
    flex: 1,
    minHeight: 0,
    alignItems: 'stretch'
  };

  const chartBoxStyle = {
    backgroundColor: 'white',
    borderRadius: '6px',
    padding: '15px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column'
  };

  const chartTitleStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1F2937',
    margin: '0 0 10px 0',
    flexShrink: 0
  };

  const barChartContainerStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0
  };

  const horizontalBarChartStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1,
    padding: '10px 0'
  };

  const horizontalBarItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    height: '25px'
  };

  const barLabelHorizontalStyle = {
    fontSize: '11px',
    color: '#374151',
    minWidth: '80px',
    textAlign: 'right',
    fontWeight: '500'
  };

  const barContainerStyle = {
    flex: 1,
    height: '20px',
    backgroundColor: '#F3F4F6',
    borderRadius: '10px',
    overflow: 'hidden',
    position: 'relative'
  };

  const horizontalBarStyle = (width) => ({
    height: '100%',
    backgroundColor: '#4DD0E1',
    borderRadius: '10px',
    width: `${(width / 50) * 100}%`,
    maxWidth: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: '8px',
    transition: 'width 0.3s ease'
  });

  const horizontalBarValueStyle = {
    fontSize: '10px',
    color: 'white',
    fontWeight: 'bold'
  };

  const rightPanelStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    height: '100%'
  };

  const pieChartStyle = {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    background: `conic-gradient(#FFE4E6 0deg 200deg, #FEF3C7 200deg 360deg)`,
    margin: '10px auto 15px',
    position: 'relative'
  };

  const pieChartCenterStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    textAlign: 'center'
  };

  const legendStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    fontSize: '11px'
  };

  const legendItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  };

  const legendColorStyle = (color) => ({
    width: '10px',
    height: '10px',
    backgroundColor: color,
    borderRadius: '2px'
  });

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '12px'
  };

  const tableHeaderStyle = {
    backgroundColor: '#F3F4F6',
    padding: '8px 10px',
    textAlign: 'left',
    fontWeight: '600',
    color: '#374151',
    fontSize: '11px',
    borderBottom: '1px solid #E5E7EB'
  };

  const tableCellStyle = {
    padding: '8px 10px',
    borderBottom: '1px solid #E5E7EB',
    color: '#1F2937',
    fontSize: '12px'
  };

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
          <h1 style={{margin: 0, fontSize: '18px', color: '#1F2937'}}>Dashboard</h1>
          <button style={{
            backgroundColor: '#0B2D14',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '3px',
            cursor: 'pointer',
            fontSize: '12px'
          }}>
            ≡
          </button>
        </div>

        {/* Metric Cards */}
        <div style={cardContainerStyle}>
          <div style={metricCardStyle('#0B2D14')}>
            <p style={metricTitleStyle}>Total Medicine</p>
            <h3 style={metricValueStyle}>81</h3>
            <button style={showDetailsButtonStyle} onClick={() => console.log('Show details clicked')}>
              Show Details
            </button>
          </div>

          <div style={metricCardStyle('#DC2626')}>
            <p style={metricTitleStyle}>Out of Stock</p>
            <h3 style={metricValueStyle}>33</h3>
            <button style={showDetailsButtonStyle} onClick={() => console.log('Show details clicked')}>
              Show Details
            </button>
          </div>

          <div style={metricCardStyle('#EA580C')}>
            <p style={metricTitleStyle}>Expired Medicine</p>
            <h3 style={metricValueStyle}>42</h3>
            <button style={showDetailsButtonStyle} onClick={() => console.log('Show details clicked')}>
              Show Details
            </button>
          </div>
        </div>

        {/* Charts Section */}
        <div style={chartContainerStyle}>
          {/* Bar Chart */}
          <div style={chartBoxStyle}>
            <h3 style={chartTitleStyle}>Best Sales Of The Month</h3>
            <div style={barChartContainerStyle}>
              <div style={horizontalBarChartStyle}>
                {salesData.map((item, index) => (
                  <div key={index} style={horizontalBarItemStyle}>
                    <div style={barLabelHorizontalStyle}>{item.name}</div>
                    <div style={barContainerStyle}>
                      <div style={horizontalBarStyle(item.value)}>
                        <span style={horizontalBarValueStyle}>{item.value}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div style={rightPanelStyle}>
            {/* Pie Chart */}
            <div style={chartBoxStyle}>
              <h3 style={chartTitleStyle}>Sales vs Purchase</h3>
              <div style={pieChartStyle}>
                <div style={pieChartCenterStyle}>Sales<br/>Purchase</div>
              </div>
              <div style={legendStyle}>
                <div style={legendItemStyle}>
                  <div style={legendColorStyle('#FFE4E6')}></div>
                  <span>Sales</span>
                </div>
                <div style={legendItemStyle}>
                  <div style={legendColorStyle('#FEF3C7')}></div>
                  <span>Purchase</span>
                </div>
              </div>
            </div>

            {/* Today's Report */}
            <div style={chartBoxStyle}>
              <h3 style={chartTitleStyle}>Today's Report</h3>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={tableHeaderStyle}>Today's Report</th>
                    <th style={tableHeaderStyle}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {todaysReport.map((item, index) => (
                    <tr key={index}>
                      <td style={tableCellStyle}>{item.label}</td>
                      <td style={tableCellStyle}>{item.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyDashboard;