<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
// Removed "use Illuminate\Database\Console\Seeds\WithoutModelEvents;" if not directly used,
// as it's more relevant for individual seeders that might want to disable model events.

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create a specific test user
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // You can uncomment this line if you want to create 10 generic users
        // User::factory(10)->create();

        // Call other seeders to populate their respective tables
        $this->call(UserTableSeeder::class);
        $this->call(ArticlesTableSeeder::class);
        $this->call(TourTableSeeder::class); // This calls the seeder you selected in the Canvas
    }
}
