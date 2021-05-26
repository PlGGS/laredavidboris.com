<?php
// This file is called whenever a url within this folder is called.
// It resizes images from the parent directory and serves them in a 3:2 format

require $_SERVER["DOCUMENT_ROOT"].'/vendor/autoload.php';

Flight::route('/', function(){
    echo 'This url will return regular /photos images resized to a 3:2 format';
});



function getImageThumb($url) {
    $imgSrc = "../".$url;
    list($width, $height) = getimagesize($imgSrc);

    $parts = explode('.', $imgSrc);
    $ext = $parts[count($parts) - 1];
    if ($ext == 'jpg' || $ext == 'jpeg') {
      $format = 'jpg';
    } else {
      $format = 'png';
    }
  
    if ($format == 'jpg') {
      $myImage = imagecreatefromjpeg($imgSrc);
    }
    if ($format == 'png') {
      $myImage = imagecreatefrompng($imgSrc);
    }

    //saving the image into memory (for manipulation with GD Library)
    //$myImage = imagecreatefromjpeg($imgSrc);
    
    // calculating the part of the image to use for thumbnail
    if ($width >= $height*3/2) {
      $y = 0;
      $x = ($width - $height*3/2) / 2;
      $smallestSide = $height;
      $thumbSize = $height;
    } else {
      $x = 0;
      $y = ($height*3/2 - $width) / 2;
      $smallestSide = $width/3*2;
      $thumbSize = $width/3*2;
    }
    
    // copying the part into thumbnail
    //$thumbSize = $smallestSide;

    // prevent images from being too big
    if($thumbSize > 500) {
        $thumbSize = 500;
    }
    $thumb = imagecreatetruecolor($thumbSize*3/2, $thumbSize);
    imagecopyresampled($thumb, $myImage, 0, 0, $x, $y, $thumbSize*3/2, $thumbSize, $smallestSide*3/2, $smallestSide);
    
    //final output
    //header('Content-type: image/jpeg');
    //imagejpeg($thumb);

    // save to file instead
    imagejpeg($thumb, $url);

    $hashes = json_decode(file_get_contents("hashes.json"), true);
    $hashes[$url] = md5_file("../".$url);
    file_put_contents("hashes.json", json_encode($hashes));
}

function getFailThumb() {
    header('Content-type: image/jpeg');
    imagejpeg(imagecreatefromjpeg("../not-found.jpg"));
}

function loadImg($url) {
    header('Content-type: image/jpeg');
    //echo explode(".", $url)[0].".jpg";
    imagejpeg(imagecreatefromjpeg(explode(".", $url)[0].".jpg"));
}

Flight::route('/@name', function($name) {
    if(file_exists("../".$name)) {
        // only re-cut images when their hashes / they changed to minimize loading time
        $hashes = json_decode(file_get_contents("hashes.json"), true);
        if(!array_key_exists($name, $hashes) || md5_file("../".$name) != $hashes[$name]) {
            getImageThumb($name);
        }
        loadImg($name);
    } else {
        getFailThumb();
    }
});

Flight::start();
?>