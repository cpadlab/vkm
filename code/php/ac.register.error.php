<?php
$error = $_POST["error"];;

$command = "python ../py/ac.register.error.py $error";
$output = exec($command);
?>