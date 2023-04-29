<?php
$username = $_POST["username"];

$command = "python ../py/get.vault.keys.py $username";
$output = exec($command);

echo json_encode($output);
header('Content-Type: application/json');
?>
