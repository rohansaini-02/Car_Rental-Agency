<?php
define('DB_HOST', 'localhost');
define('DB_NAME', 'rentify_db');
define('DB_USER', 'root');
define('DB_PASS', '');

define('JWT_SECRET', 'rentify_jwt_secret_key_2026_xK9mP2');
define('JWT_EXPIRY', 86400);

define('UPLOAD_DIR', __DIR__ . '/../uploads/');
define('MAX_FILE_SIZE', 5 * 1024 * 1024);
define('ALLOWED_FILE_TYPES', ['image/jpeg', 'image/png', 'image/webp']);

define('FRONTEND_URL', 'http://localhost:5173');
