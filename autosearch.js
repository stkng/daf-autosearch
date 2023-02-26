const prefixInputLabel = document.createElement('label');
prefixInputLabel.innerHTML = 'Pr&auml;fix';
const prefixInput = document.createElement('input');
prefixInput.value = '0G';
prefixInputLabel.appendChild(prefixInput);
prefixInputLabel.style.display = 'flex';
prefixInputLabel.style.flexDirection = 'column';

const idInputLabel = document.createElement('label');
idInputLabel.innerText = 'ID';
const idInput = document.createElement('input');
idInput.value = localStorage.getItem('last_id') || '';
idInputLabel.appendChild(idInput);
idInputLabel.style.display = 'flex';
idInputLabel.style.flexDirection = 'column';

const idIntervalLabel = document.createElement('label');
idIntervalLabel.innerText = 'Interval in ms'
const intervalInput = document.createElement('input');
intervalInput.type = 'number';
intervalInput.value = 5000;
idIntervalLabel.appendChild(intervalInput);
idIntervalLabel.style.display = 'flex';
idIntervalLabel.style.flexDirection = 'column';

const search = () => {
  let id = idInput.value;
  let prefix = prefixInput.value;
  let formular = document.querySelector('app-daf-input form');
	const input = document.querySelector('app-daf-input [id^=mat-input-]');
	input.value = `${prefix}${id}`;
	const changeEvent = document.createEvent("HTMLEvents");
  changeEvent.initEvent("change", false, true);
	input.dispatchEvent(changeEvent);
	const inputEvent = document.createEvent("HTMLEvents");
  inputEvent.initEvent("input", false, true);
	input.dispatchEvent(inputEvent);
	id++;
	localStorage.setItem('last_id', id);
	idInput.value = id;
	document.querySelector('.vin-search-button').click();
}

let searchInterval;

const startSearchInterval = () => {
  search();
  searchInterval = setInterval(() => {
    search()
  }, intervalInput.value || 5000)
}

const stopSearchInterval = () => {
  clearInterval(searchInterval);
}

let searchInProgress = false;

const button = document.createElement('button');
button.style.padding = '.5rem 1rem';
button.style.backgroundColor = 'dodgerblue';
button.style.color = 'white';
button.style.border = 'none';
button.style.borderRadius = '5px';
button.style.marginTop = '10px';
button.innerText = 'Start';
button.onclick = () => {
  if (searchInProgress) {
    stopSearchInterval();
    searchInProgress = false;
    button.innerText = 'Start';
    button.style.backgroundColor = 'dodgerblue';
  } else {
    startSearchInterval();
    searchInProgress = true;
    button.innerText = 'Stop';
    button.style.backgroundColor = 'firebrick';
  }
};

const modal = document.createElement('div');
modal.id = 'auto-id-counter';
// modal.style.all = 'unset';
modal.style.position = 'fixed';
modal.style.top = '1rem';
modal.style.right = '1rem';
modal.style.zIndex = 2000;
modal.style.backgroundColor = 'aliceblue';
modal.style.display = 'flex';
modal.style.flexDirection = 'column';
modal.style.padding = '1rem';
modal.style.border = '1px solid dodgerblue';
modal.style.borderRadius = '5px';
modal.style.boxShadow = '10px 10px 10px -5px rgba(0,0,0,0.2)';

modal.appendChild(prefixInputLabel);
modal.appendChild(idInputLabel);
modal.appendChild(idIntervalLabel);
modal.appendChild(button);
document.body.appendChild(modal);
