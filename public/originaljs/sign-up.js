/**
 * Constant variables.
 */
const batmanAnimation = document.getElementById('batmanImg');
const batmanSec = document.getElementById('batmanImg');

/**
 * This function helps with input validation from the forms to ensure user
 * inputs values that match our patterns and minimum requirements.
 * 
 * @returns true if the inputted values are invalid.
 */
function clientInputValidation() {
    let validated = false;
    const phoneLength = $("#phone").val();
    if (phoneLength.length !== 10) {
        window.scrollTo(0, document.body.scrollHeight);
        const errorMessage = "Your phone number must be of length 10";
        displayError(errorMessage);
    } else if (!isEmail($("#email").val())) {
        window.scrollTo(0, document.body.scrollHeight);
        const errorMessage = "Please follow this email pattern: example@email.com";
        displayError(errorMessage);
    } else if (inputValidation($("#userType").val())) {
        window.scrollTo(0, document.body.scrollHeight);
        const errorMessage = "There are empty fields";
        displayError(errorMessage);
    } else if (passwordValidation()) {
        window.scrollTo(0, document.body.scrollHeight);
        const errorMessage = "Password must be at least 5 and no more than 10 characters long";
        displayError(errorMessage);
    } else if (negativeValidation()) {
        window.scrollTo(0, document.body.scrollHeight);
        const errorMessage = "Experience or cost of session cannot be less than 0";
        displayError(errorMessage);
    } else {
        validated = true;
    }
    return validated;
}

/**
 * Displays error messages for duplicate records or success.
 * 
 * @param {*} data as a JSON object
 */
function handleSignUpResponse(data) {
    switch(data) {
        case "existingEmail":
            displayError("A user with that email already exists");
            break;
        case "existingPhone":
            displayError("A user with that phone number already exists");
            break;
        case "existingUsername":
            displayError("A user with that username already exists");
            break;
        case "login":
            document.getElementById("signUpErrorMessage").style.display = 'none';
            document.getElementById('signupSuccessModal').style.display = 'flex';
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                window.location = '/login';
            }, 2500);
            break;
    }
}

/**
 * AJAX call that signs up the user if input validations and duplicate records are cleared.
 */
$('#signupBtn').click(() => {
    if (clientInputValidation()) {
        $.ajax({
            url: '/sign-up',
            type: 'POST',
            data: {
                firstname: $("#firstname").val().charAt(0).toUpperCase() + $("#firstname").val().substring(1),
                lastname: $("#lastname").val().charAt(0).toUpperCase() + $("#lastname").val().substring(1),
                username: $("#username").val().toLowerCase(),
                phone: $("#phone").val(),
                email: $("#email").val().toLowerCase(),
                userType: $("#userType").val(),
                yearsExperience: $("#yearsExperience").val(),
                sessionCost: $("#sessionCost").val(),
                password: $("#password").val(),
            },
            success: handleSignUpResponse
        });
    }
});

/**
 * Set for every second.
 */
setInterval(eastereEgg, 1000);

/**
 * Easter egg function.
 */
let doOnce = false;
/**
 * This function plays an animation when the username field includes the word 'batman'.
 */
function eastereEgg() {
    $('#username').keyup(function () {
        const userField = $(this).val().toLowerCase();
        if (userField.includes('batman') && !doOnce) {
            window.scrollTo(0, document.body.scrollHeight);
            batmanAnimation.classList.add('startAnimation');
            document.getElementById("audio").play();
            document.getElementById("audio").volume = 1;
            doOnce = true;
        }
    });
}

/**
 * Checks if the email matches the email pattern.
 * 
 * @param {*} email as an input value
 * @returns true if the email is valid, otherwise returns false.
 */
function isEmail(email) {
    const regex = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

/**
 * Helper function that checks the input validations on the fields.
 * 
 * @param {*} userType as an input value
 * @returns true if the input values are invalid
 */
function inputValidation(userType) {
    const inpObjFirstName = document.getElementById("firstname");
    const inpObjLastName = document.getElementById("lastname");
    const inpObjUsername = document.getElementById("username");
    const inpObjExperience = document.getElementById("yearsExperience");
    const inpObjSession = document.getElementById("sessionCost");
    if (userType === "therapist") {
        return !(
            inpObjFirstName.checkValidity() &&
            inpObjLastName.checkValidity() &&
            inpObjUsername.checkValidity() &&
            inpObjExperience.checkValidity() &&
            inpObjSession.checkValidity()
        );
    } else {
        return !(
            inpObjFirstName.checkValidity() &&
            inpObjLastName.checkValidity() &&
            inpObjUsername.checkValidity()
        );
    }
}

/**
 * Checks the input validation for the password field.
 * 
 * @returns true if the input value is invalid
 */
function passwordValidation() {
    const inpObjPassword = document.getElementById("password");
    const passwordValue = inpObjPassword.value;
    return (passwordValue.length < 5 || passwordValue.length > 20);
}

/**
 * Checks the input validation for sessionCost and yearsExperience fields.
 * 
 * @returns true if the fields are invalid
 */
function negativeValidation() {
    const yearsExp = document.getElementById("yearsExperience").value;
    const cost = document.getElementById("sessionCost").value;
    return yearsExp < 0 || cost < 0;
}


/**
 * 
 * Display therapy field options if usertype is a therapist
 * 
 * @param {*} selectObject as event listener
 */
function showTherapyOptions(selectObject) {
    const value = selectObject.value;
    const therapyFieldOptions = document.querySelectorAll('.therapistOptions');
    if (value == 'therapist') {
        for (var i = 0; i < therapyFieldOptions.length; i++) {
            therapyFieldOptions[i].style.display = 'flex';
        }
    } else {
        for (var i = 0; i < therapyFieldOptions.length; i++) {
            therapyFieldOptions[i].style.display = 'none';
        }
    }
}

/**
 * Trigger click function for enter key for all input fields.
 */
const input = document.querySelectorAll(".form-control");
for (var i = 0; i < input.length; i++) {
    input[i].addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            document.getElementById("signupBtn").click();
        }
    });
}
