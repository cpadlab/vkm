<?php
$login_username = $_POST["username"];
$login_password = $_POST["password"];

$command = "python ../py/login.py $login_username $login_password";
$output = exec($command);

$success = false;
$errors = array();

switch(trim($output)) {
    case "True":
        $success = true;
        break;
    case "False > Does not exist":
        $errors[] = "Username does not exist";
        break;
    case "False > Error status":
        $errors[] = "The account status is incorrect";
        break;
    case "False > Blocked account":
        $errors[] = "The account status is blocked";
        break;
    case "False > Wrong password":
        $errors[] = "Password is incorrect";
        break;
    default:
        $errors[] = "Unknown response from server";
}

$response = array("success" => $success);
if (!$success) {
    $response["errors"] = $errors;
}

header('Content-Type: text/plain');
echo json_encode($response);

?>