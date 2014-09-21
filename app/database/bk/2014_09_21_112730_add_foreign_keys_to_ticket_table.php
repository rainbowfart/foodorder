<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToTicketTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('ticket', function(Blueprint $table)
		{
			$table->foreign('store', 'ticket_ibfk_1')->references('id')->on('storeinfo')->onUpdate('RESTRICT')->onDelete('CASCADE');
			$table->foreign('opener', 'ticket_ibfk_2')->references('id')->on('user')->onUpdate('RESTRICT')->onDelete('RESTRICT');
			$table->foreign('receiver', 'ticket_ibfk_3')->references('id')->on('user')->onUpdate('RESTRICT')->onDelete('RESTRICT');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('ticket', function(Blueprint $table)
		{
			$table->dropForeign('store');
			$table->dropForeign('opener');
			$table->dropForeign('receiver');
		});
	}

}
