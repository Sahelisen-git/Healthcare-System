import React, { useEffect, useState  } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Buffer } from 'buffer';
import '../styles/User.css';
import LineChart from '../components/LineChart';
import { man, profile, woman } from '../assets/images/Image';
import PopUp from '../components/PopUp';
const apiUrl=process.env.REACT_APP_API_KEY
const User = ({uid,setUid}) => {
    const { id } = useParams();
    const decodedString = (() => {
                    const bufferObj = Buffer.from(id, "base64"); 
            return bufferObj.toString("utf8"); 
    })();
    const [data, setData] = useState(null);
    const [user, setUser] = useState(null);
    const delayMS = 10000;


useEffect(() => {
        setUid(id);

    const fetchData = async () => {
        try {
            if (localStorage.getItem('data')) {
                setUser(JSON.parse(localStorage.getItem('data')))
            }
            else {
                const userResponse = await axios.get(`${apiUrl}/find/?_id=${decodedString}`);
                setUser(userResponse.data);
                localStorage.setItem('data', JSON.stringify(userResponse.data));
            }
            } catch (error) {
                console.log("Error fetching user data:", error);
                if (localStorage.getItem('data')) {
                    setUser(JSON.parse(localStorage.getItem('data')))

                }
            
            }
        };
        fetchData();
        
    }, [id,setUid,decodedString]);

useEffect(() => {
    const fetchData = async () => {
        try {
            if (navigator.onLine) {
                const dataResponse = await axios.get(`${apiUrl}/show/?_id=${decodedString}`);
                setData(dataResponse.data);
                localStorage.setItem('stats', JSON.stringify(dataResponse.data));
            }
            else {
                setData(JSON.parse(localStorage.getItem('stats')));
            }
        } catch (error) {
            console.log("Error fetching user's health data:", error);
            if (localStorage.getItem('stats')) {
                setData(JSON.parse(localStorage.getItem('stats')))
            }
        }
    };

    const interval = setInterval(fetchData, delayMS);
    
    return () => clearInterval(interval);
}, [decodedString]);


    


    const name = user ? user.name : '';
    const email = user ? user.email : '';
    const phone = user ? user.phNo : '';
    const age = user ? user.age : '';
    const bloodGroup = user ? user.bloodGroup : '';
    const gender = user ? user.gender : '';

    



    const dates = data ? Object.values(data['Date Time']) : [];
    const bloodOxygen = data ? Object.values(data['Blood Oxygen']) : [];
    const temperature = data ? Object.values(data['Temperature']) : [];
    const heartRate = data ? Object.values(data['Heart Rate']) : [];
    const ecgSignal = data ? Object.values(data['ECG Signal']) : [];
    const stressLevel = data ? Object.values(data['Stress Level']) : [];


    let profileImg = profile;
    if (gender === 'male') {
        profileImg = man;
    } else if (gender === 'female') {
        profileImg = woman;
    }

    return (
        <div className='user'>
            {
                isNaN(user)?'':<PopUp/>
            }
            <section className="profile_sec">
                <div className="profile_image">
                    <img className="img" src={profileImg} alt='profile' />
                </div>
                <div className="profile_details">
                    <h2 className="profile_desc">Unique ID : {decodedString}</h2>
                    <h2 className="profile_desc">Name : {name}</h2>
                    <h2 className="profile_desc">Email : {email}</h2>
                    <h2 className="profile_desc">Phone No : {phone}</h2>
                    <h2 className="profile_desc">Age : {age}</h2>
                    <h2 className="profile_desc">Blood Group : {bloodGroup}</h2>
                    <h2 className="profile_desc">Gender : {gender}</h2>
                </div>
            </section>

            <section className="chart">
                <LineChart time={dates} data={bloodOxygen} text='Blood Oxygen' />
                <LineChart time={dates} data={temperature} text='Temperature' />
                <LineChart time={dates} data={heartRate} text='Heart Rate' />
                <LineChart time={dates} data={ecgSignal} text='ECG Signal' />
                <LineChart time={dates} data={stressLevel} text='Stress Level' />
            </section>
        </div>
    );
};

export default User;
