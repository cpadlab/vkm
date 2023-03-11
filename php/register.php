<?php
$username = $_POST["username"];
$password = $_POST["password"];
$email = $_POST["email"];

$command = "python ../python/register.py $username $password $email";
$output = exec($command);

if (trim($output) == "True") {
    echo json_encode(array("success" => true));
} else {
    echo json_encode(array("success" => false));
}
header('Content-Type: text/plain');
?>
