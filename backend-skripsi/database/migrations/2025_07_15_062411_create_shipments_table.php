<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('shipments', function (Blueprint $table) {
            $table->id('shipmentId');
            $table->string('senderName');
            $table->string('senderAddress');
            $table->string('senderPhone');
            $table->string('receiverName');
            $table->string('receiverAddress');
            $table->string('receiverPhone');
            $table->decimal('weight', 8, 2);
            $table->enum('status', ['Dikirim', 'Diterima', 'Diproses', 'Gagal']); // Menambahkan enum untuk status
            $table->date('shippingDate');
            $table->date('deliveryDate')->nullable(); // Tanggal penerimaan bersifat opsional
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shipments');
    }
};
