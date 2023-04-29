<?php
$username = $_POST["username"];
$category = $_POST["category"];

$command = "python ../py/get.category.keys.py $username $category";
$output = exec($command);

echo json_encode($output);
header('Content-Type: application/json');
?>
