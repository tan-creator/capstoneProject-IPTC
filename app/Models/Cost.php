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
    ];
}
