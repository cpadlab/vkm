<?php
$username = $_POST["username"];
$innwpswsite_name = $_POST["innwpswsite_name"];
$innwpswsite_url = $_POST["innwpswsite_url"];
$innwpswsite_username = $_POST["innwpswsite_username"];
$innwpswsite_password = $_POST["innwpswsite_password"];
$innwpswsite_rpassword = $_POST["innwpswsite_rpassword"];
$innwpswsite_cat = $_POST["innwpswsite_cat"];

$command = "python ../py/ac.register.key.py $username $innwpswsite_name $innwpswsite_url $innwpswsite_username $innwpswsite_password $innwpswsite_rpassword $innwpswsite_cat";
$output = exec($command);

if (trim($output) == "True") {
    echo json_encode(array("success" => true));
} else {
    echo json_encode(array("success" => false));
}
header('Content-Type: text/plain');
?>