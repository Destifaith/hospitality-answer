<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Response;

class Handler extends ExceptionHandler
{
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            // Log exceptions if needed
        });

        $this->renderable(function (Throwable $e, $request) {
            if ($request->is('api/*')) {
                // 404 Not Found
                if ($e instanceof NotFoundHttpException) {
                    return new JsonResponse([
                        'message' => 'Resource not found',
                        'type' => 'NotFoundHttpException',
                        'code' => (string) Response::HTTP_NOT_FOUND,
                        'link' => 'https://example.com/errors/404',
                        'status_code' => (string) Response::HTTP_NOT_FOUND,
                    ], Response::HTTP_NOT_FOUND);
                }

                // Validation errors
                if ($e instanceof ValidationException) {
                    return new JsonResponse([
                        'message' => 'The given data was invalid.',
                        'errors' => $e->errors(),
                        'code' => (string) Response::HTTP_UNPROCESSABLE_ENTITY,
                        'status_code' => (string) Response::HTTP_UNPROCESSABLE_ENTITY,
                    ], Response::HTTP_UNPROCESSABLE_ENTITY);
                }

                // Other exceptions (500)
                return new JsonResponse([
                    'message' => 'A server error occurred.',
                    'type' => class_basename($e), // e.g. "ErrorException"
                    'code' => (string) Response::HTTP_INTERNAL_SERVER_ERROR,
                    'status_code' => (string) Response::HTTP_INTERNAL_SERVER_ERROR,
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        });
    }
}
