<?php

class ModifyController extends BaseController {

    public function index()
    {
        $arg = array(
            'departs' => Depart::all(),
            'stores' => Store::all()
        );

        return View::make('foodorder/modified', $arg);
    }

}
