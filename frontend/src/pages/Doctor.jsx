import React, { useEffect, useState  } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Buffer } from 'buffer';
import '../styles/Doctor.css';
import { man, profile, woman } from '../assets/images/Image';
import PopUp from '../components/PopUp';

const apiUrl = process.env.REACT_APP_API_KEY

const User = ({uid,setUid}) => {
    const { id } = useParams();
    const decodedString = (() => {
    const bufferObj = Buffer.from(id, "base64"); 
    return bufferObj.toString("utf8"); 
    })();
    const [user, setUser] = useState(null);
    const [devices,setDevices]=useState(null);
    const navigate = useNavigate();
    const delayMS = 5000;
    


useEffect(() => {
    setUid(id);
    localStorage.setItem('user', id);
    localStorage.setItem('type', 'D');
    const fetchData = async () => {
        try {
            if (localStorage.getItem('data')) {
                setUser(JSON.parse(localStorage.getItem('data')))
            }
            else {
                const userResponse = await axios.get(`${apiUrl}/getdoctor/?_id=${decodedString}`);
                setUser(userResponse.data);
                localStorage.setItem('data', JSON.stringify(userResponse.data));
            }
            } catch (error) {
            console.log("Error fetching user data:", error);
                if (localStorage.getItem('data')) {
                    setUser(JSON.parse(localStorage.getItem('data')))

                }
            
            }
            finally{
                if (user && user.devices) {
                    setDevices(user.devices);
                } else {
                    setDevices(null); 
                }
            }

        };
        fetchData();
        
    },[decodedString,id,setUid]);

useEffect(()=>{
    const fetchData = async () => {
        try {
            if (navigator.onLine && decodedString) {
                const dataResponse = await axios.get(`${apiUrl}/getdevices/?_id=${decodedString}`);
                setDevices(dataResponse.data);
            }
            else {
                setDevices(null);
            }
        } catch (error) {
            console.log("Error fetching user's health data:", error);
        }
    };
    if (decodedString) {
        
    }
    const interval = setInterval(fetchData, delayMS);
    
    return () => clearInterval(interval);
},[decodedString])

    


    const name = user ? user.name : '';
    const email = user ? user.email : '';
    const phone = user ? user.phNo : '';
    const age = user ? user.age : '';
    const bloodGroup = user ? user.bloodGroup : '';
    const gender = user ? user.gender : '';
    const registration = user ? user.registration : '';




    let profileImg = profile;
    if (gender === 'male') {
        profileImg = man;
    } else if (gender === 'female') {
        profileImg = woman;
    }

    return (
        <div className='doctor'>
            {
                isNaN(user)?'':<PopUp/>
            }

            <section className="profile_sec">
                <div className="profile_image">
                    <img className="img" src={profileImg} alt='profile' />
                </div>
                <div className="profile_details">
                    <h1 className="profile_desc">Unique ID : {decodedString}</h1>
                    <h1 className="profile_desc">Registration : {registration}</h1>
                    <h1 className="profile_desc">Name : {name}</h1>
                    <h2 className="profile_desc">Email : {email}</h2>
                    <h2 className="profile_desc">Phone No : {phone}</h2>
                    <h2 className="profile_desc">Age : {age}</h2>
                    <h2 className="profile_desc">Blood Group : {bloodGroup}</h2>
                    <h2 className="profile_desc">Gender : {gender}</h2>
                </div>
            </section>
            <section className="device_section">
                <ul className="devices">
                    {
                        user && devices ? (
                            Object.entries(devices).map(([key, value]) => {
                                return (
                                    <li className="device"  onClick={() => {
                                        if (value) {
                                            navigate(`/patient`, {
                                                state: {
                                                    id: key,
                                                    pat: value,
                                                    doc:id
                                            }})
                                        }
                                        else {
                                            navigate(`/assign`, {
                                                state: { 
                                                    id: key,
                                                    doc:id
                                             } })
                                        }
                                    }}>
                                        {key}
                                        <div className="live" style={value===0?{backgroundColor:'red'}:{backgroundColor:'green'}} />
                                    </li>
                                )
                            })
                         ) :
                        ''
                    }
                </ul>
            </section>
        </div>
    );
};

export default User;
