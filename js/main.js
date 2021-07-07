/*
    [*] Password length
    [ ] Include uppercase letters
    [ ] Include lowercase letters
    [ ] Include numbers
    [ ] Include symbols
*/

let passwordLength; // HTML parameter
const passwordOptions = new Map();

const btnGenerate = document.querySelector('#btnGenerate')
const state = document.querySelectorAll('.wrapper_option input')
const txtPass = document.querySelector('#pass')
const range = document.querySelector('#rango')
const numberLength = document.querySelector('#numberLength')
const form = document.querySelector('#form')
const copy = document.querySelector('#copiar')

console.log(state);

state.forEach(e => {
    e.addEventListener('change', (e) => {
        passwordOptions.set('uppercaseLetters', state[0].checked);
        passwordOptions.set('lowercaseLetters', state[1].checked);
        passwordOptions.set('numbers', state[2].checked);
        passwordOptions.set('symbols', state[3].checked);
    })
})
form.addEventListener('submit', (e) => {
  e.preventDefault()
})

numberLength.innerHTML = range.value
passwordLength = range.value

copiar.addEventListener('click', () => {
  if(!txtPass.value) {
    return
  }
  txtPass.select();
  document.execCommand('copy');
})

const changePasswordLenght = (e) => {
    const value = e.target.value;
    numberLength.innerHTML = value;
    passwordLength = value;
}

range.addEventListener('input', changePasswordLenght)

const generateRandomUppercaseLetter = () => {
    // 65 -> A
    // 90 -> Z
    const number = Math.floor(Math.random() * 26) + 65;
    return String.fromCharCode(number);
}
const generateRandomLowercaseLetter = () => {
    // 97 -> a
    // 122 -> z
    const number = Math.floor(Math.random() * 26) + 97;
    return String.fromCharCode(number);
}
const generateRandomNumber = () => {
    const number = Math.floor(Math.random() * 10);
    return number + '';
}
const generateRandomSymbol = () => {
    // !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
    const symbols = `!"#$%&()*+,-./:;<=>?@[\\]^_\`{|}~`;
    return symbols[Math.floor(Math.random() * symbols.length)];
}

const passwordFunctions = [generateRandomUppercaseLetter, generateRandomLowercaseLetter, generateRandomNumber, generateRandomSymbol];

const generatePassword = (passwordLength, passwordOptions, passwordFunctions) => {
    if (!passwordLength) {
        return;
    }
    let optionsCount = 0;
    for (let [key, value] of passwordOptions) {
        if (value) {
            optionsCount++;
        }
    }
    if (optionsCount === 0) {
        return;
    }
    let passwordFunctionsMap = new Map();
    let index = 0;
    let optionsSkippedIndex = [];
    for (let [key, value] of passwordOptions) {
        if (value) {
            passwordFunctionsMap.set(key, passwordFunctions[index]);
        } else {
            optionsSkippedIndex.push(index);
        }
        index++;
    }

    const passwordOptionKeys = ['uppercaseLetters', 'lowercaseLetters', 'numbers', 'symbols'];
    const ultimatePasswordOptionKeys = [];
    passwordOptionKeys.forEach( (element, index) => {
        if (!optionsSkippedIndex.includes(index)) {
            ultimatePasswordOptionKeys.push(element);
        }
    });

    const passwordArray = [];
    for (let i = 0; i < passwordLength; i++) {
        const randomOption = Math.floor(Math.random() * ultimatePasswordOptionKeys.length);
        const passwordSpecificFunction = passwordFunctionsMap.get(ultimatePasswordOptionKeys[randomOption]);
        passwordArray.push(passwordSpecificFunction());
    }
    txtPass.value = passwordArray.join('');
}

btnGenerate.onclick = (e) => {
    generatePassword(passwordLength, passwordOptions, passwordFunctions);
}