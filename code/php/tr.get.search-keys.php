<?php
$username = $_POST["username"];
$search = $_POST["search"];

$command = "python ../py/get.search.keys.py $username $search";
$output = exec($command);

echo json_encode($output);
header('Content-Type: application/json');
?>
