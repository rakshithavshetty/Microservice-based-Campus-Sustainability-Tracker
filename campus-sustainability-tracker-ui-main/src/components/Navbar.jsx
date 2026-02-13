import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import styles from '../styles/Navbar.module.css';
import ForestTwoTone from '@mui/icons-material/ForestTwoTone';

function Navbar() {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoArea}>
        <Link to="/" className={styles.logoLink}>
          <ForestTwoTone className={styles.logoIcon} />
          <span className={styles.brandName}>EcoCampus</span>
        </Link>
      </div>

      {!isDashboard && (
        <div className={styles.linksArea}>
          <Link
            className={styles.authButton}
            to={user ? "/dashboard" : "/login"}
          >
            Login
          </Link>
          <Link
            className={styles.authButton}
            to={user ? "/dashboard" : "/register"}
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
