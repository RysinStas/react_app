<?php

use Illuminate\Database\Seeder;
use\App\Models\Post;

class PostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Post::create([
            'content' => 'First admin post',
            'user_id' => '1'
        ]);
    }
}
