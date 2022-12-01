import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./addslider.css";
import jwt_decode from "jwt-decode";

const AddSlider = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  const [nameSlider, setNameSlider] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  const saveSlider = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/slider", {
        nameSlider,
      });
      swal({
        title: "Mantap",
        text: "Slider berhasil ditambahkan",
        icon: "success",
        button: "Ok",
      });
      navigate("/slider");
    } catch (error) {
      console.log(error);
    }
  };

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

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  return (
    <div className="slider">
      <Sidebar />
      <div className="sliderContainer">
        <Navbar />
        <div className="mainContainer">
          <div className="headerAddSlider">
            <span className="titleAddSlider">Tambah Gambar</span>
          </div>
          <hr />
          <form onSubmit={saveSlider}>
            <div className="mainForm">
              <div className="judulSliderForm">
                Title
                <input
                  type="text"
                  placeholder="Judul"
                  id="inputTitleSlider"
                  value={nameSlider}
                  onChange={(e) => setNameSlider(e.target.value)}
                  required
                />
              </div>
              <div className="gambarSliderForm">
                Upload Gambar
                <input
                  type="file"
                  id="inputGambarSlider"
                  onChange={loadImage}
                  required
                />
                {preview ? (
                  <figure className="figurePreview">
                    <img
                      src={preview}
                      alt="Preview gambar"
                      className="imagePreview"
                      style={{ width: "100%" }}
                    />
                  </figure>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="btnAll">
              <button type="submit" id="btnSubmitSlider">
                Tambah
              </button>
              <Link to="/slider">
                <button id="btnKembaliSlider">Kembali</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSlider;
