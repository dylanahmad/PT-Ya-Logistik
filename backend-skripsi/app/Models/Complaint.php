<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Complaint extends Model
{
    use HasFactory;

    // Nama tabel (opsional kalau pakai plural default "complaints")
    protected $table = 'complaints';

    // Primary key bukan "id" tapi "complaintId"
    protected $primaryKey = 'complaintId';

    // Auto increment
    public $incrementing = true;

    // Tipe primary key
    protected $keyType = 'int';

    // Kolom yang bisa diisi mass-assignment
    protected $fillable = [
        'shipmentId',
        'customerName',
        'customerPhone',
        'jenisPengaduan',
        'tanggalPengaduan',
        'complaintDetails',
    ];

    // Relasi ke Shipment
    public function shipment()
    {
        return $this->belongsTo(Shipment::class, 'shipmentId', 'shipmentId');
    }
}
