import { useContext, useEffect, useState } from 'react';
import Reports from './Reports';
import AuthContext from '../context/AuthContext';
import { EventProvider } from '../context/EventContext';
import styles from '../styles/Dashboard.module.css';
import greenWarrior from '../assets/green-warrior-avatar.png';
import Events from './Events';

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [selectedSection, setSelectedSection] = useState('Home'); 
  const [factsToShow, setFactsToShow] = useState([]);

  const sustainabilityFacts = [
    {
      title: "Save Water 💧",
      content: "A dripping faucet can waste over 3,000 gallons a year. Fix leaks to conserve!"
    },
    {
      title: "Recycle Smart ♻️",
      content: "Recycling one ton of paper saves 17 trees and 7,000 gallons of water."
    },
    {
      title: "Green Transportation 🚴‍♂️",
      content: "Every mile you bike instead of drive prevents about 1 pound of carbon emissions."
    },
    {
      title: "Energy Savers ⚡",
      content: "Switching to LED bulbs uses up to 80% less energy than traditional lighting."
    },
    {
      title: "Eat Local 🥦",
      content: "Eating locally-grown food reduces carbon footprint from transportation."
    },
    {
      title: "Plant Power 🌱",
      content: "An acre of forest absorbs six tons of carbon dioxide and puts out four tons of oxygen."
    },
    {
      title: "Eco Shopping 🛒",
      content: "Reusable bags eliminate hundreds of plastic bags from polluting the environment."
    }
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // Pick 3 random facts for home screen
    const shuffled = sustainabilityFacts.sort(() => 0.5 - Math.random());
    setFactsToShow(shuffled.slice(0, 3));
  }, []);

  if (!user) return <p>Loading...</p>;

  const renderMainContent = () => {
    switch (selectedSection) {
      case 'Reports':
        return <Reports />;
      case 'Resources':
  return <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#111', textAlign: 'left', marginBottom: '1.5rem' }}>📚 Resources - Coming Soon!</h1>;
      case 'Events':
        return <Events />;
      case 'Rewards':
  return <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#111', textAlign: 'left', marginBottom: '1.5rem' }}>🏆 Rewards - Coming Soon!</h1>;
      case 'Account':
        function formatAccountDate(dateStr) {
          const date = new Date(dateStr);
          const dayNum = date.getDate();
          const monthName = date.toLocaleString('default', { month: 'long' });
          const yearNum = date.getFullYear();
          // Get ordinal suffix
          const j = dayNum % 10, k = dayNum % 100;
          let suffix = 'th';
          if (j === 1 && k !== 11) suffix = 'st';
          else if (j === 2 && k !== 12) suffix = 'nd';
          else if (j === 3 && k !== 13) suffix = 'rd';
          const time = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true });
          return `${dayNum}${suffix} ${monthName} ${yearNum}, ${time}`;
        }
        return (
          <div className={styles.accountSection}>
            <h2><span role="img" aria-label="account" style={{fontSize: '1em', marginRight: '0.2em', verticalAlign: 'middle'}}>&#128100;</span>Account</h2>
            <div className={styles.accountTable}>
              <div className={styles.accountRow}>
                <div className={styles.accountLabel}>Email</div>
                <div className={styles.accountValue}>{user.email}</div>
              </div>
              <div className={styles.accountRow}>
                <div className={styles.accountLabel}>Account Created</div>
                <div className={styles.accountValue}>{formatAccountDate(user.createdAt)}</div>
              </div>
            </div>
            <button onClick={logout} className={styles.logoutButton}>
              Log Out
            </button>
          </div>
        );
      default:
        return (
          <div>
            <h1>🌿 Welcome, {user.username}</h1>
            <p className={styles.greenMessage}>Let's make the world greener, one step at a time! 🌎</p>

            {/* Sustainability Facts Section */}
            <div className={styles.factSection}>
              <h2 className={styles.factMainTitle}> Eco Facts to Inspire You</h2>
              <div className={styles.factGrid}>
                {factsToShow.map((fact, index) => (
                  <div key={index} className={styles.factCard}>
                    <h3 className={styles.factTitle}>{fact.title}</h3>
                    <p className={styles.factContent}>{fact.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.profileSection}>
          <img 
            src={greenWarrior}
            alt="Green Warrior" 
            className={styles.profilePic}
          />
          <p className={styles.username}>{user.username}</p>
        </div>

        <nav className={styles.navLinks}>
          <ul>
            <li onClick={() => setSelectedSection('Reports')}>Reports</li>
            <li onClick={() => setSelectedSection('Resources')}>Resources</li>
            <li onClick={() => setSelectedSection('Events')}>Events</li>
            <li onClick={() => setSelectedSection('Rewards')}>Rewards</li>
            <li onClick={() => setSelectedSection('Account')}>Account</li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className={styles.mainContent}>
        {renderMainContent()}
      </div>
    </div>
  );
}

// Wrap Dashboard in EventProvider
export default function DashboardWithProvider(props) {
  return (
    <EventProvider>
      <Dashboard {...props} />
    </EventProvider>
  );
}
