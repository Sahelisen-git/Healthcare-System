import React from 'react'
import '../styles/LandingPage.css'
import {doctorImage} from '../assets/images/Image'
import { Link } from 'react-router-dom'
const LandingPage = () => {
  return (
    <div className='landing_page'>
        <section className="left">
          <h1 className="title">
            Health Mate
          </h1>
          <p className="description">
             It is a cutting-edge project designed to revolutionize the way individuals approach and manage their health and wellness journey. At its core, HealthMate is a comprehensive platform that leverages advanced technology to provide tailored support, guidance, and resources for users to achieve their health goals.
          </p>
        <button className='services_button'>
          <Link to='/services' className='linkservice'>Our Services</Link>
          </button>
        </section>
        <section className="right">
            <img src={doctorImage} alt="doctorimage" className='doctor_image'/>
        </section>
    </div>
  )
}

export default LandingPage