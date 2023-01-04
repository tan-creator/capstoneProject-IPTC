<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;

    protected $table = 'Subject';
    
    protected $fillable = [
        'SubjectID',
        'TeacherSubjectUserName',
        'ClassID',
        'SubjectName',
        'SubjectTime',
        'DateOfWeek',
    ];

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;
}
