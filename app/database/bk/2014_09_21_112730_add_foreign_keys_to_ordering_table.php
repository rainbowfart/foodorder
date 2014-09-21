<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToOrderingTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('ordering', function(Blueprint $table)
		{
			$table->foreign('tid', 'ordering_ibfk_1')->references('id')->on('ticket')->onUpdate('RESTRICT')->onDelete('CASCADE');
			$table->foreign('pid', 'ordering_ibfk_2')->references('id')->on('product')->onUpdate('RESTRICT')->onDelete('CASCADE');
			$table->foreign('uid', 'ordering_ibfk_3')->references('id')->on('user')->onUpdate('RESTRICT')->onDelete('RESTRICT');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('ordering', function(Blueprint $table)
		{
			$table->dropForeign('tid');
			$table->dropForeign('pid');
			$table->dropForeign('uid');
		});
	}

}
