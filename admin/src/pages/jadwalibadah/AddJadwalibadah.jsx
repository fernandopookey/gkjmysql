import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { json, Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import jwt_decode from "jwt-decode";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./addjadwalibadah.css";
import { BiCalendar } from "react-icons/bi";
import { DateRange } from "react-date-range";
import { format } from "date-fns";

const AddJadwalibadah = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  const [waktu, setWaktu] = useState("");
  const [tempat, setTempat] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const navigate = useNavigate();

  const saveJadwalibadah = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/jadwalibadah", {
        waktu,
        tempat,
        keterangan,
      });
      swal({
        title: "Berhasil",
        text: "Jadwal Ibadah berhasil ditambahkan",
        icon: "success",
        button: "Ok",
      });
      navigate("/jadwalibadah");
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
    <div className="jadwal">
      <Sidebar />
      <div className="jadwalContainer">
        <Navbar />
        <div className="mainContainer">
          <div className="headerAddJadwal">
            <span className="titleAddJadwal">Tambah Jadwal Ibadah</span>
          </div>
          <hr />
          <form onSubmit={saveJadwalibadah}>
            <div className="mainForm">
              <div className="waktuJadwalForm">
                Waktu
                <input
                  type="date"
                  placeholder="Waktu Jadwal Ibadah"
                  id="inputWaktuJadwal"
                  value={waktu}
                  onChange={(e) => setWaktu(e.target.value)}
                  required
                />
              </div>
              <div className="tempatJadwalForm">
                Tempat Ibadah
                <select
                  id="inputTempatJadwal"
                  name="tempat"
                  value={tempat}
                  onChange={(e) => setTempat(e.target.value)}
                >
                  <option value="gerejainduk" selected>
                    Gereja Induk
                  </option>
                  <option value="Pepanthan Tetep">Pepanthan Tetep</option>
                  <option value="Pepanthan Warak">Pepanthan Warak</option>
                  <option value="Pepanthan Pandanan">Pepanthan Pandanan</option>
                  <option value="Wilayah Kalibeji">Wilayah Kalibeji</option>
                  <option value="Unit Panti Asuhan">Unit Panti Asuhan</option>
                </select>
              </div>
              <div className="keteranganJadwalForm">
                Keterangan
                <textarea
                  name=""
                  id="inputKeteranganJadwal"
                  rows="4"
                  placeholder="Keterangan"
                  value={keterangan}
                  onChange={(e) => setKeterangan(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
            <div className="btnAll">
              <button type="submit" id="btnSubmitJadwal">
                Tambah
              </button>
              <Link to="/jadwalibadah">
                <button id="btnKembaliJadwal">Kembali</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddJadwalibadah;
