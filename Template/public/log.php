<?php
$db = new SQLite3('./data.db');
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Just save the whole message as a string in the database.
$insert_query = "INSERT INTO responses ('data') VALUES ('$input');";
$res = $db->exec($insert_query);
?>
