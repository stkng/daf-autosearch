let searchInterval;
let searchInProgress = false;

const make = (tag, content, value, type, id) => {
  const el = document.createElement(tag);
  content ? el.innerHTML = content : false;
  value ? el.value = value : false;
  id ? el.id = id : false;
  type ? el.type = type : false;
  return el;
}

const prefixInputLabel = make('label', 'Pr&auml;fix');
const prefixInput = make('input', null, '0G');
prefixInputLabel.appendChild(prefixInput);

const idInputLabel = make('label', 'ID');
const idInput = make('input', null, localStorage.getItem('last_id') || '');
idInputLabel.appendChild(idInput);

const idIntervalLabel = make('label', 'Interval in ms');
const intervalInput = make('input', null, 5000, 'number');
idIntervalLabel.appendChild(intervalInput);

const search = () => {
  let id = idInput.value;
  const prefix = prefixInput.value;
  const formular = document.querySelector('app-daf-input form');
	const input = document.querySelector('app-daf-input [id^=mat-input-]');
	input.value = `${prefix}${id}`;
	
	const newEvent = document.createEvent("HTMLEvents");
  newEvent.initEvent("change", false, true);
	input.dispatchEvent(newEvent);
  newEvent.initEvent("input", false, true);
	input.dispatchEvent(newEvent);
	
	id++;
	localStorage.setItem('last_id', id);
	idInput.value = id;
	document.querySelector('.vin-search-button').click();
}

const button = make('button', 'Start');
button.onclick = () => {
  if (searchInProgress) {
    clearInterval(searchInterval);
    searchInProgress = false;
    button.innerText = 'Start';
    button.style.backgroundColor = 'dodgerblue';
  } else {
    search();
    searchInterval = setInterval(() => search(), intervalInput.value || 5000);
    searchInProgress = true;
    button.innerText = 'Stop';
    button.style.backgroundColor = 'firebrick';
  }
};

const credit = make('span', `made with ❤ by <a href="https://stkng.de" target="_blank">Steffen</a>`);
const styles = `
  #auto-id-counter {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 2000;
    background: aliceblue;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    border: 1px solid dodgerblue;
    border-radius: 5px;
    boy-shadow: 10px 10px 10px -5px rgba(0,0,0,0.2);
  }
  
  #auto-id-counter label {
    display: flex;
    flex-direction: column;
    font-size: 10px;
  }
  
  #auto-id-counter input {
    font-size: 1rem;
  }
  
  #auto-id-counter button {
    padding: .5rem 1rem;
    background-color: dodgerblue;
    color: white;
    border: none;
    border-radius: 5px;
    margin: 10px 0;
  }
  
  #auto-id-counter span {
    font-size: 10px;
    align-self: center;
  }
`
const styleElement = make('style', styles);

const modal = make('div', null, null, null, 'auto-id-counter');

modal.appendChild(styleElement);
modal.appendChild(prefixInputLabel);
modal.appendChild(idInputLabel);
modal.appendChild(idIntervalLabel);
modal.appendChild(button);
modal.appendChild(credit);
document.body.appendChild(modal);
