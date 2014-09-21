<?php

class DepartTableSeeder extends Seeder {

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('depart')->delete();

        Depart::create(array('id' => 1, 'name' => "研A"));
        Depart::create(array('id' => 2, 'name' => "研C"));
        Depart::create(array('id' => 3, 'name' => "研E"));
        Depart::create(array('id' => 4, 'name' => "FLASH"));
        Depart::create(array('id' => 5, 'name' => "QA"));
        Depart::create(array('id' => 6, 'name' => "ACC"));
        Depart::create(array('id' => 7, 'name' => "RD"));
        Depart::create(array('id' => 8, 'name' => "GM"));
        Depart::create(array('id' => 9, 'name' => "MIS"));
    }

}
