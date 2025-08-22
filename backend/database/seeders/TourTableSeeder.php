<?php

namespace Database\Seeders;

use App\Models\Tour; // Import the Tour model
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TourTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Use the TourFactory to create 15 dummy tour records.
        // This will leverage the definition() method in your TourFactory
        // to generate all the necessary data for each tour.
        Tour::factory()->count(15)->create();
    }
}
