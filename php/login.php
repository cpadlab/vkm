<?php
$username = $_POST["username"];
$password = $_POST["password"];

$command = "python ../python/login.py $username $password";
$output = exec($command);

if (trim($output) == "True") {

    $fileName = "vkm_tempSesion.ini";
    $sesion = array(
        "user" => $username,
        "password" => $password
    );
    $contentFile = "[sesion]\n";
    foreach ($sesion as $key => $value) {
        $contentFile .= $key . "=" . $value . "\n";
    }
    file_put_contents($fileName, $contentFile);

    echo json_encode(array("success" => true));
} else {
    echo json_encode(array("success" => false));
}
header('Content-Type: text/plain');
?>
