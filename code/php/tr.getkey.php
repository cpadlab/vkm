<?php
$username = $_POST["username"];

$command = "python ../py/key.py $username";
$output = exec($command);

echo json_encode($output);
header('Content-Type: application/json');
?>
