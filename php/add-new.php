<?php
$ddbb = $_POST["ddbb"];
$username = $_POST["username"];
$category = $_POST["category"];
$url = $_POST["url"];
$site = $_POST["site"];
$password = $_POST["password"];

$fileName = "inputsss.txt";
$contentFile = "$ddbb $username $category $url $site $password";
file_put_contents($fileName, $contentFile);

echo json_encode(array("password" => $output));
?>