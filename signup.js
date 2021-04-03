const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");


//Show input error message
function ShowError(input, message) 
{
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//Show input success
function ShowSuccess(input) 
{
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

//Check email
function CheckEmail(input) 
{
    const char = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (char.test(input.value.trim())) 
    {
        ShowSuccess(input);
    }
    else 
    {
        ShowError(input, "Email is not valid");
    }
}

//Check Phone number
function CheckPhone(input)
{
    const chars = /^([1-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9])/;
    var num = 10;
    if((input.value.length === num) && (chars.test(input.value.trim())))
    {
        ShowSuccess(input);
    }
    else
    {
        ShowError(input, "Phone number is not valid");
    }
}

function CheckRequired(inputErr) 
{
    inputErr.forEach(function(input)
    {
        if (input.value.trim() === "") 
        {
            ShowError(input, `${getFieldName(input)} is required`);
        }
        else 
        {
            ShowSuccess(input);
        }
    });
}
  
function CheckLenght(input, min, max) 
{
    if (input.value.length < min) 
    {
        ShowError(input, `${getFieldName(input)} must be at least ${min} characters`);
    }
    else if(input.value.length > max)
    {
        ShowError(input, `${getFieldName(input)} must be less then ${max} characters`);
    }
    else 
    {
        ShowSuccess(input);
    }
}


function CheckPasswordsMatch(input1,input2) 
{
    if (input1.value !== input2.value) 
    {
        ShowError(input2, "Password do not match");
    }
}

function getFieldName(input) 
{
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

var strength = { 0:"Worst", 1:"Bad", 2:"Weak", 3:"Good", 4:"Strong"}
var passwrd = document.getElementById('password');
var meter = document.getElementById('password-strength-meter');
var text = document.getElementById('password-strength-text');
password.addEventListener('input', function()
{
    var val = passwrd.value;
    var result = zxcvbn(val);
    meter.value = result.score;
    if(val !== "")
    {
        text.innerHTML = "Strength: " + strength[result.score];
    }
    else
    {
        text.innerHTML = "";
    }
});

form.addEventListener('submit', function(e)
{
  e.preventDefault();

  CheckRequired([username, email, phone, password, password2 ]);
  CheckLenght(username, 3, 15);
  CheckLenght(password, 8, 25);
  CheckEmail(email);
  CheckPhone(phone);
  CheckPasswordsMatch(password, password2);
});