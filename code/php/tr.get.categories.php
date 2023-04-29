<?php
$username = $_POST["username"];

$command = "python ../py/category.py $username";
$output = exec($command);

echo json_encode($output);
header('Content-Type: application/json');
?>
