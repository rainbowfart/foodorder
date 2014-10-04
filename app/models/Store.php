<?php
use LaravelBook\Ardent\Ardent;

class Store extends Ardent
{
    protected $table = 'storeinfo';
    protected $fillable = array('name', 'tel', 'menu', 'mime', 'memo');
    public $timestamps = false;

    public static $rules = array(
        'name' => 'required|between:2, 20',
        'tel' => 'required|min:9', // for 10 now
        'menu' => 'required|image',
    );

    // custom error messages
    public static $customMessages = array(
        'required' => 'The :attribute field is required.',
        'between' => 'The :attribute field must between :min - :max.',
        'min' => 'The :attribute field must > :min',
        'image' => 'The file must be image'
    );
}
