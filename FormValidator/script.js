const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//show input error msg
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

//check valid email
function isValidEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input)
    } else {
        showError(input, 'Email is not valid')
    }
}

//check required feilds
function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getFeildName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
};

//check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFeildName(input)} must be atleast ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${getFeildName(input)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
}

//get feild name 
function getFeildName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

//ckeck passwords match
function checkpasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Passwords do not match')
    }
}

//event listeners
form.addEventListener('submit', function (e) {
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 4, 15);
    checkLength(password, 6, 20);
    isValidEmail(email);
    checkpasswordsMatch(password, password2);
});