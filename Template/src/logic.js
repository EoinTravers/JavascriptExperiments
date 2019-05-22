//  //  //  //  //  // /
// Start of  logic.js //
//  //  //  //  //  // /
"use strict";

// Handle buttons
function OnKey(func, key){
  // Wait for a key (SPACEBAR by default), then execute the function provided.
  key = key || 32;
  globals.action = function(e){
    let k = (typeof e.which == "number") ? e.which : e.keyCode;
    console.log(k);
    if(k == 32){
      func();
    }
  };
}

function build_stimulus(direction, congruence){
  let right_way = (direction==-1) ? '←' : '→';
  let wrong_way = (direction==-1) ? '→' : '←';
  let flank =
      (congruence== 0) ? '↔' :
      (congruence==+1) ? right_way :
      (congruence==-1) ? wrong_way : null;
  return _.repeat(flank, 2) + right_way + _.repeat(flank, 2);
}

function set_stimulus_speed(secs){
  $('#stimulus').css('transition', 'linear ' + secs + 's');
}
function move_stimulus(loc){
  let x = 50 + globals['x_offset'] * loc;
  $('#stimulus').css('left',  x + 'vw');

}

function Ready(){
  // If you need to do any logic before begining, put it here.
  console.log('F: Ready');
  $('#stimulus, #fix, #feedback').hide();
  $('body').show();
  state.t_start_task = Date.now();
  PrepareBlock();
};


function RefreshInfo(){
  $('#block_nr').html(state.block_nr + 1);
  $('#trial_nr').html(state.trial_in_block + 1);
}

function PrepareBlock(){
  console.log('F: PrepareBlock');
  state.trial_in_block = 0;
  let txt = globals.start_prompt;
  $('#stimulus, #fix, #feedback').hide();
  $('#prompt').html(txt).show();
  RefreshInfo();
  OnKey(StartBlock);
}

function StartBlock(){
  console.log('F: StartBlock');
  state.t_start_block = Date.now();
  $('#prompt').hide();
  PrepareTrial();
}

function PrepareTrial(){
  console.log('F: PrepareTrial');
  state.direction  = _.sample([-1, 1]);
  state.congruence = _.sample([-1, 0, 1]);
  state.stim = build_stimulus(state.direction, state.congruence);
  state.stim_loc0  = _.sample([-1, 0, 1]);
  state.stim_loc1  = _.sample([-1, 0, 1]);
  set_stimulus_speed(0);
  move_stimulus(state.stim_loc0);
  $('#stimulus').html(state.stim);
  $('#feedback').hide();
  $('#fix').show();
  RefreshInfo();
  setTimeout(StartTrial, globals.ITI);
}

function StartTrial(){
  console.log('F: StartTrial ' + state.trial_nr);
  state.t_start = Date.now();
  state.response = null;
  state.t_response = null;
  globals.action = HandleResponse;
  StartTimer();
  $('#fix').hide();
  $('#stimulus').show();
  // Animate the stimulus
  set_stimulus_speed(globals['anim_time']);
  move_stimulus(state.stim_loc1);
};

function StartTimer(){
  globals.timer = setTimeout(Timeout, globals.max_rt);
}

function ResetTimer(){
  clearTimeout(globals.timer);
}

function Timeout(){
  console.log('Timeout');
  ResetTimer();
  $('#stimulus').hide();
  let resp = 999;
  state.t_response = null;
  state.response = 999;
  globals.action = Pass;
  state.accuracy = 0;
  state.rt = null;
  $('#feedback').html('Too slow!').css('color', 'red');
  globals.fb_time = globals.fb_time_incorrect;
  $('#stimulus').hide();
  $('#feedback').show();
  LogData();
}

function HandleResponse(e){
  let now = Date.now(); // Check time ASAP
  ResetTimer();
  $('#stimulus').hide();
  let k = (typeof e.which == "number") ? e.which : e.keyCode;
  console.log(k);
  let resp =
      (k == 70) ? -1 :
      (k == 74) ? +1 : 999;
  if(resp != 999){
    state.t_response = now;
    state.response = resp;
    globals.action = Pass;
    state.accuracy = resp == state.direction;
    state.rt = now - state.t_start;
    DoFeedback();
  }
}

function DoFeedback(){
  console.log('FB');
  if(state.accuracy){
    $('#feedback').html('✔').css('color', 'green');
    globals.fb_time = globals.fb_time_correct;
    state.score = state.score + 1;
  } else {
    $('#feedback').html('✖').css('color', 'red');
    globals.fb_time = globals.fb_time_incorrect;
  }
  $('#stimulus').hide();
  $('#feedback').show();
  LogData();
}

function LogData(proceed){
  console.log('Log data');
  console.log(state);
  $.ajax({
    type: 'POST',
    data: JSON.stringify(state),
    contentType: 'application/json',
    url: globals.datapath,
    success: function(data) {
      console.log(JSON.stringify(data));
    }
  });
  setTimeout(EndTrial, globals.fb_time);
}

function EndTrial(){
  state.trial_nr += 1;
  state.trial_in_block += 1;
  if (state.trial_in_block < globals.trials_per_block) {
    PrepareTrial();
  } else {
    // End block
    state.block_nr += 1;
    if(state.block_nr < globals.n_blocks){
      PrepareBlock();
    } else {
      EndExperiment();
    }
  }
};

function EndExperiment(){
  localStorage['score'] = state.score;
  setTimeout(function(){
    window.location = './feedback.html';
  }, 500);
};
