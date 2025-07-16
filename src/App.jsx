import React, { useState } from 'react';
import { add } from './utils/stringCalculator';
import './App.css'; 

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
  try {
    const entries = input.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/); 
    let total = 0;

    for (let raw of entries) {
      const normalized = raw
        .replace(/^"(.*)"$/, '$1')
        .replace(/\\n/g, '\n')
        .replace(/\\r/g, '\r');

      total += add(normalized);
    }

    setResult(total);
    setError('');
  } catch (err) {
    setResult(null);
    setError(err.message);
  }
};



  return (
    <div className="calculator-container">
      <h1>String Calculator</h1>
<p className="author">by Sarthak Tyagi</p>
<p>Enter numbers separated by <code>,</code> or <code>\n</code>. Example: <code>1,2\n3</code></p>


      <input
        type="text"
        placeholder="Enter numbers (e.g. 1,2\n3)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="input-field"
      />
      <button onClick={handleCalculate}>Calculate</button>

      {result !== null && (
        <div className="result">
          Result: <strong>{result}</strong>
        </div>
      )}

      {error && (
        <div className="error">
          Error: {error}
        </div>
      )}
    </div>
  );
}

export default App;
