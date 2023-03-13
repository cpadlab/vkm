<?php
$database = $_POST["database"];
$search = $_POST["search"];

$command = "python ../python/search.py $database $search";
$output = exec($command);

echo json_encode($output);
header('Content-Type: application/json');
?>
