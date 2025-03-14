import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import FatButton from './components/FatButton';
import FormattedBackendCode from './components/step';
import './App.css';
import logo from './assets/logo_mint.png';

// Returns an emoji based on keywords in the log message.
const getEmojiForLog = (log) => {
  const lower = log.toLowerCase();
  if (lower.includes("error")) return "❌";
  if (lower.includes("success") || lower.includes("ok")) return "✅";
  if (lower.includes("warning")) return "⚠️";
  if (lower.includes("started") || lower.includes("begin")) return "🚀";
  return "📝";
};

// A single log item that displays an emoji and the log text.
const LogItem = ({ log }) => (
  <div className="log-item">
    <span className="log-emoji">{getEmojiForLog(log)}</span>
    <span className="log-text">{log}</span>
  </div>
);

// Displays the list of plain log messages.
const LogsDisplay = ({ logs }) => (
  <div className="logs-display">
    <h3>Backend Logs</h3>
    <div className="logs-list">
      {logs.map((log, index) => (
        <LogItem key={index} log={log} />
      ))}
    </div>
  </div>
);

function App() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [backendSteps, setBackendSteps] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    // Connect to the backend Socket.IO server
    socketRef.current = io('http://localhost:7410');
    socketRef.current.on('logs', (data) => {
      // Check if data is a structured step (has stepNumber) or a plain log message.
      if (data.stepNumber !== undefined) {
        setBackendSteps((prev) => [...prev, data]);
      } else if (data.message) {
        setLogs((prev) => [...prev, data.message]);
      } else if (typeof data === 'string') {
        setLogs((prev) => [...prev, data]);
      }
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleStartSequence = async () => {
    setLoading(true);
    setLogs([]); // Clear previous logs
    setBackendSteps([]); // Clear previous structured steps
    try {
      const response = await fetch('http://localhost:7410/automation/start');
      const data = await response.json();
      console.log('Automation response:', data);
      // If the API returns an object with a "steps" array, use it.
      if (data.steps && Array.isArray(data.steps)) {
        setBackendSteps(data.steps);
      } else if (data.code) {
        // Fallback: if API returns a simple code snippet.
        setBackendSteps([
          {
            stepNumber: 0,
            message: "Code Backend",
            details: data.code,
          },
        ]);
      }
    } catch (error) {
      console.error("Error during automation:", error);
      setLogs((prev) => [...prev, "Erreur lors de l'appel API"]);
    } finally {
      setLoading(false);
    }
  };

  // Determine if any step has final:true (i.e. test success)
  const testSuccess = backendSteps.some(step => step.final);

  return (
    <div className="App">
      <header className="header">
        <img src={logo} alt="Mint Logo" className="logo" />
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
        <section className="code-display-section">
          {backendSteps.length > 0 &&
            backendSteps.map((step, index) => (
              <FormattedBackendCode
                key={index}
                etape={`Étape ${step.stepNumber || index + 1}`}
                contenu={step.message || ""}
                code={
                  typeof step.details === "string"
                    ? step.details
                    : JSON.stringify(step.details, null, 2)
                }
              />
            ))}
        </section>
        {testSuccess && (
          <div className="meme-circular">
            <span>OK!</span>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
