<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;
    
    protected $table = 'Student';

    protected $fillable = [
        'StudentID',
        'ParentUserName',
        'ClassID',
        'StudentName',
        'StudentImage',
    ];
}
