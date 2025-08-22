<?php

namespace App\Traits;

use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait HasAuthor
{
    /**
     * Get the User model instance that is the author of this model.
     * This method is an accessor to get the actual User object.
     */
    public function author(): ?User // Changed return type to nullable User
    {
        // When you access $this->authorRelation (as a dynamic property),
        // Laravel automatically calls the authorRelation() method and resolves the related model.
        // It's the standard way to get the related model instance after defining the relationship.
        return $this->authorRelation;
    }

    /**
     * Define the Eloquent "belongs to" relationship for the author.
     * This method returns the BelongsTo relationship builder instance.
     */
    public function authorRelation(): BelongsTo
    {
        // CORRECTED: Changed 'belongTo' to 'belongsTo'
        return $this->belongsTo(User::class, 'author_id');
    }

    /**
     * Check if the model is authored by a specific user.
     */
    public function isAuthoredBy(User $user): bool
    {
        // Ensure the author exists before trying to match
        return $this->author()?->matches($user) ?? false;
    }

    /**
     * Associate the model with a given author.
     */
    public function authoredBy(User $author)
    {
        // Use the associate method on the relationship builder
        return $this->authorRelation()->associate($author);
    }
}
