<?php
$database = $_POST["database"];
$category = $_POST["category"];

$command = "python ../python/category.py $database $category";
$output = exec($command);

echo json_encode($output);
header('Content-Type: application/json');
?>
