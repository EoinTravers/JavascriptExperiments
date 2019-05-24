
<?php

$codes = array("Yellow.Strudel.623", "Blue.Tart.274", "Red.Muffin.432", "Red.Pastry.285", "Red.Pudding.267", "Orange.Bread.757", "Blue.Tart.969", "Blue.Muffin.684", "Red.Cake.980", "Indigo.Pudding.522", "Green.Pastry.190", "Red.Puff.204", "Violet.Pastry.452", "Violet.Galette.885", "Red.Croissant.243", "Orange.Doughnut.973", "Blue.Baklava.468", "Red.Pudding.831", "Blue.Bakewell.100", "Orange.Baklava.907", "Violet.Strudel.494", "Violet.Strudel.632", "Blue.Bakewell.683", "Red.Galette.642", "Red.Doughnut.654", "Green.Strudel.878", "Orange.Bakewell.513", "Red.Puff.475", "Green.Strudel.437", "Blue.Pie.179", "Red.Galette.678", "Blue.Pastry.542", "Red.Puff.561", "Blue.Tart.729", "Green.Tart.770", "Yellow.Muffin.387", "Green.Doughnut.436", "Violet.Galette.791", "Violet.Doughnut.350", "Violet.Galette.121", "Green.Galette.203", "Violet.Baklava.230", "Indigo.Bakewell.437", "Yellow.Doughnut.475", "Orange.Pastry.206", "Green.Berliner.465", "Red.Pastel.271", "Yellow.Berliner.442", "Red.Muffin.384");

$data = $_POST;
$subject_nr = $data['subject_nr'];
$feedback = $data['feedback'];
/* var_dump($data);*/
/* echo 'Subject nr:' . $subject_nr;*/

$db = new SQLite3('./data.db');
$q = "insert into feedback (`subject_nr`, `feedback`) values ('$subject_nr', '$feedback');";
$db->exec($q);

$q = "select score from responses where subject_nr='$subject_nr' order by i desc limit 1;";;
$score = $db->query($q)->fetchArray();
$score = $score["score"];

// Has this subject already got a code?
$q = "select code from codes where subject_nr = '$subject_nr';";
$already_used = $db->query($q)->fetchArray();
if($already_used){
  /* echo 'Code already issued<br>'; */
  $code = $already_used["code"];
  /* echo $code; */
} else {
  /* echo 'Getting new code<br>'; */
  $q = 'select COUNT(*) as n from codes;';
  $n = $db->query($q)->fetchArray();
  $n = $n["n"];
  $code = $codes[$n];
  $q2 = "
INSERT INTO codes (`subject_nr`, `code`, `score`)
VALUES ('$subject_nr', '$code', '$score');";
  /* echo $q2; */
  $res = $db->exec($q2);
}

?>

<!DOCTYPE html>
<html>
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <link href="static/libs.css" rel="stylesheet"/>
    <link href="static/main.css" rel="stylesheet"/>
    <script src="static/libs.js"></script>
    <style>
      body {
        text-align: left;
        display: inline;
        font-size: 16pt;
      }
      p {
        text-align: left;
      }
      .instructions{
        /* width: 50vw; */
        margin-left: auto;
        margin-right: auto;
        max-width: 60vw;
        min-width: 200pt;
      }
      .btn {
        font-size: 2em;
      }
      #bullets{
        text-align: left;
        width: 60vw;
        margin-left: auto;
        margin-right: auto;
      }
      th {
        width: 75%;
      }
      td > input[type="radio"] {
        margin-right: .5em;
      }
      #end-p{
        margin-top: 1em;
        margin-bottom: 5em;
        text-align: center;
      }
      code {
        color: red;
        font-size: 1.5em;
      }

    </style>
  </head>
  <body>

    <div class="instructions">
      <h1>Baking Challenge</h1>
      <h2>End of Experiment</h2>
      <p>Thank you!</p>
      <p>
        Your task code is<br>
        <code id="code"> <?php echo $code ?></code>
      </p>
      <p>
        To claim your payment, please carefully copy and paste this
        code into the appropriate form on Mechanical Turk.
      </p>

      <h2>Study Information</h2>
      <p>
        In this study, we're interested in how people make decisions
        about when to act, and when to be patient.

        In the game, you used five different ovens.
        The average time each oven took to cook a soufflé ranged from 3 to 15 seconds.
      </p>
      <p>
        The image below shows how likely the soufflé was to be ready, over time, for each oven.
        Unfortunately, we set the colour of the ovens at random,
        so the colours in this image won't match the colours of the ovens you actually used.
      </p>
      <img style="width:50%" alt="" src="static/design.png"/>
      <p>
        We're trying to found out how well people learn about these times,
        and how they might be biased in doing so.
      </p>
      <p>
        If you have any questions about the study, please contact Dr
        Eoin Travers (e.travers@ucl.ac.uk) at University College London.
        Thank you again for your time.
      </p>
    </div>
  </body>
</html>
