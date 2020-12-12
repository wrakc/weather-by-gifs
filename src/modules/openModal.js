import changeTemperature from './changeTemperature';
import checkUvIndex from './checkUvIndex';
import getGifs from './getGifs';
import setBackground from './setBackground';

function openModal(data) {
  const myModal = document.createElement('div');
  myModal.setAttribute('id', 'myModal');
  myModal.className += 'modal';
  document.body.appendChild(myModal);
  const modalContent = document.createElement('div');
  modalContent.className += 'modal-content';
  myModal.appendChild(modalContent);
  const closeButton = document.createElement('span');
  closeButton.className += 'close';
  closeButton.innerHTML = '&times;';
  modalContent.appendChild(closeButton);
  const toggleLabel = document.createElement('label');
  const toggleInput = document.createElement('input');
  toggleInput.className += 'relative w-10 h-5 transition-all duration-200 ease-in-out bg-gray-400 rounded-full shadow-inner outline-none appearance-none';
  toggleLabel.className += 'label flex items-center mt-2';
  toggleInput.setAttribute('checked', 'checked');
  toggleInput.setAttribute('type', 'checkbox');
  modalContent.appendChild(toggleLabel);
  const tempC = document.createElement('span');
  const tempF = document.createElement('span');
  tempF.innerHTML = '°F';
  tempF.className += 'text-sm mx-2';
  toggleLabel.appendChild(tempF);
  toggleLabel.appendChild(toggleInput);
  tempC.innerHTML = '°C';
  tempC.className += 'text-sm mx-2';
  toggleLabel.appendChild(tempC);
  toggleInput.setAttribute('id', 'toggleInput');
  const items = document.createElement('div');
  modalContent.appendChild(items);
  const uList = document.createElement('ul');
  uList.className += 'uList';
  items.appendChild(uList);
  const apiExplanation = document.createElement('li');
  const apiIcon = document.createElement('img');
  apiIcon.setAttribute('src', `${data.condition.icon}`);
  apiExplanation.appendChild(apiIcon);
  apiExplanation.appendChild(document.createTextNode(`${data.condition.text}`));
  uList.appendChild(apiExplanation);
  const avgTemperature = document.createElement('li');
  avgTemperature.setAttribute('id', 'avgTemperature');
  const avgTemperatureIcon = document.createElement('i');
  avgTemperature.appendChild(avgTemperatureIcon);
  avgTemperatureIcon.className += 'fas fa-thermometer-half';
  avgTemperature.appendChild(document.createTextNode(`${data.avgtemp_c}°C`));
  uList.appendChild(avgTemperature);
  const maxTemperature = document.createElement('li');
  maxTemperature.setAttribute('id', 'maxTemperature');
  const maxTemperatureIcon = document.createElement('i');
  maxTemperature.appendChild(maxTemperatureIcon);
  maxTemperatureIcon.className += 'fas fa-thermometer-full';
  maxTemperature.appendChild(document.createTextNode(`${data.maxtemp_c}°C`));
  uList.appendChild(maxTemperature);
  const minTemperature = document.createElement('li');
  minTemperature.setAttribute('id', 'minTemperature');
  const minTemperatureIcon = document.createElement('i');
  minTemperature.appendChild(minTemperatureIcon);
  minTemperatureIcon.className += 'fas fa-thermometer-empty';
  minTemperature.appendChild(document.createTextNode(`${data.mintemp_c}°C`));
  uList.appendChild(minTemperature);
  const precipitation = document.createElement('li');
  const precipitationIcon = document.createElement('i');
  precipitation.appendChild(precipitationIcon);
  precipitationIcon.className += 'fas fa-cloud-rain';
  precipitation.appendChild(document.createTextNode(`${data.totalprecip_mm}mm`));
  uList.appendChild(precipitation);
  const uvIndex = document.createElement('li');
  const uvIndexIcon = document.createElement('i');
  uvIndex.appendChild(uvIndexIcon);
  uvIndexIcon.className += 'fas fa-umbrella-beach';
  uvIndex.className += checkUvIndex(data.uv);
  uvIndex.appendChild(document.createTextNode(`${data.uv}`));
  uList.appendChild(uvIndex);
  document.querySelector('.close').addEventListener('click', () => {
    myModal.remove();
    const defaultGif = 'hmm';
    getGifs(defaultGif).then(object => setBackground(object.data));
  });
  toggleInput.addEventListener('click', () => {
    changeTemperature(data);
  });
}

export default openModal;