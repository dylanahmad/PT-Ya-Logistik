import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Memeriksa status autentikasi pada saat komponen pertama kali dimuat
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      // Token ditemukan, set autentikasi menjadi true
      setIsAuthenticated(true);

      // Mengambil data user menggunakan token yang tersimpan
      axios
        .get("http://localhost:8000/api/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data);  // Menyimpan data user
        })
        .catch(() => {
          setIsAuthenticated(false);
          localStorage.removeItem("auth_token");  // Menghapus token jika gagal
        });
    }
  }, []);

  // Fungsi login
  const login = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:8000/api/admin/login", {
        username,
        password,
      });

      // Menyimpan token ke localStorage
      localStorage.setItem("auth_token", response.data.token);

      // Mengupdate status autentikasi
      setIsAuthenticated(true);
      setUser(response.data.user);  // Menyimpan data user yang diterima dari backend

      // Mengarahkan user ke Admin Dashboard setelah login berhasil
      window.location.href = "/admin/dashboard";  // Ganti ini dengan rute dashboard kamu

      return true;  // Login berhasil
    } catch (error) {
      // Menangani error jika login gagal
      console.error('Login failed', error);
      return false;  // Login gagal
    }
  };

  // Fungsi logout
  const logout = () => {
    localStorage.removeItem("auth_token");  // Menghapus token dari localStorage
    setUser(null);  // Mengosongkan data user
    setIsAuthenticated(false);  // Mengubah status autentikasi menjadi false
    window.location.href = "/login";  // Redirect ke halaman login setelah logout
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
