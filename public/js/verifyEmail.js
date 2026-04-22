require('dotenv').config();
const API_SERVER = process.env.API_SERVER;
const isLocalhost =
    location.hostname === 'localhost' || location.hostname === '127.0.0.1';
const STORAGE_API_HOST = isLocalhost
    ? `http://localhost:4000`
    : API_SERVER;

window.addEventListener('DOMContentLoaded', function () {
    // Getting all the variables
    const mailToSend = document.querySelector('#mailToSend');
    const sendEmailBtn = document.querySelector('#sendEmail');
    const loginBtn = document.querySelector('#loginBtn');
    // End of assign variables

    // All intractable controls (e.g. input, buttons, etc...)
    // a button can be disabled to prevent the user from clicking it. If a control is disabled, it cannot be selected. Important.
    const controls = [mailToSend, sendEmailBtn, loginBtn];

    /**
     * Disable controls in page
     */
    function disablePage() {
        controls.forEach((control) => (control.disabled = true));
    }

    /**
     * Enables controls in page
     */
    function enablePage() {
        controls.forEach((control) => (control.disabled = false));
    }

    /**
     * Send reset email
     */
    sendEmailBtn.onclick = function (e) {
        e.preventDefault();
        disablePage();
        const email = mailToSend.value;
        if (email == '' || !email) {
            alert('Please provide valid email!');
        } else {
            fetch(`${STORAGE_API_HOST}/verifyMail?email=${email}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((response) => {
                    if (response.error) {
                        // when the email does not registered account yet
                        alert(response.error);
                        window.location.href = '/registerLogin';
                    } else {
                        // when user can be found by email successfully
                        alert(response.message);
                    }
                })
                .catch((error) => {
                    alert(error.message);
                })
                .finally(() => enablePage());
        }
    };

    /**
     * Go login page
     */
    loginBtn.onclick = function () {
        window.location.href = '/';
    };
});
