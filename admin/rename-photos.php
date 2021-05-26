<?php
session_start();
if($_SESSION["in"]) {
    var_dump($_POST["changes"]);
    foreach($_POST["changes"] as $change) {
        if($change[1] == "") {
            unlink("../photos/".$change[0]);
        } else {
            rename("../photos/".$change[0], "../photos/".$change[1]);
        }
    }
}
?>