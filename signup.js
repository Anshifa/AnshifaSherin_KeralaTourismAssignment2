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





function ShowFull(input, message)
{
    const passControl = input.parentElement;
    passControl.className = "pass-control full";
    const small = passControl.querySelector('small');
    small.innerText = message;
}
function ShowHigh(input, message)
{
    const passControl = input.parentElement;
    passControl.className = "pass-control high";
    const small = passControl.querySelector('small');
    small.innerText = message;
}
function ShowMedium(input, message)
{
    const passControl = input.parentElement;
    passControl.className = "pass-control medium";
    const small = passControl.querySelector('small');
    small.innerText = message;
}
function ShowLow(input, message)
{
    const passControl = input.parentElement;
    passControl.className = "pass-control low";
    const small = passControl.querySelector('small');
    small.innerText = message;
}

function CheckStrength(input)
{
    const full = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const high = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const medium =/^(?=.*[a-z])(?=.*[A-Z])[A-Za-z]{8,}$/;
    const low = /^(?=.*[a-z])[a-z]{8,}$/;
    if(full.test(input.value.trim()))
    {
        ShowFull(input, "Perfect Password!!");
    }
    else if(high.test(input.value.trim()))
    {
        ShowHigh(input, "Good Password!!");
    }
    else if(medium.test(input.value.trim()))
    {
        ShowMedium(input, "Not bad Password");
    }
    else if(lowl.test(input.value.trim()))
    {
        ShowLow(input, "Worst Password");
    }
    
}



form.addEventListener('submit', function(e)
{
  e.preventDefault();

  CheckRequired([username, email, phone, password, password2 ]);
  CheckLenght(username, 3, 15);
  CheckLenght(password, 8, 25);
  CheckEmail(email);
  CheckPhone(phone);
  CheckStrength(password);
  CheckPasswordsMatch(password, password2);
});
