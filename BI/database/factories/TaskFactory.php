<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            "title" => fake()->name(),
            "description" => fake()->sentence(),
            "status" => fake()->randomElement(['Pending', 'In Progress', 'Completed']),
            "deadline" => fake()->dateTimeBetween('now', '+1 year')->format('Y-m-d')
        ];
    }
}
