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

Route::get('/', function()
{
    $departs = Depart::all();
    header("Content-Type: text/plain; charset=utf-8");
    var_dump($departs[0]->name);
	// return View::make('hello');
});


/*
    Foodorder routing config !
*/
Route::get('open', 'OpenController@index');