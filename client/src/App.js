import React, { useState } from 'react';
import { Amplify, Auth } from 'aws-amplify';
import awsConfig from './amplifyConfig';
import Calendar from 'react-calendar';
import { ToastContainer, toast } from 'react-toastify';
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

function SignInButton() {
  const handleSignIn = () => {
    Auth.federatedSignIn(); // Forces redirect to Cognito Hosted UI
  };
  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      <button onClick={handleSignIn} style={{ fontSize: '1.25rem', padding: '1em 2em' }}>
        Sign In with Hosted UI
      </button>
    </div>
  );
}

export default function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  if (!user) {
    return <SignInButton />;
  }

  return (
    <div className="app">
      <ToastContainer />
      <button style={{ float: 'right' }} onClick={() => Auth.signOut()}>
        Sign Out
      </button>
      <CalendarApp />
    </div>
  );
}
