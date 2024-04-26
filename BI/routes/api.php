<?php

use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
Route::post('login', [TaskController::class, 'loginUser']);
Route::post('signUp', [TaskController::class, 'createUser']);
Route::prefix('user')->group(function () {
    Route::POST('logout', [TaskController::class, 'userLogout']);
    Route::post('/list', [TaskController::class, 'index']);
    Route::post('/create', [TaskController::class, 'store']);
    Route::post('/update', [TaskController::class, 'update']);
    Route::post('/delete', [TaskController::class, 'destroy']);
    Route::POST('/view', [TaskController::class, 'view']);
})->middleware(['auth:api']);
