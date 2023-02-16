function setDefaultLanguage(language) {
  if (localStorage.getItem('language') === null) {
    localStorage.setItem('language', language);
  }
  changeLanguage(localStorage.getItem('language'));
}

const languages = {
  pt: {
    mainPageTitle: 'Um click abre muitas portas Nau',
    defaultButtonAbout: "Sobre Nós",
    defaultButtonPlay: "Momento Nau",

    transitionSectionTitle: 'Se tem play, tem diversão Nau',
    transitionSectionDescription: 'Vamos Jogar!',

    gamePageTitle: 'Levando a felicidade ao convidado',
    slotMachineButton: "Rodar",
    modalTitle: 'Parabéns, você ganhou! 🎉',
    modalTextEnd: 'Um colega irá encaminhar o seu brinde até si!'
  },
  en: {
    mainPageTitle: 'Pick you Nau moment of the day',
    defaultButtonAbout: "About Us",
    defaultButtonPlay: "Nau moment",

    transitionSectionTitle: 'Take a chance, play to win!',
    transitionSectionDescription: 'Are you a Nau player?',

    gamePageTitle: 'Leading guest happiness',
    slotMachineButton: "Spin",
    modalTitle: 'Congratulations, you win! 🎉',
    modalTextEnd: 'A colege will now forward to your prize'
  }
}

let currentLanguage = "en";
changeLanguage(currentLanguage);

$('#pt-button').on('click', function () {
  if (currentLanguage !== "pt") {
    currentLanguage = "pt";
    changeLanguage(currentLanguage);
    }
})

$('#en-button').on('click', function () {
  if (currentLanguage !== "en") {
    currentLanguage = "en";
    changeLanguage(currentLanguage);
    }
})

function changeLanguage(language) {
  const languageData = languages[language];
  // document.getElementById("message").innerHTML = languageData.message;

  // DEFAULT
  $('#play-slide-show').text(languageData.defaultButtonAbout);
  $('#play-game').text(languageData.defaultButtonPlay);
  $('#phrase-homepage').text(languageData.mainPageTitle);

  // TRANSITION
  $('.transition-title').text(languageData.transitionSectionTitle);
  $('.transition-description').text(languageData.transitionSectionDescription);

  // SLOT MACHINE
  $('#phrase-game').text(languageData.gamePageTitle);
  $('.spin-button').text(languageData.slotMachineButton);
  $('#modal-close').text(languageData.modalButtonClose);
  $('.modal-result-title').text(languageData.modalTitle);
  $('.modal-result-text').text(languageData.modalTextEnd);
}

let symbols = [
  { symbol: "postit", value: 300, count: 0, maxCount: 300 },
  { symbol: "pen", value: 200, count: 0, maxCount: 100 },
  { symbol: "travelKit", value: 120, count: 0, maxCount: 100 },
  { symbol: "hat", value: 60, count: 0, maxCount: 50 },
  { symbol: "pencil", value: 50, count: 0, maxCount: 50 },
  { symbol: "book", value: 40, count: 0, maxCount: 40 },
  { symbol: "blanket", value: 30, count: 0, maxCount: 30 },
  { symbol: "powerbank", value: 20, count: 0, maxCount: 20 },
  { symbol: "towel", value: 10, count: 0, maxCount: 10 }
];

let totalValue = symbols.reduce((acc, symbol) => acc + symbol.value, 0);

// SIMULAÇÃO DE PROBABILIDADES

let symbolCount = {};
for (let symbol of symbols) {
  symbolCount[symbol.symbol] = 0;
}

let numberOfSimulations = 500;

for (let i = 0; i < numberOfSimulations; i++) {
  let randomNumber = Math.floor(Math.random() * totalValue);
  let sum = 0;
  for (let symbol of symbols) {
    sum += symbol.value;
    if (randomNumber < sum) {
      symbolCount[symbol.symbol]++;
      break;
    }
  }
}

for (let symbol of symbols) {
  let probability = symbolCount[symbol.symbol] / numberOfSimulations;
  console.log(`A probabilidade de ganhar o símbolo ${symbol.symbol} é de ${probability}.`);
}

// FIM DA SIMULAÇÃO DE PROBABILIDADES

let lastSymbol;
let result;

function getRandomSymbolForSpinning() {
  let randomNumber = Math.floor(Math.random() * totalValue);
  return symbols[randomNumber % symbols.length].symbol;
}

