import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import jwt_decode from "jwt-decode";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const EditProfile = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  const [judul, setJudul] = useState("");
  const [subjudul, setSubjudul] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3000/profile/editprofile/${id}`, {
        judul,
        subjudul,
        keterangan,
      });
      swal({
        title: "Mantap",
        text: "Data berhasil diubah",
        icon: "success",
        button: "Ok",
      });
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    refreshToken();
  }, []);

  useEffect(() => {
    getProfileById();
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

  const getProfileById = async () => {
    const response = await axios.get(
      `http://localhost:3000/profile/editprofile/${id}`
    );
    setJudul(response.data.judul);
    setSubjudul(response.data.subjudul);
    setKeterangan(response.data.keterangan);
  };

  return (
    <div className="profile">
      <Sidebar />
      <div className="profileContainer">
        <Navbar />
        <div className="mainContainer">
          <div className="headerAddProfile">
            <span className="titleAddProfile">Ubah Profile</span>
          </div>
          <hr />
          <form onSubmit={updateProfile}>
            <div className="mainForm">
              <div className="judulProfileForm">
                Judul Profile
                <input
                  type="text"
                  placeholder="Judul Profile"
                  id="inputJudulProfile"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  required
                />
              </div>
              <div className="subjudulProfileForm">
                Sub Judul Profile
                <input
                  type="text"
                  placeholder="Sub Judul Profile"
                  id="inputSubjudulProfile"
                  value={subjudul}
                  onChange={(e) => setSubjudul(e.target.value)}
                  required
                />
              </div>
              <div className="keteranganProfileForm">
                Keterangan
                <textarea
                  name=""
                  id="inputKeteranganProfile"
                  rows="4"
                  placeholder="Keterangan"
                  value={keterangan}
                  onChange={(e) => setKeterangan(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
            <div className="btnAll">
              <button type="submit" id="btnSubmitProfile">
                Ubah
              </button>
              <Link to="/profile">
                <button id="btnKembaliProfile">Kembali</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
