<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\SubjectController;
use App\Http\Controllers\API\StudentController;
use App\Http\Controllers\API\ClassController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\PostController;
use App\Http\Controllers\API\NotificationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('student', [StudentController::class, 'index']);//utf_8
Route::get('subject', [SubjectController::class, 'index']);
Route::get('class', [ClassController::class, 'index']);
Route::get('user', [UserController::class, 'index']);//utf_8
Route::get('post', [PostController::class, 'index']);//utf_8
Route::get('notification', [NotificationController::class, 'index']);// utf_8
