import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/app/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard"); 
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Login</h2>
      <form onSubmit={submitHandle}>
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
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
