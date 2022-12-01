<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReviewLesson extends Model
{
    use HasFactory;

    protected $table = 'ReviewsLesson';

    protected $fillable = [
        'LessonID',
        'LessonContents',
        'SubjectID',
    ];
}
