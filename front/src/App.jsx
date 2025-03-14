import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import FatButton from './components/FatButton';
import './App.css';
import logo from './assets/logo_mint.png';

const LogsDisplay = ({ logs }) => (
  <div className="logs-display">
    <h3>Backend Logs</h3>
    <div className="logs-list">
      {logs.map((log, index) => (
        <div key={index} className="log-item">{log}</div>
      ))}
    </div>
  </div>
);

function App() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:7410');
    socketRef.current.on('logs', (data) => {
      setLogs((prevLogs) => [...prevLogs, data.message]);
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleStartSequence = async () => {
    setLoading(true);
    setLogs([]); // Clear previous logs
    try {
      // Using relative URL with proxy configured in package.json
      const response = await fetch('http://localhost:7410/automation/start');

      const data = await response.json();
      console.log('Automation response:', data);
    } catch (error) {
      console.error("Error during automation:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <img style={{ width: '20%' }} src={logo} alt="Mint Logo" className="logo" />
      </header>
      <main className="main-container">
        <section className="controls-section">
          <FatButton
            text="Démarrer l'automatisation complète"
            onClick={handleStartSequence}
            loading={loading}
          />
        </section>
        <section className="logs-section">
          <LogsDisplay logs={logs} />
        </section>
      </main>
    </div>
  );
}

export default App;
