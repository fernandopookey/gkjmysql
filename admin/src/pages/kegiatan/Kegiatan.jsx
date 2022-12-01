import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./kegiatan.css";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";

const Kegiatan = () => {
  const [kegiatan, setKegiatan] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  useEffect(() => {
    refreshToken();
  }, []);

  useEffect(() => {
    getKegiatan();
  }, []);

  const getKegiatan = async () => {
    const response = await axios.get("http://localhost:3000/kegiatan");
    setKegiatan(response.data);
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

  const deleteKegiatan = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/kegiatan/${id}`);
      swal({
        title: "Mantap!",
        text: "Data Berhasil Dihapus!",
        icon: "success",
        button: "Ok",
      });
      getKegiatan();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="kegiatan">
      <Sidebar />
      <div className="kegiatanContainer">
        <Navbar />
        <div className="kegiatanMain">
          <div className="kegiatanHeader">
            <div className="kegiatanTitle">Kegiatan List</div>
          </div>
          <hr />
          <div className="kegiatanData">
            <div className="kegiatanDataHeader">
              <div className="kegiatanBtnAdd">
                <Link
                  to="/kegiatan/addkegiatan"
                  style={{ textDecoration: "none" }}
                >
                  <buttton className="tambahBtnKegiatan">Tambah</buttton>
                </Link>
                <div className="kegiatanSearch">
                  Cari
                  <input
                    type="text"
                    placeholder="Search"
                    id="kegiatanInputSearch"
                  />
                  <AiOutlineSearch />
                </div>
              </div>
            </div>
            <div className="kegiatanDataList">
              <div className="data">
                <table id="kegiatanTable">
                  <thead>
                    <tr>
                      <th>Nama Kegiatan</th>
                      <th>Waktu Kegiatan</th>
                      <th>Keterangan</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kegiatan.map((kegiatan, index) => (
                      <tr key={kegiatan.id}>
                        <td>{kegiatan.nama}</td>
                        <td>{kegiatan.waktu}</td>
                        <td>{kegiatan.keterangan}</td>
                        <td>
                          <div className="btnAksi">
                            <Link to={`/kegiatan/editkegiatan/${kegiatan.id}`}>
                              <button className="btnUbahKegiatan">Ubah</button>
                            </Link>
                            <button
                              onClick={() => deleteKegiatan(kegiatan.id)}
                              className="btnHapusKegiatan"
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

export default Kegiatan;
