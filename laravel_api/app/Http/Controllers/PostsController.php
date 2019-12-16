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

        if ($request->input('mentions')) {
            $posts = User::where('name', $request->input('mentions'))
                ->firstOrFail()
                ->mentions()
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
        $post = $request->user()->posts()->create($request->post());
        $content = $request->input('content');

        $post->hashtags()->attach($this->findHashtag($content));
        $post->mentions()->attach($this->findMention($content));

        return $post;
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

    public function findHashtag($content) {
        $result = [];
        preg_match_all('/#(\w+)/', $content, $matches);
        logger($matches);
        foreach ($matches[1] as $hashtagName) {
            $hashtag = Hashtag::firstOrCreate(['name'=>$hashtagName]);
            $result[]=$hashtag->id;
        }
        return $result;
    }

    public function findMention($content) {
        $result = [];
        preg_match_all("/@(\w\S+)/", $content, $matches);
        foreach ($matches[1] as $userName) {
            $user = User::where('name', '=', $userName)->first();
            if ($user) {
                $result[] = $user->id;;
            }
        }
        return $result;
    }
}
