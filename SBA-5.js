//creating DOM Elements
const postFormInput = document.getElementById('postForm')
const titleInput = document.getElementById('title')
const contentInput = document.getElementById('content')
const submitButtonInput = document.getElementById('submitButton')
const popostsListInput = document.getElementById('postsList')

//span error DOM elements
const titleErrorInput = document.getElementById('titleError')
const contentErrorInput = document.getElementById('contentError')

// load posts from locastorage
document.addEventListener("DOMContentLoaded", function(){
    const Storage = localStorage.getItem('postForm')
    
    if (postFormeLocalStorage){
        postFormInput.value = postFormeLocalStorage;
    }
})


postFormInput.addEventListener("submit", function (event) {
  event.preventDefault();

  // Full form validity check
  if (postFormInput.checkValidity()) {
      localStorage.setItem("postForm", postFormInput.value); 

    // Success message
    const successMessage = document.createElement("div");
    successMessage.textContent =
      "Registered successfully! Welcome, " + usernameInput.value + "!";
    successMessage.classList.add("success-message");
    messageContainer.appendChild(successMessage);
    setTimeout(() => {
      successMessage.remove();
    }, 5000);

    registrationForm.reset();
  } else {
    registrationForm.reportValidity();
  }
});

