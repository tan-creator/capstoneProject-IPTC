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
use App\Http\Controllers\API\PointController;
use App\Http\Controllers\API\RollCallController;
use App\Http\Controllers\API\RiewviewLessionController;
use App\Http\Controllers\API\CostController;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::controller(StudentController::class)->group(function () {
    Route::get('student', 'index');
    Route::get('student/{ClassID}', 'show');
    Route::post('student', 'store');
    Route::put('student/{id}', 'update');
    Route::delete('student/{id}', 'destroy'); 
});

Route::controller(SubjectController::class)->group(function () {
    Route::get('subject', 'index');
    Route::post('subject', 'store');
    Route::put('subject/{id}', 'update');
    Route::delete('subject/{id}', 'destroy');  
});

Route::controller(SubjectController::class)->group(function () {    
    Route::get('subject', 'index');
    Route::post('subject', 'store');
    Route::put('subject/{id}', 'update');
    Route::delete('subject/{id}', 'destroy');
});

Route::controller(ClassController::class)->group(function () {
    Route::get('class', 'index');  
    Route::get('class/{ClassID}', 'show');
    Route::post('class', 'store');
    Route::put('class/{ClassID}', 'update');
    Route::delete('class/{ClassID}', 'destroy');  
});

Route::controller(UserController::class)->group(function () {
    Route::get('user', 'index'); 
    Route::post('user', 'store');
    Route::put('user/{UserName}', 'update');
    Route::delete('user/{UserName}', 'destroy');     
});

Route::controller(PostController::class)->group(function () {
    Route::get('post', 'index'); 
    Route::post('post', 'store');
    Route::put('post/{PostID}', 'update');
    Route::delete('post/{PostID}', 'destroy');   
});

Route::controller(NotificationController::class)->group(function () {
    Route::get('notification', 'index');
    Route::post('notification', 'store');
    Route::put('notification/{id}', 'update');
    Route::delete('notification/{id}', 'destroy');    
});

Route::controller(CommentController::class)->group(function () {
    Route::get('comment', 'index');
    Route::post('comment', 'store');
    Route::put('comment/{id}', 'update');
    Route::delete('comment/{id}', 'destroy');
});

Route::controller(PointController::class)->group(function () {
    Route::get('Points', 'index');
    Route::get('Point/{StudentID}', 'show');
    Route::post('Point', 'store');
    Route::put('Point/{StudentID}-{SubjectID}', 'update');
    Route::delete('Point/{StudentID}', 'destroy');
});

Route::controller(RiewviewLessionController::class)->group(function () {
    Route::get('Lesson', 'index');
    Route::get('Lesson/{LessonID}', 'show');
    Route::post('Lesson', 'store');
    Route::put('Lesson/{LessonID}', 'update');
    Route::delete('Lesson/{LessonID}', 'destroy');
});

Route::controller(LikesController::class)->group(function () {
    Route::get('like', 'index'); 
    Route::post('like', 'store');   
    Route::delete('like/{LikesID}', 'destroy');
});

Route::controller(RollCallController::class)->group(function () {
    Route::get('rollCall', 'index'); 
    Route::post('rollCall', 'store');   
    Route::delete('rollCall/{LikesID}', 'destroy');
});

Route::controller(CostController::class)->group(function () {
    Route::get('cost', 'index'); 
    Route::post('cost', 'store');   
    Route::delete('cost/{CostID}', 'destroy');
});

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');  
    Route::post('resetPassword', 'resetPassword');  
});

