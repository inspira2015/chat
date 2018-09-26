<?php


Route::get('/', function () {
    return view('welcome');
});

Route::get('chat', 'ChatController@chat');