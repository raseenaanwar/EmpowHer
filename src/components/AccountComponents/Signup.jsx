import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
  const [formdata, setFormdata] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
    role: ""
  });
  const navigate = useNavigate();
  const [error, SetError] = useState("");

  const handleOnchange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
      return;
    }

    if (!email || !first_name || !last_name || !password || !password2 || !role) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/register/", formdata);
      if (res.status === 201) {
        navigate("/otp/verify");
        toast.success(res.data.message);
        // Reset error state
        SetError("");
      }
    } catch (error) {
      console.error("Error:", error);
      // Display error message to the user
      toast.error("An error occurred. Please try again later.");
    }
  };

  const { email, first_name, last_name, password, password2, role } = formdata;

  return (
    <div>
      <div>
        <div>
          <h2>Create Account</h2>
          <p style={{ color: "red", padding: "1px" }}>{error ? error : ""}</p>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor="email">Email Address:</label>
              <input type="email" className='email-form' name="email" value={email} onChange={handleOnchange} />
            </div>
            <div className='form-group'>
              <label htmlFor="first_name">First Name:</label>
              <input type="text" className='email-form' name="first_name" value={first_name} onChange={handleOnchange} />
            </div>
            <div className='form-group'>
              <label htmlFor="last_name">Last Name:</label>
              <input type="text" className='email-form' name="last_name" value={last_name} onChange={handleOnchange} />
            </div>
            {/* Add dropdown for selecting role */}
            <div className='form-group'>
              <label htmlFor="role">Role:</label>
              <select name="role" value={role} onChange={handleOnchange}>
                <option value="">Select Role</option>
                <option value="MENTOR">Mentor</option>
                <option value="MENTEE">Mentee</option>
                <option value="WELLWISHER">Well Wisher</option>
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor="password">Password:</label>
              <input type="password" className='email-form' name="password" value={password} onChange={handleOnchange} />
            </div>
            <div className='form-group'>
              <label htmlFor="password2">Confirm Password:</label>
              <input type="password" className='p' name="password2" value={password2} onChange={handleOnchange} />
            </div>
            <input type="submit" value="Submit" className="submitButton" />
          </form>
          <h3 className='text-option'>Or</h3>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <div style={{ marginLeft: '1rem' }}>
              <button style={{ borderRadius: '20px', padding: '10px 20px', width: '250px' }}>Sign up with Google</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
