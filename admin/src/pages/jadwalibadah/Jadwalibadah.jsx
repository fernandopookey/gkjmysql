import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./jadwalibadah.css";
import jwt_decode from "jwt-decode";

const Jadwalibadah = () => {
  const [jadwalibadah, setJadwalibadah] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  useEffect(() => {
    refreshToken();
  }, []);

  useEffect(() => {
    getJadwalibadah();
  }, []);

  const getJadwalibadah = async () => {
    const response = await axios.get("http://localhost:3000/jadwalibadah");
    setJadwalibadah(response.data);
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

  const deleteJadwalibadah = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/jadwalibadah/${id}`);
      swal({
        title: "Sukses!",
        text: "Jadwal Ibadah Berhasil Dihapus!",
        icon: "success",
        button: "Ok",
      });
      getJadwalibadah();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="jadwal">
      <Sidebar />
      <div className="jadwalContainer">
        <Navbar />
        <div className="jadwalMain">
          <div className="jadwalHeader">
            <div className="jadwalTitle">Jadwal Ibadah List</div>
          </div>
          <hr />
          <div className="jadwalData">
            <div className="jadwalDataHeader">
              <div className="jadwalBtnAdd">
                <Link
                  to="/jadwalibadah/addjadwalibadah"
                  style={{ textDecoration: "none" }}
                >
                  <buttton className="tambahBtnJadwal">Tambah</buttton>
                </Link>
                <div className="jadwalSearch">
                  Cari
                  <input
                    type="text"
                    placeholder="Search"
                    id="jadwalInputSearch"
                  />
                  <AiOutlineSearch />
                </div>
              </div>
            </div>
            <div className="jadwalDataList">
              <div className="data">
                <table id="jadwalTable">
                  <thead>
                    <tr>
                      <th>Waktu</th>
                      <th>Tempat</th>
                      <th>Keterangan</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jadwalibadah.map((jadwalibadah, index) => (
                      <tr key={jadwalibadah.id}>
                        <td>{jadwalibadah.waktu}</td>
                        <td>{jadwalibadah.tempat}</td>
                        <td>{jadwalibadah.keterangan}</td>
                        <td>
                          <div className="btnAksi">
                            <Link
                              to={`/jadwalibadah/editjadwalibadah/${jadwalibadah.id}`}
                            >
                              <button className="btnUbahJadwal">Ubah</button>
                            </Link>
                            <button
                              onClick={() =>
                                deleteJadwalibadah(jadwalibadah.id)
                              }
                              className="btnHapusJadwal"
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

export default Jadwalibadah;
