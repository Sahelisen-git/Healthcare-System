# Rural Health Monitoring and Emergency Ventilation System

## Problem Statement
Accessing city hospitals from rural areas during emergencies is challenging. Limited infrastructure and resources often result in delayed medical interventions, leading to adverse health outcomes. To address this issue, we aim to develop a comprehensive solution that provides immediate medical assistance and continuous monitoring for rural communities.

## Introduction
In rural areas, accessing immediate healthcare can be a daunting task due to geographical constraints and inadequate medical facilities. Our project aims to bridge this gap by introducing a portable health monitoring and emergency ventilation system. By integrating cutting-edge technology with medical expertise, we aspire to ensure timely interventions and proactive healthcare management for individuals residing in remote regions.

## Technical Stack
### Hardware
1. Microcontroller (Arduino Uno/Node MCU)
2. Blood Oxygen Sensor (MAX30102)
3. ECG Sensor (AD8232)
4. DC Motor
5. Motor Driver (L298N)
6. Ambu Bag (Silicon Ventilator Bag)

### Software
1. FastAPI (Python)
2. MongoDB
3. Render Hosting Service
4. ML Pipeline
5. Google Cloud
6. React JS
7. SASS
8. SMTP Protocol
9. Arduino IDE

## Basic Workflow and Approach
1. **Sensor Data Acquisition**: Sensors like MAX30102 and AD8232 connected to Arduino Nano collect vital parameters such as blood oxygen level, heart rate, body temperature, and ECG readings.
2. **Emergency Ventilation**: The system triggers emergency oxygen supply automatically when blood oxygen levels drop below a certain threshold, ensuring immediate life-saving intervention.
3. **Data Transmission**: Arduino Uno communicates with Node MCU via serial communication to transmit sensor data.
4. **API Integration**: Node MCU fetches REST API data via secure HTTP method, built on FastAPI framework in Python, facilitating seamless data transfer and storage.
5. **Data Storage**: Sensor data is stored in Google Sheets through the API, enabling easy access and analysis by healthcare providers.
6. **User Profile Creation**: Users create profiles on the website, and their details are stored in MongoDB via the REST API for personalized healthcare management.
7. **Authentication and Access**: Login credentials are shared with users via SMTP protocol, with HTML-formatted emails for visual appeal, ensuring secure access to their health records.
8. **Data Visualization**: User profiles display health parameters using Chart.js, providing visual insights into their health status and trends.
9. **Health Analytics**: Advanced analytics, including stress level calculation using XGBoost and noninvasive glucose level prediction through IR diodes, empower proactive disease management and prevention.
10. **Deployment**: The entire software system is deployed on Render, a reliable hosting service, ensuring seamless accessibility and scalability for users.

## Vision of the Project
Our project's vision is to revolutionize rural healthcare delivery by leveraging technology to overcome geographical barriers and resource constraints. By providing immediate emergency support, continuous monitoring, and predictive healthcare analytics, we aim to empower rural communities with access to quality healthcare services. Through collaborative efforts and innovation, we aspire to create a healthier and more resilient society, where healthcare is accessible to all, irrespective of location or socioeconomic status.
