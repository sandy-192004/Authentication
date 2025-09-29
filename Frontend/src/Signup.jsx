import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandle = async (e) => {
    e.preventDefault(); 
    try {
      const res = await axios.post("http://localhost:3000/app/register", {
        name,
        email,
        password,
      });
      console.log(res.data);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Register</h2>
      <form onSubmit={submitHandle}>
        <div className="mb-3">
          <strong>Name</strong>
          <input
            type="text"
            placeholder="Enter name"
            autoComplete="off"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}  
          />
        </div>
        <div className="mb-3">
          <strong>Email address</strong>
          <input
            type="email"
            placeholder="Enter email"
            autoComplete="off"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}  
          />
        </div>
        <div className="mb-3">
          <strong>Password</strong>
          <input
            type="password"
            placeholder="Enter password"
            autoComplete="off"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}  
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <p className="mt-3">Already have an account?</p>
      <Link to="/login" className="btn btn-secondary">
        Login
      </Link>
    </div>
  );
};

export default Signup;
