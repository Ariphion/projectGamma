document.addEventListener("DOMContentLoaded", function () {
    const authForms = document.querySelectorAll(".auth-form");
    const successForms = document.querySelectorAll(".contact-form, .styled-form");
    const recoveryButton = document.querySelector(".lost-password");

    authForms.forEach(function (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const buttonText = event.submitter.textContent.trim().toLowerCase();
            const action = buttonText.includes("register") ? "Code sent to email!" : "Login";

            alert(action + " success!");
        });
    });

    if (recoveryButton) {
        recoveryButton.addEventListener("click", function () {
            const emailInput = document.querySelector("#login-user");

            if (!emailInput.value.trim()) {
                emailInput.reportValidity();
                return;
            }

            alert("Recovery instructions sent to email.");
        });
    }

    successForms.forEach(function (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("Success!");
            form.reset();
        });
    });
});
