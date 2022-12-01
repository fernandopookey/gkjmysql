import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./wartajemaat.scss";

const Wartajemaat = () => {
  return (
    <div className="wartajemaat">
      <Sidebar />
      <div className="wartajemaatContainer">
        <Navbar />
        Warta Jemaat Container
      </div>
    </div>
  );
};

export default Wartajemaat;
