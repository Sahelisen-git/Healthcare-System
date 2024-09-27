import React, { useState } from 'react'
import '../styles/AssignPopup.css'
import axios from 'axios';
import {useNavigate, useLocation } from 'react-router-dom';
import PopUp from '../components/PopUp';
import { Buffer } from 'buffer';


const apiUrl = process.env.REACT_APP_API_KEY;
const AssignPopup = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const id = location.state?.id;
  const doc = (() => {
        const bufferObj = Buffer.from(location.state?.doc, "base64"); 
        return bufferObj.toString("utf8"); 
    })();

  const deviceAssign = async () => {
    try {

    setLoading(true);
      const res = await axios.post(`${apiUrl}/patient/?doctorid=${doc}&patientid=${patient}&deviceid=${id}`)
      setLoading(false);
      if (res.data) {
        alert('device assigned to patient successfully');
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
    <div className='AssignPopup'>
            {loading && <PopUp />}
      
          <div className="card">
              <div className="id">
                  100
              </div>
        <form className='form' onSubmit={(e) => {
                e.preventDefault();
                deviceAssign();
              }}>
          <input type="text" placeholder='Enter Patient ID' id='patient' className='entry' value={patient} onChange={(e) => {
            setPatient(e.target.value)
                  }}/>
                    <button className='submit' type="submit">Submit</button>

              </form>
          </div>
    </div>
  )
}

export default AssignPopup