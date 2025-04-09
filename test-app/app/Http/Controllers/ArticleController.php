<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Article;

use Illuminate\Support\Facades\Auth;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $article = Article::with('author')->get();
        return response()->json([
            'data' => [
                'article' => $article
            ]
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'slug' => 'required|string',
            'title' => 'required|string',
            'description' => 'required|string',
            'body' => 'required|string',
            'tagList' => 'array',
            'favorited' => 'boolean',
            'favoritesCount' => 'integer',
        ]);

        $article = Article::create([
            'slug' => $fields['slug'],
            'title' => $fields['title'],
            'description' => $fields['description'],
            'body' => $fields['body'],
            'tagList' => $fields['tagList'],
            'favorited' => false,
            'favoritesCount' => 0,
            'author_id' => Auth::id()
        ]);

        return response()->json([
            'data' => [
                'article' => $article
            ]
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug)
    {
        $article = Article::where('slug', $slug)->firstOrFail();
        return response()->json([
            'data' => [
                'article' => $article
            ]
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $slug)
    {
        $article = Article::where('slug', $slug)->firstOrFail();

        $fields = $request->validate([
            'slug' => 'required|string',
            'title' => 'required|string',
            'description' => 'required|string',
            'body' => 'required|string',
            'tagList' => 'array',
            'favorited' => 'boolean',
            'favoritesCount' => 'integer',
        ]);

        $article->update([
            'slug' => $fields['slug'],
            'title' => $fields['title'],
            'description' => $fields['description'],
            'body' => $fields['body'],
            'tagList' => $fields['tagList'],
            'favorited' => false,
            'favoritesCount' => 0,
            'author_id' => Auth::id()
        ]);

        return response()->json([
            'data' => [
                'article' => $article
            ]
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $slug)
    {
        $article = Article::where('slug', $slug)->firstOrFail();
        $article->delete();

        return response([
            'message' => 'Article deleted'
        ], 200);
    }
}
