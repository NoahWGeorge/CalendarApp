import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-calendar/dist/Calendar.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="app">
      <ToastContainer />
      {isLoggedIn ? <CalendarApp /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />}
    </div>
  );
}

function LoginPage({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 🔐 Simple fake login
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
    } else {
      toast.error('Invalid credentials!', {
        position: 'top-right',
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="login-container">
      <h1>🔒 Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

function CalendarApp() {
  const [date, setDate] = useState(new Date());
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [clickedDate, setClickedDate] = useState(null);

  const sportsOptions = ['Basketball', 'Soccer', 'Tennis', 'Baseball', 'Hockey', 'Golf'];
  const groupMembers = ['Alex', 'Jordan', 'Taylor', 'Sam', 'Riley'];

  const onDateClick = newDate => {
    setDate(newDate);
    setClickedDate(newDate.toDateString());
    setShowSidebar(true);
  };

  const handleSportChange = e => {
    setSelectedSport(e.target.value);
  };

  const handlePersonChange = e => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedPeople(selected);
  };

  const handleReset = () => {
    setSelectedSport('');
    setSelectedPeople([]);
    toast.info('Selections reset!', {
      position: 'top-right',
      autoClose: 2000,
    });
  };

  const handleSubmit = () => {
    console.log('Submitted:', {
      date: clickedDate,
      sport: selectedSport,
      people: selectedPeople,
    });

    setSelectedSport('');
    setSelectedPeople([]);
    setShowSidebar(false);
  };

  return (
    <div>
      <h1>📅 My Calendar App</h1>
      <div className="calendar-layout">
        <div className="calendar-container">
          <Calendar onChange={onDateClick} value={date} />
        </div>

        {showSidebar && (
          <div className="sidebar">
            <div className="sidebar-header">
              <h2>{clickedDate}</h2>
              <button className="close-button" onClick={() => setShowSidebar(false)}>
                ❌
              </button>
            </div>

            <label>Select a Sport:</label>
            <select onChange={handleSportChange} value={selectedSport}>
              <option value="">-- Choose a sport --</option>
              {sportsOptions.map(sport => (
                <option key={sport} value={sport}>
                  {sport}
                </option>
              ))}
            </select>

            <label style={{ marginTop: '20px', display: 'block' }}>
              Who in the group would you like to add?
            </label>
            <select multiple onChange={handlePersonChange} value={selectedPeople}>
              {groupMembers.map(person => (
                <option key={person} value={person}>
                  {person}
                </option>
              ))}
            </select>

            {(selectedSport || selectedPeople.length > 0) && (
              <div className="button-container">
                <button className="reset-button" onClick={handleReset}>
                  🔄 Reset
                </button>
                <button className="submit-button" onClick={handleSubmit}>
                  ✅ Submit
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
