<?php

class MyDB extends SQLite3 {
    function __construct() {
       $this->open($_SERVER["DOCUMENT_ROOT"]."/documents/docs.db");
    }
 }
 $docs = new MyDB();
 if(!$docs) {
    //echo $docs->lastErrorMsg();
    echo "<2>An internal error occurred</h2>";
 } else {
    //echo "Opened database successfully\n";
 }

 function compare_document_entries($a, $b)
 {
     //return strcmp($a["number"], $b["number"]);
     if($a["number"] == $b["number"]) { return 0; }
     if($a["number"] < $b["number"]) { return -1; }
     if($a["number"] > $b["number"]) { return 1; }
 }  

function docs_get_data() {  

    $sql = <<<EOF
    SELECT * from elements;
EOF;

    global $docs;
    $ret = $docs->query($sql);
    $data = [];
    while($row = $ret->fetchArray(SQLITE3_ASSOC)) {
        $data[] = $row;
    }
    usort($data, "compare_document_entries");
    return $data;
}

function document_html_element($data, $editMode) {
    if(!$editMode && !file_exists($_SERVER["DOCUMENT_ROOT"].'/documents/docs/'.$data["url"])) { return ""; }
    $editMode = ($editMode)?"data-":""; 
    $dlname = docs_file_naming($data["name"]);
    return '<div class="d-doc" data-id="'.$data["id"].'" data-url="'.$data["url"].'">
    <a '.$editMode.'href="/documents/docs-named/'.docs_file_naming($data["text"]).'.pdf" target="_blank"><span class="d-title">'.$data["text"].'</span></a>
    <a '.$editMode.'href="/documents/docs/'.$data["url"].'" download="'.$dlname.'.pdf"><i class="fa fa-download" aria-hidden="true"></i></a>
  </div>';
} 

function docs_file_naming($name) {
    return strtolower(preg_replace('/[^A-Za-z0-9\-]/', '',str_replace(" ", "-", trim($name))));
}

function docs_get_html_data($editMode = false) {

    $data = docs_get_data();

    $out = [];
    foreach($data as $elem) {
        switch($elem["type"]) {
            case "doc":
                $out[] = document_html_element($elem, $editMode);
                break;
            case "hr":
                $out[] = '<hr data-id="'.$elem["id"].'">';
                break;
            case "p":
                $out[] = '<p data-id="'.$elem["id"].'">'.$elem["text"].'</p>';
                break;
            case "h":
                $out[] = '<h6 data-id="'.$elem["id"].'">'.$elem["text"].'</h6>';
                break;
        }
    }

    if($editMode) {
        foreach(array_keys($out) as $key) {
            $out[$key] = '<li>'.$out[$key].'</li>';
        }
    }

    return $out;
}

function docs_get_html($editMode = false) {
    $data = docs_get_html_data($editMode);
    return join("\n", $data);
}

function docs_shift_numbers($start, $end, $direction = 1) {
    $elems = docs_get_data();

    foreach($elems as $elem) {
        if($elem["number"] >= $start && $elem["number"] <= $end) {
            $sql = 'UPDATE elements set number = '.($elem["number"]+$direction).' where id = '.$elem["id"].';';
            global $docs;
            $docs->exec($sql);
        }
    }
}

?>