// src/App.jsx
import React, { useState } from 'react';
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

  // Screenshot states
  const [screenshot, setScreenshot] = useState(null);
  const [loadingScreenshot, setLoadingScreenshot] = useState(false);

  // Call the frontend check endpoint
  const handleCheckFrontend = async () => {
    setLoadingFrontend(true);
    setStatusFrontend(""); // Reset status before making the call
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
    setStatusTestTunnel(""); // Reset status before making the call
    try {
      const response = await fetch('http://localhost:7410/health-check/test-conversion-tunnel', {
        method: 'POST'
      });
      if (response.ok) {
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

  // Call the screenshot endpoint
  const handleScreenshot = async () => {
    setLoadingScreenshot(true);
    setScreenshot(null); // Reset screenshot
    try {
      const response = await fetch('http://localhost:7410/health-check/screenshot');
      if (response.ok) {
        const blob = await response.blob();
        // Create a URL for the image blob
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
    </div>
  );
}

export default App;
