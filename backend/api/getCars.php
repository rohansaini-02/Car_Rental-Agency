<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../controllers/CarController.php';

$database = new Database();
$db = $database->getConnection();

$controller = new CarController($db);

if (isset($_GET['mine']) && $_GET['mine'] === '1') {
    $controller->getMyCars();
} else {
    $controller->getCars();
}
