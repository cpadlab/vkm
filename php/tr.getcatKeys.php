<?php
$username = $_POST["username"];
$category = $_POST["category"];

$command = "python ../py/catKey.py $username $category";
$output = exec($command);

echo json_encode($output);
header('Content-Type: application/json');
?>
