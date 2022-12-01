import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./addkegiatan.css";
import jwt_decode from "jwt-decode";
import swal from "sweetalert";

const AddKegiatan = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  const [nama, setNama] = useState("");
  const [waktu, setWaktu] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const navigate = useNavigate();

  const saveKegiatan = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/kegiatan", {
        nama,
        waktu,
        keterangan,
      });
      swal({
        title: "Mantap",
        text: "Data berhasil ditambahkan",
        icon: "success",
        button: "Ok",
      });
      navigate("/kegiatan");
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
    <div className="kegiatan">
      <Sidebar />
      <div className="kegiatanContainer">
        <Navbar />
        <div className="mainContainer">
          <div className="headerAddKegiatan">
            <span className="titleAddKegiatan">Tambah Kegiatan</span>
          </div>
          <hr />
          <form onSubmit={saveKegiatan}>
            <div className="mainForm">
              <div className="namaKegiatanForm">
                Nama Kegiatan
                <input
                  type="text"
                  placeholder="Nama Kegiatan"
                  id="inputNamaKegiatan"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  required
                />
              </div>
              <div className="waktuKegiatanForm">
                Waktu Kegiatan
                <input
                  type="text"
                  placeholder="Waktu Kegiatan"
                  id="inputWaktuKegiatan"
                  value={waktu}
                  onChange={(e) => setWaktu(e.target.value)}
                  required
                />
              </div>
              <div className="keteranganKegiatanForm">
                Keterangan
                <textarea
                  name=""
                  id="inputKeteranganKegiatan"
                  rows="4"
                  placeholder="Keterangan"
                  value={keterangan}
                  onChange={(e) => setKeterangan(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
            <div className="btnAll">
              <button type="submit" id="btnSubmitKegiatan">
                Tambah
              </button>
              <Link to="/kegiatan">
                <button id="btnKembaliKegiatan">Kembali</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddKegiatan;
