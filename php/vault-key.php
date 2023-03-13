<?php
$database = $_POST["database"];

$command = "python ../python/vault.py $database";
$output = exec($command);
$keys = json_decode($output);

echo json_encode($keys)
header('Content-Type: text/plain');
?>
