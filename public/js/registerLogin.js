const isLocalhost =
    location.hostname === 'localhost' || location.hostname === '127.0.0.1';
const STORAGE_API_HOST = isLocalhost
    ? `http://localhost:4000`
    : `https://ades-host-server.herokuapp.com`;
const AUTH_SERVER_HOST = isLocalhost
    ? `http://localhost:4001`
    : ` https://ades-host-auth-server.herokuapp.com`;

let disablePage; // to make these functions as global
let enablePage;

window.addEventListener('DOMContentLoaded', function () {
    // sign in and sign up switch animation
    document
        .querySelector('.btn-sign-up')
        .addEventListener('click', function () {
            document
                .querySelector('.container')
                .classList.toggle('switch-signup');
        });

    document
        .querySelector('.btn-sign-in')
        .addEventListener('click', function () {
            document
                .querySelector('.container')
                .classList.toggle('switch-signup');
        });

    // Getting all the variables
    const signUpBtnLogin = document.querySelector('.btn-sign-up');
    const signInBtnSignUp = document.querySelector('.btn-sign-in');

    //---------- Music
    const controlMusic = document.querySelector('#musicControl');
    const audioPlay = document.querySelector('#audioPlay');
    controlMusic.addEventListener('click', function () {
        controlMusic.checked ? audioPlay.load() : audioPlay.pause();
    });
    // End of assign variables

    // All intractable controls (e.g. input, buttons, etc...)
    // a button can be disabled to prevent the user from clicking it. If a control is disabled, it cannot be selected. Important.
    const controls = [controlMusic, signUpBtnLogin, signInBtnSignUp];

    /**
     * Disable controls in page
     */
    disablePage = function () {
        controls.forEach((control) => (control.disabled = true));
    };

    /**
     * Enables controls in page
     */
    enablePage = function () {
        controls.forEach((control) => (control.disabled = false));
    };
});
