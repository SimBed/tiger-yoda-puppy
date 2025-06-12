var imageDatabase = {
  'tiger': 'https://picsum.photos/id/1074/300',
  'yoda': 'https://picsum.photos/id/1025/300',
  'puppy': 'https://picsum.photos/id/237/300',
}
var score;
var rounds;
var success;

document.onload = initialise();

function initialise() {
  document.getElementById('tiger').src = addQueryParam(imageDatabase['tiger'], "grayscale");
  document.getElementById('yoda').src = addQueryParam(imageDatabase['yoda'], "grayscale");
  document.getElementById('puppy').src = addQueryParam(imageDatabase['puppy'], "grayscale");
  clear_data();

  gsap.timeline()
    .set("body", {pointerEvents: 'none'})
    .to("#header", {duration: 3, autoAlpha: 1, ease: "bounce"})
    .to(".choice", {duration: 1, autoAlpha: 1, stagger: 0.4}, "-=2.5")
    .set("body", {pointerEvents: 'all'});
  }

function rsp(yourChoice) {
  var humanChoice, botChoice;
  humanChoice = yourChoice.id;
  botChoice = imagePick();
  outcome = decideWinner(humanChoice, botChoice);
  score += get_score(outcome['humanResult']);
  rounds += 1;
  success = parseFloat(100 * score / rounds).toFixed(0)+"%";
  display(humanChoice, botChoice, outcome);
  gsap.timeline()
    .to(".choice", {duration: 0.5, autoAlpha: 0, stagger: 0.2})
    .set(".choice", {display: "none"})
    .set(".outcome", {display: "block"})
    .set("#result", {display: "block", visibility: "visible"})
    .set("#header", {autoAlpha: 0})
    .to(".outcome", {duration: 2, autoAlpha: 1, stagger: 1, delay: 0.8})
    .to("#message", {duration:1.5, autoAlpha: 1, text: outcome['message']}, "-=1.5")
    .to("#buttons", {duration:1.0, autoAlpha: 1})
    .add("test")
    .to("#scores", {duration:1.0, autoAlpha: 1}, "-=1")
    .set("#score1", {text: score + " from " + rounds })
    .set("#score2", {text: success + " success" });
    // document.getElementById('score1').innerHTML= score + " from " + rounds
    // document.getElementById('score2').innerHTML= success + " success"
}

function display(humanChoice, botChoice, outcome) {
  document.getElementById('human').src = addQueryParam(imageDatabase[humanChoice], distort(outcome['humanResult']));
  document.getElementById('comp').src = addQueryParam(imageDatabase[botChoice], distort(compResult(outcome['humanResult'])));
}

function clear_data() {
  score = 0;
  rounds = 0;
  success = 0;
  document.getElementById('score1').innerHTML="";
  document.getElementById('score2').innerHTML="";
}

function reset() {
  clear_data();
  next_round();
}

function next_round() {
  gsap.timeline()
    .to("#buttons", {duration:1.0, autoAlpha: 0})
    .to("#message", {duration:1.0, autoAlpha: 0}, "-=1.0")
    .set("#result", {visibility: "hidden"})
    .set("#result", {display: "block"})
    .to(".outcome", {duration: 2, autoAlpha: 0, stagger: 1}, "-=1.5")
    .set(".outcome", {display: "none"})
    .set(".choice", {display: "block"})
    .to(".choice", {duration: 0.5, autoAlpha: 1, stagger: 0.2})
    .to("#header", {duration: 2, autoAlpha: 1}, "-=1.0")
}

function addQueryParam(a, b) {
  return a + "/?" + b
}

function distort(r) {
  var distortor = { 'win': '', 'lose': 'grayscale&blur=2', 'draw': 'grayscale' }
  return distortor[r]
}

function compResult(r) {
  var toggle = { 'win': 'lose', 'lose': 'win', 'draw': 'draw' }
  return toggle[r]
}

function get_score(r) {
  var result_to_score = { 'win': 1, 'lose': 0, 'draw': 0.5 }
  return result_to_score[r]
}

function imagePick() {
  const choices = ['tiger', 'yoda', 'puppy'];
  return choices[Math.floor(Math.random() * 3)];
}

function decideWinner(human, bot) {
  switch(human + ' ' + bot) {
  case 'tiger tiger':
    return {'message': '2 tigers roar at eachother. Draw!', 'humanResult': 'draw'};
    break;
  case 'tiger puppy':
    return {'message': 'Tiger devours puppy. You win!', 'humanResult': 'win'};
    break;
  case 'tiger yoda':
    return {'message': 'Tiger roar fear does not give. You are humiliated!', 'humanResult': 'lose'};
    break;
  case 'puppy tiger':
    return {'message': 'Puppy devoured by tiger. You lose!', 'humanResult': 'lose'};
    break;
  case 'puppy puppy':
    return {'message': 'Puppies cannot outcute eachother. Draw!', 'humanResult': 'draw'};
    break;
  case 'puppy yoda':
    return {'message': 'Puppy cuteness overhwelm Yoda is there. Win!', 'humanResult': 'win'};
    break;
  case 'yoda tiger':
    return {'message': 'Fear is not there. Yoda scratches tiger belly. Win!', 'humanResult': 'win'};
    break;
  case 'yoda puppy':
    return {'message': 'Yoda crushed by puppy cuteness. Lose!', 'humanResult': 'lose'};
    break;
  case 'yoda yoda':
    return {'message': 'Great harmony comes. Draw happens!', 'humanResult': 'draw'};
    break;
  default:
    return {'message': 'Error', 'humanResult': 'draw'};
  }
}