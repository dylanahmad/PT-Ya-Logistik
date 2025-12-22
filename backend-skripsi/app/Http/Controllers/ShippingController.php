<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class ShippingController extends Controller
{
    protected $client;
    protected $apiKey;

    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = env('RAJAONGKIR_API_KEY');
    }

    // ================================
    // Ambil data tujuan (kecamatan)
    // ================================
    public function getDestinations(Request $request)
    {
        $search = $request->input('search');
        $limit = $request->input('limit', 10);
        $offset = $request->input('offset', 0);

        if (empty($search)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Parameter pencarian kota/kecamatan harus diisi.'
            ], 400);
        }

        $url = 'https://rajaongkir.komerce.id/api/v1/destination/domestic-destination';

        try {
            $response = $this->client->get($url, [
                'headers' => [
                    'key'        => $this->apiKey,
                    'Accept'     => 'application/json',
                    'Connection' => 'close',
                ],
                'query' => [
                    'search' => $search,
                    'limit'  => $limit,
                    'offset' => $offset,
                ],
                'http_errors' => false,
                'timeout'     => 10,
            ]);

            $body = (string) $response->getBody();
            $data = json_decode($body, true);

            Log::info("Response getDestinations", [
                'status' => $response->getStatusCode(),
                'body'   => $body
            ]);

            if (isset($data['data']) && !empty($data['data'])) {
                $uniqueData = collect($data['data'])->unique('id')->values();

                return response()->json([
                    'status'  => 'success',
                    'message' => 'Data tujuan berhasil diambil',
                    'data'    => $uniqueData
                ]);
            }

            return response()->json([
                'status'  => 'error',
                'message' => 'Tidak ada data tujuan yang ditemukan',
                'raw'     => $data
            ], 404);

        } catch (\Exception $e) {
            Log::error("Gagal mengambil data tujuan", [
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'status'  => 'error',
                'message' => 'Gagal mengambil data tujuan',
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    // ================================
    // Cek Tarif Ongkir (Debug-ready)
    // ================================
    public function checkTariff(Request $request)
    {
        $request->validate([
            'origin'      => 'required|numeric',
            'destination' => 'required|numeric',
            'weight'      => 'required|numeric|min:1',
        ]);

        $origin      = $request->input('origin');
        $destination = $request->input('destination');
        $weight      = $request->input('weight');

        // Konversi ke gram jika frontend kirim kg
        $weightInGram = $weight * 1000;

        $url = 'https://rajaongkir.komerce.id/api/v1/calculate/district/domestic-cost';

        try {
            // Log request lengkap
            Log::info("Request checkTariff", [
                'origin'       => $origin,
                'destination'  => $destination,
                'weight_kg'    => $weight,
                'weight_gram'  => $weightInGram,
            ]);

            $response = $this->client->post($url, [
                'headers' => [
                    'key'        => $this->apiKey,
                    'Accept'     => 'application/json',
                    'Connection' => 'close'
                ],
                'form_params' => [
                    'origin'           => $origin,
                    'origin_type'      => 'subdistrict',
                    'destination'      => $destination,
                    'destination_type' => 'subdistrict',
                    'weight'           => $weightInGram,
                    'courier'          => 'pos',
                ],
                'http_errors' => false,
                'timeout'     => 15,
            ]);

            $statusCode = $response->getStatusCode();
            $body = (string) $response->getBody();
            $data = json_decode($body, true);

            // Log response lengkap
            Log::info("Response checkTariff", [
                'status_code' => $statusCode,
                'body'        => $body,
            ]);

            // Jika API RajaOngkir balas error
            if ($statusCode >= 400) {
                return response()->json([
                    'status'  => 'error',
                    'message' => $data['message'] ?? 'Gagal mendapatkan tarif',
                    'raw'     => $data
                ], $statusCode);
            }

            // Jika data tarif valid
            if (isset($data['data']) && !empty($data['data'])) {
                $tariffs = collect($data['data'])->unique('service')->values();

                $costs = $tariffs->map(function ($item) {
                    return [
                        'service' => $item['service'],
                        'cost'    => [[
                            'value' => $item['cost'],
                            'etd'   => $item['etd'] ?? '-'
                        ]]
                    ];
                });

                return response()->json([
                    'status'  => 'success',
                    'message' => 'Data tarif berhasil diambil',
                    'tariffs' => $costs
                ]);
            }

            // Jika tidak ada tarif ditemukan
            return response()->json([
                'status'  => 'error',
                'message' => 'Tidak ada tarif yang ditemukan',
                'raw'     => $data
            ], 404);

        } catch (\Exception $e) {
            Log::error("Tidak ada Layanan yang tersedia", [
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'status'  => 'error',
                'message' => 'Gagal mendapatkan tarif',
                'error'   => $e->getMessage()
            ], 500);
        }
    }
}
