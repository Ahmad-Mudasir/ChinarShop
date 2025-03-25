import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const [state, setState] = useState("Signup");
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Signup function
  const Signup = async () => {
    try {
      const response = await axios.post("http://localhost:4000/signup", {
        name: formData.Name,
        email: formData.Email,
        password: formData.Password,
      });

      if (response.status === 201) {
        toast.success("Signup successful!");
        localStorage.setItem("token", response.data.token); // Save token
        window.location.replace('/'); // Redirect to login
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Signup failed.");
      } else {
        toast.error("Server error, please try again later.");
      }
    }
  };

  //Login Function
  const Login = async () => {
    try {
      const response = await axios.post("http://localhost:4000/login", {
        email: formData.Email,
        password: formData.Password,
      });

      if (response.status === 200) {
        toast.success("Login successful!");
        localStorage.setItem("token", response.data.token); // Save token
        window.location.replace('/'); // Redirect to login
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Login failed.");
      } else {
        toast.error("Server error, please try again later.");
      }
    }
  };


  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state === "Login" ? "Login" : "Signup"}</h1>
        <div className="loginsignup-fields">
          {state === "Signup" && (
            <input type="text" name='Name' value={formData.Name} onChange={handleChange} placeholder='Your Name' />
          )}
          <input type="email" name='Email' value={formData.Email} onChange={handleChange} placeholder='Email Address' />
          <input type="password" name='Password' value={formData.Password} onChange={handleChange} placeholder='Password' />
        </div>
        <button onClick={() => { state === "Login" ? Login() : Signup(); }}>
          Continue
        </button>
        {state === "Signup" ? (
          <p className="loginsignup-login">Already have an account? <span onClick={() => setState("Login")}>Login here</span></p>
        ) : (
          <p className="loginsignup-login">Don't have an account? <span onClick={() => setState("Signup")}>Signup here</span></p>
        )}
        <div className="loginsignup-agree">
          <input type="checkbox" />
          <p>By continuing, I agree to the Terms of Use & Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
