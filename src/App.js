import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import './App.css';

// 1. Set the Server IP
const SERVER_IP = '192.168.6.150';
const API_URL = `http://${SERVER_IP}:5000`;
const socket = io(API_URL);

// 2. CONFIGURATION: Change to 'lab' or 'clinic' before building
const MY_DEPARTMENT = 'lab';

function App() {
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    // Initial fetch for the specific department
    axios.get(`${API_URL}/buttons/${MY_DEPARTMENT}`)
        .then(res => setButtons(res.data))
        .catch(err => console.error("Error fetching buttons:", err));

    // Listen for real-time updates
    socket.on('update', (allUpdatedButtons) => {
      const filtered = allUpdatedButtons.filter(btn => btn.dept === MY_DEPARTMENT);
      setButtons(filtered);
    });

    return () => socket.off('update');
  }, []);

  const toggleStatus = async (id) => {
    try {
      await axios.put(`${API_URL}/buttons/${id}`);
    } catch (err) {
      console.error("Error toggling status:", err);
    }
  };

  return (
      <div className="mini-container">
        {buttons.map((btn, index) => (
            <button
                key={btn.id}
                className={`status-btn ${btn.status.toLowerCase()}`}
                onClick={() => toggleStatus(btn.id)}
            >
              {/* TWIST 1: Show L1, L2 for Lab and 1, 2, 3... for Clinic */}
              {MY_DEPARTMENT === 'lab' ? `L${index + 1}` : index + 1}
            </button>
        ))}
      </div>
  );
}

export default App;

/*import React, { useState, useEffect } from 'react';
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
              {/!* THE TWIST: Show the room ID/Number instead of status letters *!/}
              {Number(btn.id) + 1}
            </button>
        ))}
      </div>
  );
}

export default App;*/