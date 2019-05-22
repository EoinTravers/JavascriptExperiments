<?php

$data = $_POST;
/* var_dump($data);*/
$data = array_filter($data, function($value) {
  return ($value !== null && $value !== '');
});
$log_data = array();
$log_keys = array("subject_nr", "age", "gender", "country");
foreach ($log_keys as $k){
  $log_data[$k] = $data[$k];
}
$keys = '`' . implode('`, `', array_keys($log_data)) . '`';
$values = "'" . implode("', '", array_values($log_data)) . "'";
$insert_query = "INSERT INTO demographics ($keys) VALUES ($values);";
// echo $insert_query;

$db = new SQLite3('./data.db');
$res = $db->exec($insert_query);
if(!$res){
  echo $db->lastErrorMsg();
} else {
  header( 'Location: ./instructions.html' ) ;
}

?>
