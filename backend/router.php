<?php
/**
 * PHP Built-in Server Router
 * -------------------------
 * This script is used by 'php -S localhost:8000 router.php' to handle 
 * requests. It allows the built-in server to act like Apache with mod_rewrite.
 */

// 1. Get the requested URI path
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$file = __DIR__ . $path;

// 2. Check if the requested resource exists as a physical file or directory
// If it's a real file (like an image, CSS, or JS), return false to let the 
// server serve it directly.
if ($path !== '/' && file_exists($file)) {
    return false;
}

// 3. Otherwise, route everything (like /api/cars) through our main index.php
// This is where your custom API routing logic lives.
require_once __DIR__ . '/index.php';
