const btn = document.getElementById('btn');
var input = document.getElementById('input');
let specialChar = document.getElementById('special-char');
let capLetter = document.getElementById('cap-span');
let num = document.getElementById('num');
let lengthCheck = document.getElementById('length-check');
let specialChars = ['!', '#', '$', '%', '&', '*'];
let accessCode = '';

function isUpperCase(password) {
    if (password.find(char => /[A-Z]/.test(char))) {
        capLetter.classList.remove('cap-check');
        return true;
    } else {
        return false;
    }
}

function hasNumber(password) {
    if (password.find(char => /[0-9]/.test(char))) {
        num.classList.remove('num-check');
        return true;
    } else {
        return false;
    }
}

function passwordLength(password) {
    if (password) {
        if (password.length >= 6 && password.length <= 12) {
            lengthCheck.classList.remove('length-check');
            return true; 
        } else {
            return false;
        }
    }
}

function hasSpecialChar(password) {
    if (password) {
        let isChecked = false
        for (i = 0; i < password.length; i++){
            for (j = 0; j < specialChars.length; j++) {
                if (password[i] === specialChars[j]) {
                    if (isChecked === false) {
                        specialChar.classList.remove('special-check');
                        isChecked = true;
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        }
    }
}
// generate 6 digit code 
function accessToken() {
    return Math.floor(Math.random() * 999999) + 1;
}

function checkPassword(password) {
    let passwordArray = [...password];
    // checks for capital letter
    let isUpper = isUpperCase(passwordArray);
    console.log(`password has an uppercase letter? ${isUpper}`);
    // checks for number 
    let hasNum = hasNumber(passwordArray);
    console.log(`password has a number? ${hasNum}`);
    // check length
    let isLongEnough = passwordLength(passwordArray);
    console.log(`password is long enough? ${isLongEnough}`);
    // check for special character
    let hasSpecialCharacter = hasSpecialChar(password);
    console.log(`password has special character? ${hasSpecialCharacter}`);

    setTimeout(() => {
        if (isUpper && hasNum && isLongEnough && hasSpecialCharacter) {
            accessCode = accessToken();
            alert(`Your access code is: ${accessCode}`);
        } else if (!hasSpecialCharacter) {
            alert(`Make sure you have one of the following characters: ${specialChars}`)
        } else {
            alert('Please check password requirements and try again.')
        }
    }, 750)
}

// event listener on the submit button
btn.addEventListener('click', () => {
    inputVal = input.value;
    if (inputVal != '') {
        checkPassword(inputVal);
    } else {
        alert('You must enter your password!');
    }
});

function printToConsole(message) {
    console.log(message);
}

// verify that code once entered