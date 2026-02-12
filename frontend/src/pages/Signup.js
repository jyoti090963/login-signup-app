import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false); // toggle state

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo({ ...signupInfo, [name]: value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;

        if (!name || !email || !password) {
            return handleError("Name, email and password are required");
        }

        try {
            const response = await fetch("https://login-signup-app-omega.vercel.app/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signupInfo)
            });

            const result = await response.json();

            if (!response.ok) {
                return handleError(result.message || "Signup failed");
            }

            handleSuccess(result.message || "Signup successful");

            setTimeout(() => navigate("/login"), 1500);

        } catch (err) {
            handleError(err.message || "Something went wrong");
        }
    };

    return (
        <div className='container'>
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='name'
                        autoFocus
                        placeholder='Enter your name...'
                        value={signupInfo.name}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={signupInfo.email}
                    />
                </div>
                <div style={{ position: 'relative' }}>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        placeholder='Enter your password...'
                        value={signupInfo.password}
                        style={{ paddingRight: '60px' }} // space for toggle
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            position: 'absolute',
                            right: '10px',
                            top: '35px',
                            cursor: 'pointer',
                            border: 'none',
                            background: 'transparent',
                            color: '#020202',
                            padding: 0,
                           
                        }}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>
                <button type='submit'>Signup</button>
                <span>
                    Already have an account? <Link to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Signup;
