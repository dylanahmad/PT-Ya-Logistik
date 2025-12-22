// src/pages/CekOngkirPage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function CekOngkirPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-xl font-bold mb-4">❌ Data tidak ditemukan</h2>
        <p className="mb-4">Silakan lakukan cek ongkir dari halaman utama.</p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-orange-500 text-white rounded"
        >
          Kembali ke Home
        </button>
      </div>
    );
  }

  const { tarif, asal, tujuan, berat } = state;

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        💰 Hasil Cek Tarif
      </h2>

      {/* Info Pengiriman */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">📦 Detail Pengiriman</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <p><span className="font-bold">Kecamatan Asal:</span> {asal}</p>
          <p><span className="font-bold">Kecamatan Tujuan:</span> {tujuan}</p>
          <p><span className="font-bold">Berat:</span> {berat} KG</p>
        </div>
      </div>

      {/* List Tarif */}
      <div className="space-y-4">
        {tarif.map((cost, i) => (
          <div
            key={i}
            className="border rounded-lg shadow bg-gray-50 p-5 hover:shadow-md transition"
          >
            <h4 className="text-lg font-bold text-gray-800 mb-2">
              🚚 {cost.service}
            </h4>
            <p className="text-gray-700">
              <span className="font-semibold">Tarif:</span>{" "}
              Rp {cost.cost[0].value.toLocaleString()}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Estimasi Waktu:</span>{" "}
              {cost.cost[0].etd} Hari
            </p>
          </div>
        ))}
      </div>

      {/* Tombol Back */}
      <div className="mt-8 text-center">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
        >
          🔙 Kembali ke Home
        </button>
      </div>
    </div>
  );
}
