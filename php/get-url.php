<?php
$database = $_POST["database"];
$user = $_POST["user"];
$password = $_POST["password"];
$site = $_POST["site"];

$command = "python ../python/get-url.py $database $user $password $site";
$output = exec($command);

$fileName = "vkm_temp2Sesion.ini";
$contentFile = $output;
file_put_contents($fileName, $contentFile);

echo json_encode(array("url" => $output));
header('Content-Type: application/json');
?>
