import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import FatButton from './components/FatButton';
import './App.css';
import logo from './assets/logo_mint.png';

function App() {
  // Frontend check states
  const [statusFrontend, setStatusFrontend] = useState("");
  const [loadingFrontend, setLoadingFrontend] = useState(false);

  // Test conversion tunnel states
  const [statusTestTunnel, setStatusTestTunnel] = useState("");
  const [loadingTestTunnel, setLoadingTestTunnel] = useState(false);

  // Cypress test states
  const [statusCypress, setStatusCypress] = useState("");
  const [loadingCypress, setLoadingCypress] = useState(false);

  // Screenshot states
  const [screenshot, setScreenshot] = useState(null);
  const [loadingScreenshot, setLoadingScreenshot] = useState(false);

  // Logs state to store logs received from the backend
  const [logs, setLogs] = useState([]);

  // Connect to Socket.IO server and subscribe to 'logs' events
  useEffect(() => {
    const socket = io('http://localhost:7410');
    
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server!');
    });
    
    socket.on('logs', (data) => {
      console.log('Log from server:', data.message);
      setLogs(prevLogs => [...prevLogs, data.message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Call the frontend check endpoint
  const handleCheckFrontend = async () => {
    setLoadingFrontend(true);
    setStatusFrontend("");
    try {
      const response = await fetch('http://localhost:7410/health-check/frontend');
      if (response.ok) {
        const data = await response.json();
        setStatusFrontend(data.success ? "success" : "error");
      } else {
        setStatusFrontend("error");
      }
    } catch (error) {
      setStatusFrontend("error");
    } finally {
      setLoadingFrontend(false);
    }
  };

  // Call the conversion tunnel test endpoint
  const handleTestConversionTunnel = async () => {
    setLoadingTestTunnel(true);
    setStatusTestTunnel("");
    try {
      const response = await fetch('http://localhost:7410/automation', { method: 'GET' });
      if (response.ok) {
        const data = await response.text();
        setStatusTestTunnel("success");
      } else {
        setStatusTestTunnel("error");
      }
    } catch (error) {
      setStatusTestTunnel("error");
    } finally {
      setLoadingTestTunnel(false);
    }
  };

  // Call the Cypress test endpoint
  const handleRunCypressTests = async () => {
    setLoadingCypress(true);
    setStatusCypress("");
    try {
      const response = await fetch('http://localhost:7410/cypress/run', { method: 'GET' });
      if (response.ok) {
        // Assuming your endpoint returns a JSON result
        const data = await response.json();
        setStatusCypress("success");
        console.log('Cypress test results:', data);
      } else {
        setStatusCypress("error");
      }
    } catch (error) {
      setStatusCypress("error");
    } finally {
      setLoadingCypress(false);
    }
  };

  // Call the screenshot endpoint
  const handleScreenshot = async () => {
    setLoadingScreenshot(true);
    setScreenshot(null);
    try {
      const response = await fetch('http://localhost:7410/health-check/screenshot');
      if (response.ok) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setScreenshot(imageUrl);
      }
    } catch (error) {
      console.error("Error taking screenshot:", error);
    } finally {
      setLoadingScreenshot(false);
    }
  };

  return (
    <div className="App" style={{ textAlign: 'center', padding: '2rem' }}>
      <img 
        src={logo} 
        alt="Logo" 
        style={{ marginBottom: '1rem', height: '120px', width: 'auto' }} 
      />

      {/* Button to check frontend */}
      <div style={{ marginBottom: '1rem' }}>
        <FatButton 
          text="Vérifier le frontend" 
          onClick={handleCheckFrontend} 
          status={statusFrontend} 
          loading={loadingFrontend}
        />
      </div>

      {/* Button to test conversion tunnel */}
      <div style={{ marginBottom: '1rem' }}>
        <FatButton 
          text="Test Conversion Tunnel" 
          onClick={handleTestConversionTunnel} 
          status={statusTestTunnel} 
          loading={loadingTestTunnel}
        />
      </div>

      {/* Button to run Cypress tests */}
      <div style={{ marginBottom: '1rem' }}>
        <FatButton 
          text="Run Cypress Tests" 
          onClick={handleRunCypressTests} 
          status={statusCypress} 
          loading={loadingCypress}
        />
      </div>

      {/* Button to take screenshot */}
      <div style={{ marginBottom: '1rem' }}>
        <FatButton 
          text="Prendre une capture d'écran" 
          onClick={handleScreenshot} 
          loading={loadingScreenshot}
        />
      </div>

      {/* Display the screenshot image */}
      {screenshot && (
        <div>
          <h3>Capture d'écran</h3>
          <img src={screenshot} alt="Screenshot" style={{ maxWidth: '100%' }} />
        </div>
      )}

      {/* Display logs received from the backend */}
      <div style={{ marginTop: '2rem', textAlign: 'left', maxWidth: '600px', margin: '2rem auto' }}>
        <h3>Backend Logs</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {logs.map((log, index) => (
            <li key={index} style={{ padding: '0.5rem 0', borderBottom: '1px solid #ccc' }}>
              {log}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
