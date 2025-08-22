<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tours', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('country');
            $table->string('destination_city');
            $table->string('category');
            $table->string('type');
            $table->string('rate_type');
            $table->string('currency');
            $table->string('availability');
            $table->string('grade');
            $table->string('duration');
            $table->text('intro_text_overview');
            $table->text('details_day_1')->nullable();
            $table->text('details_day_2')->nullable();
            $table->text('details_day_3')->nullable();
            $table->text('highlights');
            $table->text('inclusions');
            $table->text('exclusions');
            $table->text('special_note')->nullable();
            $table->boolean('transport_inclusive');
            $table->time('meet_start_time')->nullable();
            $table->string('meeting_point')->nullable();
            $table->decimal('adult_rate', 8, 2);
            $table->decimal('adolescent_rate', 8, 2)->nullable();
            $table->decimal('child_rate', 8, 2)->nullable();
            $table->decimal('infant_rate', 8, 2)->nullable();
            $table->decimal('rate_2pax', 8, 2)->nullable();
            $table->decimal('rate_3pax', 8, 2)->nullable();
            $table->decimal('rate_4pax', 8, 2)->nullable();
            $table->decimal('rate_5pax', 8, 2)->nullable();
            $table->decimal('rate_6pax', 8, 2)->nullable();
            $table->decimal('rate_7pax', 8, 2)->nullable();
            $table->decimal('rate_8pax', 8, 2)->nullable();
            $table->decimal('rate_9pax', 8, 2)->nullable();
            $table->string('tour_header_image')->nullable();
            $table->string('tour_image_1')->nullable();
            $table->string('tour_image_2')->nullable();
            $table->string('featured_image')->nullable();
            $table->string('map_image')->nullable();
            $table->string('itinerary_file')->nullable();
            $table->string('point_1')->nullable();
            $table->string('point_2')->nullable();
            $table->string('point_3')->nullable();
            $table->string('point_4')->nullable();
            $table->string('point_5')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tours');
    }
};
