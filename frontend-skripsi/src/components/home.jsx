import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bgHeader from "../assets/hero-home.jpeg";
import logoYA from "../assets/logo-ya-logistik.webp";
import facebookIcon from "../assets/icon/facebook.png";
import whatsappIcon from "../assets/icon/whatsapp.png";
import instagramIcon from "../assets/icon/instagram.png";
import AsyncSelect from "react-select/async";
import deliveryWorker from "../assets/delivery-home.jpg";

export default function HomePage() {
  const socialMedia = [
    { name: "Facebook", icon: facebookIcon, link: "#" },
    { name: "WhatsApp", icon: whatsappIcon, link: "#" },
    { name: "Instagram", icon: instagramIcon, link: "#" },
  ];

  const [asal, setAsal] = useState(null);
  const [tujuan, setTujuan] = useState(null);
  const [berat, setBerat] = useState("");
  const [resiNumber, setResiNumber] = useState("");
  const [tarif, setTarif] = useState(null);
  const [shipmentData, setShipmentData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // 🔹 Load kecamatan dari backend
  const loadOptions = async (inputValue) => {
    if (!inputValue) return [];
    try {
      const response = await axios.get("http://localhost:8000/api/shipping/destination", {
        params: { search: inputValue },
      });

      const districts = response.data.data || [];

      // Hilangkan duplikat berdasarkan id
      const uniqueDistricts = districts.filter(
        (district, index, self) => index === self.findIndex((d) => d.id === district.id)
      );

      return uniqueDistricts.map((district) => ({
        value: district.id, // ✅ gunakan "id" sesuai backend
        label: `${district.subdistrict_name}, ${district.city_name}, ${district.province_name}`,
      }));
    } catch {
      
      return [];
    }
  };

  // 🔹 Cek tarif
  const handleCekTarif = async () => {
    if (!asal || !tujuan || !berat) {
      setErrorMessage("Semua data harus diisi.");
      return;
    }

    const data = {
      origin: Number(asal.value),
      destination: Number(tujuan.value),
      weight: Number(berat), // ✅ backend sudah kali 1000 ke gram
    };

    console.log("🔍 Payload dikirim ke backend =>", data);

    try {
      const response = await axios.post("http://localhost:8000/api/shipping/check-tariff", data);

      console.log("Tarif Response =>", response.data);

      // ✅ Ambil dari key 'tariffs'
      const hasilTarif = response.data.tariffs;

      if (!hasilTarif || hasilTarif.length === 0) {
        setErrorMessage("Tidak ada tarif ditemukan.");
        return;
      }

      setTarif(hasilTarif);
      setErrorMessage("");

      // 🔹 Navigasi ke halaman cek ongkir dengan membawa hasil tarif
      navigate("/cek-ongkir", {
        state: {
          tarif: hasilTarif,
          asal: asal.label,
          tujuan: tujuan.label,
          berat,
        },
      });
    } catch (error) {
      console.error("Error Cek Tarif:", error.response?.data || error.message);
      setErrorMessage("Gagal mendapatkan tarif. Coba lagi.");
    }
  };

  // 🔹 Cek resi
  const handleCekResi = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/shipment/check", {
        resi: resiNumber,
      });

      setShipmentData(response.data.data);
      setErrorMessage("");
      navigate(`/resi/${resiNumber}`);
    } catch (error) {
      setShipmentData(null);
      setErrorMessage(error.response?.data?.message || "Resi not found");
    }
  };

  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section
        className="relative h-[500px] bg-cover bg-center"
        style={{ backgroundImage: `url(${bgHeader})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-end pr-20 text-white">
          <div className="text-right max-w-md">
            <h1 className="text-3xl font-bold mb-2">Solusi Logistik Terpercaya</h1>
            <p>
              YA Logistik hadir sebagai solusi terbaik bagi kebutuhan pengiriman Anda, baik untuk personal maupun bisnis.
            </p>
          </div>
        </div>
      </section>

      {/* Tracking and Shipping */}
      <section className="bg-white shadow-md py-6 px-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto -mt-12 z-10 relative">
        <div className="flex flex-col md:flex-row items-center gap-2">
          <input
            type="text"
            placeholder="Masukkan No Resi"
            className="border p-2 rounded w-full"
            value={resiNumber}
            onChange={(e) => setResiNumber(e.target.value)}
          />
          <button
            onClick={handleCekResi}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </div>

        {shipmentData && (
          <div className="mt-4 p-4 border rounded shadow bg-gray-50">
            <h3 className="font-semibold text-lg mb-2">📦 Shipment Details:</h3>
            <p><strong>Resi Number:</strong> {shipmentData.resi_number}</p>
            <p><strong>Sender:</strong> {shipmentData.sender_name}</p>
            <p><strong>Receiver:</strong> {shipmentData.receiver_name}</p>
            <p><strong>Status:</strong> {shipmentData.status}</p>
          </div>
        )}

        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}

        {/* Kecamatan Asal */}
        <AsyncSelect
          cacheOptions
          defaultOptions
          loadOptions={loadOptions}
          value={asal}
          onChange={setAsal}
          placeholder="Pilih Kecamatan Asal"
          isClearable
        />

        {/* Kecamatan Tujuan */}
        <AsyncSelect
          cacheOptions
          defaultOptions
          loadOptions={loadOptions}
          value={tujuan}
          onChange={setTujuan}
          placeholder="Pilih Kecamatan Tujuan"
          isClearable
        />

        {/* Berat */}
        <div className="flex items-center border rounded overflow-hidden">
          <input
            type="number"
            min="0"
            step="0.1"
            placeholder="Berat (kg)"
            value={berat}
            onChange={(e) => setBerat(e.target.value)}
            className="p-2 w-full outline-none"
          />
          <span className="px-3 text-sm text-gray-600">KG</span>
        </div>

        <button
          onClick={handleCekTarif}
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Cek Tarif
        </button>

        {/* Hasil Tarif */}
        {tarif && (
          <div className="mt-6 p-4 border rounded-lg shadow bg-white col-span-2">
            <h3 className="font-semibold text-lg mb-4 text-gray-800">
              💰 Hasil Tarif Pengiriman
            </h3>
            {tarif.map((cost, index) => (
              <div key={index} className="p-3 mb-3 border rounded bg-gray-50">
                <h4 className="font-bold text-gray-700">{cost.service}</h4>
                <p className="text-gray-700">
                  <strong>Tarif:</strong> Rp {cost.cost[0].value.toLocaleString()}
                </p>
                <p className="text-gray-700">
                  <strong>Estimasi Waktu:</strong> {cost.cost[0].etd} Hari
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Services */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl font-semibold mb-8">
            <span className="border-l-4 border-red-600 pl-2">Services</span> We Offer
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[{
              title: "Layanan Pergudangan",
              desc: "Layanan fleksibel dengan sistem bayar sesuai kebutuhan — mencakup penyimpanan paket, pengelolaan stok, pemrosesan pesanan (pick and pack), logistik masuk dan keluar, serta berbagai kebutuhan lainnya."
            }, {
              title: "Layanan Kargo Internasional",
              desc: "Solusi logistik global untuk pengiriman lintas negara — efisien, terjadwal, dan didukung oleh mitra terpercaya."
            }, {
              title: "Packaging Solutions",
              desc: "Kami menyediakan layanan pengemasan berkualitas tinggi untuk memastikan setiap kiriman tiba dalam kondisi terbaik."
            }].map((s, i) => (
              <div key={i} className="bg-white p-6 rounded shadow text-center">
                <div className="text-3xl mb-4">📦</div>
                <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-10">Why Choose us</h2>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <img
            src={deliveryWorker}
            alt="Worker"
            className="w-full object-cover rounded-xl"
          />
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg">🚚 Tepat Waktu</h3>
              <p className="text-gray-600">
                Tak perlu khawatir soal keterlambatan! Kami pastikan setiap kiriman tiba sesuai waktu, mendukung kelancaran usaha dan kepercayaan pelanggan Anda.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">🌐 Terjangkau</h3>
              <p className="text-gray-600">
                Nikmati layanan logistik dengan harga hemat, layanan maksimal, dan jangkauan luas ke seluruh Indonesia maupun internasional.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">🔒 Aman & Terjamin</h3>
              <p className="text-gray-600">
                Dengan standar operasional tinggi dan dukungan mitra terpercaya, kami pastikan setiap proses pengiriman berjalan lancar dan tanpa risiko.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1f2348] text-white py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <img
              src={logoYA}
              alt="YA LOGISTIK"
              className="h-10 mb-4 object-contain"
            />
            <p className="text-sm text-gray-300">
              YA Logistik adalah penyedia layanan pengiriman paket dan dokumen domestik yang mengutamakan kecepatan, keamanan, dan kepercayaan, didukung oleh teknologi dan jaringan logistik yang luas.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Follow Us</h4>
            <div className="flex gap-4">
              {socialMedia.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={item.name}
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="h-6 w-6 object-contain"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
