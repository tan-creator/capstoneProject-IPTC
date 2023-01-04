<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MClass extends Model
{
    use HasFactory;

    protected $table = 'TheClass';
    
    protected $fillable = [
        'ClassID',
        'ClassName',
        'SchoolYear',
        'TeacherClassUserName',
    ];

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;
}
