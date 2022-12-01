import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import jwt_decode from "jwt-decode";
import swal from "sweetalert";

const EditKegiatan = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  const [nama, setNama] = useState("");
  const [waktu, setWaktu] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const updateKegiatan = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3000/kegiatan/editkegiatan/${id}`, {
        nama,
        waktu,
        keterangan,
      });
      swal({
        title: "Mantap",
        text: "Data berhasil diubah",
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

  useEffect(() => {
    getKegiatanById();
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

  const getKegiatanById = async () => {
    const response = await axios.get(
      `http://localhost:3000/kegiatan/editkegiatan/${id}`
    );
    setNama(response.data.nama);
    setWaktu(response.data.waktu);
    setKeterangan(response.data.keterangan);
  };

  return (
    <div className="kegiatan">
      <Sidebar />
      <div className="kegiatanContainer">
        <Navbar />
        <div className="mainContainer">
          <div className="headerAddKegiatan">
            <span className="titleAddKegiatan">Edit Kegiatan</span>
          </div>
          <hr />
          <form onSubmit={updateKegiatan}>
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
                Ubah
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

export default EditKegiatan;
