import React,{useEffect, useState} from 'react';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';
import { man, userImg, woman } from '../assets/images/Image';

const Navbar = ({id,popup, setPopup}) => {

  const [display, setDisplay] = useState(false);
  const [profile, setProfile] = useState(userImg);


  const navItems = id===''?{
    'About': '/home',
    'Services': '/services',
    'Log In': '/login',
    'Register': '/register'
  } : {
    'About': '/home',
    'Services': '/services',
    'Profile': `/${localStorage.getItem('type')==='P'?'user':'doctor'}/${id}`,
    'Log Out': '/login'
  };

  useEffect(() => {
    const data=JSON.parse(localStorage.getItem('data'))

    if (data) {
      if (data.gender === 'male') {
        setProfile(man);
      } else if (data.gender === 'female') {
        setProfile(woman);
      } else {
        setProfile(userImg);
      }
    } else {
      setProfile(userImg);
    }
  
}, []);

  const popUpCheck = () => {
    popup ? setPopup(false) : setPopup(true);
    if (!display) {
      setDisplay(true);
    }
  }

  return (
    <div className='navbar'>
      <div className="sectionf">
      <div className="title">
        ROUBUSTA 6.0
      </div>
      <ul className="items">
        {Object.entries(navItems).map(([text, link], index) => (
          <button key={index} className="item">
            <Link className='link' to={link}>{ text}</Link>
          </button>
        ))}
      </ul>
      </div>
      <div className="sections">
        <div className="title">
          ROUBUSTA 6.0
        </div>
        <div className="outerbuttonsection">
          
            <ul style={display?{display:'flex'}:{}} className={`profiledetails ${popup?"slide-in-right":"slide-out-right"}`}>
            {Object.entries(navItems).map(([text, link], index) => (
          <button key={index} className="item">
            <Link className='link' to={link}>{ text}</Link>
          </button>
        ))}
          </ul>
              <button className='smallnav' onClick={popUpCheck}>
          <img className='smallImg' src={profile} alt="user"/>
          </button>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
