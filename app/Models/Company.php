<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Company extends Model
{
    protected $fillable = [
        'name',
        'address',
        'telephone',
        'email',
        'owner_name',
        'owner_mobile',
        'owner_email',
        'contact_name',
        'contact_mobile',
        'contact_email',
        'deactivated'
    ];

    public function casts()
    {
        return [
            'deactivated' => 'boolean',
        ];
    }

    public function products()
    {
        return $this->hasMany(Product::class, 'company_id');
    }
}
