import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import './App.css';

// REPLACE 'localhost' with your computer's actual IP address (e.g., 192.168.1.5)
const SERVER_IP = 'localhost';
const API_URL = `http://${SERVER_IP}:5000`;
const socket = io(API_URL);

function App() {
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    // Initial fetch
    axios.get(`${API_URL}/buttons`).then(res => setButtons(res.data));

    // Listen for real-time updates from server
    socket.on('update', (updatedButtons) => {
      setButtons(updatedButtons);
    });

    return () => socket.off('update');
  }, []);

  const toggleStatus = async (id) => {
    await axios.put(`${API_URL}/buttons/${id}`);
  };

  return (
      <div className="mini-container">
        {buttons.map((btn) => (
            <button
                key={btn.id}
                className={`status-btn ${btn.status.toLowerCase()}`}
                onClick={() => toggleStatus(btn.id)}
            >
              {btn.status === "Vacant" ? "V" : "T"}
            </button>
        ))}
      </div>
  );
}

export default App;










/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000/buttons';

function App() {
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    fetchButtons();
  }, []);

  const fetchButtons = async () => {
    const res = await axios.get(API_URL);
    setButtons(res.data);
  };

  const toggleStatus = async (id) => {
    await axios.put(`${API_URL}/${id}`);
    fetchButtons(); // Refresh state
  };

  return (
      <div className="mini-container">
        {buttons.map((btn) => (
            <button
                key={btn.id}
                className={`status-btn ${btn.status.toLowerCase()}`}
                onClick={() => toggleStatus(btn.id)}
            >
              {btn.status === "Vacant" ? "V" : "T"}
            </button>
        ))}
      </div>
  );
}

export default App;*/
