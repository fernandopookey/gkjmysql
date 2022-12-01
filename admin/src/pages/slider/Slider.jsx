import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import swal from "sweetalert";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { AiOutlineSearch } from "react-icons/ai";
import "./slider.css";

const Slider = () => {
  const [slider, setSlider] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  useEffect(() => {
    refreshToken();
  }, []);

  useEffect(() => {
    getSlider();
  }, []);

  const getSlider = async () => {
    const response = await axios.get("http://localhost:3000/slider");
    setSlider(response.data);
  };

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

  const deleteSlider = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/slider/${id}`);
      swal({
        title: "Sukses!",
        text: "Slider Berhasil Dihapus!",
        icon: "success",
        button: "Ok",
      });
      getSlider();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="slider">
      <Sidebar />
      <div className="sliderContainer">
        <Navbar />
        <div className="sliderMain">
          <div className="sliderHeader">
            <div className="sliderTitle">Slider List</div>
          </div>
          <hr />
          <div className="sliderData">
            <div className="sliderDataHeader">
              <div className="sliderBtnAdd">
                <Link to="/slider/addslider" style={{ textDecoration: "none" }}>
                  <buttton className="tambahBtnSlider">Tambah</buttton>
                </Link>
                <div className="sliderSearch">
                  Cari
                  <input
                    type="text"
                    placeholder="Search"
                    id="sliderInputSearch"
                  />
                  <AiOutlineSearch />
                </div>
              </div>
            </div>
            <div className="sliderDataList">
              <div className="data">
                <table id="sliderTable">
                  <thead>
                    <tr>
                      <th>Judul</th>
                      <th>Gambar</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="bodySlider">
                    {slider.map((slider, index) => (
                      <tr key={slider.id} className="isiSlider">
                        <td className="tdJudul">{slider.name}</td>
                        <td className="tdImage">
                          <img
                            src={slider.url}
                            alt=""
                            style={{
                              width: "70%",
                              objectFit: "cover",
                            }}
                          />
                        </td>
                        <td className="tdAksi">
                          <div className="btnAksi">
                            <Link to={`/slider/editslider/${slider.id}`}>
                              <button className="btnUbahSlider">Ubah</button>
                            </Link>
                            <button
                              onClick={() => deleteSlider(slider.id)}
                              className="btnHapusSlider"
                            >
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
