import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/actions/userActions';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import background from '../images/background.png'
import '../App.css'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handlesignup = () => {
    // Handle sign-in logic, e.g., navigate to the login page
    navigate('/registration');
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8070/User/login', {
        email,
        password,
      });

      if (response.data.status === 'success') {
        alert('Login successful!');

        // Store the user data in state or context
        // For simplicity, using local storage here. You might want to use a state management library like Redux or context API.
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Redirect to the Learn page after successful login
        navigate('/learn');
      } else {
        alert('Incorrect email or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Error during login. Please try again.');
    }
  };

  return (
    <div className='background-container'>
    <div>
      <img src={background} alt="background" className="background-image" />
    </div>
    <div className="login-container">
      <h2 style={{fontWeight:'800',fontSize:'30px'}}>Sign In</h2>
      <form className="login-form">
        <div className="form-group">
          <label className='label' htmlFor="email">Email Address<span style={{color:"red"}}>*</span></label>
          <input
            className='input'
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className='label' htmlFor="password">Password<span style={{color:"red"}}>*</span></label>
          <input
            className='input'
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <a className='a'>Forgot password?</a>
        </div>
        <div>
        <p className='p'>By clicking "Sign in," you agree to our <Link>Terms of Use</Link> and our <Link>Privacy Policy.</Link></p>
        </div>
        <button className='button' type="button" onClick={handleLogin}>
          Sign In
        </button>
        <div>
          <p>Don't have an account?<button className='signupbutton' onClick={handlesignup}>Sign Up</button></p>
        </div>
      </form>
    </div>
    </div>
  );
}

export default Login;
