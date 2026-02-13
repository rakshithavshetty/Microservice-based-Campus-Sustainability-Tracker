import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import OpacityIcon from '@mui/icons-material/Opacity';
import BoltIcon from '@mui/icons-material/Bolt';
import DeleteIcon from '@mui/icons-material/Delete';
import ForestIcon from '@mui/icons-material/Forest';
import ecoCampusImage from '../assets/eco-campus.png';
import AuthContext from '../context/AuthContext'; // ✅ Import AuthContext

function Home() {
  const { user } = useContext(AuthContext); // ✅ Use AuthContext

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className='home'>
      <header className='hero'>
        <div className='overlay' data-aos='fade-down'>
          <h1>Campus Sustainability Tracker</h1>
          <p>Engage. Track. Transform Your Campus for a Greener Future!</p>
        </div>
      </header>

      <section className='features'>
        <h2 data-aos='fade-up'>Our Core Features</h2>
        <div className='feature-list'>
          <div className='feature-item' data-aos='zoom-in' data-aos-delay='40'>
            <OpacityIcon style={{ fontSize: 80, color: '#00b0ff' }} />
            <h3>Water Monitoring</h3>
            <p>Track campus water consumption and promote conservation efforts.</p>
          </div>
          <div className='feature-item' data-aos='zoom-in' data-aos-delay='60'>
            <BoltIcon style={{ fontSize: 100, color: '#ff6d00' }} />
            <h3>Energy Insights</h3>
            <p>Measure energy usage, identify savings, and reduce your footprint.</p>
          </div>
          <div className='feature-item' data-aos='zoom-in' data-aos-delay='80'>
            <DeleteIcon style={{ fontSize: 80, color: '#555555' }} />
            <h3>Waste Management</h3>
            <p>Encourage recycling initiatives and sustainable waste handling.</p>
          </div>
          <div className='feature-item' data-aos='zoom-in' data-aos-delay='100'>
            <ForestIcon style={{ fontSize: 80, color: '#00e676' }} />
            <h3>Biodiversity Tracking</h3>
            <p>Support campus greening and ecological preservation initiatives.</p>
          </div>
        </div>
      </section>

      <section className='why-sustainability'>
        <div className='why-content' data-aos="fade-right" data-aos-offset="200">
          <h2>Why Sustainability Matters</h2>
          <p>
            Sustainability is not a choice anymore — it’s a necessity. Every drop saved,
            every tree planted, and every watt conserved contributes to a healthier planet.
            Together, we can make a massive difference, starting right from our campus.
          </p>
        </div>
        <div className='why-image' data-aos="fade-left" data-aos-offset="200">
          <img src={ecoCampusImage} alt="Sustainability" />
        </div>
      </section>

      <section className='get-started' data-aos="fade-up">
        <h2>Ready to Make a Difference?</h2>
        <p>Join the eco-warriors who are reshaping the future of our planet!</p>
        <div className='cta-buttons'>
          <Link to={user ? "/dashboard" : "/register"} className="btn-primary" data-aos="zoom-in">
            Get Started
          </Link>
          <Link to={user ? "/dashboard" : "/login"} className="btn-secondary" data-aos="zoom-in">
            Login
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
