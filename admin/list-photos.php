<?php
session_start();
if($_SESSION["in"]) {
    $d = '../photos/';
    foreach(glob($d.'*.{jpg,JPG,jpeg,JPEG,png,PNG}',GLOB_BRACE) as $file){
        $imag[] =  basename($file);
    }   
    echo json_encode($imag);
}
?>