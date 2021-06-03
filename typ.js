var ImageDatabase = {
  'tiger': 'https://picsum.photos/id/1074/300',
  'yoda': 'https://picsum.photos/id/1025/300',
  'puppy': 'https://picsum.photos/id/237/300',
}

document.onload = initialise();

function initialise() {
  document.getElementById('tiger').src = addQueryParam(ImageDatabase['tiger'], "grayscale");
  document.getElementById('yoda').src = addQueryParam(ImageDatabase['yoda'], "grayscale");
  document.getElementById('puppy').src = addQueryParam(ImageDatabase['puppy'], "grayscale");
  // document.getElementById('human').src = addQueryParam(ImageDatabase['yoda'], "grayscale");
  // document.getElementById('comp').src = addQueryParam(ImageDatabase['yoda'], "grayscale");
  // document.getElementById('test').src = addQueryParam(ImageDatabase['yoda'], "grayscale");
  gsap.timeline()
    .to("#choose img", {duration: 0.5, autoAlpha: 1, stagger: 0.2})
    .to(".header", {duration: 1, autoAlpha: 1});
  }

function play_again() {
  gsap.timeline()
    .to("#result img", {duration: 0.5, autoAlpha: 0, stagger: 0.2})
  // document.getElementById('result').style.visibility = "hidden";
    // document.getElementById('choose').style.display = "block";
    .set("#choose", {display: "block"})
  .to("#choose img", {duration: 0.5, autoAlpha: 1})
    .to(".header", {duration: 1, autoAlpha: 1});
        document.getElementById('result').style.visibility = "hidden";
  // document.getElementById('choose').style.display = "block";
  // document.getElementsByClassName('header')[0].style.visibility = "visible";
}

function rsp(yourChoice) {
  var humanChoice, botChoice;
  humanChoice = yourChoice.id;
  botChoice = imagePick();
  console.log(humanChoice + ' ' + botChoice);
  outcome = decideWinner(humanChoice, botChoice);
  gsap.timeline()
    .to("#choose img", {duration: 0.5, autoAlpha: 0, stagger: 0.2})
    .set("#choose", {display: "none"}, "+=0.1")
    .set("#result", {visibility: "visible"})
    .set(".header", {visibility: "hidden"})

  // document.getElementById('choose').style.display = "none";
  // document.getElementById('result').style.visibility = "visible";
  // document.getElementsByClassName('header')[0].style.visibility = "hidden";

  display(humanChoice, botChoice, outcome)
  gsap.to("#message", {duration:1.5, text: outcome['message'], delay:0.1});
}

function addQueryParam(a, b) {
  return a + "/?" + b
}

function display(humanChoice, botChoice, outcome) {
  document.getElementById('human').src = addQueryParam(ImageDatabase[humanChoice], distort(outcome['humanResult']));
  document.getElementById('comp').src = addQueryParam(ImageDatabase[botChoice], distort(compResult(outcome['humanResult'])));
  gsap.timeline()
    .to("#human", {duration: 0.5, autoAlpha: 1})
    .to("#comp", {duration: 0.5, autoAlpha: 1, delay: 0.5})
  //document.getElementById('message').innerHTML = outcome['message'];
}

function distort(r) {
  var distortor = { 'win': '', 'lose': 'grayscale&blur=2', 'draw': 'grayscale' }
  return distortor[r]
}

function compResult(r) {
  var toggle = { 'win': 'lose', 'lose': 'win', 'draw': 'draw' }
  return toggle[r]
}

function imagePick() {
  const choices = ['tiger', 'yoda', 'puppy'];
  return choices[Math.floor(Math.random() * 3)];
}

function decideWinner(human, bot) {
  switch(human + ' ' + bot) {
  case 'tiger tiger':
    return {'message': '2 tigers roar at eachother. Fair draw!', 'humanResult': 'draw'};
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
    return {'message': 'Puppies cannot outcute eachother. Fair draw!', 'humanResult': 'draw'};
    break;
  case 'puppy yoda':
    return {'message': 'Puppy cuteness overhwelm Yoda is there. You win!', 'humanResult': 'win'};
    break;
  case 'yoda tiger':
    return {'message': 'Fear is not there. Yoda scratches tiger belly. You win!', 'humanResult': 'win'};
    break;
  case 'yoda puppy':
    return {'message': 'Yoda crushed by puppy cuteness. You lose!', 'humanResult': 'lose'};
    break;
  case 'yoda yoda':
    return {'message': 'Great harmony comes. Draw happens!', 'humanResult': 'draw'};
    break;
  default:
    return {'message': 'Error', 'humanResult': 'draw'};
  }
}
