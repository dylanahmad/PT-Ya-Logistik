import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; // Menggunakan useAuth untuk autentikasi
import { useNavigate } from "react-router-dom";  // Import useNavigate
import axios from 'axios';  // Import Axios untuk membuat request HTTP

const Login = () => {
  const { Login } = useAuth();  // Mengambil fungsi login dari AuthContext
  const navigate = useNavigate();  // Menggunakan useNavigate untuk pengalihan
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Kirimkan request POST ke backend Laravel untuk login
      const response = await axios.post('http://localhost:8000/api/admin/login', {
        username,
        password
      });

      // Jika login berhasil, simpan token di localStorage
      const token = response.data.token;
      localStorage.setItem('auth_token', token);  // Simpan token JWT di localStorage

      // Pengalihan ke Admin Dashboard setelah login berhasil
      navigate("/admin/dashboard");  // Menggunakan navigate untuk pengalihan
    } catch (error) {
      if (error.response) {
        // Mengambil kode status dari response error
        if (error.response.status === 401) {
          // Jika status 401 (Unauthorized), pesan kesalahan password salah
          setErrorMessage("Password salah");
        } else if (error.response.status === 404) {
          // Jika status 404 (Not Found), pesan kesalahan akun tidak ditemukan
          setErrorMessage("Akun tidak ditemukan");
        } else {
          // Untuk error lainnya, misalnya masalah koneksi database
          setErrorMessage("Gagal konek ke database");
        }
      } else {
        // Jika tidak ada response (misalnya masalah jaringan)
        setErrorMessage("Terjadi kesalahan, coba lagi nanti");
      }
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Error Message */}
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;