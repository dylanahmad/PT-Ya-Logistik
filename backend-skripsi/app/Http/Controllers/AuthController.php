<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // Method Register
    public function register(Request $request)
    {
        // Validasi input
        $request->validate([
            'username' => 'required|string|unique:admins',  // Validasi username
            'password' => 'required|string|min:6',  // Validasi password
        ]);

        // Menyimpan data admin baru
        $admin = Admin::create([
            'username' => $request->username,  // Menyimpan username
            'password' => Hash::make($request->password),  // Enkripsi password
        ]);

        return response()->json(['message' => 'Admin account created successfully'], 201);
    }

    // Method Login
    public function login(Request $request)
    {

        // Validasi input
        $request->validate([
            'username' => 'required|string',  // Validasi username
            'password' => 'required|string',  // Validasi password
        ]);

        // Ambil kredensial dari request
        $credentials = $request->only('username', 'password');
        $token = JWTAuth::attempt($credentials);
        // Cek apakah kredensial cocok
        if ($token) {
            return response()->json([
                'message' => 'Login successful',
                'token' => $token  // Kirimkan token JWT
            ]);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);  // Login gagal
    }
}