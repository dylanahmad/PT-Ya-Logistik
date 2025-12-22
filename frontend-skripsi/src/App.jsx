import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/home";
import AboutUs from "./components/aboutus";
import OurService from "./components/ourservice";
import ComplaintForm from './components/complaint';
import AdminDashboard from "./components/adminDashboard";
import Login from './components/login';
import RegisterAdmin from "./components/Registeradmin";
import ResiResultPage from "./components/ResiResultPage"; // Import halaman ResiResultPage
import Navbar from "./components/Navbar";
import ProtectedRoute from './components/ProtectedRoute'; // Mengimpor ProtectedRoute
import { AuthProvider } from "./context/AuthContext"; 
import CekOngkirPage from "./components/CekOngkirPage";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar /> {/* Navbar akan muncul di semua halaman */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/service" element={<OurService />} />
          <Route path="/complaint" element={<ComplaintForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/register" element={<RegisterAdmin />} />
          <Route path="/resi/:resiNumber" element={<ResiResultPage />} /> {/* Rute untuk halaman ResiResultPage */}
          <Route path="/cek-ongkir" element={<CekOngkirPage />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
