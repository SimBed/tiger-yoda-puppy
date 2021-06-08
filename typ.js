var imageDatabase = {
  'tiger': 'https://picsum.photos/id/1074/300',
  'yoda': 'https://picsum.photos/id/1025/300',
  'puppy': 'https://picsum.photos/id/237/300',
}
var score = 0;
var rounds = 0;
var success = 0;

document.onload = initialise();

function initialise() {
  document.getElementById('tiger').src = addQueryParam(imageDatabase['tiger'], "grayscale");
  document.getElementById('yoda').src = addQueryParam(imageDatabase['yoda'], "grayscale");
  document.getElementById('puppy').src = addQueryParam(imageDatabase['puppy'], "grayscale");
  gsap.timeline()
    .to("#choose img", {duration: 0.5, autoAlpha: 1, stagger: 0.2})
    .to(".header", {duration: 1, autoAlpha: 1});
  }

function rsp(yourChoice) {
  var humanChoice, botChoice;
  humanChoice = yourChoice.id;
  botChoice = imagePick();
  console.log(humanChoice + ' ' + botChoice);
  outcome = decideWinner(humanChoice, botChoice);
  score += get_score(outcome['humanResult']);
  rounds += 1;
  success = parseFloat(100 * score / rounds).toFixed(0)+"%";
  gsap.timeline()
    .to("#choose img", {duration: 0.5, autoAlpha: 0, stagger: 0.2})
    .set("#choose", {display: "none"}, "+=0.1")
    .set("#result", {visibility: "visible"})
    .set(".header", {visibility: "hidden"})
  display(humanChoice, botChoice, outcome)
  gsap.to("#message", {duration:1.5, text: outcome['message'], delay:0.1});
  gsap.to("#score", {duration:1.5, text: score + " from " + rounds + ", " + success + " success" , delay:0.1});
}

function display(humanChoice, botChoice, outcome) {
  document.getElementById('human').src = addQueryParam(imageDatabase[humanChoice], distort(outcome['humanResult']));
  document.getElementById('comp').src = addQueryParam(imageDatabase[botChoice], distort(compResult(outcome['humanResult'])));
  document.getElementById('result').style.display = "block";
  gsap.timeline()
    .to("#human", {duration: 0.5, autoAlpha: 1})
    .to("#comp", {duration: 0.5, autoAlpha: 1, delay: 0.5})
  //document.getElementById('message').innerHTML = outcome['message'];
}

function next_round() {
  gsap.timeline()
    .to("#result img", {duration: 0.5, autoAlpha: 0, stagger: 0.2})
    .set("#choose", {display: "block"})
    .to("#choose img", {duration: 0.5, autoAlpha: 1})
    .to(".header", {duration: 1, autoAlpha: 1});
  // document.getElementById('result').style.visibility = "hidden";
  document.getElementById('result').style.display = "none";
}

function reset() {
  score = 0;
  rounds = 0;
  success = 0;
  document.getElementById('score').innerHTML="";
  next_round();
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
