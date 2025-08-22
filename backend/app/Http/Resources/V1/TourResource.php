<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TourResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'country' => $this->country,
            'destinationCity' => $this->destination_city, // Camel case for API consistency
            'category' => $this->category,
            'type' => $this->type,
            'rateType' => $this->rate_type, // Camel case
            'currency' => $this->currency,
            'availability' => (bool) $this->availability, // Explicitly cast to boolean
            'grade' => $this->grade,
            'duration' => $this->duration,
            'introTextOverview' => $this->intro_text_overview, // Camel case
            'detailsDay1' => $this->details_day_1,
            'detailsDay2' => $this->details_day_2,
            'detailsDay3' => $this->details_day_3,
            'highlights' => $this->highlights,
            'inclusions' => $this->inclusions,
            'exclusions' => $this->exclusions,
            'specialNote' => $this->special_note,
            'transportInclusive' => (bool) $this->transport_inclusive, // Explicitly cast to boolean
            'meetStartTime' => $this->meet_start_time ? $this->meet_start_time->format('H:i') : null, // Format time
            'meetingPoint' => $this->meeting_point,
            'adultRate' => (float) $this->adult_rate,
            'adolescentRate' => (float) $this->adolescent_rate,
            'childRate' => (float) $this->child_rate,
            'infantRate' => (float) $this->infant_rate,
            'rate2pax' => (float) $this->rate_2pax,
            'rate3pax' => (float) $this->rate_3pax,
            'rate4pax' => (float) $this->rate_4pax,
            'rate5pax' => (float) $this->rate_5pax,
            'rate6pax' => (float) $this->rate_6pax,
            'rate7pax' => (float) $this->rate_7pax,
            'rate8pax' => (float) $this->rate_8pax,
            'rate9pax' => (float) $this->rate_9pax,
            'tourHeaderImage' => $this->tour_header_image,
            'tourImage1' => $this->tour_image_1,
            'tourImage2' => $this->tour_image_2,
            'featuredImage' => $this->featured_image,
            'mapImage' => $this->map_image,
            'itineraryFile' => $this->itinerary_file,
            'point1' => $this->point_1,
            'point2' => $this->point_2,
            'point3' => $this->point_3,
            'point4' => $this->point_4,
            'point5' => $this->point_5,
            'createdAt' => $this->created_at ? $this->created_at->format('Y-m-d H:i:s') : null,
            'updatedAt' => $this->updated_at ? $this->updated_at->format('Y-m-d H:i:s') : null,
        ];
    }
}
