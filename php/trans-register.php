<?php
$register_name = $_POST["name"]
$register_surname = $_POST["surname"]
$register_username = $_POST["username"]
$register_mail = $_POST["mail"]
$register_password = $_POST["password"]
$register_rep_password = $_POST["rep_password"]

$command = "python ../py/register.py $register_name $register_surname $register_username $register_mail $register_password $register_rep_password";
$output = exec($command);

if (trim($output) == "True") {
    echo json_encode(array("success" => true));
} else {
    echo json_encode(array("success" => false));
}
header('Content-Type: text/plain');
?>