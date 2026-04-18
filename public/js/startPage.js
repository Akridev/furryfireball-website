const isLocalhost =
    location.hostname === 'localhost' || location.hostname === '127.0.0.1';
const STORAGE_API_HOST = isLocalhost
    ? `http://localhost:4000`
    : `https://ades-host-server.herokuapp.com`;
const AUTH_SERVER_HOST = isLocalhost
    ? `http://localhost:4001`
    : ` https://ades-host-auth-server.herokuapp.com`;

window.addEventListener('DOMContentLoaded', function () {
    // checking if logged in, regenerate token---------------------------------------------
    function verifyIfLoggedIn() {
        if (localStorage.getItem('accessToken')) {
            // got valid accessToken
            window.location.href = '/home';
        } else if (localStorage.getItem('refreshToken')) {
            // no accessToken but got refreshToken
            regenerateAccessToken(); // regenerate if have refresh token
        } else {
            // dont have both token
            window.location.href = '/registerLogin';
        }
    }

    function regenerateAccessToken() {
        const refreshToken = localStorage.getItem('refreshToken');
        fetch(`${AUTH_SERVER_HOST}/regeToken`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + refreshToken,
            },
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.error) {
                    console.error(response.error);
                    alert(
                        'Not able to regenerate access token! Please login again!'
                    );
                    localStorage.removeItem('refreshToken');
                    window.location.href = '/registerLogin';
                } else {
                    localStorage.setItem(
                        'accessToken',
                        response.newAccessToken
                    );
                    window.location.href = '/home';
                }
            })
            .catch((error) => alert(error.message));
    }
    //-------------------------------------------------------------------

    // Getting all the variables
    const startGameBtn = document.querySelector('#startGame');
    const guestPlayBtn = document.querySelector('#guestBtn');
    // End of assign variables

    /**
     * Go register login page
     */
    startGameBtn.onclick = function (e) {
        e.preventDefault();
        verifyIfLoggedIn();
    };

    guestPlayBtn.onclick = function (e) {
        e.preventDefault();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/home';
    };
});
