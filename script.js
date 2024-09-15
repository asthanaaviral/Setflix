const usernameForm = document.querySelector("#username-form");

usernameForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    let username = document.querySelector("#username-input").value;
    let defaultGenre = document.querySelector("#select-default").value;
    localStorage.setItem("username", username);
    localStorage.setItem("defaultGenre", defaultGenre);
    usernameForm.submit();
})