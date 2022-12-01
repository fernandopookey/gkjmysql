import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Wartajemaat from "./pages/wartajemaat/Wartajemaat";
import AddWartajemaat from "./pages/wartajemaat/AddWartajemaat";
import EditWartajemaat from "./pages/wartajemaat/EditWartajemaat";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Gallery from "./pages/gallery/Gallery";
import Kegiatan from "./pages/kegiatan/Kegiatan";
import Renungan from "./pages/renungan/Renungan";
import AddKegiatan from "./pages/kegiatan/AddKegiatan";
import EditKegiatan from "./pages/kegiatan/EditKegiatan";
import AddProfile from "./pages/profile/AddProfile";
import Jadwalibadah from "./pages/jadwalibadah/Jadwalibadah";
import AddJadwalibadah from "./pages/jadwalibadah/AddJadwalibadah";
import EditJadwalibadah from "./pages/jadwalibadah/EditJadwalibadah";
import AddGallery from "./pages/gallery/AddGallery";
import EditGallery from "./pages/gallery/EditGallery";
import AddRenungan from "./pages/renungan/AddRenungan";
import EditRenungan from "./pages/renungan/EditRenungan";
import Slider from "./pages/slider/Slider";
import AddSlider from "./pages/slider/AddSlider";
import EditSlider from "./pages/slider/EditSlider";
import Artikel from "./pages/artikel/Artikel";
import AddArtikel from "./pages/artikel/AddArtikel";
import EditArtikel from "./pages/artikel/EditArtikel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/dashboard" element={<Home />} />
        <Route path="/" element={<Home />} />

        {/* Slider */}
        <Route path="/slider" element={<Slider />} />
        <Route path="/slider/addslider" element={<AddSlider />} />
        <Route path="/slider/editslider/:id" element={<EditSlider />} />

        {/* Profile */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/addprofile" element={<AddProfile />} />
        <Route path="/profile/editprofile/:id" element={<EditProfile />} />

        {/* Jadwal Ibadah */}
        <Route path="/jadwalibadah" element={<Jadwalibadah />} />
        <Route
          path="/jadwalibadah/addjadwalibadah"
          element={<AddJadwalibadah />}
        />
        <Route
          path="/jadwalibadah/editjadwalibadah/:id"
          element={<EditJadwalibadah />}
        />

        {/* Warta Jemaat */}
        <Route path="/wartajemaat" element={<Wartajemaat />} />
        <Route
          path="/wartajemaat/addwartajemaat"
          element={<AddWartajemaat />}
        />
        <Route
          path="/wartajemaat/editwartajemaat/:id"
          element={<EditWartajemaat />}
        />

        {/* Kegiatan */}
        <Route path="/kegiatan" element={<Kegiatan />} />
        <Route path="/kegiatan/addkegiatan" element={<AddKegiatan />} />
        <Route path="/kegiatan/editkegiatan/:id" element={<EditKegiatan />} />

        {/* Renungan */}
        <Route path="/renungan" element={<Renungan />} />
        <Route path="/renungan/addrenungan" element={<AddRenungan />} />
        <Route path="/renungan/editrenungan/:id" element={<EditRenungan />} />

        {/* Gallery */}
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/addgallery" element={<AddGallery />} />
        <Route path="/gallery/editgallery/:id" element={<EditGallery />} />

        {/* Artikel */}
        <Route path="/artikel" element={<Artikel />} />
        <Route path="/renungan/addartikel" element={<AddArtikel />} />
        <Route path="/artikel/editartikel/:id" element={<EditArtikel />} />

        {/* Auth */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
