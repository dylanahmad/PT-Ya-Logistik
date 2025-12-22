import React, { useState } from 'react';
import axios from 'axios';

import logoYA from "../assets/logo-ya-logistik.webp";
import facebookIcon from "../assets/icon/facebook.png";
import whatsappIcon from "../assets/icon/whatsapp.png";
import instagramIcon from "../assets/icon/instagram.png";

export default function ComplaintForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    contact: '',
    date: '',
    category: '',
    shipmentId: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // shipmentId hanya boleh angka
    if (name === "shipmentId" && !/^\d*$/.test(value)) return;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/complaints", {
        shipmentId: formData.shipmentId,
        customerName: formData.fullName,       
        customerPhone: formData.contact,       
        jenisPengaduan: formData.category,     
        tanggalPengaduan: formData.date,       
        complaintDetails: formData.message,
      });

      if (response.status === 201) {
        alert("✅ Complaint submitted successfully!");
        setFormData({
          fullName: '',
          contact: '',
          date: '',
          category: '',
          shipmentId: '',
          message: '',
        });
      }
    } catch (error) {
      console.error("Error detail:", error);

      if (error.response) {
        alert(
          `❌ Backend Error: ${error.response.data.error || error.response.data.message || "Terjadi kesalahan"}`
        );
      } else if (error.request) {
        alert("⚠️ Tidak bisa terhubung ke backend. Pastikan Laravel berjalan di http://localhost:8000");
      } else {
        alert(`⚠️ Error: ${error.message}`);
      }
    }
  };

  const socialMedia = [
    { name: "Facebook", icon: facebookIcon, link: "#" },
    { name: "WhatsApp", icon: whatsappIcon, link: "#" },
    { name: "Instagram", icon: instagramIcon, link: "#" },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Heading */}
      <section className="text-center my-10 px-4">
        <p className="text-lg text-gray-800">
          Silakan isi formulir di bawah ini untuk menyampaikan pengaduan Anda.
          <br />
          Kami akan menindaklanjuti secepat mungkin.
        </p>
      </section>

      {/* Form */}
      <section className="max-w-4xl mx-auto bg-gray-50 p-8 rounded shadow">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full name *"
              value={formData.fullName}
              onChange={handleChange}
              className="border p-3 w-full rounded"
              required
            />
            <input
              type="text"
              name="contact"
              placeholder="No HP"
              value={formData.contact}
              onChange={handleChange}
              className="border p-3 w-full rounded"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border p-3 w-full rounded"
              required
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border p-3 w-full rounded"
              required
            >
              <option value="" disabled hidden>Jenis Pengaduan</option>
              <option value="Barang tidak sampai">Barang tidak sampai</option>
              <option value="Barang rusak">Barang rusak</option>
              <option value="Layanan kurir tidak memuaskan">Layanan kurir tidak memuaskan</option>
              <option value="Keterlambatan pengiriman">Keterlambatan pengiriman</option>
              <option value="Kesalahan informasi">Kesalahan informasi</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          <input
            type="text"
            name="shipmentId"
            placeholder="No Resi"
            value={formData.shipmentId}
            onChange={handleChange}
            className="border p-3 w-full rounded"
            required
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="6"
            placeholder="Type your message here......."
            className="border p-3 w-full rounded"
            required
          ></textarea>

          <button
            type="submit"
            className="bg-red-600 text-white px-8 py-3 rounded font-semibold hover:bg-red-700"
          >
            Send message
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-[#1f2348] text-white py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <img src={logoYA} alt="YA LOGISTIK" className="h-10 mb-4 object-contain" />
            <p className="text-sm text-gray-300">
              YA Logistik adalah penyedia layanan pengiriman paket dan dokumen domestik
              yang mengutamakan kecepatan, keamanan, dan kepercayaan, didukung oleh
              teknologi dan jaringan logistik yang luas.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Explore</h4>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>About Us</li>
              <li>Our Service</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Legal</h4>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>Terms</li>
              <li>Privacy</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Social Media</h4>
            <div className="flex gap-4">
              {socialMedia.map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={item.name}
                  className="bg-white rounded-full p-2"
                >
                  <img src={item.icon} alt={item.name} className="h-6 w-6 object-contain" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mt-10 text-sm text-gray-400">
          <img src={logoYA} alt="YA LOGISTIK" className="h-5 mb-1 object-contain" />
          <span>© 2025 YA LOGISTIK</span>
        </div>
      </footer>
    </div>
  );
}
