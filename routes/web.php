<?php
Route::group(['prefix' => 'user'], function () {
    Route::get('/testlogin', 'Auth\LoginController@showLoginForm')->name('login');
    Route::post('/login', 'Auth\LoginController@login');
    Route::post('/logout', 'Auth\LoginController@logout')->name('logout');
});

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/getCurrentUser', 'HomeController@getCurrentUser');
Route::post('/createRoom', 'CreateRoomController@createRoom');
Route::get('/getMyRooms', 'CreateRoomController@getMyRooms');

Route::post('/pusher/auth', 'HomeController@authenticate');
Route::post('/testPdf', 'HomeController@testPdf');

Route::get('/{path?}', function () { //react-routerとlaravelのルーティングが喧嘩しないようにする処理。
    return view('home');
})->where('path', '.*');
