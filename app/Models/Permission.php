<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    use HasFactory;

    protected $table = 'permissionForm';

    protected $fillable = [
        'PermissionFormID',
        'StudentID',
        'PermissionDay',
        'PermissionContent',
    ];

    protected $casts = [
        'PermissionDay' => 'date:d-m-Y',
    ];

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;
}
