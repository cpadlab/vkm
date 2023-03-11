<?php
$username = $_POST["username"];
$password = $_POST["password"];

$command = "python ../python/login.py $username $password";
$output = exec($command);

if (trim($output) == "True") {
    echo json_encode(array("success" => true));
} else {
    echo json_encode(array("success" => false));
}
header('Content-Type: text/plain');
?>
