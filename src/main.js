let symbols = [
  { symbol: "ball", value: 10 },
  { symbol: "cards", value: 10 },
  { symbol: "coin", value: 5 },
  { symbol: "control", value: 3 },
  { symbol: "dices", value: 3 },
  { symbol: "man", value: 3 },
  { symbol: "roulette", value: 3 },
  { symbol: "slotmachinecherry", value: 3 },
  { symbol: "slotmachineseven", value: 1 },
];

let totalValue = symbols.reduce((acc, symbol) => acc + symbol.value, 0);

function getRandomSymbol() {
  let randomNumber = Math.floor(Math.random() * totalValue);
  let sum = 0;
  for (let symbol of symbols) {
    sum += symbol.value;
    if (randomNumber < sum) {
      return symbol.symbol;
    }
  }
}

let spinButton = document.querySelector(".spin-button");
let symbol = document.querySelector("#symbol");

let sound1 = new Audio("./assets/sounds/random-wheel.wav");
let sound2 = new Audio("./assets/sounds/win.wav");

spinButton.addEventListener("click", function () {
  symbol.parentElement.classList.add("spin");

  let spinDuration = 4000;
  let spinStart = performance.now();
  let spinInterval = 50;

  let spinTimer = setInterval(function () {
    symbol.src = "./assets/img/" + getRandomSymbol() + ".png";
    sound1.play();

    if (performance.now() - spinStart >= spinDuration) {
      clearInterval(spinTimer);
      symbol.src = "./assets/img/" + getRandomSymbol() + ".png";
      symbol.parentElement.classList.remove("spin");
      sound2.play();
    }
  }, spinInterval);
});

// function createButton(section) {
//   $(section).append(`<button class="close-button" type="button"><img src="./assets/img/close-button.png" id="icon-close-button" /></button>`);
// }


const buttonPlay = $("#play-game");
const buttonSlideShow = $("#play-slide-show");

const slotMachineSection = $("#slot-machine");
const defaultSection = $("#default");
const slideShowSection = $("#slide-show");
const videoStandBySection = $("#video-standby");


function setSection() {
  buttonPlay.on("click", function () {
    // createButton(slotMachineSection);
    slotMachineSection.css("display", "show");
    defaultSection.css("display", "none");
    slideShowSection.css("display", "none");
    videoStandBySection.css("display", "none");
  });

  buttonSlideShow.on("click", function () {
    // createButton(slideShowSection);
    slotMachineSection.css("display", "none");
    defaultSection.css("display", "none");
    slideShowSection.css("display", "show");
    videoStandBySection.css("display", "none");
  });
}


// SLIDESHOW

const carouselInner = $('.carousel-inner');
const basePath = './assets/img/slide-show/';

for (let i = 1; i <= 30; i++) {
  const carouselItem = $('<div>').addClass('carousel-item');

  const image = $('<img>').attr('src', `${basePath}${i}.jpg`)
    .addClass('d-block');

  carouselItem.append(image);
  carouselInner.append(carouselItem);
}

$('.carousel-item').first().addClass('active');