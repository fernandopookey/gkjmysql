import "./navbar.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { MdLanguage, MdOutlineDarkMode } from "react-icons/md";
import { AiOutlineFullscreen, AiOutlineUnorderedList } from "react-icons/ai";
import { GrNotification } from "react-icons/gr";
import { BsChatDots } from "react-icons/bs";
import image1 from "./image1.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Navbar = () => {
  const [username, setUserName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:3000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setUserName(decoded.username);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        Navigate("/login");
      }
    }
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <AiOutlineSearch className="icon" />
        </div>
        <div className="items">
          {/* <div className="item">
            <MdLanguage className="icon" />
            Language
          </div> */}
          {/* <div className="item">
            <MdOutlineDarkMode className="icon" />
          </div> */}
          {/* <div className="item">
            <AiOutlineFullscreen className="icon" />
          </div> */}
          {/* <div className="item">
            <GrNotification className="icon" />
            <div className="counter">1</div>
          </div> */}
          {/* <div className="item">
            <BsChatDots className="icon" />
            <div className="counter">1</div>
          </div> */}
          {/* <div className="item">
            <AiOutlineUnorderedList className="icon" />
          </div> */}
          <div className="item">
            <img src={image1} alt="" className="avatar" />
            <p className="userNameNavbar">{username}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
