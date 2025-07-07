import React, { useState, useEffect } from 'react';
import { Amplify, Auth } from 'aws-amplify';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import awsConfig from './amplifyConfig';
import Calendar from 'react-calendar';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from './components/Navbar';
import ProfilePage from './pages/profile';
import 'react-calendar/dist/Calendar.css';
import 'react-toastify/dist/ReactToastify.css';
import '@aws-amplify/ui-react/styles.css';
import './App.css';

Amplify.configure(awsConfig);

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

  const handleSportChange = e => setSelectedSport(e.target.value);

  const handlePersonChange = e => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) selected.push(options[i].value);
    }
    setSelectedPeople(selected);
  };

  const handleReset = () => {
    setSelectedSport('');
    setSelectedPeople([]);
    toast.info('Selections reset!', { position: 'top-right', autoClose: 2000 });
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
  <>
    <div className="calendar-layout">
      <div className="calendar-container">
        <Calendar onChange={onDateClick} value={date} />
      </div>
    </div>
    {showSidebar && (
      <div className="modal-overlay" onClick={() => setShowSidebar(false)}>
        <div
          className="modal-content"
          onClick={e => e.stopPropagation()}
        >
          <button
            className="close-button"
            onClick={() => setShowSidebar(false)}
            title="Close"
          >
            &#10006;
          </button>
          <h2 className="modal-title">{clickedDate}</h2>
          <div className="modal-body">
            <label className="modal-label">Select a Sport:</label>
            <select
              className="modal-select"
              onChange={handleSportChange}
              value={selectedSport}
            >
              <option value="">-- Choose a sport --</option>
              {sportsOptions.map(sport => (
                <option key={sport} value={sport}>{sport}</option>
              ))}
            </select>
            <label
              className="modal-label"
              style={{ marginTop: 16 }}
            >
              Who in the group would you like to add?
            </label>
            <select
              className="modal-multiselect"
              multiple
              onChange={handlePersonChange}
              value={selectedPeople}
              size={Math.min(5, groupMembers.length)}
            >
              {groupMembers.map(person => (
                <option key={person} value={person}>{person}</option>
              ))}
            </select>
            {(selectedSport || selectedPeople.length > 0) && (
              <div className="button-container">
                <button className="modal-btn reset" onClick={handleReset}>
                  <span role="img" aria-label="Reset">🔄</span> Reset
                </button>
                <button className="modal-btn submit" onClick={handleSubmit}>
                  <span role="img" aria-label="Submit">✅</span> Submit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )}
  </>
);

}

function MainPage({ user, onSignOut }) {
  return (
    <>
      <Navbar user={user} onSignOut={onSignOut} />
      <ToastContainer />
      <div style={{ paddingTop: 80 }}>
        <CalendarApp />
      </div>
    </>
  );
}


export default function App() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(u => setUser(u))
      .catch(() => setUser(null))
      .finally(() => setAuthChecked(true));
  }, []);

  useEffect(() => {
    // Only redirect if we've finished checking AND there's no user
    if (authChecked && user === null) {
      Auth.federatedSignIn();
    }
  }, [authChecked, user]);

  const handleSignOut = () => {
    Auth.signOut();
  };

  if (!authChecked) {
    return <div>Loading...</div>;
  }

  if (!user) return null; // Will only briefly flicker, since redirect triggers

  return (
  <div className="app">
    {/* Animated background blobs */}
    <div className="background-blob"></div>
    <div className="background-blob2"></div>
    
    <Router>
      <Routes>
        <Route path="/" element={<MainPage user={user} onSignOut={handleSignOut} />} />
        <Route
          path="/profile"
          element={
            <>
              <Navbar user={user} onSignOut={handleSignOut} />
              <ProfilePage />
            </>
          }
        />
      </Routes>
    </Router>
  </div>
);

}


