const isLocalhost =
    location.hostname === 'localhost' || location.hostname === '127.0.0.1';
const STORAGE_API_HOST = isLocalhost
    ? `http://localhost:4000`
    : `https://ades-host-server.herokuapp.com`;
const AUTH_SERVER_HOST = isLocalhost
    ? `http://localhost:4001`
    : ` https://ades-host-auth-server.herokuapp.com`;

window.addEventListener('DOMContentLoaded', function () {
    // Getting all the variables
    const passInput = document.querySelector('#resetPass');
    const confirmPassInput = document.querySelector('#resetPassConfirm');
    const resetBtn = document.querySelector('#resetBtn');
    // End of assign variables

    const controls = [passInput, confirmPassInput, resetBtn];

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

    //---------------------------------------------------------------------------
    const currentUrl = new URL(window.location.href);
    const email = currentUrl.searchParams.get('userEmail');
    const emailSecretToken = currentUrl.searchParams.get('emailSecretToken');
    if (!emailSecretToken || emailSecretToken == ' ') {
        alert('Verify your email first!');
        window.location.href = '/verifyEmail';
    } else {
        fetch(`${AUTH_SERVER_HOST}/verifyMailToken`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + emailSecretToken,
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                if (response.error) {
                    mailVerifyFail(response.error);
                } else {
                    mailVerifySuccess();
                }
            })
            .catch((error) => {
                alert(error.message);
            });
    }

    function mailVerifySuccess() {
        alert('Thanks for verify your email!');

        /**
         * Reset password
         */
        resetBtn.onclick = function (e) {
            e.preventDefault();
            disablePage();
            const password = passInput.value;
            const confirmPass = confirmPassInput.value;

            if (password === '' || confirmPass === '') {
                alert('Please provide valid password');
                enablePage();
            } else if (confirmPass !== password) {
                alert('Please provide same password to reset');
                enablePage();
            } else {
                const resetData = {
                    email: email,
                    password: passInput.value,
                };

                fetch(`${STORAGE_API_HOST}/resetPass`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(resetData),
                })
                    .then((response) => response.json())
                    .then((response) => {
                        if (response.error) {
                            alert(response.error);
                            window.location.href = '/verifyEmail';
                        } else {
                            alert(response.message);
                            // when user can reset password successfully
                            window.location.href = '/registerLogin';
                        }
                    })
                    .catch((error) => alert(error.message))
                    .finally(() => enablePage());
            }
        };
    }

    function mailVerifyFail(errMsg) {
        alert(errMsg);
        window.location.href = '/verifyEmail';
    }
});
