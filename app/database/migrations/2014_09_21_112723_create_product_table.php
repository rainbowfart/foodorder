<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateProductTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('product', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('storeid');
			$table->foreign('storeid')->references('id')->on('storeinfo')->onUpdate('RESTRICT')->onDelete('CASCADE');
			$table->string('name', 32);
			$table->boolean('size');
			$table->boolean('hotcold');
			$table->integer('price')->nullable();
			$table->unique(['storeid','name','size','hotcold'], 'storeid_name_size_hotcold');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('product');
	}

}
