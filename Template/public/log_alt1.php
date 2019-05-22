<?php

/* This logging script dumps data straight to file,
   creating a new file for each participant. */

$input = file_get_contents('php://input');
$data = json_decode($input, true);
// The directory "data" must be writable by the server
if (!file_exists('data/')) {
  mkdir('data/', 0777, true);
}

$name = "data/".$data['subject_nr'].".csv";
// var_dump($data); // For debugging
file_put_contents($name, $input . PHP_EOL , FILE_APPEND | LOCK_EX);

?>
