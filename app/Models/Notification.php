<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $table = 'Notification';
    
    protected $fillable = [
        'NotificationID',
        'AdminUserName',
        'ParentUserName',
        'NotificationTitle',
        'NotificationContent',
        'NotificationDate',
    ];

    protected $casts = [
        'NotificationDate' => 'date:d-m-Y',
    ];

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;
}
