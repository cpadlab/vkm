<?php

$fileName = "vkm_tempSesion.ini";

if (file_exists($fileName)) {

    $sesion = parse_ini_file($fileName, true)['sesion'];
    $user = $sesion['user'];
    $password = $sesion['password'];

    $data = array(
        "success" => true,
        "user" => $user,
        "password" => $password
    );
      
    $json = json_encode($data);
    header('Content-Type: application/json');
    echo $json;
  
} else {
    echo json_encode(array("success" => false));
}

?>
