<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AuthorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'type' => 'people',
            'id' => $this->id,   // Corrected: Access 'id' as a property
            'name' => $this->name, // Corrected: Access 'name' as a property
            'links' => [
                // Assuming 'authors.show' is the named route for a single author resource
                'self' => route('authors.show', $this->id) // Corrected: Access 'id' as a property
            ],
            // Add other user attributes you want to expose through this resource
        ];
    }
}
