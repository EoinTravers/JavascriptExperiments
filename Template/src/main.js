//  //  //  //  //  ///
// Start of  main.js //
//  //  //  //  //  ///
"use strict";

const globals = {
  // Values that we'll need to access through the experiment, but
  // don't wish to log.
  lose             : 10,
  start_score      : 0,
  n_blocks         : 4,
  trials_per_block : 5,
  action           : Pass,
  fb_time_correct  : 1000,
  fb_time_incorrect : 2000,
  ITI              : 1000,
  max_rt           : 3000,
  start_prompt     : "Press SPACE to begin.",
  fix_txt          : '+',
  datapath         : './log.php',
  x_offset         : 25,        // How far to offset the stimulus left or right (in %)
  anim_time        : 1,         // Time in seconds to do animation for
  prizes : {
    'incorrect' : 0,
    'correct'   : 1,
    'timeout'   : 0
  }
};

const state = {
  W             : null,
  H             : null,
  subject_nr    : get_subject_nr(),
  trial_nr      : 0,
  block_nr      : 0,
  trial_in_block: 0,
  t_start_task  : null,
  t_start_block : null,
  direction     : null, // -1, +1
  congruence    : null, // -1, 0, +1 => Conflict, Neutral, Agrees
  stim          : null, // e.g. "<<><<"
  stim_loc0     : null, // -1, 0, +1 => Left, center, right
  stim_loc1     : null,
  response      : null,
  accuracy      : null,
  t_start       : null,
  t_response    : null,
  rt            : null,
  score         : globals.start_score
};

$( document ).ready(function(){
  resize();
  $( window ).resize(_.debounce(resize, 100));
  document.onkeydown = function(e){ globals.action(e);};
  // $(window).on('click', ClickFunction); // Not needed.
  resize();
  Ready(); // Always call the first function in logic.js `Ready`.
});
