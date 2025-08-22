<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class TourCollection extends ResourceCollection
{
    /**
     * The resource that this collection of resources is wrapping.
     *
     * @var string
     */
    public $collects = TourResource::class; // Specifies that this collection wraps TourResource

    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data' => $this->collection,
        ];
    }

    /**
     * Get additional data that should be added to the response array.
     *
     * @return array<string, mixed>
     */
    public function with(Request $request): array
    {
        return [
            'status' => 'success',
            'message' => 'Tours retrieved successfully.',
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
        // This method can be used to set specific HTTP headers for the response
        // For example, if you wanted to add a custom header:
        // $response->header('X-Tours-Count', $this->collection->count());

        // Note: Laravel typically sets 'Content-Type: application/json' automatically for API resources.
        // The header setting from your ArticleCollection might not be necessary here:
        // $request->header('Accept', 'application/json'); // This attempts to set a request header, not response.
        // To set a response header, it would be:
        // $response->header('Content-Type', 'application/json');
    }
}
