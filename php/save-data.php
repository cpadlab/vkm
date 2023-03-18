<?php
$ddbb = $_POST["ddbb"];
$username = $_POST["username"];
$new_username = $_POST["user"];
$category = $_POST["cat"];
$url = $_POST["url"];
$site = $_POST["site"];
$new_site = $_POST["nwsite"];
$password = $_POST["password"];

$command = "python ../python/save-key.py $ddbb $username $category $url $site $password $new_username $new_site";
$output = exec($command);

if (trim($output) == "True") {
    echo json_encode(array("success" => true));
} else {
    echo json_encode(array("success" => false));
}
header('Content-Type: text/plain');
?>