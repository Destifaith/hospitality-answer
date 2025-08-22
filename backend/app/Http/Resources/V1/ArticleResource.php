<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    public static $wrap = 'articles';

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'type' => 'articles',
            'id' => $this->id, // Corrected: Access 'id' as a property
            'attributes' => [
                'title' => $this->title, // Corrected: Access 'title' as a property
                'slug' => $this->slug,   // Corrected: Access 'slug' as a property
                'body' => $this->body,   // Added 'body' attribute, assuming it exists
                'created_at' => $this->created_at ? $this->created_at->format('Y-m-d H:i:s') : null, // Corrected and formatted
            ],
            'relationships' => [ // Changed key from 'relationship' to 'relationships' (common practice)
                // Use whenLoaded to conditionally load the author relationship if it has been eager loaded
                'author' => AuthorResource::make($this->whenLoaded('author')),
            ],
            'links' => [
                'self' => route('articles.show', $this->id), // Corrected: Access 'id' as a property
                // If you have a specific route for slug, ensure it's defined.
                // Otherwise, 'related' might point to the same 'show' route with a different parameter.
                'related' => route('articles.show', $this->slug), // Corrected: Access 'slug' as a property
            ],
        ];
    }

    /**
     * Get additional data that should be added to the response array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array<string, mixed>
     */
    public function with(Request $request): array
    {
        return [
            'status' => 'success',
        ];
    }

    /**
     * Customize the outgoing response for the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Http\JsonResponse  $response
     * @return void
     */
    public function withResponse(Request $request, JsonResponse $response): void
    {
        // This line attempts to set a request header, not a response header.
        // For setting response headers, use $response->header().
        // Example: $response->header('X-Custom-Header', 'MyValue');
        // Laravel automatically sets 'Content-Type: application/json' for API resources.
        // If your intention was to ensure JSON content type, this line is often not needed.
        // $response->header('Accept', 'application/json'); // This line is incorrect for response headers
    }
}
