import styles from '../styles/Footer.module.css';
import { useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <footer className={isDashboard ? styles.dashboardFooter : styles.footer}>
      <div className={styles.footerContent}>
        <p>© {new Date().getFullYear()} EcoCampus. All rights reserved.</p>
        {!isDashboard && ( // Only show these links on non-dashboard pages
          <div className={styles.footerLinks}>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </div>
        )}
      </div>
    </footer>
  );
}

export default Footer;
