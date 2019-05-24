<?php

/*
 * This script writes each variable to it's own column in the database.
 *    In order for this to work, you must replace $create_query2 in setup.php
 *    with the following code:
 *  */

/* $create_query2 = "
 * create table if not exists 'responses' (
 * `i` integer primary key autoincrement,
 * `t` datetime DEFAULT CURRENT_TIMESTAMP,
 * `W`,
 * `H`,
 * `subject_nr`,
 * `trial_nr`,
 * `block_nr`,
 * `trial_in_block`,
 * `t_start_task`,
 * `t_start_block`,
 * `direction`,
 * `congruence`,
 * `stim`,
 * `stim_loc0`,
 * `stim_loc1`,
 * `response`,
 * `accuracy`,
 * `t_start`,
 * `t_response`,
 * `rt`)";
 */


/*
 * If you add more variables that you wish to log to the `state`
 * object in your javascript code, you must also add a line to this
 * command to create a column for the appropriate variable.
 */

/* Finally, note that this script cannot handle complex javascript
 * variables (e.g. arrays, objects). Each entry must be a string, a
 * number, of a boolean.
 */


$db = new SQLite3('./souffle.db');
$data = json_decode(file_get_contents('php://input'), true);

$data = array_filter($data, function($value) {
  return ($value !== null && $value !== '');
});
$keys = '`' . implode('`, `', array_keys($data)) . '`';
$values = "'" . implode("', '", array_values($data)) . "'";

$insert_query = "INSERT INTO responses ($keys) VALUES ($values);";
echo $insert_query;
$res = $db->exec($insert_query);
if(!$res){
  echo $db->lastErrorMsg();
  printf("<br><br>\n\nErrormessage: %s\n", mysqli_error($conn));
}
?>
