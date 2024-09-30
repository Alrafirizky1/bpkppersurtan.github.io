document.addEventListener("DOMContentLoaded", function() {
    // Handle the login form submission
    const loginForm = document.getElementById("loginform");
    const loginButton = document.getElementById("btn-login");
    const loginAlert = document.getElementById("login-alert");

    loginButton.addEventListener("click", function(event) {
        event.preventDefault();

        // Grab username and password input values
        const username = document.getElementById("login-username").value;
        const password = document.getElementById("login-password").value;

        // Simple validation (you can replace this with server-side validation)
        if (username === "" || password === "") {
            loginAlert.style.display = "block";
            loginAlert.innerHTML = "NIP dan password harus diisi!";
        } else {
            loginAlert.style.display = "none";
            // Simulate login action (replace this with actual server-side authentication)
            alert("Login Berhasil! Username: " + username);
            // Redirect or further login logic goes here
        }
    });
});
