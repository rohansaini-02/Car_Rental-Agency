<?php
/**
 * Standardized API Response Helper
 * All APIs return consistent JSON format:
 * { "success": bool, "message": string, "data": mixed }
 */
class Response {
    /**
     * Send a success response
     */
    public static function success($message, $data = null, $code = 200) {
        http_response_code($code);
        echo json_encode([
            "success" => true,
            "message" => $message,
            "data"    => $data
        ]);
        exit;
    }

    /**
     * Send an error response
     */
    public static function error($message, $code = 400) {
        http_response_code($code);
        echo json_encode([
            "success" => false,
            "message" => $message,
            "data"    => null
        ]);
        exit;
    }
}
