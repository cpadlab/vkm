<?php
$database = $_POST["database"];
$user = $_POST["user"];
$password = $_POST["password"];
$site = $_POST["site"];

$command = "python ../python/category-color.py $database $user $password $site";
$output = exec($command);

echo json_encode(array("category" => $output));
header('Content-Type: application/json');
?>
