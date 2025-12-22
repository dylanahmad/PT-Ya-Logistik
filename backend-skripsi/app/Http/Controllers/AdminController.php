<?php

namespace App\Http\Controllers;

use App\Models\Shipment;
use App\Models\Complaint;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    // Menampilkan dashboard admin dengan data pengiriman terbaru dan keluhan terbaru
    public function dashboard()
    {
        // Ambil 5 pengiriman terbaru
        $shipments = Shipment::latest()->take(5)->get();

        // Ambil 5 keluhan terbaru
        $complaints = Complaint::latest()->take(5)->get();

        return response()->json([
            'message' => 'Welcome to Admin Dashboard',
            'shipments' => $shipments,
            'complaints' => $complaints
        ]);
    }
}