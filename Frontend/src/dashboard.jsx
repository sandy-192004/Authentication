import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    const token = localStorage.getItem("token"); 
    if (!token) {
      setMessage("No token found, please login");
      return;
    }

    axios.get("http://localhost:3000/app/dashboard", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setMessage(res.data.msg))
      .catch(err => {
        console.error(err);
        setMessage("Unauthorized");
      });
  }, []);

  return (
    <div className="container mt-4">

      <h2>{message}</h2>
    </div>
  );
}

export default Dashboard;
