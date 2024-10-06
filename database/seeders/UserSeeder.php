<?php

namespace Database\Seeders;

use App\Enums\UserType;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@test.com',
            'password' => bcrypt('123456'),
            'type' => UserType::User
        ]);

        User::factory()->create([
            'name' => 'Test Employer',
            'email' => 'test@admin.com',
            'password' => bcrypt('123456'),
            'type' => UserType::Employer
        ]);

        User::factory()->create([
            'name' => 'Danielius Ivanovas',
            'email' => 'danielius.ivanovas@vvk.lt',
            'password' => bcrypt('123456'),
            'type' => UserType::Admin
        ]);
    }
}
