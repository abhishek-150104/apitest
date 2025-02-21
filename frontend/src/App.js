import React, { useState } from 'react';
import './App.css';

function App() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setResponse(null);
        setShowDropdown(false);
        setSelectedOptions([]); // Reset selection on new request

        let jsonData;
        try {
            jsonData = JSON.parse(input);
        } catch {
            setError('Invalid JSON input');
            return;
        }

        try {
            const res = await fetch('http://localhost:3000/bfhl', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jsonData),
            });

            if (!res.ok) {
                throw new Error('Server Error: Failed to fetch');
            }

            const data = await res.json();
            setResponse(data);
            setShowDropdown(true);
        } catch (err) {
            setError(err.message || 'Something went wrong');
        }
    };

    const handleSelectChange = (e) => {
        const options = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedOptions(options);
    };

    const filteredResponse = selectedOptions.length > 0 && response
        ? selectedOptions.reduce((acc, option) => {
            if (response[option]) acc[option] = response[option];
            return acc;
        }, {})
        : response;

    return (
        <div className="App">
            <h1>Your Roll Number</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='{"data": ["A", "C", "z"]}'
                />
                <button type="submit">Submit</button>
            </form>

            {error && <p className="error">{error}</p>}

            {showDropdown && response && (
                <div>
                    <h2>Select Options:</h2>
                    <select multiple onChange={handleSelectChange}>
                        <option value="alphabets">Alphabets</option>
                        <option value="numbers">Numbers</option>
                        <option value="highest_alphabet">Highest Alphabet</option>
                    </select>
                </div>
            )}

            {filteredResponse && (
                <div>
                    <h2>Filtered Response:</h2>
                    <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default App;
