<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\V1\TourController;
use App\Http\Controllers\API\V1\AuthorController;
use App\Http\Controllers\API\V1\ArticleController;
use App\Http\Controllers\API\V1\UserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

Route::prefix('v1')->group(function () {

    // ================================
    // AUTHENTICATION
    // ================================
    Route::post('/login', [AuthenticatedSessionController::class, 'store'])->name('api.login');

    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
        ->middleware('auth:sanctum')
        ->name('api.logout');

    // Email verification routes
    Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
        $request->fulfill();
        return response()->json(['message' => 'Email verified successfully!']);
    })->middleware(['auth:sanctum', 'signed'])->name('verification.verify');

    Route::post('/email/verification-notification', function (Request $request) {
        $request->user()->sendEmailVerificationNotification();
        return response()->json(['message' => 'Verification link sent!']);
    })->middleware(['auth:sanctum', 'throttle:6,1']);

    // ================================
    // PROTECTED ROUTES
    // ================================
    Route::middleware(['auth:sanctum', 'verified'])->group(function () {
        // Articles
        Route::apiResource('/articles', ArticleController::class);

        // Tours
        Route::apiResource('/tours', TourController::class);

        // Authors
        Route::get('/authors/{user}', [AuthorController::class, 'show'])->name('authors');

        // Current authenticated user
        Route::get('/user', [UserController::class, 'show'])->name('user.show');
    });
});
