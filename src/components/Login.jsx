import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const navigagte = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try{
            const response = await axios.post("https://hacktxserver.fly.dev/login", {
                username,
                password
            });

            const token = response.data.accessToken;
            localStorage.setItem("token", token)
            localStorage.setItem("user", username)
            navigagte("/Home")
        }catch(error){
            console.log("LOGIN ERROR " + error)
        }
    }

    return(
        <>
        <h1>Login</h1>
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
        <button onClick={handleLogin}>Login</button>
        </>
    );
}

export default Login;