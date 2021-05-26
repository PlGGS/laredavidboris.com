<?php
// This file is called whenever a url within this folder is called.
// It just makes the documents available under a better name than they are stored under

require $_SERVER["DOCUMENT_ROOT"].'/vendor/autoload.php';
include '../fx.php';

Flight::route('/', function(){
    echo 'This url will return regular /photos images resized to a 3:2 format';
});

Flight::route('/@name', function($name) {
    $names = docs_get_data();
    //var_dump($names);
    $url = "";
    foreach($names as $doc) {
        if($doc["type"] == "doc") {
            if(docs_file_naming($doc["text"]) == str_replace(".pdf", "", strtolower($name))) {
                $url = $doc["url"];
                break;
            }
        }
    }
    //echo $url;
    $file = '../docs/'.$url;
    //var_dump(file_exists($file));
    ///*
    header('Content-type: application/pdf');
    header('Content-Disposition: inline; filename="' . $name . '"');
    header('Content-Transfer-Encoding: binary');
    header('Content-Length: ' . filesize($file));
    header('Accept-Ranges: bytes');
    @readfile($file);
    //*/
});

Flight::start();
?>