<?php
$option = $_POST["option"];
$length = $_POST["length"];

$command = "python ../py/key-gen.py $option $length";
$output = exec($command);

echo json_encode(array("password" => $output));
?>
