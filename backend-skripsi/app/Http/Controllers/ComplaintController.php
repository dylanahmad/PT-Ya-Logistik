<?php

namespace App\Http\Controllers;

use App\Models\Complaint;
use App\Models\Shipment;
use Illuminate\Http\Request;

class ComplaintController extends Controller
{
    // ================= GET =================
    // GET /complaints → ambil semua complaint
    public function index()
    {
        $complaints = Complaint::with('shipment')->get(); // ikut relasi shipment
        return response()->json($complaints);
    }

    // GET /complaints/{complaintId} → ambil detail satu complaint
    public function show($complaintId)
    {
        $complaint = Complaint::with('shipment')->find($complaintId);

        if (!$complaint) {
            return response()->json(['error' => 'Complaint not found'], 404);
        }

        return response()->json($complaint);
    }

    // ================= POST =================
    // POST /complaints → tambah complaint baru
    public function store(Request $request)
    {
        $request->validate([
            'shipmentId'        => 'required|numeric|exists:shipments,shipmentId',
            'customerName'      => 'required|string|max:255',
            'customerPhone'     => 'required|string|max:255',
            'jenisPengaduan'    => 'required|string|max:255',
            'tanggalPengaduan'  => 'required|date',
            'complaintDetails'  => 'required|string',
        ]);

        // Pastikan shipment ada
        $shipment = Shipment::where('shipmentId', $request->shipmentId)->first();
        if (!$shipment) {
            return response()->json(['error' => 'Shipment ID tidak ditemukan'], 404);
        }

        $complaint = Complaint::create([
            'shipmentId'        => $shipment->shipmentId,
            'customerName'      => $request->customerName,
            'customerPhone'     => $request->customerPhone,
            'jenisPengaduan'    => $request->jenisPengaduan,
            'tanggalPengaduan'  => $request->tanggalPengaduan,
            'complaintDetails'  => $request->complaintDetails,
        ]);

        return response()->json([
            'message' => 'Complaint created successfully',
            'data'    => $complaint
        ], 201);
    }

    // ================= PUT =================
    // PUT /complaints/{complaintId} → update satu complaint
    public function update(Request $request, $complaintId)
    {
        $complaint = Complaint::find($complaintId);
        if (!$complaint) {
            return response()->json(['error' => 'Complaint not found'], 404);
        }

        $request->validate([
            'customerName'      => 'sometimes|required|string|max:255',
            'customerPhone'     => 'sometimes|required|string|max:255',
            'jenisPengaduan'    => 'sometimes|required|string|max:255',
            'tanggalPengaduan'  => 'sometimes|required|date',
            'complaintDetails'  => 'sometimes|required|string',
        ]);

        $complaint->update($request->all());

        return response()->json([
            'message' => 'Complaint updated successfully',
            'data'    => $complaint
        ]);
    }

    // ================= DELETE =================
    // DELETE /complaints/{complaintId} → hapus satu complaint
    public function destroy($complaintId)
    {
        $complaint = Complaint::find($complaintId);
        if (!$complaint) {
            return response()->json(['error' => 'Complaint not found'], 404);
        }

        $complaint->delete();

        return response()->json(['message' => 'Complaint deleted successfully']);
    }
}
