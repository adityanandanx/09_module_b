<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $primaryKey = 'gtin';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'gtin',
        'name',
        'name_fr',
        'description',
        'description_fr',
        'brand',
        'country_of_origin',
        'gross_weight',
        'net_content_weight',
        'weight_unit',
        'company_id'
    ];
    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function casts()
    {
        return [
            'gross_weight' => 'float',
            'net_content_weight' => 'float',
        ];
    }
}
