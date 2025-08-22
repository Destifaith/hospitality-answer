<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\TourCollection; // Import TourCollection
use App\Http\Resources\V1\TourResource;   // Import TourResource
use App\Models\Tour;                      // Import the Tour model
use Illuminate\Http\Request;
use Illuminate\Http\Response; // Used for HTTP response codes
use Illuminate\Http\JsonResponse; // Add this import

class TourController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \App\Http\Resources\V1\TourCollection
     */
    public function index(Request $request): TourCollection
    {
        // Get all tours. You might want to add pagination later:
        // return new TourCollection(Tour::paginate());
        return new TourCollection(Tour::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse // Changed return type here
     */
    public function store(Request $request): JsonResponse
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'destination_city' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'rate_type' => 'required|string|max:255',
            'currency' => 'required|string|max:255',
            'availability' => 'boolean',
            'grade' => 'nullable|string|max:255',
            'duration' => 'nullable|string|max:255',
            'intro_text_overview' => 'nullable|string',
            'details_day_1' => 'nullable|string',
            'details_day_2' => 'nullable|string',
            'details_day_3' => 'nullable|string',
            'highlights' => 'nullable|string',
            'inclusions' => 'nullable|string',
            'exclusions' => 'nullable|string',
            'special_note' => 'nullable|string',
            'transport_inclusive' => 'boolean',
            'meet_start_time' => 'nullable|date_format:H:i:s',
            'meeting_point' => 'nullable|string|max:255',
            'adult_rate' => 'required|numeric',
            'adolescent_rate' => 'nullable|numeric',
            'child_rate' => 'nullable|numeric',
            'infant_rate' => 'nullable|numeric',
            'rate_2pax' => 'nullable|numeric',
            'rate_3pax' => 'nullable|numeric',
            'rate_4pax' => 'nullable|numeric',
            'rate_5pax' => 'nullable|numeric',
            'rate_6pax' => 'nullable|numeric',
            'rate_7pax' => 'nullable|numeric',
            'rate_8pax' => 'nullable|numeric',
            'rate_9pax' => 'nullable|numeric',
            'tour_header_image' => 'nullable|string|max:255', // Adjust for actual file uploads later
            'tour_image_1' => 'nullable|string|max:255',
            'tour_image_2' => 'nullable|string|max:255',
            'featured_image' => 'nullable|string|max:255',
            'map_image' => 'nullable|string|max:255',
            'itinerary_file' => 'nullable|string|max:255', // Adjust for actual file uploads later
            'point_1' => 'nullable|string|max:255',
            'point_2' => 'nullable|string|max:255',
            'point_3' => 'nullable|string|max:255',
            'point_4' => 'nullable|string|max:255',
            'point_5' => 'nullable|string|max:255',
        ]);

        $tour = Tour::create($validatedData);

        // Return the newly created tour using the resource, with a 201 Created status code
        return (new TourResource($tour))->response()->setStatusCode(Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Tour  $tour
     * @return \App\Http\Resources\V1\TourResource
     */
    public function show(Tour $tour): TourResource
    {
        return new TourResource($tour);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Tour  $tour
     * @return \App\Http\Resources\V1\TourResource
     */
    public function update(Request $request, Tour $tour): TourResource
    {
        // Validate incoming request data (using 'sometimes' for optional updates)
        $validatedData = $request->validate([
            'title' => 'sometimes|string|max:255',
            'country' => 'sometimes|string|max:255',
            'destination_city' => 'sometimes|string|max:255',
            'category' => 'sometimes|string|max:255',
            'type' => 'sometimes|string|max:255',
            'rate_type' => 'sometimes|string|max:255',
            'currency' => 'sometimes|string|max:255',
            'availability' => 'sometimes|boolean',
            'grade' => 'sometimes|nullable|string|max:255',
            'duration' => 'sometimes|nullable|string|max:255',
            'intro_text_overview' => 'sometimes|nullable|string',
            'details_day_1' => 'sometimes|nullable|string',
            'details_day_2' => 'sometimes|nullable|string',
            'details_day_3' => 'sometimes|nullable|string',
            'highlights' => 'sometimes|nullable|string',
            'inclusions' => 'sometimes|nullable|string',
            'exclusions' => 'sometimes|nullable|string',
            'special_note' => 'sometimes|nullable|string',
            'transport_inclusive' => 'sometimes|boolean',
            'meet_start_time' => 'sometimes|nullable|date_format:H:i:s',
            'meeting_point' => 'sometimes|nullable|string|max:255',
            'adult_rate' => 'sometimes|numeric',
            'adolescent_rate' => 'sometimes|nullable|numeric',
            'child_rate' => 'sometimes|nullable|numeric',
            'infant_rate' => 'sometimes|nullable|numeric',
            'rate_2pax' => 'sometimes|nullable|numeric',
            'rate_3pax' => 'sometimes|nullable|numeric',
            'rate_4pax' => 'sometimes|nullable|numeric',
            'rate_5pax' => 'sometimes|nullable|numeric',
            'rate_6pax' => 'sometimes|nullable|numeric',
            'rate_7pax' => 'sometimes|nullable|numeric',
            'rate_8pax' => 'sometimes|nullable|numeric',
            'rate_9pax' => 'sometimes|nullable|numeric',
            'tour_header_image' => 'sometimes|nullable|string|max:255',
            'tour_image_1' => 'sometimes|nullable|string|max:255',
            'tour_image_2' => 'sometimes|nullable|string|max:255',
            'featured_image' => 'sometimes|nullable|string|max:255',
            'map_image' => 'sometimes|nullable|string|max:255',
            'itinerary_file' => 'sometimes|nullable|string|max:255',
            'point_1' => 'sometimes|nullable|string|max:255',
            'point_2' => 'sometimes|nullable|string|max:255',
            'point_3' => 'sometimes|nullable|string|max:255',
            'point_4' => 'sometimes|nullable|string|max:255',
            'point_5' => 'sometimes|nullable|string|max:255',
        ]);

        $tour->update($validatedData);

        return new TourResource($tour);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Tour  $tour
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Tour $tour): \Illuminate\Http\JsonResponse
    {
        $tour->delete();

        // Return a 204 No Content response for successful deletion
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
