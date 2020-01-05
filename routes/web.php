<?php
Route::group(['prefix' => 'user'], function () {
    Route::get('/testlogin', 'Auth\LoginController@showLoginForm')->name('login');
    Route::post('/login', 'Auth\LoginController@login');
    Route::post('/logout', 'Auth\LoginController@logout')->name('logout');
});

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/getCurrentUser', 'HomeController@getCurrentUser')->middleware('auth');
Route::post('/roomExistsChk', 'HomeController@roomExistsChk');
Route::post('/createRoom', 'CreateRoomController@createRoom')->middleware('auth');
Route::get('/getMyRooms', 'CreateRoomController@getMyRooms')->middleware('auth');
Route::delete('/deleteRoom/{room}', 'CreateRoomController@deleteRoom')->middleware('auth');
Route::post('/updateUserData', 'User\UserStateController@updateUserData')->middleware('auth');

Route::post('/pusher/auth', 'HomeController@authenticate');

Route::get('/{path?}', function () { //react-routerとlaravelのルーティングが喧嘩しないようにする処理。
    return view('home');
})->where('path', '.*');
