<?php
session_start();
if($_SESSION["in"]) {
    include 'fx.php';
    $id = $_POST["id"];
    unset($_POST["id"]);
    foreach(array_keys($_POST) as $variable) {
        $value = SQLite3::escapeString($_POST[$variable]);
        $sql = "UPDATE elements set $variable = '$value' where id = $id";
        global $docs;
        $docs->exec($sql);
    }
}
?>