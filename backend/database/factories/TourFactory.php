<?php

namespace Database\Factories;

use App\Models\Tour; // Import the Tour model
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str; // For generating slugs or other string manipulations

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tour>
 */
class TourFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Tour::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence(rand(3, 8)); // Generate a sentence for the title
        $country = $this->faker->country(); // Example: "Ghana"
        $city = $this->faker->city(); // Example: "Accra" or "Kasoa"

        return [
            'title' => $title,
            'country' => $country,
            'destination_city' => $city,
            'category' => $this->faker->randomElement(['Adventure', 'Cultural', 'Wildlife', 'Historical', 'Relaxation']),
            'type' => $this->faker->randomElement(['Day Tour', 'Multi-Day Tour', 'Custom Tour']),
            'rate_type' => $this->faker->randomElement(['Per Person', 'Per Group']),
            'currency' => $this->faker->randomElement(['GHS', 'USD', 'EUR']),
            'availability' => $this->faker->boolean(), // true or false
            'grade' => $this->faker->randomElement(['Easy', 'Moderate', 'Challenging']),
            'duration' => $this->faker->numberBetween(1, 14) . ' days', // e.g., "3 days"
            'intro_text_overview' => $this->faker->paragraph(3), // 3 sentences
            'details_day_1' => $this->faker->paragraph(2),
            'details_day_2' => $this->faker->paragraph(2),
            'details_day_3' => $this->faker->paragraph(2),
            'highlights' => $this->faker->sentence(5), // Short sentence
            'inclusions' => $this->faker->sentence(7),
            'exclusions' => $this->faker->sentence(7),
            'special_note' => $this->faker->optional()->sentence(), // Sometimes null
            'transport_inclusive' => $this->faker->boolean(),
            'meet_start_time' => $this->faker->time('H:i:s'), // e.g., "09:00:00"
            'meeting_point' => $this->faker->address(),
            'adult_rate' => $this->faker->randomFloat(2, 50, 500), // float with 2 decimal places, min 50, max 500
            'adolescent_rate' => $this->faker->randomFloat(2, 40, 400),
            'child_rate' => $this->faker->randomFloat(2, 20, 200),
            'infant_rate' => $this->faker->randomFloat(2, 0, 50),
            'rate_2pax' => $this->faker->randomFloat(2, 90, 900),
            'rate_3pax' => $this->faker->randomFloat(2, 120, 1200),
            'rate_4pax' => $this->faker->randomFloat(2, 150, 1500),
            'rate_5pax' => $this->faker->randomFloat(2, 180, 1800),
            'rate_6pax' => $this->faker->randomFloat(2, 200, 2000),
            'rate_7pax' => $this->faker->randomFloat(2, 220, 2200),
            'rate_8pax' => $this->faker->randomFloat(2, 240, 2400),
            'rate_9pax' => $this->faker->randomFloat(2, 260, 2600),
            // Placeholder images - consider a more robust image handling strategy for production
            'tour_header_image' => 'https://placehold.co/1200x400/000000/FFFFFF?text=Tour+Header',
            'tour_image_1' => 'https://placehold.co/800x600/000000/FFFFFF?text=Tour+Image+1',
            'tour_image_2' => 'https://placehold.co/800x600/000000/FFFFFF?text=Tour+Image+2',
            'featured_image' => 'https://placehold.co/600x400/000000/FFFFFF?text=Featured+Image',
            'map_image' => 'https://placehold.co/600x400/000000/FFFFFF?text=Map+Image',
            'itinerary_file' => null, // Assuming this might be optional or generated separately
            'point_1' => $this->faker->sentence(3),
            'point_2' => $this->faker->sentence(3),
            'point_3' => $this->faker->sentence(3),
            'point_4' => $this->faker->sentence(3),
            'point_5' => $this->faker->sentence(3),
        ];
    }
}
