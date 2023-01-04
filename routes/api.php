<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('student')->controller(App\Http\Controllers\API\StudentController::class)->group(function () {
    Route::get('/', 'index');
    Route::get('/{ClassID}', 'show');
    Route::post('/', 'store');
    Route::put('/{id}', 'update');
    Route::delete('/{id}', 'destroy'); 
});

Route::prefix('permission')->controller(App\Http\Controllers\API\PermissionController::class)->group(function () {
    Route::get('/', 'index');
    Route::get('/Teacher/{TeacherUsername}', 'showForTeacher');
    Route::get('/Parent/{ParentUsername}', 'showForParent');
    Route::post('/', 'store');
    Route::delete('/{PermissionFormID}', 'destroy'); 
});

Route::prefix('subject')->controller(App\Http\Controllers\API\SubjectController::class)->group(function () {    
    Route::get('/', 'index');
    Route::post('/', 'store');
    Route::put('/{id}', 'update');
    Route::delete('/{id}', 'destroy');
});

Route::prefix('class')->controller(App\Http\Controllers\API\ClassController::class)->group(function () {
    Route::get('/', 'index');  
    Route::get('/{ClassID}', 'show');
    // Route::post('/', 'store');
    // Route::put('/{ClassID}', 'update');
    // Route::delete('/{ClassID}', 'destroy');  
});

Route::prefix('user')->controller(App\Http\Controllers\API\UserController::class)->group(function () {
    Route::get('/', 'index'); 
    Route::post('/', 'store');
    Route::put('/{UserName}', 'update');
    Route::delete('/{UserName}', 'destroy');     
});

Route::prefix('post')->controller(App\Http\Controllers\API\PostController::class)->group(function () {
    Route::get('/', 'index'); 
    Route::post('/', 'store');
    Route::put('/{PostID}', 'update');
    Route::delete('/{PostID}', 'destroy');  
    Route::post('/like', 'like'); 
    Route::post('/dislike', 'dislike');
    Route::post('comment', 'comment'); 
    Route::post('removeComment', 'removeComment'); 
});

Route::prefix('notification')->controller(App\Http\Controllers\API\NotificationController::class)->group(function () {
    Route::get('/', 'index');
    Route::get('/{NotificationID}', 'show');
    Route::post('/', 'store');
    Route::delete('/{id}', 'destroy');    
});

Route::prefix('Point')->controller(App\Http\Controllers\API\PointController::class)->group(function () {
    Route::get('/all', 'index');
    Route::get('/{SubjectID}', 'show');
    Route::post('/', 'store');
    Route::put('/{StudentID}-{SubjectID}', 'update');
    Route::delete('/{StudentID}-{SubjectID}', 'destroy');
});

Route::prefix('Lesson')->controller(App\Http\Controllers\API\RiewviewLessionController::class)->group(function () {
    Route::get('/', 'index');
    Route::get('/{LessonID}', 'show');
    Route::post('/', 'store');
    Route::put('/{LessonID}', 'update');
    Route::delete('/{LessonID}', 'destroy');
});

Route::prefix('comment')->controller(App\Http\Controllers\API\CommentController::class)->group(function () {
    Route::get('/', 'index');
    Route::post('/', 'store');
    Route::put('/{id}', 'update');
    Route::delete('/{id}', 'destroy');
});

Route::prefix('like')->controller(App\Http\Controllers\API\LikesController::class)->group(function () {
    Route::get('/', 'index'); 
    Route::post('/', 'store');   
    Route::delete('/{LikesID}', 'destroy');
});

Route::prefix('cost')->controller(App\Http\Controllers\API\CostController::class)->group(function () {
    Route::get('/', 'index');
    Route::get('/showByClass/{classID}', 'show'); 
    Route::post('/', 'store');   
    Route::delete('/{CostID}', 'destroy');
});

Route::controller(App\Http\Controllers\Auth\AuthController::class)->group(function () {
    Route::post('login', 'login');  
    Route::post('resetPassword', 'resetPassword');  
});

Route::post('/testJWT', function (Request $request){
    print_r($request->all());
})->middleware('jwt');

