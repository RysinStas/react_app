<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\Hashtag;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class PostsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param PostRequest $request
     * @return \Illuminate\Http\Response
     */
    public function index(PostRequest $request)
    {

        if ($request->input('hashtag')) {
            $posts = Hashtag::where('name', $request->input('hashtag'))
                ->firstOrFail()
                ->posts()
                ->with('user:id,name')
                ->latest()
                ->paginate(5);
            return $posts;
        }
        return Post::with('user:id,name')
            ->latest()
            ->paginate(5);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PostRequest $request)
    {
        $user = $request->user();
        $post = new Post($request->post());

        $content = $request->input('content');
        preg_match_all('/#(\w+)/', $content, $matches);
        $saved_post= $user->posts()->save($post);

        // $matches[0] - c символом #
        // $matches[1] - без символа #
        foreach ($matches[1] as $hashtag) {
            $hashtag1 = Hashtag::firstOrCreate(['name'=>$hashtag]);
            $post->hashtags()->attach($hashtag1);
        }

        return $saved_post;

               // Поиск mentions
//        preg_match_all("/@(\w+)/", $msg, $matches);
//        foreach ($matches[1] as $username)
//            logger($username . ' ') ;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Post::findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(PostRequest $request, $id)
    {
        $post = Post::with('user:id,name')->findOrFail($id);
        $post->update($request->post());

        return $post;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(PostRequest $request, $id)
    {
        $post = Post::findOrFail($id);
        $post->delete();
        return response()->json(['message' => 'Post deleted']);
    }
}
