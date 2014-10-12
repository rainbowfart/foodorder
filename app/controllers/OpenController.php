<?php

class OpenController extends BaseController {

    public function index()
    {
        $arg = array(
            'departs' => Depart::all(),
            'stores' => Store::all()
        );

        return View::make('foodorder/open', $arg);
    }

    // no ajax here ! just do the right thing !
    public function create()
    {
        // get user first, create it if not exist
        // $opener = User::findBy new User();
        // $receiver = new User();

        // then create an order
        // $o = new Order;
        // $o->store = Input::get('store');
        // $o->opener = ;
        // $o->receiver = ;
        // $o->closetime = Input::get('deadline');
        // $o-> = Input::get('memo');

        return Input::get();
    }

}
