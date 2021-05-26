<?php
session_start();
if($_SESSION["in"]) {
    include 'fx.php';

    if(!isset($_POST["type"])) {
        echo "error";
        exit;
    }
    $elems = docs_get_data();
    //print_r($elems);

    if(!isset($_POST["afterId"]) || $_POST["afterId"] == "") {
        $number = end($elems)["number"] + 1;
    } else {
        $thatElem = array_filter($elems, function($e) { return $e["id"] == $_POST["afterId"]; });
        $thatElem = $thatElem[array_keys($thatElem)[0]];
        //var_dump($thatElem);
        //print_r($thatElem);
        $number = $thatElem["number"]+1;
        docs_shift_numbers($number, end($elems)["number"], 1);
    }

    $type = SQLite3::escapeString($_POST["type"]);
    $text = SQLite3::escapeString($_POST["text"]);
    $url = SQLite3::escapeString($_POST["url"]);
    $sql = <<<EOF
        INSERT INTO elements (number,type,text,url)
        VALUES ($number,'$type','$text','$url');
EOF;

    global $docs;
    $ret = $docs->exec($sql);
    echo $docs->query('SELECT MAX(id) as id FROM elements LIMIT 1;')->fetchArray()["id"];
}
?>