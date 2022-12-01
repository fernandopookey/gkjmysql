import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./renungan.css";
import jwt_decode from "jwt-decode";
import swal from "sweetalert";
import { AiOutlineSearch } from "react-icons/ai";
import ReactPaginate from "react-paginate";

const Renungan = () => {
  const [renungan, setRenungan] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    getRenungan();
  }, [page, keyword]);

  const getRenungan = async () => {
    const response = await axios.get(
      `http://localhost:3000/renungan?search_query=${keyword}&page=${page}&limit=${limit}`
    );
    setRenungan(response.data.result);
    setPage(response.data.page);
    setPages(response.data.pages);
    setRows(response.data.totalRows);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

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

  const deleteRenungan = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/renungan/${id}`);
      swal({
        title: "Sukses!",
        text: "Renungan Berhasil Dihapus!",
        icon: "success",
        button: "Ok",
      });
      getRenungan();
    } catch (error) {
      console.log(error);
    }
  };

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setKeyword(query);
  };

  return (
    <div className="renungan">
      <Sidebar />
      <div className="renunganContainer">
        <Navbar />
        <div className="renunganMain">
          <div className="renunganHeader">
            <div className="renunganTitle">Renungan List</div>
          </div>
          <hr />
          <form>
            <div className="renunganData">
              <div className="renunganDataHeader">
                <div className="renunganBtnAdd">
                  <Link
                    to="/renungan/addrenungan"
                    style={{ textDecoration: "none" }}
                  >
                    <buttton className="tambahBtnRenungan">Tambah</buttton>
                  </Link>
                  <div className="renunganSearch">
                    Cari
                    <input
                      type="text"
                      placeholder="Search"
                      id="renunganInputSearch"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onSubmit={searchData}
                    />
                    <AiOutlineSearch />
                  </div>
                </div>
              </div>
              <div className="renunganDataList">
                <div className="data">
                  <table id="renunganTable">
                    <thead>
                      <tr>
                        <th>Judul</th>
                        <th>Isi</th>
                        <th>Keterangan</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renungan.map((renungan) => (
                        <tr key={renungan.id}>
                          <td>{renungan.name}</td>
                          <td>{renungan.isi}</td>
                          <td>{renungan.keterangan}</td>
                          <td>
                            <div className="btnAksi">
                              <Link to={`/renungan/editrenungan`}>
                                <button className="btnUbahRenungan">
                                  Ubah
                                </button>
                              </Link>
                              <button className="btnHapusRenungan">
                                Hapus
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p>
                    Total Rows: {rows} Page: {rows ? page + 1 : 0} of {pages}
                  </p>
                  <span className="pagination" role="navigation">
                    <ReactPaginate
                      previousLabel={"< Prev"}
                      nextLabel={"Next >"}
                      pageCount={pages}
                      onPageChange={changePage}
                      containerClassName={"pagination-list"}
                      pageLinkClassName={"pagination-link"}
                      previousLinkClassName={"pagination-previous"}
                      nextLinkClassName={"pagination-next"}
                      activeLinkClassName={"pagintaion-link"}
                      disabledLinkClassName={"pagination-link"}
                    />
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Renungan;
