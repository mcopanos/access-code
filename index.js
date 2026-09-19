const btn = document.getElementById('btn');
var input = document.getElementById('input');
let inputVal;

function checkPassword(password) {
    let passwordArray = [...password];
    let specialChars = ['!', '#', '$', '%', '&', '*'];
    // checks for capital letter
    const upperCase = password => /[A-Z]/.test(password)
    upperCase(password)
    if (upperCase){
        capLetter = document.getElementById('cap-span');
        capLetter.classList.toggle('cap-check');
    }
    // checks for number 
    if (passwordArray.find(char => /[0-9]/.test(char))) {
        num = document.getElementById('num');
        num.classList.toggle('num-check');
    }
    // check length
    if (passwordArray) {
        if (passwordArray.length >= 6 && passwordArray.length <= 12) {
            let lengthCheck = document.getElementById('length-check');
            lengthCheck.classList.toggle('length-check');
        }
    }
    // check for special character
    let isChecked = false
    if (passwordArray) {
        for (i = 0; i < passwordArray.length; i++){
            for (j = 0; j < specialChars.length; j++) {
                if (passwordArray[i] === specialChars[j]) {
                    if (isChecked === false) {
                        let specialChar = document.getElementById('special-char');
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

// clear input field and reset check marks
btn.addEventListener('click', () => input.value = '');


function printToConsole(message) {
    console.log(message);
}
// generate 6 digit code 
// verify that code once entered