<?php
  $target_dir = "../temp/";
  $target_file = $target_dir . basename($_FILES["file"]["name"]);
  $uploadOk = 1;
  $fileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
  
  if($fileType != "csv") {
    header("Location: ../upload.html");
    exit;
  }

  if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
    header("Location: ../confirmation.html");
    exit;
  } else {
    header("Location: upload.html");
    exit;
  }
?>
