import React, { useState } from 'react';

function TestInputsRunner() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  // Remplacez cette valeur par le sessionId obtenu préalablement
  const [sessionId, setSessionId] = useState("votre-session-id");

  const handleTestInputs = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:7410/automation/testInputsPage2?sessionId=${sessionId}`);
      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        console.error("Erreur lors de l'appel à testInputsPage2");
      }
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Test Inputs sur la page de logement</h2>
      <button 
        onClick={handleTestInputs}
        disabled={loading}
        style={{
          padding: '1rem 2rem',
          fontSize: '1.25em',
          borderRadius: '50px',
          background: 'rgba(255, 255, 255, 0.2)',
          border: 'none',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer',
          marginBottom: '2rem'
        }}
      >
        {loading ? "Test en cours..." : "Lancer le test des inputs"}
      </button>

      {result && (
        <div>
          <h3>{result.message}</h3>
          {result.screenshotBase64 && (
            <img 
              src={`data:image/png;base64,${result.screenshotBase64}`} 
              alt="Screenshot de la page 2" 
              style={{ maxWidth: '100%', borderRadius: '8px', marginBottom: '1rem' }}
            />
          )}
          {result.inputResults && (
            <div>
              <h4>Valeurs des inputs :</h4>
              <pre style={{ background: '#f4f4f4', padding: '1rem', borderRadius: '8px' }}>
                {JSON.stringify(result.inputResults, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TestInputsRunner;
