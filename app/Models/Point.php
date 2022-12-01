<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Point extends Model
{
    use HasFactory;

    protected $table = 'Point';
    
    protected $fillable = [
        'SubjectID',
        'StudentID',
        'Oral_1',
        'Oral_2',
        'Oral_3',
        'Quiz1',
        'Quiz2',
        'Quiz3',
        'Midterm',
        'Final',
    ];
}
