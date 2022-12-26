<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cost extends Model
{
    use HasFactory;

    protected $table = 'Cost';

    protected $fillable = [
        'CostID',
        'ClassID',
        'CostType',
        'CostAmountMoney',
        'CostDescription',
        'CreateAt',
    ];

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    protected $casts = [
        'CreateAt' => 'date:d-m-Y H:i:s',
    ];
}
