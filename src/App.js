import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import './App.css';

// REPLACE 'localhost' with your computer's actual IP address
const SERVER_IP = '192.168.6.150';
const API_URL = `http://${SERVER_IP}:5000`;
const socket = io(API_URL);

function App() {
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    // Initial fetch from backend
    axios.get(`${API_URL}/buttons`).then(res => setButtons(res.data));

    // Listen for real-time updates from other computers
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
              {/* THE TWIST: Show the room ID/Number instead of status letters */}
              {Number(btn.id) + 1}
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
