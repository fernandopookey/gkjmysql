import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./addgallery.css";
import jwt_decode from "jwt-decode";

const AddGallery = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const saveGallery = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    try {
      await axios.post("http://localhost:3000/gallery", formData);
      navigate("/gallery");
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

  return (
    <div className="gallery">
      <Sidebar />
      <div className="galleryContainer">
        <Navbar />
        <div className="mainContainer">
          <div className="headerAddGallery">
            <span className="titleAddGallery">Tambah Gambar</span>
          </div>
          <hr />
          <form onSubmit={saveGallery}>
            <div className="mainForm">
              <div className="judulGalleryForm">
                Judul
                <input
                  type="text"
                  placeholder="Judul"
                  id="inputJudulGallery"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="gambarGalleryForm">
                Upload Gambar
                <input
                  type="file"
                  id="inputGambarGallery"
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
              <button type="submit" id="btnSubmitGallery">
                Tambah
              </button>
              <Link to="/gallery">
                <button id="btnKembaliGallery">Kembali</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddGallery;
