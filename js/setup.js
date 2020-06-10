'use strict';

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var setupUserName = document.querySelector('.setup-user-name');
var similarListElement = setup.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var wizardCoatInput = document.querySelector('input[name="coat-color"]');
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var wizardEyesInput = document.querySelector('input[name="eyes-color"]');
var wizardFireball = document.querySelector('.setup-fireball-wrap');
var wizardFireballInput = document.querySelector('input[name="fireball-color"]');

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

function generateWizardsArray() {
  var wizards = [];

  for (var i = 0; i < 4; i++) {
    var obj = {
      name: getRandomElement(names) + ' ' + getRandomElement(surnames),
      coatColor: getRandomElement(coatColors),
      eyesColor: getRandomElement(eyesColors)
    };

    wizards.push(obj);
  }
  return wizards;
}

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function createWizard(wizard, template) {
  var wizardElement = template.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}

function createWizards(wizards) {
  var fragment = document.createDocumentFragment();

  wizards.forEach(function (wizard) {
    fragment.appendChild(createWizard(wizard, similarWizardTemplate));
  });

  return fragment;
}

function renderWizards() {
  return similarListElement.appendChild(createWizards(generateWizardsArray()));
}

renderWizards();

setup.querySelector('.setup-similar').classList.remove('hidden');

function onPopupEscPress(event) {
  if (event.key === 'Escape' && event.target !== setupUserName) { // Не уверен насчет этого решения с event.target.
    event.preventDefault();
    closePopup();
  }
}

function openPopup() {
  setup.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
}

function closePopup() {
  setup.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
}

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    closePopup();
  }
});

wizardCoat.addEventListener('click', function () {
  var color = getRandomElement(coatColors);
  wizardCoat.style.fill = color;
  wizardCoatInput.value = color;
});

wizardEyes.addEventListener('click', function () {
  var color = getRandomElement(eyesColors);
  wizardEyes.style.fill = color;
  wizardEyesInput.value = color;
});

wizardFireball.addEventListener('click', function () {
  var color = getRandomElement(fireballColors);
  wizardFireball.style.backgroundColor = color;
  wizardFireballInput.value = color;
});
