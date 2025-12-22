import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const AdminDashboard = () => {
  const [shipments, setShipments] = useState([]);
  const [newShipment, setNewShipment] = useState({
    senderName: '',
    receiverName: '',
    senderPhone: '',
    receiverPhone: '',
    senderAddress: '',
    receiverAddress: '',
    weight: '',
    status: '',
    shippingDate: '',
    deliveryDate: '',
    shipmentId: '',
  });
  const [complaints, setComplaints] = useState([]);
  const [editComplaint, setEditComplaint] = useState(null);

  const [loadingShipments, setLoadingShipments] = useState(false);
  const [loadingComplaints, setLoadingComplaints] = useState(false);
  const [errorShipments, setErrorShipments] = useState("");
  const [errorComplaints, setErrorComplaints] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const tokenHeader = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`
    }
  };

  // Generate Random Shipment ID
  const generateRandomId = () => {
    return String(Math.floor(Math.random() * 10000000000));
  };

  // Fetch data on load
  useEffect(() => {
    fetchShipments();
    fetchComplaints();
  }, []);

  // Fetch shipments
  const fetchShipments = () => {
    setLoadingShipments(true);
    setErrorShipments("");
    api.get('/shipments', tokenHeader)
      .then(res => {
        setShipments(res.data.data || res.data);
        setLoadingShipments(false);
      })
      .catch(() => {
        setErrorShipments("Failed to load shipments");
        setLoadingShipments(false);
      });
  };

  // Fetch complaints
  const fetchComplaints = () => {
    setLoadingComplaints(true);
    setErrorComplaints("");
    api.get('/complaints', tokenHeader)
      .then(res => {
        setComplaints(res.data.data || res.data);
        setLoadingComplaints(false);
      })
      .catch(() => {
        setErrorComplaints("Failed to load complaints");
        setLoadingComplaints(false);
      });
  };

  const handleShipmentChange = (e) => {
    const { name, value } = e.target;
    setNewShipment({ ...newShipment, [name]: value });
  };

  // Add or Update Shipment
  const handleAddShipment = (e) => {
    e.preventDefault();
    if (!newShipment.shipmentId) {
      newShipment.shipmentId = generateRandomId();
    }

    if (
      !newShipment.senderName ||
      !newShipment.receiverName ||
      !newShipment.senderAddress ||
      !newShipment.receiverAddress ||
      !newShipment.senderPhone ||
      !newShipment.receiverPhone
    ) {
      alert("Mohon lengkapi data pengiriman.");
      return;
    }
    setLoadingShipments(true);

    if (isEditing) {
      api.put(`/shipments/${newShipment.shipmentId}`, newShipment, tokenHeader)
        .then(() => {
          fetchShipments();
          setNewShipment({
            senderName: '',
            receiverName: '',
            senderPhone: '',
            receiverPhone: '',
            senderAddress: '',
            receiverAddress: '',
            weight: '',
            status: '',
            shippingDate: '',
            deliveryDate: '',
            shipmentId: '',
          });
          setIsEditing(false);
          setLoadingShipments(false);
        })
        .catch(() => {
          setErrorShipments("Gagal mengupdate pengiriman");
          setLoadingShipments(false);
        });
    } else {
      api.post('/shipments', newShipment, tokenHeader)
        .then(() => {
          fetchShipments();
          setNewShipment({
            senderName: '',
            receiverName: '',
            senderPhone: '',
            receiverPhone: '',
            senderAddress: '',
            receiverAddress: '',
            weight: '',
            status: '',
            shippingDate: '',
            deliveryDate: '',
            shipmentId: '',
          });
          setLoadingShipments(false);
        })
        .catch(() => {
          setErrorShipments("Gagal menambahkan pengiriman");
          setLoadingShipments(false);
        });
    }
  };

  const handleDeleteShipment = (id) => {
    if (window.confirm("Yakin ingin menghapus shipment ini?")) {
      api.delete(`/shipments/${id}`, tokenHeader)
        .then(() => fetchShipments());
    }
  };

  const handleEditShipment = (shipment) => {
    setNewShipment({
      shipmentId: shipment.shipmentId,
      senderName: shipment.senderName,
      receiverName: shipment.receiverName,
      senderPhone: shipment.senderPhone,
      receiverPhone: shipment.receiverPhone,
      senderAddress: shipment.senderAddress,
      receiverAddress: shipment.receiverAddress,
      weight: shipment.weight,
      status: shipment.status,
      shippingDate: shipment.shippingDate,
      deliveryDate: shipment.deliveryDate,
    });
    setIsEditing(true);
  };

  // =======================
  // Complaint Handler
  // =======================
  const handleDeleteComplaint = (complaintId) => {
    if (window.confirm("Yakin ingin menghapus complaint ini?")) {
      api.delete(`/complaints/${complaintId}`, tokenHeader)
        .then(() => fetchComplaints());
    }
  };

  const handleUpdateComplaint = () => {
    api.put(`/complaints/${editComplaint.complaintId}`, editComplaint, tokenHeader)
      .then(() => {
        setEditComplaint(null);
        fetchComplaints();
      })
      .catch(() => {
        setErrorComplaints("Gagal update complaint");
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📦 Admin Dashboard</h1>

      {/* Form Tambah Pengiriman */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">
          {isEditing ? 'Edit Pengiriman' : 'Tambah Pengiriman Baru'}
        </h2>
        <form
          onSubmit={handleAddShipment}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input type="text" name="senderName" placeholder="Nama Pengirim" value={newShipment.senderName} onChange={handleShipmentChange} className="border p-2 rounded" />
          <input type="text" name="receiverName" placeholder="Nama Penerima" value={newShipment.receiverName} onChange={handleShipmentChange} className="border p-2 rounded" />
          <input type="text" name="senderPhone" placeholder="No HP Pengirim" value={newShipment.senderPhone} onChange={handleShipmentChange} className="border p-2 rounded" />
          <input type="text" name="receiverPhone" placeholder="No HP Penerima" value={newShipment.receiverPhone} onChange={handleShipmentChange} className="border p-2 rounded" />
          <input type="text" name="senderAddress" placeholder="Alamat Pengirim" value={newShipment.senderAddress} onChange={handleShipmentChange} className="border p-2 rounded" />
          <input type="text" name="receiverAddress" placeholder="Alamat Penerima" value={newShipment.receiverAddress} onChange={handleShipmentChange} className="border p-2 rounded" />
          <input type="number" name="weight" placeholder="Berat (kg)" value={newShipment.weight} onChange={handleShipmentChange} className="border p-2 rounded" />
          <input type="text" name="status" placeholder="Status" value={newShipment.status} onChange={handleShipmentChange} className="border p-2 rounded" />
          <input type="date" name="shippingDate" value={newShipment.shippingDate} onChange={handleShipmentChange} className="border p-2 rounded" />
          <input type="date" name="deliveryDate" value={newShipment.deliveryDate} onChange={handleShipmentChange} className="border p-2 rounded" />
          <div className="col-span-full">
            <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
              {loadingShipments ? 'Processing...' : (isEditing ? 'Update' : 'Tambah')}
            </button>
          </div>
        </form>
        {errorShipments && <p className="text-red-500 mt-2">{errorShipments}</p>}
      </section>

      {/* Tabel Pengiriman */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Data Pengiriman</h2>
        <table className="min-w-full bg-white shadow-md rounded mb-4">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Pengirim</th>
              <th className="p-2 text-left">No HP Pengirim</th>
              <th className="p-2 text-left">Penerima</th>
              <th className="p-2 text-left">No HP Penerima</th>
              <th className="p-2 text-left">Alamat Pengirim</th>
              <th className="p-2 text-left">Alamat Penerima</th>
              <th className="p-2 text-left">Berat</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Tanggal Kirim</th>
              <th className="p-2 text-left">Tanggal Antar</th>
              <th className="p-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loadingShipments && (
              <tr><td colSpan="12" className="p-2 text-center">Loading...</td></tr>
            )}
            {errorShipments && (
              <tr><td colSpan="12" className="p-2 text-center text-red-500">{errorShipments}</td></tr>
            )}
            {!loadingShipments && shipments.length > 0 ? (
              shipments.map((s) => (
                <tr key={s.shipmentId} className="border-t">
                  <td className="p-2">{s.shipmentId}</td>
                  <td className="p-2">{s.senderName}</td>
                  <td className="p-2">{s.senderPhone}</td>
                  <td className="p-2">{s.receiverName}</td>
                  <td className="p-2">{s.receiverPhone}</td>
                  <td className="p-2">{s.senderAddress}</td>
                  <td className="p-2">{s.receiverAddress}</td>
                  <td className="p-2">{s.weight}</td>
                  <td className="p-2">{s.status}</td>
                  <td className="p-2">{s.shippingDate}</td>
                  <td className="p-2">{s.deliveryDate}</td>
                  <td className="p-2">
                    <button 
                      onClick={() => handleEditShipment(s)} 
                      className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700 mr-2"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteShipment(s.shipmentId)} 
                      className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-700"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : !loadingShipments && (
              <tr>
                <td colSpan="12" className="p-2 text-center">Tidak ada data pengiriman</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Tabel Complaint */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Data Complaint</h2>
        <table className="min-w-full bg-white shadow-md rounded mb-4">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 text-left">Complaint ID</th>
              <th className="p-2 text-left">Shipment ID</th>
              <th className="p-2 text-left">Nama Customer</th>
              <th className="p-2 text-left">No HP</th>
              <th className="p-2 text-left">Jenis</th>
              <th className="p-2 text-left">Tanggal</th>
              <th className="p-2 text-left">Detail</th>
              <th className="p-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loadingComplaints && (
              <tr><td colSpan="8" className="p-2 text-center">Loading...</td></tr>
            )}
            {errorComplaints && (
              <tr><td colSpan="8" className="p-2 text-center text-red-500">{errorComplaints}</td></tr>
            )}
            {!loadingComplaints && complaints.length > 0 ? (
              complaints.map((c) => (
                <tr key={c.complaintId} className="border-t">
                  <td className="p-2">{c.complaintId}</td>
                  <td className="p-2">{c.shipmentId}</td>
                  <td className="p-2">{c.customerName}</td>
                  <td className="p-2">{c.customerPhone}</td>
                  <td className="p-2">{c.jenisPengaduan}</td>
                  <td className="p-2">{c.tanggalPengaduan}</td>
                  <td className="p-2">{c.complaintDetails}</td>
                  <td className="p-2">
                    <button 
                      onClick={() => setEditComplaint(c)} 
                      className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteComplaint(c.complaintId)} 
                      className="bg-red-500 text-white px-4 py-1 rounded"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : !loadingComplaints && (
              <tr>
                <td colSpan="8" className="p-2 text-center">Tidak ada data complaint</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Form Edit Complaint */}
        {editComplaint && (
          <div className="bg-gray-100 p-4 rounded shadow-md">
            <h3 className="text-lg font-semibold mb-4">Edit Complaint</h3>

            <label className="block mb-2">
              Nama Customer:
              <input
                type="text"
                value={editComplaint.customerName}
                onChange={(e) => setEditComplaint({ ...editComplaint, customerName: e.target.value })}
                className="w-full border p-2 rounded"
              />
            </label>

            <label className="block mb-2">
              No HP:
              <input
                type="text"
                value={editComplaint.customerPhone}
                onChange={(e) => setEditComplaint({ ...editComplaint, customerPhone: e.target.value })}
                className="w-full border p-2 rounded"
              />
            </label>

            <label className="block mb-2">
              Jenis Pengaduan:
              <input
                type="text"
                value={editComplaint.jenisPengaduan}
                onChange={(e) => setEditComplaint({ ...editComplaint, jenisPengaduan: e.target.value })}
                className="w-full border p-2 rounded"
              />
            </label>

            <label className="block mb-2">
              Detail:
              <textarea
                value={editComplaint.complaintDetails}
                onChange={(e) => setEditComplaint({ ...editComplaint, complaintDetails: e.target.value })}
                className="w-full border p-2 rounded"
              />
            </label>

            <div className="mt-4">
              <button
                onClick={handleUpdateComplaint}
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              >
                Simpan
              </button>
              <button
                onClick={() => setEditComplaint(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Batal
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
