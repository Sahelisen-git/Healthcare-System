import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PopUp from '../components/PopUp';
import { Buffer } from 'buffer';

import '../styles/Login.css';

const apiUrl = process.env.REACT_APP_API_KEY;

const Login = ({ setID }) => {
  useEffect(() => {
    setID('');
    localStorage.clear();
  }, [setID]);
  const [swap, setSwap] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const profileLogIn = async () => {
    setLoading(true);
    try {
      
      const userResponse = await axios.get(`${apiUrl}/finduser/?email=${email}&password=${password}`);
      setLoading(false);
      if (userResponse.data) {
        let bufferObj = Buffer.from(String(userResponse.data), "utf8"); 
  
        let base64String = bufferObj.toString("base64"); 

        localStorage.setItem('user', base64String);
        localStorage.setItem('type', 'P');
        
        setID(base64String);

        navigate(`/user/${base64String}`);
      } else {
        alert('No user data found');
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching user data:", error);
    }
  }

  const doctorLogIn = async () => {
    setLoading(true);
    try {
      
      const userResponse = await axios.get(`${apiUrl}/finddoctor/?email=${email}&password=${password}`);
      setLoading(false);
      if (userResponse.data) {
        let bufferObj = Buffer.from(String(userResponse.data), "utf8"); 
  
        let base64String = bufferObj.toString("base64"); 

        localStorage.setItem('user', base64String);
        localStorage.setItem('type', 'D');
        
        setID(base64String);

        navigate(`/doctor/${base64String}`);
      } else {
        alert('No user data found');
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching user data:", error);
    }
  }
  const togglePassword = () => {
        let passwordDOM = document.getElementById('passwordBox')
        if (passwordDOM.type === "password") {
            passwordDOM.type="text"
        }
        else{
            passwordDOM.type="password"
        }
    }
  return (
    
    <div className='login'>
        {loading && <PopUp />}
      <form className='form' onSubmit={(e) => {
        e.preventDefault();
        swap?profileLogIn():doctorLogIn();
      }}>
        <label className='loginlabel' htmlFor="userid">Login</label>
        <div className="modeswap">
          <button className='modeapp' style={swap ? { backgroundColor: '#5cb6ff' } : { backgroundColor: 'white' }} onClick={() => {
            setSwap(true);
            setEmail('');
            setPassword('');
          }}>Patient</button>
          <button className='modeapp' style={swap ? { backgroundColor: 'white' } : { backgroundColor: '#5cb6ff' }} onClick={() => {
            setSwap(false)
            setEmail('');
            setPassword('');
          }}>Doctor</button>
                </div>
        <input type="email" id='email' value={email} className='entry' placeholder='Enter Email Address' onChange={(e) => setEmail(e.target.value)} required/>
                <input type="password" id='passwordBox' value={password} className='entry' placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} required />
                <div className="entry" style={{backgroundColor:'transparent',height:'auto',  display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',overflow:'hidden',boxSizing:'border-box'}}>
                    
                    <input type="checkbox" name="show password" className='entry' style={{marginBottom:'0px',border: '0px', outline: 'none', width: '15px', height: '15px' }} onClick={togglePassword} id="show_password" placeholder='Show Password' />
                    
                    <span style={{ fontSize: '14px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 'auto',width:'auto', marginLeft:'5px',textAlign:'center'}}>show password</span>
                </div>
        <button className='submit' type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
