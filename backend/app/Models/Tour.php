<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory; // Add this line

class Tour extends Model
{
    use HasFactory; // Add HasFactory here

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'country',
        'destination_city',
        'category',
        'type',
        'rate_type',
        'currency',
        'availability',
        'grade',
        'duration',
        'intro_text_overview',
        'details_day_1',
        'details_day_2',
        'details_day_3',
        'highlights',
        'inclusions',
        'exclusions',
        'special_note',
        'transport_inclusive',
        'meet_start_time',
        'meeting_point',
        'adult_rate',
        'adolescent_rate',
        'child_rate',
        'infant_rate',
        'rate_2pax',
        'rate_3pax',
        'rate_4pax',
        'rate_5pax',
        'rate_6pax',
        'rate_7pax',
        'rate_8pax',
        'rate_9pax',
        'tour_header_image',
        'tour_image_1',
        'tour_image_2',
        'featured_image',
        'map_image',
        'itinerary_file',
        'point_1',
        'point_2',
        'point_3',
        'point_4',
        'point_5',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'transport_inclusive' => 'boolean',
        'meet_start_time' => 'datetime', // Or 'string' if you prefer to handle time as a string
    ];
}
