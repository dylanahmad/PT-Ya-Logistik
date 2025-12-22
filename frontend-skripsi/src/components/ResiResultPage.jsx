import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Mengimpor gambar truck dari folder assets
import truckIcon from "../assets/icon/truckresi.png";  // Pastikan path gambar sudah benar

export default function ResiResultPage() {
  const { resiNumber } = useParams(); // Ambil resiNumber dari URL
  const [shipmentData, setShipmentData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Hook untuk navigasi

  // Ambil data pengiriman berdasarkan resiNumber dari API
  useEffect(() => {
    const fetchShipmentData = async () => {
      try {
        const response = await axios.post("http://localhost:8000/api/shipment/check", {
          resi: resiNumber,
        });

        setShipmentData(response.data.data); // Menyimpan data ke state
        setErrorMessage(""); // Reset error jika berhasil
      } catch (error) {
        setShipmentData(null); // Reset data jika gagal
        setErrorMessage(error.response?.data?.message || "Resi tidak ditemukan");
      }
    };

    fetchShipmentData();
  }, [resiNumber]);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg">
        {/* Flex untuk memusatkan ikon dan teks */}
        <div className="flex justify-center items-center mb-6">
          <img
            src={truckIcon}  // Menggunakan gambar yang diimpor
            alt="Tracking Icon"
            className="w-12 h-12 mr-4"  // Memperbesar ikon truck
          />
          <h2 className="text-3xl font-semibold text-center">Tracking Pengiriman</h2>
        </div>

        <div className="mb-4">
          <span className="block text-gray-600">
            <strong>Resi: </strong>#{resiNumber}
          </span>
        </div>

        {shipmentData ? (
          <div>
            <div className="space-y-6">
              {/* Status Pengiriman */}
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-green-500">✔️</span>
                  <h3 className="text-lg font-semibold">Status Pengiriman</h3>
                </div>
                <div className="flex space-x-4">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
                    Paket Terkirim
                  </button>
                  <button className="bg-gray-300 text-black px-4 py-2 rounded-full">
                    Paket Diterima
                  </button>
                </div>
              </div>

              {/* Pengirim dan Penerima */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Pengirim</h3>
                  <p><strong>Nama:</strong> {shipmentData.senderName}</p>
                  <p><strong>Telepon:</strong> {shipmentData.senderPhone}</p>
                  <p><strong>Alamat:</strong> {shipmentData.senderAddress}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Penerima</h3>
                  <p><strong>Nama:</strong> {shipmentData.receiverName}</p>
                  <p><strong>Telepon:</strong> {shipmentData.receiverPhone}</p>
                  <p><strong>Alamat:</strong> {shipmentData.receiverAddress}</p>
                </div>
              </div>

              {/* Detail Pengiriman */}
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold">Detail Pengiriman</h3>
                <ul className="space-y-2">
                  <li><strong>Berat:</strong> {shipmentData.weight} kg</li>
                  <li><strong>Tanggal Kirim:</strong> {shipmentData.shippingDate}</li>
                  <li><strong>Tanggal Terima:</strong> {shipmentData.deliveryDate || 'Belum diterima'}</li>
                </ul>
              </div>
            </div>

            {/* Tombol Kembali ke Homepage */}
            <div className="text-center mt-6">
              <button
                onClick={() => navigate("/")} // Navigasi ke homepage
                className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg"
              >
                Kembali ke Homepage
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center mt-8">
            <p>{errorMessage || "Data pengiriman tidak ditemukan"}</p>
            {/* Tombol Kembali ke Homepage */}
            <div className="mt-6">
              <button
                onClick={() => navigate("/")} // Navigasi ke homepage
                className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg"
              >
                Kembali ke Homepage
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
