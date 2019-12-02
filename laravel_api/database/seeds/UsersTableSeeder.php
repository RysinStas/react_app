<?php

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Post;
use Tymon\JWTAuth\Facades\JWTAuth;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(User::class)->create([
            'name' => 'admin',
            'email' => 'admin@user.com',
            'password' => 'qwerty'
        ])->posts()->saveMany(factory(Post::class, 3)->make());

        factory(User::class, 5)->create()
            ->each(function ($user) {
                $user->posts()->saveMany(factory(Post::class, 3)->make());
            });
    }
}
