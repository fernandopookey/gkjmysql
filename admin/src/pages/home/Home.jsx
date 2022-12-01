import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AiFillAccountBook } from "react-icons/ai";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { isError } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
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
      setName(decoded.name);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/login");
      }
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="mainHome">
          <div className="header">
            <span className="titleDashboard">Dashboard</span>
            <br />
            <p>
              Selamat datang <span className="nama">{name}</span>
            </p>
          </div>
          <hr className="line" />
          <div className="content">
            <div className="subContent">
              <div className="box">
                <div className="jadwalHome">
                  <span className="subTitleJadwalHome">Jadwal Ibadah</span>
                  <hr className="lineHome" />
                  <div className="buttonJadwalHome">
                    <Link
                      to="/jadwalibadah"
                      className="buttonBtnJadwalHome"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Selengkapnya
                    </Link>
                  </div>
                </div>
                <div className="sliderHome">
                  <span className="subTitleSliderHome">Slider</span>
                  <hr className="lineHome" />
                  <div className="buttonSliderHome">
                    <Link
                      to="/slider"
                      className="button"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Selengkapnya
                    </Link>
                  </div>
                </div>
                <div className="wartaHome">
                  <span className="subTitleWartaHome">Warta Jemaat</span>
                  <hr className="lineHome" />
                  <div className="buttonWartaHome">
                    <Link
                      to="/jadwalibadah"
                      className="button"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Selengkapnya
                    </Link>
                  </div>
                </div>
                <div className="artikelHome">
                  <span className="subTitleArtikelHome">Artikel</span>
                  <hr className="lineHome" />
                  <div className="buttonArtikelHome">
                    <Link
                      to="/artikel"
                      className="button"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Selengkapnya
                    </Link>
                  </div>
                </div>
                <div className="kegiatanHome">
                  <span className="subTitleKegiatanHome">Kegiatan</span>
                  <hr className="lineHome" />
                  <div className="buttonKegiatanHome">
                    <Link
                      to="/kegiatan"
                      className="button"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Selengkapnya
                    </Link>
                  </div>
                </div>
                <div className="renunganHome">
                  <span className="subTitleRenunganHome">Renungan</span>
                  <hr className="lineHome" />
                  <div className="buttonRenunganHome">
                    <Link
                      to="/renungan"
                      className="button"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Selengkapnya
                    </Link>
                  </div>
                </div>
                <div className="galleryHome">
                  <span className="subTitleGalleryHome">Gallery</span>
                  <hr className="lineHome" />
                  <div className="buttonGalleryHome">
                    <Link
                      to="/gallery"
                      className="button"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Selengkapnya
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
