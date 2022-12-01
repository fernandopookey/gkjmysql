import { useState } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const Register = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/users", {
        name: name,
        username: username,
        email: email,
        password: password,
        confPassword: confPassword,
      });

      navigate("/login");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  return (
    <form onSubmit={Register}>
      <div className="register">
        <div className="rContainer">
          Nama
          <input
            type="text"
            placeholder="Nama"
            id="nama"
            className="lInput"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          Username
          <input
            type="text"
            placeholder="Username"
            id="username"
            className="lInput"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          Email
          <input
            type="text"
            placeholder="Email"
            id="email"
            className="lInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          Password
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="lInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          Konfirmasi Password
          <input
            type="password"
            placeholder="Konfirmasi Password"
            id="confPassword"
            className="lInput"
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
          />
          <button className="lButton">Registrasi</button>
        </div>
      </div>
    </form>
  );
};

export default Register;
