<?php
$database = $_POST["database"];

$command = "python ../python/vault.py $database";
$output = exec($command);

echo json_encode($output);
header('Content-Type: application/json');
?>
