const emailField = document.querySelector("#emailField");
const emailFeedBackArea = document.querySelector(".emailFeedBackArea");
const usernameField = document.querySelector("#usernameField");
const feedBackField = document.querySelector(".invalid_feedback");
const usernameSuccessOutput = document.querySelector(".usernameSuccessOutput");
const showPasswordToggle = document.querySelector(".showPasswordToggle");
const passwordField = document.querySelector("#passwordField");
const submitBtn = document.querySelector(".submit-btn");

const handleToggleInput = (e) => {
    if (showPasswordToggle.textContent === 'SHOW') {
        showPasswordToggle.textContent = "HIDE";
        
        passwordField.setAttribute("type", "text");
    }
    else { 
        showPasswordToggle.textContent = 'SHOW';
        passwordField.setAttribute("type", "password");
    }
};


showPasswordToggle.addEventListener('click', handleToggleInput);


emailField.addEventListener('keyup', (e) => {

    emailField.classList.remove("is_invalid");
    emailFeedBackArea.style.display = "none";

    if (e.target.value.length > 0) {
        fetch("/accounts/validate-email/", {
            body: JSON.stringify({ email: e.target.value }),
            method: "POST",
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.email_error) {
                submitBtn.disabled = true;
                emailField.classList.add("is-invalid");
                emailFeedBackArea.style.display = 'block';
                emailFeedBackArea.innerHTML = `<p>${data.email_error}</p>`;
            }
            else {
                submitBtn.removeAttribute('disabled');
            }
        });
    }
});


usernameField.addEventListener('keyup', (e) => {
    const usernameVal = e.target.value;
    usernameSuccessOutput.style.display = "block";
    usernameSuccessOutput.textContent = `Checking ${usernameVal}`;

    if (usernameVal.length > 0) {
        fetch("/accounts/validate-username", {
            body: JSON.stringify({ username: usernameVal }),
            method: "POST",
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("data", data);
            usernameSuccessOutput.style.display = "none";
            if (data.username_error) {
                submitBtn.disabled = true;
                usernameField.classList.add("is-invalid");
                feedBackField.style.display = 'block';
                feedBackField.innerHTML = `<p>${data.username_error}</p>`;
            }
            else {
                submitBtn.removeAttribute('disabled');
            }
        });
    }
});