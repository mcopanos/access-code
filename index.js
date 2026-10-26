const btn = document.getElementById('btn');
var input = document.getElementById('input');
let specialChar = document.getElementById('special-char');
let capLetter = document.getElementById('cap-span');
let num = document.getElementById('num');
let lengthCheck = document.getElementById('length-check');

function isUpperCase(password) {
    if (password.find(char => /[A-Z]/.test(char))) {
        capLetter.classList.toggle('cap-check');
        return true;
    } else {
        return false;
    }
}

function hasNumber(password) {
    if (password.find(char => /[0-9]/.test(char))) {
        num.classList.toggle('num-check');
        return true;
    } else {
        return false;
    }
}

function checkPassword(password) {
    let passwordArray = [...password];
    let specialChars = ['!', '#', '$', '%', '&', '*'];
    // checks for capital letter
    let isUpper = isUpperCase(passwordArray);
    console.log(isUpper);
    // checks for number 
    let hasNum = hasNumber(passwordArray);
    console.log(hasNum);
    // check length
    if (passwordArray) {
        if (passwordArray.length >= 6 && passwordArray.length <= 12) {
            lengthCheck.classList.toggle('length-check');
        }
    }
    // check for special character
    if (passwordArray) {
        let isChecked = false
        for (i = 0; i < passwordArray.length; i++){
            for (j = 0; j < specialChars.length; j++) {
                if (passwordArray[i] === specialChars[j]) {
                    if (isChecked === false) {
                        specialChar.classList.toggle('special-check');
                        isChecked = true;
                    }
                    
                }
            }
        }
    }
}

// event listener on the submit button
btn.addEventListener('click', () => {
    inputVal = input.value;
    checkPassword(inputVal);
});

function printToConsole(message) {
    console.log(message);
}
// generate 6 digit code 
// verify that code once entered