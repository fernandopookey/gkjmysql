import "./profile.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import jwt_decode from "jwt-decode";

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  useEffect(() => {
    refreshToken();
  }, []);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const response = await axios.get("http://localhost:3000/profile");
    setProfile(response.data);
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

  const deleteProfile = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/profile/${id}`);
      swal({
        title: "Mantap!",
        text: "Data Berhasil Dihapus!",
        icon: "success",
        button: "Ok",
      });
      getProfile();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profile">
      <Sidebar />
      <div className="profileContainer">
        <Navbar />
        <div className="profileMain">
          <div className="profileHeader">
            <div className="profileTitle">Profil List</div>
          </div>
          <hr />
          <div className="profileData">
            <div className="profileDataHeader">
              <div className="profileBtnAdd">
                <Link
                  to="/profile/addprofile"
                  style={{ textDecoration: "none" }}
                >
                  <button className="tambahBtnProfile">Tambah</button>
                </Link>
                <div className="profileSearch">
                  Cari{" "}
                  <input
                    type="text"
                    placeholder="Search"
                    id="profileInputSearch"
                  />
                  <AiOutlineSearch />
                </div>
              </div>
            </div>
            <div className="profileDataList">
              <div className="data">
                <table id="profileTable">
                  <thead>
                    <tr>
                      <th>Judul</th>
                      <th>Sub Judul</th>
                      <th>Keterangan</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profile.map((profile, index) => (
                      <tr key={profile.id}>
                        <td>{profile.judul}</td>
                        <td>{profile.subjudul}</td>
                        <td>{profile.keterangan}</td>
                        <td>
                          <div className="btnAksi">
                            <Link to={`/profile/editprofile/${profile.id}`}>
                              <button className="btnUbahProfile">Ubah</button>
                            </Link>
                            <button
                              onClick={() => deleteProfile(profile.id)}
                              className="btnHapusProfile"
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

export default Profile;
