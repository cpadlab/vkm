<?php
$option = $_POST["option"];
$length = $_POST["length"];

$command = "python ../python/generate-key.py $option $length";
$output = exec($command);

echo json_encode(array("password" => $output));
?>
