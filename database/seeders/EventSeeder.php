<?php

namespace Database\Seeders;

use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Event::factory()->create([
            'title' => 'Event 1',
            'description' => 'Event 1 description',
            'start' => Carbon::now()->addDays(30)->timestamp,
            'users' => []
        ]);

        Event::factory()->create([
            'title' => 'Event 2',
            'description' => 'Event 2 description',
            'start' => Carbon::now()->addDays(30)->timestamp,
            'users' => [
                ['name' => 'John Doe'],
                ['name' => 'Snoop dogg']
            ]
        ]);

        Event::factory()->create([
            'title' => 'Event 3',
            'description' => 'Event 3 description',
            'start' => Carbon::now()->subDays(5)->timestamp,
            'users' => []
        ]);

        Event::factory()->create([
            'title' => 'Event 4',
            'description' => 'Event 4 description',
            'start' => Carbon::now()->subDays(5)->timestamp,
            'users' => [
                ['name' => 'Jeffrey Bezos']
            ]
        ]);
    }
}