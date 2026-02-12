import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false); // toggle state

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo({ ...loginInfo, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;

        if (!email || !password) {
            return handleError("Email and password are required");
        }

        try {
            const response = await fetch("https://login-signup-app-omega.vercel.app/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginInfo)
            });

            const result = await response.json();

            if (!response.ok) {
                return handleError(result.message || "Login failed");
            }

            const { jwtToken, name } = result;
            handleSuccess("Login successful");

            localStorage.setItem("token", jwtToken);
            localStorage.setItem("loggedInUser", name);

            setTimeout(() => navigate("/home"), 1000);

        } catch (err) {
            handleError(err.message);
        }
    };

    return (
        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={loginInfo.email}
                    />
                </div>
                <div style={{ position: 'relative' }}>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        placeholder='Enter your password...'
                        value={loginInfo.password}
                        style={{ paddingRight: '60px' }}
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
                <button type='submit'>Login</button>
                <span>
                    Doesn't have an account? <Link to="/signup">Signup</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;
