//  //  //  //  //  //  ///
// Start of utilities.js //
//  //  //  //  //  //  ///
"use strict";

function get_subject_nr(){
  var subject_nr = localStorage['subject_nr'];
  subject_nr = (typeof subject_nr === 'undefined') ?
    Math.round(Math.random()*1000000000) : subject_nr;
  return subject_nr;
}


function resize(){
  // Call
  // $( window ).resize(_.debounce(resize, 100));
  // in your script to keep track of the size of the window.
  // NB: `state` variable must already exist.
  state.W =  $( window ).width();
  state.H =  $( window ).height();
};

function generate_random_list(length){
  return _.shuffle(_.range(length));
};

function flip(prob){
  prob = prob || .5;
  var r = Math.random();
  return (r < prob);
}
function fiftyfifty() {return coin_toss(.5);};

// Standard Normal variate using Box-Muller transform.
function random_normal(mu, sigma) {
  // Defaults to N(0, 1)
  mu = mu || 0;
  sigma  = sigma || 1;
  var u = 1 - Math.random(); // Subtraction to flip [0, 1) to (0, 1].
  var v = 1 - Math.random();
  return mu + sigma*Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

function random_geometric(p) {
  // Note mean value is (1/p) - 1, not 1/p.
  var f = function(i, p){
    res = coin_toss(p) ? i : f(i+1, p);
    return(res);
  };
  return(f(0, p));
}

function random_exponential(rate) {
  // https://gist.github.com/nicolashery/5885280
  // http://en.wikipedia.org/wiki/Exponential_distribution#Generating_exponential_variates
  var u = Math.random();
  return -Math.log(u)/rate;
}

function fillArray(value, len) {
  if (len == 0) return [];
  var a = [value];
  while (a.length * 2 <= len) a = a.concat(a);
  if (a.length < len) a = a.concat(a.slice(0, len - a.length));
  return a;
}
function enumerate(lst, f){
  var z = _.zip(_.range(0, lst.length), lst);
  return _.map(z, function(x){
    return f(x[0], x[1]);
  });
};

function Pass(){
  console.log('Pass');
  // Does nothing
}

if (!String.prototype.format) {
  // https://stackoverflow.com/a/4673436/1717077
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

function ajax_test(url, data){
  $.ajax({
    type: 'POST',
    url: url,
    data: data,
    success: function(res) { console.log(res); }
  });
}

function repeat_array(array, n){
  return _.flatten(_.times(n, _.constant(array)));
}



function count_values(x){
  var vals = _.uniq(x).sort();
  var counts = vals.map(v => _.sum(x.map(_x => _x==v)));
  return(_.zipObject(vals, counts)); 
}

function seconds_to_string(secs){
  // For showing clocks
  // e.g. second_to_string(75) => "01:15"
  var m = Math.floor(secs/60);
  var s = secs % 60;
  return String(m) + ':' + String(s).padStart(2, '0');
}

function pseudo_random_repeat(x, times_per_block, n_blocks){
  // Creates `n_blocks` sequences, each containing x repeated `times_per_block`, then shuffled.
  // All output is flattened to a single list.
  var do_block = i => _.chain(times_per_block).times( j => x).flatten().shuffle().value();
  var res =      _.chain(n_blocks).times(do_block).flatten().value();
  return res;
}


function check_is_mobile(){
  // Shoddy hack
  return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4));
}

function permute(permutation) {
  var length = permutation.length,
      result = [permutation.slice()],
      c = new Array(length).fill(0),
      i = 1, k, p;
  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      result.push(permutation.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
}
