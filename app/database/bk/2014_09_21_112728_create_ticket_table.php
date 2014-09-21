<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTicketTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('ticket', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('store')->index('store');
			$table->timestamp('creation')->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->integer('opener')->index('opener')->references('id')->on('user')->onUpdate('RESTRICT')->onDelete('RESTRICT');
			$table->integer('receiver')->index('receiver');
			$table->dateTime('closetime')->default('0000-00-00 00:00:00');
			$table->boolean('state')->index('state');
			$table->text('note')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('ticket');
	}

}
