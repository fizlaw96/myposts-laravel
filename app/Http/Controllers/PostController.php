<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Post; // This need to be imported
use Illuminate\Support\Facades\Storage; // This need to be imported
use Illuminate\Support\Facades\Validator; // This need to be imported

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::orderBy('id', 'desc')->get();
        return response()->json(['posts' => $posts]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        if ($validator->fails()){
            return response()->json(['errors'=>$validator->errors()], 422);
        }

        $post = new Post();

        $post->title = $request->title;
        $post->category = $request->category;
        $post->content = $request->content;
        $post->save();

        // Return a JSON response indicating success
        return response()->json(['message' => 'Post added successfully', 'status' => 'success']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json(['error' => 'Post not found'], 404);
        }

        return response()->json(['post' => $post]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $post = Post::find($id);

        $validator = Validator::make($request->all(),[
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        if ($validator->fails()){
        return response()->json(['errors'=>$validator->errors()], 422);
        }

        // Update the post data
        $post->title = $request->title;
        $post->category = $request->category;
        $post->content = $request->content;

        // Save the updated post
        $post->save();

        return response()->json(['message' => 'Post updated successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        // Check if the post exists
        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        // Delete the image file
        Storage::delete('public/images/' . $post->image);

        // Delete the post
        $post->delete();

        return response()->json(['message' => 'Post deleted successfully']);
    }
}
