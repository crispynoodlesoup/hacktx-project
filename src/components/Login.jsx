import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/canva/healthy-build-white-icon.png"
import city from "../assets/canva/login_city.png"

function Login() {
  const navigagte = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://hacktxserver.fly.dev/login", {
        username,
        password,
      });

      const token = response.data.accessToken;
      localStorage.setItem("token", token);
      localStorage.setItem("user", username);
      navigagte("/Home");
    } catch (error) {
      console.log("LOGIN ERROR " + error);
    }
  };

  return (
    <div className="login-page">
    <div className="login-box">
        <div className="logo-box"><img className="logo" src={logo} alt="" /></div>
      <div className="login-wrapper">
        <h1>SIGN IN</h1>
        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button" onClick={handleLogin}>
            LOGIN
          </button>
        </form>
      </div>
    </div>
    <img className="login-city" src={city} alt="" />
    </div>
  );
}

export default Login;
