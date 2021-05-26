<?php
session_start(); 
if($_SESSION["in"]) {
    include 'fx.php';

    $sql = 'DELETE from elements where id = '.$_POST["id"].';';

    $ret = $docs->exec($sql);
    if(!$ret){
      echo $docs->lastErrorMsg();
    } else {
       echo "success";
    }
}
?>