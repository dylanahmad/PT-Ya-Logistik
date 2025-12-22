<?php


namespace App\Http\Controllers;

use App\Models\Shipment;
use Illuminate\Http\Request;

class ShipmentController extends Controller
{
    // Menampilkan semua pengiriman
    public function index()
    {
        return response()->json(Shipment::all());
    }

    // Menampilkan data pengiriman berdasarkan shipmentId
    public function show($id)
    {
        $shipment = Shipment::findOrFail($id);
        return response()->json($shipment);
    }

    // Menambahkan pengiriman baru
    public function store(Request $request)
    {
        // Validasi input
        $request->validate([
            'senderName' => 'required|string',
            'senderPhone' => 'required|string',
            'senderAddress' => 'required|string',
            'receiverName' => 'required|string',
            'receiverPhone' => 'required|string',
            'receiverAddress' => 'required|string',
            'weight' => 'required|numeric',
            'status' => 'required|string',
            'shippingDate' => 'required|date',
            'deliveryDate' => 'nullable|date', // Delivery date bisa nullable jika tidak ada
        ]);

        // Generate random shipmentId (nomor resi)
        $shipmentId = $this->generateRandomId();

        // Pastikan shipmentId unik
        while (Shipment::where('shipmentId', $shipmentId)->exists()) {
            $shipmentId = $this->generateRandomId(); // Generate ID lagi jika sudah ada
        }

        // Simpan pengiriman baru
        $shipment = Shipment::create([
            'shipmentId' => $shipmentId,
            'senderName' => $request->senderName,
            'senderPhone' => $request->senderPhone,
            'senderAddress' => $request->senderAddress,
            'receiverName' => $request->receiverName,
            'receiverPhone' => $request->receiverPhone,
            'receiverAddress' => $request->receiverAddress,
            'weight' => $request->weight,
            'status' => $request->status,
            'shippingDate' => $request->shippingDate,
            'deliveryDate' => $request->deliveryDate,
        ]);

        return response()->json([
            'message' => 'Shipment created successfully',
            'data' => $shipment
        ], 201);
    }

    // Menghapus pengiriman
    public function destroy($id)
    {
        $shipment = Shipment::findOrFail($id);
        $shipment->delete();

        return response()->json([
            'message' => 'Shipment deleted successfully'
        ]);
    }

    // Mengupdate pengiriman
    public function update(Request $request, $id)
    {
        // Validasi input untuk update
        $request->validate([
            'senderName' => 'required|string',
            'senderPhone' => 'required|string',
            'senderAddress' => 'required|string',
            'receiverName' => 'required|string',
            'receiverPhone' => 'required|string',
            'receiverAddress' => 'required|string',
            'weight' => 'required|numeric',
            'status' => 'required|string',
            'shippingDate' => 'required|date',
            'deliveryDate' => 'nullable|date', // Delivery date bisa nullable
        ]);

        // Mencari pengiriman berdasarkan ID
        $shipment = Shipment::findOrFail($id);

        // Mengupdate data pengiriman (pastikan tidak mengupdate shipmentId)
        $shipment->update($request->except('shipmentId')); // Mengupdate semua data kecuali shipmentId

        return response()->json([
            'message' => 'Shipment updated successfully',
            'data' => $shipment
        ]);
    }

    // Fungsi untuk generate random shipmentId
    private function generateRandomId()
    {
        return str_pad(rand(1000000000, 9999999999), 10, '0', STR_PAD_LEFT); // Generate 10-digit ID
    }
    // Cek resi berdasarkan shipmentId
public function check(Request $request)
{
    // Validasi input
    $request->validate([
        'resi' => 'required|string|exists:shipments,shipmentId', // Pastikan resi ada di database
    ]);

    // Cari pengiriman berdasarkan shipmentId
    $shipment = Shipment::where('shipmentId', $request->resi)->first();

    // Jika pengiriman tidak ditemukan
    if (!$shipment) {
        return response()->json([
            'message' => 'Resi not found',
        ], 404);
    }

    // Jika pengiriman ditemukan, kembalikan data pengiriman
    return response()->json([
        'message' => 'Shipment found successfully',
        'data' => $shipment,
    ]);
}
}


