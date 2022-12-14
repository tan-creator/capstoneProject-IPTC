<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\SubjectController;
use App\Http\Controllers\API\StudentController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\CommentController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\API\PermissionController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Auth::user();
});
// Route::get('/subject', [SubjectController::class, 'show']);
Route::get('student', [StudentController::class, 'index']);
Route::get('comment', [CommentController::class, 'index']);

Route::controller(PermissionController::class)->group(function () {
    Route::get('permission', 'index');
    Route::get('permission/{Username}', 'show');
    Route::post('permission', 'store');
});



