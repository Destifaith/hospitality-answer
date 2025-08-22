<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\ArticleCollection;
use App\Http\Resources\V1\ArticleResource;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return new ArticleCollection(Article::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'max:20', 'unique:articles,title'],
            'body'  => ['required', 'min:5'],
        ]);

        $article = Article::create([
            'title'     => $validated['title'],
            'slug'      => Str::slug($validated['title']),
            'body'      => $validated['body'],
            'author_id' => Auth::id() ?? 1, //current logged-in user
        ]);

        return response()->json([
            'message'     => 'Article created successfully',
            'data'        => $article,
            'status_code' => (string) Response::HTTP_CREATED,
        ], Response::HTTP_CREATED);
    }
    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        //
        return (new ArticleResource($article))
            ->response()
            ->setStatusCode(200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Article $article)
    {
        $validated = $request->validate([
            'title' => [
                'sometimes',
                'max:20',
                Rule::unique('articles')->ignore($article->title(), 'title') // ignore by title
            ],
            'body'  => ['required', 'min:5'],
        ]);

        $article->update([
            'title'      => $validated['title'],
            'body'       => $validated['body'],
            'author_id' => Auth::id() ?? 1,
        ]);

        return redirect()->route('articles.show', $article)->with('success', 'Article updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        //
        $article->delete();
        return response()->json(null, 204);
    }
}
