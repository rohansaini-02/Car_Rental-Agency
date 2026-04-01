<?php
require_once __DIR__ . '/config/cors.php';

$uri = $_SERVER['REQUEST_URI'] ?? '/';
$path = parse_url($uri, PHP_URL_PATH);
$path = trim($path, '/');

if (strpos($path, 'api/') === 0) {
    $parts = explode('/', $path);
    $endpoint = $parts[1] ?? '';
    
    if (strpos($endpoint, '.php') === false) {
        $endpoint .= '.php';
    }
    
    $file = __DIR__ . '/api/' . $endpoint;
    
    if (file_exists($file)) {
        require_once $file;
        exit;
    }
}

http_response_code(404);
echo json_encode([
    'success' => false,
    'message' => 'Resource not found: ' . $path,
    'data' => null
]);
