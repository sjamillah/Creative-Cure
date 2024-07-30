/**
 * 
 * This function displays error messages for logging in, if there are any. Otherwise,
 * it will relocate the user to admin-dashboard if the logged in user is administrator
 * else it will start their session (express session) and redirect them to home page.
 * 
 * @param {*} data as object
 */
function loginHandler(data) {
    if (data === "NoUserFound") {
      document.getElementById("loginErrorMessage").textContent = "User not found.";
    } else if (data === "IncorrectPassword") {
      document.getElementById("loginErrorMessage").textContent = "Incorrect password.";
    } else {
      document.getElementById("loginErrorMessage").textContent = "";
      document.getElementById('loginSuccessModal').style.display = 'flex';
      document.body.style.overflow = 'hidden';
  
      // Redirect based on user type
      const redirectUrl = data.isAdmin ? '/admin-dashboard' : '/';
  
      setTimeout(() => {
        window.location = redirectUrl;
      }, 2500);
    }
  
    // Show the error message container
    document.getElementById("loginErrorMessage").style.display = 'block';
  }
  
  /**
   * This onclick function will call the /login AJAX call.
   */
  $('#loginBtn').click(() => {
    /**
     * AJAX that sends the values from email and password fields to /login and if the
     * email and password match the databse records call the helper function.
     */
    $.ajax({
      url: '/login',
      type: 'POST',
      data: {
        email: $("#email").val(),
        password: $("#password").val(),
      },
      success: loginHandler,
      error: (error) => {
        console.error('Login error:', error);
        // Handle general login errors here
        document.getElementById("loginErrorMessage").textContent = "An error occurred. Please try again.";
        document.getElementById("loginErrorMessage").style.display = 'block';
      }
    })
  });
  
  /**
   * Trigger click function for enter key for all input fields.
   */
  const input = document.querySelectorAll(".form-control");
  for (var i = 0; i < input.length; i++) {
    input[i].addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        document.getElementById("loginBtn").click();
      }
    });
  }
  