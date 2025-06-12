import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';

function App() {
  const [date, setDate] = useState(new Date());
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [clickedDate, setClickedDate] = useState(null);

  const sportsOptions = ['Basketball', 'Soccer', 'Tennis', 'Baseball', 'Hockey'];
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

  const handleSubmit = () => {
    console.log('Submitted:', {
      date: clickedDate,
      sport: selectedSport,
      people: selectedPeople
    });

    // Reset (optional)
    setSelectedSport('');
    setSelectedPeople([]);
    setShowSidebar(false);
  };

  return (
    <div> className="app"
    <button onClick="My Function()"><position> 🏠Home </position></button>
    <button onClick="My Function()"><position> 👨Profile </position></button>
      <h1>📅 My Calendar App</h1>
      <div className="calendar-layout">
        <div className="calendar-container">
          <Calendar onChange={onDateClick} value={date} />
    </div>

        {showSidebar && (
          <div className="sidebar">
            <div className="sidebar-header">
              <h2>{clickedDate}</h2>
              <button className="close-button" onClick={() => setShowSidebar(false)}>❌</button>
            </div>

            <label>Select a Sport:</label>
            <select onChange={handleSportChange} value={selectedSport}>
              <option value="">-- Choose a sport --</option>
              {sportsOptions.map(sport => (
                <option key={sport} value={sport}>{sport}</option>
              ))}
            </select>

            <label style={{ marginTop: '20px', display: 'block' }}>
              Who in the group would you like to add?
            </label>
            <select multiple onChange={handlePersonChange} value={selectedPeople}>
              {groupMembers.map(person => (
                <option key={person} value={person}>{person}</option>
              ))}
            </select>

            {(selectedSport || selectedPeople.length > 0) && (
              <div style={{ marginTop: '20px' }}>
                {selectedSport && <p>🏀 Sport: <strong>{selectedSport}</strong></p>}
                {selectedPeople.length > 0 && (
                  <p>👥 Members: <strong>{selectedPeople.join(', ')}</strong></p>
                )}
              <div className="button-container">
                <button className="submit-button" onClick={handleSubmit}>
                  ✅ Submit
                </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
