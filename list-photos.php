<?php
$d = 'photos/';
foreach(glob($d.'*.{jpg,JPG,jpeg,JPEG,png,PNG}',GLOB_BRACE) as $file){
    if(!isset($_GET["id"]) || $_GET["id"] == explode("-", basename($file))[0]) {
        $imag[] =  basename($file);
    }
}   
if(!isset($imag)) {
    $imag = ["not-found.jpg"];
}
echo json_encode($imag);
?>