import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./gallery.css";
import jwt_decode from "jwt-decode";
import swal from "sweetalert";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  useEffect(() => {
    refreshToken();
  }, []);

  useEffect(() => {
    getGallery();
  }, []);

  const getGallery = async () => {
    const response = await axios.get("http://localhost:3000/gallery");
    setGallery(response.data);
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

  const deleteGallery = async (galleryId) => {
    try {
      await axios.delete(`http://localhost:3000/gallery/${galleryId}`);
      swal({
        title: "Sukses!",
        text: "Gambar Berhasil Dihapus!",
        icon: "success",
        button: "Ok",
      });
      getGallery();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="gallery">
      <Sidebar />
      <div className="galleryContainer">
        <Navbar />
        <div className="galleryMain">
          <div className="galleryHeader">
            <div className="galleryTitle">Gallery List</div>
          </div>
          <hr />
          <div className="galleryData">
            <div className="galleryDataHeader">
              <div className="galleryBtnAdd">
                <Link
                  to="/gallery/addgallery"
                  style={{ textDecoration: "none" }}
                >
                  <buttton className="tambahBtnGallery">Tambah</buttton>
                </Link>
                <div className="gallerySearch">
                  Cari
                  <input
                    type="text"
                    placeholder="Search"
                    id="galleryInputSearch"
                  />
                  <AiOutlineSearch />
                </div>
              </div>
            </div>
            <div className="galleryDataList">
              <div className="data">
                <table id="galleryTable">
                  <thead>
                    <tr>
                      <th>Judul</th>
                      <th>Gambar</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gallery.map((gallery, index) => (
                      <tr key={gallery.id}>
                        <td>{gallery.name}</td>
                        <td>
                          <img
                            src={gallery.url}
                            alt=""
                            style={{ width: "50%" }}
                          />
                        </td>
                        <td>
                          <div className="btnAksi">
                            <Link to={`/gallery/editgallery/${gallery.id}`}>
                              <button className="btnUbahGallery">Ubah</button>
                            </Link>
                            <button
                              onClick={() => deleteGallery(gallery.id)}
                              className="btnHapusGallery"
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

export default Gallery;
