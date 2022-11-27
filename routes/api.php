<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\SubjectController;
use App\Http\Controllers\API\StudentController;
use App\Http\Controllers\API\ClassController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\PostController;
use App\Http\Controllers\API\NotificationController;
use App\Http\Controllers\API\CommentController;
use App\Http\Controllers\API\LikesController;
use App\Http\Controllers\Auth\AuthController;

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


Route::get('student', [StudentController::class, 'index']);
Route::post('student', [StudentController::class, 'store']);
Route::put('student/{id}', [StudentController::class, 'update']);
Route::delete('student/{id}', [StudentController::class, 'destroy']);

Route::get('subject', [SubjectController::class, 'index']);
Route::post('subject', [SubjectController::class, 'store']);
Route::put('subject/{id}', [SubjectController::class, 'update']);
Route::delete('subject/{id}', [SubjectController::class, 'destroy']);

Route::get('class', [ClassController::class, 'index']);
Route::get('user', [UserController::class, 'index']);
Route::get('post', [PostController::class, 'index']);

Route::get('notification', [NotificationController::class, 'index']);
Route::post('notification', [NotificationController::class, 'store']);
Route::put('notification/{id}', [NotificationController::class, 'update']);
Route::delete('notification/{id}', [NotificationController::class, 'destroy']);

Route::get('comment', [CommentController::class, 'index']);
Route::post('comment', [CommentController::class, 'store']);
Route::put('comment/{id}', [CommentController::class, 'update']);
Route::delete('comment/{id}', [CommentController::class, 'destroy']);

Route::get('like', [LikesController::class, 'index']);

Route::get('login', function() {
    return 1;
});
Route::post('login', [AuthController::class, 'login']);
