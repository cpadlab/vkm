<?php
$database = $_POST["database"];
$user = $_POST["user"];
$password = $_POST["password"];
$site = $_POST["site"];

$command = "python ../python/delete-key.py $database $user $password $site";
$output = exec($command);

if (trim($output) == "True") {
    echo json_encode(array("success" => true));
} else {
    echo json_encode(array("success" => false));
}
header('Content-Type: text/plain');
?>
