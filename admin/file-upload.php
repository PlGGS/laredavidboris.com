<?php
session_start();
if($_SESSION["in"]) {
    if (isset($_FILES['files']) && !empty($_FILES['files']) && isset($_GET["id"]) && !empty($_GET["id"])) {

        $id = 0;
        while(true) {
            if(!file_exists('../photos/'.$_GET["id"]."-".$id.".jpg")) {
                break;
            }
            if($id > 100) {
                break;
            }
            $id += 1;
        }
        

        $no_files = count($_FILES["files"]['name']);
        for ($i = 0; $i < $no_files; $i++) {
            if ($_FILES["files"]["error"][$i] > 0) {
                //var_dump($_FILES["files"]["error"]);
                echo "Error: " . $_FILES["files"]["error"][$i] . "<br>";
            } else {
                if (file_exists('../photos/' . $_FILES["files"]["name"][$i])) {
                    echo 'File already exists : ../photos/' . $_FILES["files"]["name"][$i];
                } else {
                    // move_uploaded_file($_FILES["files"]["tmp_name"][$i], '../photos/' . $_FILES["files"]["name"][$i]);
                    // echo 'File successfully uploaded : ../photos/' . $_FILES["files"]["name"][$i] . ' ';
                    move_uploaded_file($_FILES["files"]["tmp_name"][$i], '../photos/' . $_GET["id"]."-".$id.".jpg");
                    echo 'File successfully uploaded : ../photos/' . $_GET["id"]."-".$id.".jpg" . ' ';
                }
            }
            $id += 1;
        }
    } else {
        echo 'Please choose at least one file';
    }
        
    /* 
     * End of script
     */
}
?>