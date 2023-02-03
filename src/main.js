let symbols = [
  { symbol: "ball", value: 60 },
  { symbol: "cards", value: 60 },
  { symbol: "coin", value: 40 },
  { symbol: "control", value: 30 },
  { symbol: "dices", value: 20 },
  { symbol: "man", value: 10 },
  { symbol: "roulette", value: 5 },
  { symbol: "slotmachinecherry", value: 3 },
  { symbol: "slotmachineseven", value: 1 },
];

let totalValue = symbols.reduce((acc, symbol) => acc + symbol.value, 0);

// SIMULAÇÃO DE PROBABILIDADES

// let symbolCount = {};
// for (let symbol of symbols) {
//   symbolCount[symbol.symbol] = 0;
// }

// let numberOfSimulations = 500;

// for (let i = 0; i < numberOfSimulations; i++) {
//   let randomNumber = Math.floor(Math.random() * totalValue);
//   let sum = 0;
//   for (let symbol of symbols) {
//     sum += symbol.value;
//     if (randomNumber < sum) {
//       symbolCount[symbol.symbol]++;
//       break;
//     }
//   }
// }

// for (let symbol of symbols) {
//   let probability = symbolCount[symbol.symbol] / numberOfSimulations;
//   console.log(`A probabilidade de ganhar o símbolo ${symbol.symbol} é de ${probability}.`);
// }

// FIM DA SIMULAÇÃO DE PROBABILIDADES

let lastSymbol;

function getRandomSymbolForSpinning() {
  let randomNumber = Math.floor(Math.random() * totalValue);
  return symbols[randomNumber % symbols.length].symbol;
}

function getRandomSymbol() {
  let randomNumber = Math.floor(Math.random() * totalValue);
  let sum = 0;
  for (let symbol of symbols) {
    sum += symbol.value;
    if (randomNumber < sum) {
      if (symbol.symbol === lastSymbol) {
        console.log("Símbolo repetido, gerando novo");
        return getRandomSymbol();
      }
      lastSymbol = symbol.symbol;
      return symbol.symbol;
    }
    // console.log("lastSymbol:", lastSymbol);
    // console.log("symbol:", symbol);
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
    symbol.src = "./assets/img/" + getRandomSymbolForSpinning() + ".png";
    sound1.play();

    if (performance.now() - spinStart >= spinDuration) {
      clearInterval(spinTimer);
      symbol.src = "./assets/img/" + getRandomSymbol() + ".png";
      symbol.parentElement.classList.remove("spin");
      sound2.play();
    }
  }, spinInterval);
});

// SET SECTIONS

const buttonPlay = $("#play-game");
const buttonSlideShow = $("#play-slide-show");
const slotMachineSection = $("#slot-machine");
const defaultSection = $("#default");
const slideShowSection = $("#slide-show");
const videoStandBySection = $("#video-standby");

slotMachineSection.css("display", "none");
defaultSection.css("display", "flex");
slideShowSection.css("display", "none");
videoStandBySection.css("display", "none");

let timeoutId;

function setStandbyTimeout() {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(function () {
    slotMachineSection.css("display", "none");
    defaultSection.css("display", "none");
    slideShowSection.css("display", "none");
    videoStandBySection.css("display", "block");
    console.log("VÍDEO DE STANDBY ATIVADO");
  }, 5000);
}

document.addEventListener("click", function (e) {
  clearTimeout(timeoutId);

  if (e.target.id === "play-game") {
    slotMachineSection.css("display", "flex");
    defaultSection.css("display", "none");
    slideShowSection.css("display", "none");
    videoStandBySection.css("display", "none");
    console.log("BOTÃO DE JOGO CLICADO");
  }

  if (e.target.id === "play-slide-show") {
    slotMachineSection.css("display", "none");
    defaultSection.css("display", "none");
    slideShowSection.css("display", "block");
    videoStandBySection.css("display", "none");
    console.log("SLIDESHOW ATIVADO");
  }

  if (e.target.id === "video") {
    defaultSection.css("display", "flex");
    slotMachineSection.css("display", "none");
    slideShowSection.css("display", "none");
    videoStandBySection.css("display", "none");
    console.log("VÍDEO DE STANDBY DESATIVADO");
  }

  timeoutId = setTimeout(function () {
    slotMachineSection.css("display", "none");
    defaultSection.css("display", "none");
    slideShowSection.css("display", "none");
    videoStandBySection.css("display", "block");
    console.log("VÍDEO DE STANDBY ATIVADO");
  }, 2000);


  setStandbyTimeout();
});

// SLIDESHOW

const carouselInner = $(".carousel-inner");
const basePath = "./assets/img/slide-show/";

for (let i = 1; i <= 30; i++) {
  const carouselItem = $("<div>").addClass("carousel-item");

  const image = $("<img>")
    .attr("src", `${basePath}${i}.jpg`)
    .addClass("d-block");

  carouselItem.append(image);
  carouselInner.append(carouselItem);
}

$(".carousel-item").first().addClass("active");

// BUTTON CLOSE

let buttonClose = $(".button-close");

// $(buttonClose).on('click', function() {
//   if (buttonClose)
// })

// STANDBY

// $(document).ready(function() {
//   var timeoutId;
//   var video = $("#standby-video")[0];

//   function resetTimer() {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(function() {
//       video.play();
//     }, 3000); // 5 minutos em milissegundos
//   }

//   $(document).mousemove(resetTimer);

//   video.addEventListener("ended", function() {
//     this.currentTime = 0;
//     this.pause();
//   });
// });
