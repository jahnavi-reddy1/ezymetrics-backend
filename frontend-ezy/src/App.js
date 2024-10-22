import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [crmData, setCrmData] = useState([]);
  const [campaignData, setCampaignData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');


  const fetchCrmData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/crm-data`); // Updated URL
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCrmData(data);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Failed to fetch CRM data.');
      console.error('Error fetching CRM data:', error);
    }
  };

  const fetchCampaignData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/campaign-data`); // Updated URL
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCampaignData(data);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Failed to fetch Campaign data.');
      console.error('Error fetching Campaign data:', error);
    }
  };

  const downloadCsvReport = () => {
    window.open(`http://localhost:3000/api/report/csv`); // Updated URL
  };

  const downloadPdfReport = () => {
    window.open(`http://localhost:3000/api/report/pdf`); // Updated URL
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Welcome to EzyMetrics</h1>
        <p>Manage your CRM and Campaign data efficiently.</p>

        <div className="button-container">
          <button onClick={fetchCrmData}>Fetch CRM Data</button>
          <button onClick={fetchCampaignData}>Fetch Campaign Data</button>
          <button onClick={downloadCsvReport}>Download CRM CSV Report</button>
          <button onClick={downloadPdfReport}>Download CRM PDF Report</button>
        </div>

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        <h2>CRM Data:</h2>
        <div className="data-container">
          <pre className="data-display">{JSON.stringify(crmData, null, 2)}</pre>
        </div>

        <h2>Campaign Data:</h2>
        <div className="data-container">
          <pre className="data-display">{JSON.stringify(campaignData, null, 2)}</pre>
        </div>
      </header>
    </div>
  );
}

export default App;
