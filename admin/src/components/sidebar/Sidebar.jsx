import "./sidebar.scss";
import { MdOutlineDashboard, MdSlideshow } from "react-icons/md";
import { RiProfileLine, RiArticleLine } from "react-icons/ri";
import { AiOutlineSchedule, AiOutlineSetting } from "react-icons/ai";
import { TfiBook, TfiGallery } from "react-icons/tfi";
import { FaPeopleCarry } from "react-icons/fa";
import { BiBible } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const Logout = async () => {
    try {
      await axios.delete("http://localhost:3000/logout");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">adminpage</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <MdOutlineDashboard className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <li>
              <RiProfileLine className="icon" />
              <span>Profil</span>
            </li>
          </Link>
          <Link to="/jadwalibadah" style={{ textDecoration: "none" }}>
            <li>
              <AiOutlineSchedule className="icon" />
              <span>Jadwal Ibadah</span>
            </li>
          </Link>
          <Link to="/wartajemaat" style={{ textDecoration: "none" }}>
            <li>
              <TfiBook className="icon" />
              <span>Warta Jemaat</span>
            </li>
          </Link>
          <Link to="/kegiatan" style={{ textDecoration: "none" }}>
            <li>
              <FaPeopleCarry className="icon" />
              <span>Kegiatan</span>
            </li>
          </Link>
          <Link to="/renungan" style={{ textDecoration: "none" }}>
            <li>
              <BiBible className="icon" />
              <span>Renungan</span>
            </li>
          </Link>
          <Link to="/gallery" style={{ textDecoration: "none" }}>
            <li>
              <TfiGallery className="icon" />
              <span>Gallery</span>
            </li>
          </Link>
          <Link to="/artikel" style={{ textDecoration: "none" }}>
            <li>
              <RiArticleLine className="icon" />
              <span>Artikel</span>
            </li>
          </Link>
          <Link to="/slider" style={{ textDecoration: "none" }}>
            <li>
              <MdSlideshow className="icon" />
              <span>Slider</span>
            </li>
          </Link>
          <p className="title">SYSTEM</p>
          <li>
            <AiOutlineSetting className="icon" />
            <span>Settings</span>
          </li>
          <li>
            <FiLogOut className="icon" />
            <span onClick={Logout}>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption">1</div>
        <div className="colorOption">2</div>
      </div>
    </div>
  );
};

export default Sidebar;
