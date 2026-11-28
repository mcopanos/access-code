const btn = document.getElementById('btn');
let input = document.getElementById('input');
let specialChar = document.getElementById('special-char');
let capLetter = document.getElementById('cap-span');
let num = document.getElementById('num');
let lengthCheck = document.getElementById('length-check');
let specialChars = ['!', '#', '$', '%', '&', '*'];
let accessCode = '';
let accessCodeInputs = Array.from(document.querySelectorAll('.access-code-input'));
let form = document.querySelector('.otp-form');
let passwordSection = document.getElementById('enterPassword');
let showOTP = document.getElementById('showOTP');
let otp = document.getElementById('otp');
let copyBtn = document.getElementById('copyBtn');
let confirmBtn = document.getElementById('confirm');
let accessCodeInput1 = document.getElementById('aci0');
let accessCodeInput6 = document.getElementById('aci5');
let count = 30;
let showCount = document.getElementById('showCount');

// check password for an upper case character
function isUpperCase(password) {
    if (password.find(char => /[A-Z]/.test(char))) {
        capLetter.classList.remove('cap-check');
        return true;
    } else {
        capLetter.classList.add('cap-check');
        return false;
    }
}

// check password for a number
function hasNumber(password) {
    if (password.find(char => /[0-9]/.test(char))) {
        num.classList.remove('num-check');
        return true;
    } else {
        num.classList.add('num-check');
        return false;
    }
}

// check password length
function passwordLength(password) {
    if (password) {
        if (password.length >= 6 && password.length <= 12) {
            lengthCheck.classList.remove('length-check');
            return true; 
        } else {
            lengthCheck.classList.add('length-check');
            return false;
        }
    }
}

// check for special character in password
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
                    } //else {
                        // specialChar.classList.add('special-check');
                        // isChecked = false;
                        //return false;
                    //}
                } else {
                    specialChar.classList.add('special-check')
                }
            }
        }
    }
}

// Check password criteria 
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
            otp.innerHTML = `<span>${accessCode}</span>`;
            passwordSection.classList.toggle('hidden');
            showOTP.classList.toggle('hidden');
            countDown();
        } else if (!isUpper) {
            let message = 'Please add an upper case letter to your password.';
            handleErrorMessage(message)
        } else if (!hasNum) {
            let message = 'Please make sure to a number to your password.';
            handleErrorMessage(message);
        } else if (!hasSpecialCharacter) {
            let message = `Make sure you have one of the following characters:\n`
            handleErrorMessage(message, specialChars)
        } else {
            let message = 'Please make sure that your password is between 6 to 12 characters.'
            handleErrorMessage(message);
        }
    }, 750)
}

// handle password error messages
function handleErrorMessage(message, error='') {
    alert(`${message} ${error}`);
}

// make ramdom 6 digit OTP
function accessToken() {
    let code = 0
    let codeArr = [];
    while (codeArr.length < 6) {
        code = Math.floor(100000 + Math.random() * 900000);
        codeArr = String(code).split('').map(Number);
    } 
    return code;
}

// auto tab to next index
accessCodeInputs.map((input, index) => {
    input.addEventListener('input', (e) => {
        const maxLength = e.target.getAttribute('maxlength')
        let target = e.target.value.length; 
        if (target == maxLength) {
            const nextInput = document.getElementById(`aci${index + 1}`);
            if (nextInput) {
                nextInput.focus();
            }
        }
    });
});

// handle OTP verificaton
function otpConfirmation() {
    let otpDigits = document.querySelectorAll('.access-code-input');
    let arrDigits = [];

    otpDigits.forEach(digit => {
        arrDigits.push(digit.value);
    });
    
    let result = Number(arrDigits.join(''));
    if (result === accessCode) {
        alert('Access granted!');
    } else {
        alert('Access denied!');
    }
}

function countDown() {
    const timer = setInterval(() => {
        showCount.innerText = count;
        count--;
    
        if (count < 0) {
            clearInterval(timer);
        }
    }, 1000);
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

// evnet listener on enter key
input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        inputVal = input.value;
        if (inputVal != '') {
            checkPassword(inputVal);
        } else {
            alert('You must enter your password!');
        }
    }
});

//handle pasted input data
form.addEventListener('paste', (e) => {
    const digits = e.clipboardData.getData('text').replace(/\D/g, '');
    if (!digits) return;

    accessCodeInputs.forEach((input, i) => (input.value = digits[i]));
});

// handle coping OTA code
copyBtn.addEventListener('click', () => {
    const otpCode = otp.innerText;
    navigator.clipboard.writeText(otpCode);
    alert(`${otpCode} was copied!`)
});

// handle OTP confirmation on button click
confirmBtn.addEventListener('click', otpConfirmation);

// handle OTP confirmation on enter
accessCodeInput1.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        otpConfirmation();
    }
});

accessCodeInput6.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        otpConfirmation();
    }
});