<?php

use Illuminate\Http\Request;
use App\Http\Controllers;
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

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

//Route::resources(['posts' => PostsController::class]);

//Route::post('/posts', 'PostController@refresh');
Route::group(['middleware' => ['jwt.verify']], function() {
    Route::resources(['posts' => PostsController::class]);
    Route::get('/user', 'AuthController@getAuthenticatedUser');
    Route::post('/refresh', 'AuthController@refresh');
//    Route::get('/hashtag/{name}', 'HashtagController@find');
});

//Route::middleware('auth:api')->resources(['posts' => PostsController::class]);
Route::post('/register', 'AuthController@register');
Route::post('/login', 'AuthController@login');
Route::post('/logout', 'AuthController@logout');

Route::get('/hashtag/{name}', 'HashtagController@find');
Route::get('/hashtag/', 'HashtagController@index');
