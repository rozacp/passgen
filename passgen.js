const result = document.querySelector('#result');
const length = document.querySelector('#length');
const upper = document.querySelector('#uppercase');
const lower = document.querySelector('#lowercase');
const number = document.querySelector('#numbers');
const symbol = document.querySelector('#symbols');
const generate = document.querySelector('#generate');
const clipboard = document.querySelector('#clipboard');

const strings = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  number: '0123456789',
  symbol: '!@#$%^&*(){}[]=<>/,.',
};

strings.lower = strings.upper.toLowerCase();

function getRandom(str) {
  return str[Math.floor(Math.random() * str.length)];
}

function generatePassword(upper, lower, number, symbol, length) {
  let generatedPassword = '';
  const types = {
    upper, lower, number, symbol,
  };

  Object.keys(types).map((type) => {
    if (types[type]) {
      types[type] = strings[type];
    } else {
      delete types[type];
    }
  });

  const keys = Object.keys(types);

  if (!keys.length) {
    return '';
  }

  for (let i = 0; i < Number(length); i++) {
    const random = types[keys[Math.floor(Math.random() * keys.length)]];
    generatedPassword += getRandom(random);
  }

  return generatedPassword;
}

generate.addEventListener('click', () => {
  const hasUpper = upper.checked;
  const hasLower = lower.checked;
  const hasNumber = number.checked;
  const hasSymbol = symbol.checked;
  const lengthVal = +length.value;

  result.innerText = generatePassword(hasUpper, hasLower, hasNumber, hasSymbol, lengthVal);
});

// copy pass to clipboard
clipboard.addEventListener('click', () => {
  const password = result.innerText;

  if (!password) {
    return;
  }

  const textarea = document.createElement('textarea');

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  alert('Password copied to clipboard');
});
