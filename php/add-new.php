<?php
$ddbb = $_POST["ddbb"];
$username = $_POST["username"];
$category = $_POST["category"];
$url = $_POST["url"];
$site = $_POST["site"];
$password = $_POST["password"];

$command = "python ../python/add-key.py $ddbb $username $category $url $site $password";
$output = exec($command);

if (trim($output) == "True") {
    echo json_encode(array("success" => true));
} else {
    echo json_encode(array("success" => false));
}
header('Content-Type: text/plain');
?>