function getRandomSymbol() {
  let randomNumber = Math.floor(Math.random() * totalValue);
  let sum = 0;
  for (let symbol of symbols) {
    sum += symbol.value;
    if (randomNumber < sum && symbol.count < symbol.maxCount) {
      console.log("symbol:", symbol.symbol);
      symbol.count++; // incrementa o contador para esse símbolo
      console.log(symbol.count);
      result = symbol.symbol; // armazena o resultado do sorteio na variável global 'result'
      $("#modal-result-icon").html(`<img src="./assets/img/${result}.png" class="modal-result-symbol">`);
      return result;
    }
  }
  // Se todos os símbolos já foram sorteados o número máximo de vezes, a roleta rodará novamente
  getRandomSymbol();
}

let spinButton = document.querySelector(".spin-button");
let symbol = document.querySelector("#symbol");
let modalResult = document.querySelector("#modalResult");

let sound1 = new Audio("./assets/sounds/random-wheel.wav");
let sound2 = new Audio("./assets/sounds/win.wav");


spinButton.addEventListener("click", function () {
  symbol.parentElement.classList.add("spin");

  let spinDuration = 3000;
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

      // modalResult.textContent = symbol;
      $("#resultModal").modal("show");
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
const transitionSection = $('#transition-section');

slotMachineSection.css("display", "none");
defaultSection.css("display", "block");
slideShowSection.css("display", "none");
videoStandBySection.css("display", "none");
transitionSection.css("display", "none");

function resetSymbol() {
  if ($('#symbol').attr('src', './assets/img/logo-homepage.png')) {
  }
  if (slotMachineSection.css("display") == "none") {
    $('#symbol').attr('src', './assets/img/logo-homepage.png');
  }
}

let timeoutId;
const seconds = 5000000;

function setStandbyTimeout() {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(function () {
    slotMachineSection.css("display", "none");
    defaultSection.css("display", "none");
    slideShowSection.css("display", "none");
    videoStandBySection.css("display", "block");
    console.log("VÍDEO DE STANDBY ATIVADO");
  }, seconds);
}

const transitionTime = 3000;

document.addEventListener("click", function (e) {
  clearTimeout(timeoutId);

  if (e.target.id === "play-game") {
    transitionSection.css("display", "none");
    defaultSection.css("display", "none");
    transitionSection.fadeIn(1000);
    setTimeout(function() {
      slotMachineSection.css("display", "flex");
      slideShowSection.css("display", "none");
      videoStandBySection.css("display", "none");
      transitionSection.fadeOut({
        duration: 1000,
        complete: function() {
          $("#background-transition").css("background-color", "#0000");
        }
      });
      console.log("BOTÃO DE JOGO CLICADO");
    }, transitionTime);
  }

  if (e.target.id === "play-slide-show") {
    slotMachineSection.css("display", "none");
    defaultSection.css("display", "none");
    slideShowSection.css("display", "block");
    createCarouselItem();
    videoStandBySection.css("display", "none");
    resetSymbol();
    console.log("SLIDESHOW ATIVADO");
  }

  if (e.target.id === "video") {
    defaultSection.css("display", "flex");
    slotMachineSection.css("display", "none");
    slideShowSection.css("display", "none");
    videoStandBySection.css("display", "none");
    resetSymbol();
    console.log("VÍDEO DE STANDBY DESATIVADO");
  }

  if (e.target.id === "modal-close") {
    defaultSection.css("display", "flex");
    slotMachineSection.css("display", "none");
    slideShowSection.css("display", "none");
    videoStandBySection.css("display", "none");
    resetSymbol();
    console.log("DEFAULT SECTION ACTIVE");
  }

  timeoutId = setTimeout(function () {
    slotMachineSection.css("display", "none");
    defaultSection.css("display", "none");
    slideShowSection.css("display", "none");
    videoStandBySection.css("display", "block");
    resetSymbol();
    console.log("VÍDEO DE STANDBY ATIVADO");
  }, seconds);


  setStandbyTimeout();
});

$('.close-game').on('click', function () {
  slotMachineSection.css("display", "none");
  defaultSection.css("display", "block");
  slideShowSection.css("display", "none");
  videoStandBySection.css("display", "none");
  resetSymbol();
  console.log("BOTÃO DE FECHAR JOGO CLICADO");
})


// SLIDESHOW

function createCarouselItem() {
  const carouselInner = $(".carousel-inner");
  const basePath = "./assets/img/slide-show/";

  if (carouselInner.children().length === 0) {
    for (let i = 1; i <= 30; i++) {
      const carouselItem = $("<div>").addClass("carousel-item");

      const image = $("<img>")
        .attr("src", `${basePath}${i}.jpg`)
        .addClass("d-block");

      carouselItem.append(image);
      carouselInner.append(carouselItem);
    }
    $(".carousel-item").first().addClass("active");

  } else {
    $(".carousel-item").removeClass("active");
    $(".carousel-item").first().addClass("active");
  }
}