<?php

$file_path = "../temp/sesion.tmp";

if (file_exists($file_path)) {
  $file_content = file_get_contents($file_path);
  preg_match("/username\s*=\s*(.*)/", $file_content, $matches);
  $username = isset($matches[1]) ? trim($matches[1]) : null;
  echo json_encode(array("login" => true, "username" => $username));
} else {
  echo json_encode(array("login" => false));
}

header('Content-Type: application/json');
