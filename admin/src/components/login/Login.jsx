import "./login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/login`, {
        email: email,
        password: password,
      });
      navigate("/");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="main">
      <div className="subMain">
        <form onSubmit={Auth}>
          <p>{msg}</p>
          <div className="login">
            <div className="lContainer">
              <input
                type="text"
                placeholder="Email"
                id="username"
                className="lInput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                id="password"
                className="lInput"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="lButton">Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
