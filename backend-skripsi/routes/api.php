<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ShipmentController;
use App\Http\Controllers\ComplaintController;
use App\Http\Controllers\ShippingController;

// Login dan Register tanpa middleware auth:api
Route::post('admin/login', [AuthController::class, 'login']);  // Login tanpa auth middleware
Route::post('/admin/register', [AuthController::class, 'register']);  // Register tanpa auth middleware

// Rute yang memerlukan autentikasi menggunakan JWT (auth:api)
Route::middleware('auth:api')->get('/admin/dashboard', [AdminController::class, 'dashboard']);  // Dashboard admin

// Rute untuk Shipment (Pengiriman) yang memerlukan autentikasi
Route::middleware('auth:api')->get('/shipments', [ShipmentController::class, 'index']);  // Melihat semua pengiriman
Route::middleware('auth:api')->post('/shipments', [ShipmentController::class, 'store']);  // Menambah pengiriman baru
Route::middleware('auth:api')->put('/shipments/{shipment}', [ShipmentController::class, 'update']);  // Mengupdate pengiriman
Route::middleware('auth:api')->delete('/shipments/{shipment}', [ShipmentController::class, 'destroy']);  // Menghapus pengiriman

// Complaint routes
// Public (User)
Route::post('/complaints', [ComplaintController::class, 'store']);  


// =================== COMPLAINTS ===================
Route::middleware('auth:api')->group(function () {
    Route::get('/complaints', [ComplaintController::class, 'index']);
    Route::get('/complaints/{complaintId}', [ComplaintController::class, 'show']);
    Route::put('/complaints/{complaintId}', [ComplaintController::class, 'update']);
    Route::delete('/complaints/{complaintId}', [ComplaintController::class, 'destroy']);
});


// Rute untuk cek resi tanpa autentikasi (akses publik)
Route::post('/shipment/check', [ShipmentController::class, 'check']);  // Cek resi tanpa autentikasi

// rute untuk cek tarif
Route::post('/shipping/check-tariff', [ShippingController::class, 'checkTariff']);
Route::get('/shipping/destination', [ShippingController::class, 'getDestinations']);