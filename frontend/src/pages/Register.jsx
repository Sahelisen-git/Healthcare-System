import React, { useState } from 'react';
import '../styles/Register.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PopUp from '../components/PopUp';

const apiUrl = process.env.REACT_APP_API_KEY;

const Register = () => {
    const [swap, setSwap] = useState(true);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [ph, setPh] = useState('');
    const [reg, setReg] = useState('');
    const [blood, setBlood] = useState('A');
    const [age, setAge] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('male');
    const [loading, setLoading] = useState(false);

    const addUser = async (e) => {
        e.preventDefault(); 
        setLoading(true);

        const userData = {
            name: name,
            email: email,
            phNo: ph,
            age: age,
            bloodGroup: blood,
            password: password,
            gender:gender
        };

        try {
            const response = await axios.post(`${apiUrl}/adduser/`, userData);
            setLoading(false);
            if (response.data) {
                navigate(`/login`);
            }
            else {
                alert("This email address and Password already exist")
            }
        } catch (error) {
            console.error('Error adding user:', error);
            setLoading(false);
        }
    };

    const addDoctor = async (e) => {
        e.preventDefault(); 
        setLoading(true);

        const userData = {
            name: name,
            email: email,
            phNo: ph,
            age: age,
            bloodGroup: blood,
            password: password,
            gender: gender,
            registration:reg
        };

        try {
            const response = await axios.post(`${apiUrl}/adddoctor/`, userData);
            setLoading(false);
            if (response.data) {
                navigate(`/login`);
            }
            else {
                alert("This email address and Password already exist")
            }
        } catch (error) {
            console.error('Error adding user:', error);
            setLoading(false);
        }
    };

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
        <div className='register'>
            {loading && <PopUp />}
            <form className='register_form' onSubmit={swap?addUser:addDoctor}>
                <label className='registerlabel'>Register</label>
                <div className="modeswap">
                    <button className='modeapp' style={swap ? { backgroundColor: '#5cb6ff' } : { backgroundColor: 'white' }} onClick={() => {
                        setSwap(true);
                        setName('');
                        setEmail('');
                        setPh('');
                        setReg('');
                        setBlood('A');
                        setAge('');
                        setPassword('');
                        setGender('male');
                    }}>Patient</button>
                    <button className='modeapp' style={swap ? { backgroundColor: 'white' } : { backgroundColor: '#5cb6ff' }} onClick={() => {
                        setSwap(false);
                        setName('');
                        setEmail('');
                        setPh('');
                        setReg('');
                        setBlood('A');
                        setAge('');
                        setPassword('');
                        setGender('male');
                    }}>Doctor</button>
                </div>
                {   swap?
                    <>
                        <input type="email" id='email' value={email} className='register_det' placeholder='Enter Email Address' onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" id='passwordBox' value={password} className='register_det' placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} required />
                
                        <div className="register_det" style={{ height: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', overflow: 'hidden', boxSizing: 'border-box' }}>
                    
                            <input type="checkbox" name="show password" className='register_det' style={{ marginBottom: '0px', border: '0px', outline: 'none', width: '15px', height: '15px' }} onClick={togglePassword} id="show_password" placeholder='Show Password' />
                    
                            <span style={{ fontSize: '14px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 'auto', width: 'auto', marginLeft: '5px', textAlign: 'center' }}>show password</span>
                        </div>
                
                        <hr style={{ width: '100%', height: '2px', backgroundColor: '#dfdfdf7b', border: '0px', outline: 'none', marginBottom: '20px' }} />
                
                        <input type="text" id='name' value={name} className='register_det' placeholder='Enter Name' onChange={(e) => setName(e.target.value)} required />
                
                        <input type="tel" id='number' pattern="[0-9]{10}" value={ph} className='register_det' placeholder='Enter 10 digits Phone Number' onChange={(e) => setPh(e.target.value)} required />
                
                        <input type="number" id='age' value={age} className='register_det' placeholder='Enter Age' onChange={(e) => setAge(e.target.value)} min={10} max={150} required />
                
                        <div className="register_det" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <label for="bloodGroup" style={{ height: 'auto', fontSize: '14px', width: 'auto', marginRight: '7px' }} >Blood Group </label>
                            <select style={{ width: 'auto', height: 'auto', border: '0px', outline: 'none', backgroundColor: 'white', padding: '5px', fontSize: '14px', borderRadius: '5px' }} name="blood" id="blood" value={blood} onChange={(e) => setBlood(e.target.value)} required>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="AB">AB</option>
                                <option value="O">O</option>
                            </select>
                        </div>
                        <div className="register_det" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <label for="gender" style={{ height: 'auto', fontSize: '14px', width: 'auto', marginRight: '7px' }} >Gender </label>
                            <select style={{ width: 'auto', height: 'auto', border: '0px', outline: 'none', backgroundColor: 'white', padding: '5px', fontSize: '14px', borderRadius: '5px' }} name="gender" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="others">Others</option>
                            </select>
                        </div>

                        <input type="submit" value="submit" className='register_submit' />
                    </> :
                    <>
                        <input type="tel" id='registration' pattern="[0-9]{4}" value={reg} className='register_det' placeholder='Enter registration number' onChange={(e) => setReg(e.target.value)} required />

                        <input type="email" id='email' value={email} className='register_det' placeholder='Enter Email Address' onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" id='passwordBox' value={password} className='register_det' placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} required />
                
                        <div className="register_det" style={{ height: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', overflow: 'hidden', boxSizing: 'border-box' }}>
                    
                            <input type="checkbox" name="show password" className='register_det' style={{ marginBottom: '0px', border: '0px', outline: 'none', width: '15px', height: '15px' }} onClick={togglePassword} id="show_password" placeholder='Show Password' />
                    
                            <span style={{ fontSize: '14px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 'auto', width: 'auto', marginLeft: '5px', textAlign: 'center' }}>show password</span>
                        </div>
                
                        <hr style={{ width: '100%', height: '2px', backgroundColor: '#dfdfdf7b', border: '0px', outline: 'none', marginBottom: '20px' }} />
                
                        <input type="text" id='name' value={name} className='register_det' placeholder='Enter Name' onChange={(e) => setName(e.target.value)} required />
                
                        <input type="tel" id='number' pattern="[0-9]{10}" value={ph} className='register_det' placeholder='Enter 10 digits Phone Number' onChange={(e) => setPh(e.target.value)} required />
                
                        <input type="number" id='age' value={age} className='register_det' placeholder='Enter Age' onChange={(e) => setAge(e.target.value)} min={10} max={150} required />
                
                        <div className="register_det" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <label for="bloodGroup" style={{ height: 'auto', fontSize: '14px', width: 'auto', marginRight: '7px' }} >Blood Group </label>
                            <select style={{ width: 'auto', height: 'auto', border: '0px', outline: 'none', backgroundColor: 'white', padding: '5px', fontSize: '14px', borderRadius: '5px' }} name="blood" id="blood" value={blood} onChange={(e) => setBlood(e.target.value)} required>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="AB">AB</option>
                                <option value="O">O</option>
                            </select>
                        </div>
                        <div className="register_det" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <label for="gender" style={{ height: 'auto', fontSize: '14px', width: 'auto', marginRight: '7px' }} >Gender </label>
                            <select style={{ width: 'auto', height: 'auto', border: '0px', outline: 'none', backgroundColor: 'white', padding: '5px', fontSize: '14px', borderRadius: '5px' }} name="gender" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="others">Others</option>
                            </select>
                        </div>

                        <input type="submit" value="submit" className='register_submit' />
                    </>
                }
            </form>
        </div>
    );
};

export default Register;
