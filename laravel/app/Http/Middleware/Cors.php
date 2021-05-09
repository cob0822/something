<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

// 使用していない
class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    // public function handle($request, Closure $next)
    // {
    //     $response = $next($request);
    //     $response->withHeaders([
    //         'Access-Control-Allow-Origin' => '*',
    //     ]);
    //     return $response;
    // }
    public function handle($request, Closure $next)
    {
        return $next($request)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type');
    }
}
