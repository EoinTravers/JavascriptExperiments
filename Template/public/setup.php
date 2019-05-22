<?php

$db = new SQLite3('./data.db');

$create_query1 = "
create table if not exists 'demographics' (
`i`          integer primary key autoincrement,
`t`          datetime DEFAULT CURRENT_TIMESTAMP,
`subject_nr` integer,
`age` integer,
`gender` varchar,
`country` varchar
);";
$res = $db->exec($create_query1);
if($res){
  echo 'Demographics database created, or already exists.<br>';
}


$create_query2 = "
 create           table if not exists 'responses' (
`i`              integer primary key autoincrement,
`t`              datetime DEFAULT CURRENT_TIMESTAMP,
`data`)";
$db = new SQLite3('./data.db');
$res = $db->exec($create_query2);
if($res){
  echo 'Response database created, or already exists.<br>';
}

$create_query3 = "
create table if not exists 'codes' (
`i`          integer primary key autoincrement,
`t`          datetime DEFAULT CURRENT_TIMESTAMP,
`subject_nr` integer,
`code`       varchar(999),
`score`   integer);";
$res3 = $db->exec($create_query3);
if($res3){
  echo 'Code database created, or already exists.<br>';
}

$create_query4 = "
create table if not exists 'feedback' (
`i`          integer primary key autoincrement,
`t`          datetime DEFAULT CURRENT_TIMESTAMP,
`subject_nr` integer,
`feedback`   varchar(9999));";
$res4 = $db->exec($create_query4);
if($res4){
  echo 'Feedback database created, or already exists.<br>';
}

?>
