import React from 'react'
import { ecg, heartrate, spo2, thermo,am1,am2 } from '../assets/images/Image'

import '../styles/Services.css'
const Services = () => {

  const services = [
    {
      'name': 'Temperature',
      'image':thermo
    },
    {
      'name': 'SpO2',
      'image':spo2
    },
    {
      'name':'Heart Rate',
      'image':heartrate
    },
    {
      'name': 'ECG',
      'image':ecg
    }
  ]

  return (
    <div className='services'>
      <section className="imgproto">
        <img className='proto' src={am1} alt="proto1" />
        <img className='proto' src={am2} alt="proto2" />
      </section>
      <p className="description">
        Our device monitor various physical parameters like Blood Oxygen Level, Temperature, ECG, Heart Rate in real time through our sensors and according to the data it automatically provide the necessary pressure of oxygen if needed.
      </p>
        <ul className="facility_sec">
        {
          services.map((item, index) => {
            return (
              <li key={index} className="facility_item">
                <img src={item['image']} alt="thermo" className="facility_image" />
                <h2 className="facility_name">
                  {item['name']}
                </h2>
              </li>
            )
          })
        }
        </ul>
    </div>
  )
}

export default Services