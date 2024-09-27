import React, { useState,useEffect } from 'react'
import { meet,medrep,del, profile } from '../assets/images/Image';
import '../styles/UserProfile.css'
import { Buffer } from 'buffer';

import { useLocation, useNavigate } from 'react-router-dom';

import LineChart from '../components/LineChart';
import PopUp from '../components/PopUp';
import axios from 'axios'

const apiUrl=process.env.REACT_APP_API_KEY

const UserProfile = () => {
    const location = useLocation();
    const pat = location.state?.pat
    const id = location.state?.id
    const doc = (()  => {  
        const bufferObj = Buffer.from(location.state?.doc, "base64"); 
        return bufferObj.toString("utf8"); 
    })();
    const navigate = useNavigate();

    const [data, setData] = useState(null)
    const [user, setUser] = useState(null);
    const [cancel, setCancel] = useState(false);
    const [loading, setLoading] = useState(false);

    const dates = data ? Object.values(data['Date Time']) : [];
    const bloodOxygen = data ? Object.values(data['Blood Oxygen']) : [];
    const temperature = data ? Object.values(data['Temperature']) : [];
    const heartRate = data ? Object.values(data['Heart Rate']) : [];
    const ecgSignal = data ? Object.values(data['ECG Signal']) : [];
    const stressLevel = data ? Object.values(data['Stress Level']) : [];

    const name = user ? user.name : '';
    const email = user ? user.email : '';
    const phone = user ? user.phNo : '';
    const age = user ? user.age : '';
    const bloodGroup = user ? user.bloodGroup : '';
    const gender = user ? user.gender : '';

    const delayMS = 10000;

    useEffect(() => {

    const fetchData = async () => {
        try {
                const userResponse = await axios.get(`${apiUrl}/find/?_id=${pat}`);
                setUser(userResponse.data);
            
            } catch (error) {
                console.log("Error fetching user data:", error);
            
            }
        };
        fetchData();
        
    }, [id,pat]);

useEffect(() => {
    const fetchData = async () => {
        try {
            if (navigator.onLine) {
                const dataResponse = await axios.get(`${apiUrl}/show/?_id=${pat}`);
                setData(dataResponse.data);
            }
            else {
                setData(null);
            }
        } catch (error) {
            console.log("Error fetching user's health data:", error);
        }
    };

    const interval = setInterval(fetchData, delayMS);
    
    return () => clearInterval(interval);
    }, [pat]);
    

    const caneclButton=()=>{
        cancel ? setCancel(false) : setCancel(true);
    }


    const deviceRemove = async () => {
    try {

        setLoading(true);

      const res = await axios.post(`${apiUrl}/patient/?doctorid=${doc}&patientid=${0}&deviceid=${id}`)
      setLoading(false);
      if (res.data) {
        alert('device removed');
          localStorage.clear();
      }
      else {
          alert('user not found');
          
      }
    }
    catch (error) {
      setLoading(false);
      console.log('there is a error during the assignment')
      alert('an error occurred');
        }
    finally {
      navigate(`/doctor/${location.state?.doc}`)
    }
    }
    

  return (
      
    <div className="info">
            {
                isNaN(user)||loading?'':<PopUp/>
            }
          {
              cancel?(<div className="popup">
            <div className="popcontainer">
                  <h3 className='label'>Remove User?</h3>
                  <div className="buttons">
                  <button   className='operationbutton' onClick={deviceRemove}>Remove</button>
                  <button   className='operationbutton' onClick={caneclButton}>Cancel</button>
              </div>
            </div>
        </div>):''
            }
          <div className="patient">
              <div className="profile">
                  <div className="id">
                      {id}
                  </div>
              <div className="details">
                  <img src={profile} alt="patient" className="profileimg" />
                  <div className="profile_details">
                      <h2 className="profile_desc">Unique ID : {pat}</h2>
                      <h2 className="profile_desc">Name : {name}</h2>
                      <h2 className="profile_desc">Email : {email}</h2>
                      <h2 className="profile_desc">Phone No : {phone}</h2>
                      <h2 className="profile_desc">Age : {age}</h2>
                      <h2 className="profile_desc">Blood Group : {bloodGroup}</h2>
                      <h2 className="profile_desc">Gender : {gender}</h2>
                  </div>
              </div>

              </div>
              <div className="util">
                  <div className="charts">
                      <div className="wrapper">
                        <LineChart time={dates} data={bloodOxygen} text='Blood Oxygen' />
                        <LineChart time={dates} data={temperature} text='Temperature' />
                        <LineChart time={dates} data={heartRate} text='Heart Rate' />
                        <LineChart time={dates} data={ecgSignal} text='ECG Signal' />
                        <LineChart time={dates} data={stressLevel} text='Stress Level' />
                        </div>
                  </div>
                  <div className="opt">
                    <button className='but' >
                          <img className='butimg' src={del} onClick={caneclButton} alt="del" />
                          
                      </button>
                      <button className='but'>
                        <img className='butimg' src={meet} alt="meet"/>
                    </button>
                    <button className='but'>
                        <img className='butimg' src={medrep} alt="medrep"/>
                    </button>
                  </div>
              </div>
          </div>
          
      </div>
    
  )
}

export default UserProfile