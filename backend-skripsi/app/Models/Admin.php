<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable; // Add this
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Admin extends Authenticatable implements JWTSubject // Extend Authenticatable
{
    use HasFactory;

    protected $fillable = ['username', 'password'];

    protected $hidden = ['password'];

    public function getJWTIdentifier()
    {
        return $this->getKey();  // ID admin
    }

    public function getJWTCustomClaims()
    {
        return [];  // Klaim kustom jika ada
    }
}
