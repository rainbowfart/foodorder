<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', 'OrderController@index');

Route::get('open', 'OpenController@index');
Route::post('open/persist', 'OpenController@persist');

Route::post('store/add', 'StoreController@create');
Route::post('store/edit', 'StoreController@edit');
Route::post('store/del', 'StoreController@delete');
Route::get('store/menu/{id}', 'StoreController@getMenu');

Route::get('order', 'OrderController@index');
Route::get('order/userorder/cart', 'OrderController@cart');

Route::post('order/userorder/add', 'OrderController@add');
Route::post('order/userorder/edit', 'OrderController@edit');
Route::post('order/userorder/del', 'OrderController@delete');

Route::get('forcall', 'ForcallController@index');
Route::post('manage/price/edit', 'ForcallController@editPrice');

Route::get('statement', 'StatementController@index');
Route::post('manage/userorder/pay', 'StatementController@checkPayment');

Route::get('modify', 'ModifyController@index');
Route::post('manage/order/edit', 'ModifyController@editOrder');
Route::post('manage/userorder/edit', 'ModifyController@editUserOrder');
Route::post('manage/userorder/del', 'ModifyController@deleteUserOrder');
