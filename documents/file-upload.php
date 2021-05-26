<?php
session_start();
if($_SESSION["in"]) {
    if (isset($_FILES['files']) && !empty($_FILES['files'])) {

        $id = 0;
        while(true) {
            if(!file_exists("docs/".$id.".pdf")) {
                break;
            }
            if($id > 1000) {
                break;
            }
            $id += 1;
        }
        

        $no_files = count($_FILES["files"]['name']);
        for ($i = 0; $i < $no_files; $i++) {
            if ($_FILES["files"]["error"][$i] > 0) {
                //var_dump($_FILES["files"]["error"]);
                echo "error: " . $_FILES["files"]["error"][$i] . "<br>";
            } else {
                // move_uploaded_file($_FILES["files"]["tmp_name"][$i], '../photos/' . $_FILES["files"]["name"][$i]);
                // echo 'File successfully uploaded : ../photos/' . $_FILES["files"]["name"][$i] . ' ';
                move_uploaded_file($_FILES["files"]["tmp_name"][$i], 'docs/' .$id.".pdf");
                echo $id.".pdf";
            }
            $id += 1;
        }
    } else {
        echo 'error: Please choose at least one file';
    }
        
    /* 
     * End of script
     */
}
?>