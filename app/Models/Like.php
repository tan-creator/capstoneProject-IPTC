<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    use HasFactory;

    protected $table = 'Likes';

    protected $fillable = [
        'LikeID',
        'PostID',
        'PersonUserName',
    ];
}
