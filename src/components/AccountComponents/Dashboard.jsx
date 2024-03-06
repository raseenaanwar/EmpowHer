// Dashboard.jsx
import React, { useState,useEffect } from 'react';
import NavbarComponent from './NavbarComponent';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from '../../axiosinstance';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const jwtAccess = localStorage.getItem('access');
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        if (!jwtAccess && !user) {
            navigate('/login');
        } else {
            setIsLoggedIn(true);
            
            getSomeData();
        }
    }, [jwtAccess, user, navigate]);

    const handleLogout = async () => {
        const refresh = JSON.parse(localStorage.getItem('refresh'));
        try {
            const res = await AxiosInstance.post("/logout/", { "refresh_token": refresh });
            console.log(res)
            if (res.status === 200) {
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");
                localStorage.removeItem("user");
                navigate("/login");
                toast.success("Logout Successfully");
            } else {
                toast.error("Logout failed");
            }
        } catch (error) {
            console.error("Logout Error:", error);
            toast.error("Logout failed. Please try again.");
        }
    };

    const getSomeData = async () => {
        try {
            const res = await AxiosInstance.get("/dashboard/");
            if (res.status === 200) {
                console.log(res.data);
            }
        } catch (error) {
            console.error("Dashboard Data Error:", error);
            // Handle error or display a message to the user
        }
    };

    return (
        <div className='container'>
             <NavbarComponent isLoggedIn={isLoggedIn}  />
           
        </div>
    );
};

export default Dashboard;
