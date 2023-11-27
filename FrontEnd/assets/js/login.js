"use strict";

// ******************** CONSTANTS ********************
const URL = "http://localhost:5678/api/users/login";

const userEmail     = document.querySelector("#email");
const userPassword  = document.querySelector("#password");

// ******************** VARIABLES ********************

// ******************** FUNCTIONS ********************
function addLoginListener() {
  const loginForm = document.querySelector("#login-btn");
  loginForm.addEventListener("click", function(event) {
    event.preventDefault();

    const user = {
      email: userEmail.value,
      password: userPassword.value
    };
    
    const UsefulCharges = JSON.stringify(user)

    getToken(UsefulCharges);
})}

function getToken(UsefulCharges) {
  fetch(URL, {
    method: "POST",
    body: UsefulCharges,
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => {
    if (response.status === 200) {
      response.json().then(loginResponse => {
        let userToken = loginResponse.token
        window.localStorage.setItem("token", userToken)
        window.location.href = "index.html"
      })
    } else {
      const error = document.querySelector("#login p")
      error.classList.remove("hidden")
      window.localStorage.removeItem("token")
    }
  })
}

// ******************** MAIN ********************
addLoginListener();