import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const [logindata, setLogindata] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleOnchange = (e) => {
        setLogindata({ ...logindata, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = logindata;
        if (!email || !password) {
            setError("Email and Password are required");
            return;
        }

        try {
            setIsLoading(true);
            const res = await axios.post('http://localhost:8000/api/login/', logindata);
            const response = res.data;
            console.log(response);
            setIsLoading(false);
            const user = {
                "email": response.email,
                "name": response.full_name
            };
            if (res.status === 200) {
                localStorage.setItem('token', JSON.stringify(response.access_token));
                localStorage.setItem('refresh_token', JSON.stringify(response.refresh_token));
                localStorage.setItem('user', JSON.stringify(user));
                navigate('/dashboard'); // Redirect to dashboard after successful login
                toast.success('Login successful');
            } else {
                toast.error('Something went wrong');
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Login Error:", error);
            toast.error("Login failed. Please check your credentials and try again.");
        }
    };

    return (
        <div>
            <div className='form-container'>
                <div style={{ width: "100%" }} className='wrapper'>
                    <h2>Login into your account</h2>
                    <form action="" onSubmit={handleSubmit}>
                        {isLoading && (
                            <p>Loading ...</p>
                        )}
                        <div className='form-group'>
                            <label htmlFor="email">Email Address:</label>
                            <input type="text"
                                className='email-form'
                                value={logindata.email}
                                name="email"
                                onChange={handleOnchange} />
                            {error && <p className="error-message">{error}</p>} {/* Error message display */}
                        </div>
                        <div className='form-group'>
                            <label htmlFor="password">Password:</label>
                            <input type="password" 
                                className='email-form'
                                value={logindata.password}
                                name="password"
                                onChange={handleOnchange} />
                            {error && <p className="error-message">{error}</p>} {/* Error message display */}
                        </div>
                        <input type="submit" value="Login" className="submitButton" />
                        <p className='pass-link'><Link to={'/forget-password'}>Forgot Password</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
