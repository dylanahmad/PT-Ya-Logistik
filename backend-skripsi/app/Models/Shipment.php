<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shipment extends Model
{
    use HasFactory;

    // Tentukan primaryKey sebagai 'shipmentId' karena Anda ingin menggunakan ID acak
    protected $primaryKey = 'shipmentId';  // Menentukan bahwa 'shipmentId' adalah primary key

    // Tentukan apakah primary key auto increment
    public $incrementing = false; // Karena shipmentId adalah ID acak, bukan auto increment

    // Tentukan tipe data untuk shipmentId agar sesuai dengan string
    protected $keyType = 'string';  // shipmentId adalah string (bukan integer)

    // Menentukan kolom yang bisa diassign (mass assignable)
    protected $fillable = [
        'shipmentId', 'senderName', 'senderAddress', 'senderPhone', 'receiverName',
        'receiverAddress', 'receiverPhone', 'weight', 'status', 'shippingDate', 'deliveryDate'
    ];

    // Menambahkan cast untuk beberapa kolom
    protected $casts = [
        'shippingDate' => 'date',
        'deliveryDate' => 'date', // Cast deliveryDate ke dalam tipe data date
        'weight' => 'decimal:2',    // Mengonversi berat menjadi decimal dengan 2 angka desimal
    ];

    // Relasi dengan model Complaint (Keluhan)
    public function complaints()
    {
        // Satu pengiriman bisa memiliki banyak keluhan
        return $this->hasMany(Complaint::class, 'shipmentId');
    }

    // Optional: Jika Anda ingin menambahkan fungsi untuk mengatur status pengiriman
    public function setStatus(string $status)
    {
        $this->status = $status;
        $this->save();
    }
}
