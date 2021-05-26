<?php
session_start();
if($_SESSION["in"]) {
    include 'fx.php';
    foreach(array_keys($_POST) as $id) {
        $number = $_POST[$id];
        $sql = "UPDATE elements set number=$number where id=$id";
        global $docs;
        $docs->exec($sql);
    }
}
?>