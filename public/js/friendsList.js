const API_SERVER = process.env.API_SERVER;
const isLocalhost =
    location.hostname === 'localhost' || location.hostname === '127.0.0.1';
const STORAGE_API_HOST = isLocalhost
    ? `http://localhost:4000`
    : API_SERVER;

const websiteURL = `http://localhost:3001`;

let accessToken = localStorage.getItem('accessToken');
let refreshToken = localStorage.getItem('refreshToken');
let token;

if (refreshToken != null || refreshToken != '') {
    token = refreshToken;
    console.log('refresh token:' + token);
}
if (accessToken != null && accessToken != '') {
    token = accessToken;
    console.log(token);
}

window.addEventListener('DOMContentLoaded', function () {
    // window.localStorage.removeItem('addFriendWithId');

    if (token === null || token === '') {
        window.location.href = '/';
    } else {
        // Nav Bar
        const backButton = document.getElementById('back');
        const searchInput = document.getElementById('search');
        const searchButton = document.getElementById('search-button');
        const friendRequest = document.getElementById('friend-request');
        const addFriend = document.getElementById('add-friend');

        // Page Header
        const header = document.getElementById('my-friends');

        // Section(Article) For Table
        const scrollView = document.getElementById('scroll-view');

        // All intractable controls (e.g. input, buttons, etc...)
        const controls = [
            backButton,
            searchInput,
            searchButton,
            friendRequest,
            addFriend,
            scrollView,
        ];

        fetch(`${STORAGE_API_HOST}/getUserId`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken + ' ' + refreshToken,
            },
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.error !== undefined) {
                    console.log(response.error);
                }
                //token expired
                if (response.error === 'TokenExpiredError Not authorized') {
                    alert(
                        'Token is expired. Please re-login to access user information'
                    );
                    localStorage.removeItem('accessToken');
                    window.location.href = '/registerLogin';
                } else {
                    // window.localStorage.setItem('userId', response.user_id);
                }
            })
            .catch((error) => {
                //alert(error);
                alert(error);
                window.location.href = '/';
            });

        function createFriendTable(user) {
            let table = document.createElement('table');
            table.innerHTML = `
                <tr>
                    <th class="friend-name">${user.username}</th>
                    <th class="remove-button"><button class="remove-friend" id=${user.user_id} onClick="getUserId(this.id)">Remove Friend</button></th>
                </tr>
                <tr>
                    <td class="friend-score">Score: ${user.highest_score}</td>
                    <td class="friend-time">Time: ${user.longest_time_survived}</td>
                </tr>
                `;

            return table;
        }

        backButton.onclick = function () {
            window.location.href = '/home';
        };

        friendRequest.onclick = function () {
            window.location.href = '/friendRequest';
        };

        addFriend.onclick = function () {
            window.location.href = '/search';
        };

        searchButton.onclick = function () {
            const friendNameInput = searchInput.value;
            // const userId = window.localStorage.getItem('userId');
            const myUrl = websiteURL + '/public/friendsList.html';
            myUrl.searchParams.set('friendName', friendNameInput);
            if (friendNameInput === '') {
                loadFriendData(userId);
                return;
            }
            // disablePage();
            console.log(myUrl.searchParams.toString());
            scrollView.innerHTML = `<h1 id="scroll-view-text">Loading...</h1>`;
            fetch(
                `${STORAGE_API_HOST}/friends/friend?${myUrl.searchParams.toString()}`
            )
                .then((response) => {
                    if (response.status === 400) {
                        // return window.alert(
                        //     `No user with id "${userId}" found!`
                        // );
                    } else if (response.status === 403) {
                        return window.alert('No special characters, please!');
                    } else if (response.status === 404) {
                        // scrollView.innerHTML = `<h1 id="scroll-view-text" class="friend-not-found">No friend(s) of username starting with "${friendNameInput.trim()}"</h1>`;
                        // throw `No friends found for user with id "${userId}"`;
                    }
                    return response.json();
                })
                .then((json) => {
                    scrollView.innerHTML = '';
                    if (json.error === undefined || json.error === null) {
                        console.log(json);
                        json.forEach((user) => {
                            console.log(user);
                            const newTable = createFriendTable(user);
                            scrollView.appendChild(newTable);
                        });
                    } else {
                        scrollView.innerHTML = `<h1 id="scroll-view-text">You do not have any friends now</h1>`;
                        var error = JSON.stringify(json.error);
                        console.log(error);
                    }
                })
                .catch((error) => console.log(error));
            // .finally(() => enablePage());
        };

        function loadFriendData() {
            // disablePage();
            scrollView.innerHTML = `<h1 id="scroll-view-text">Loading...</h1>`;
            fetch(`${STORAGE_API_HOST}/users/friends`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + accessToken + ' ' + refreshToken,
                },
            })
                .then((response) => {
                    if (response.error === 'TokenExpiredError Not Authorized') {
                        alert(
                            'Token is expired. Please re-login to access user information'
                        );
                        localStorage.removeItem('accessToken');
                        // window.location.href = '/';
                    } else if (response.status === 400) {
                        // window.location.href = '/';
                        // return window.alert(
                        //     `No user with id "${userId}" found!`
                        // );
                    }
                    return response.json();
                })
                .then((json) => {
                    scrollView.innerHTML = '';
                    if (json.error === undefined || json.error === null) {
                        console.log(json);
                        json.forEach((user) => {
                            console.log(user);
                            const newTable = createFriendTable(user);
                            scrollView.appendChild(newTable);
                        });
                    } else {
                        scrollView.innerHTML = `<h1 id="scroll-view-text">You do not have any friends now</h1>`;
                        var error = JSON.stringify(json.error);
                        console.log(error);
                    }
                })
                .catch((error) => console.log(error));
            // .finally(() => enablePage());
        }

        // const userId = window.localStorage.getItem('userId');
        // if (userId) loadFriendData(userId);

        $(document).ready(function () {
            loadFriendData();
            $('body').on('click', '.remove-friend', () => {
                var friendIdString = window.localStorage.getItem('removeFriendWithId');
                const friendId = parseInt(friendIdString);
                // var userId = window.localStorage.getItem('userId');
                // console.log(userId);

                fetch(`${STORAGE_API_HOST}/friends/${friendId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:
                            'Bearer ' + accessToken + ' ' + refreshToken,
                    },
                })
                    .then((response) => {
                        if (
                            response.error ===
                            'TokenExpiredError Not Authorized'
                        ) {
                            alert(
                                'Token is expired. Please re-login to access user information'
                            );
                            localStorage.removeItem('accessToken');
                            // window.location.href = '/';
                        } else if (response.status === 400) {
                            // window.location.href = '/';
                            // return window.alert(
                            //     `No user with id "${userId}" found!`
                            // );
                        }
                        return response.json();
                    })
                    .then((json) => {
                        scrollView.innerHTML = '';
                        if (json.error === undefined || json.error === null) {
                            console.log(json);
                            json.forEach((user) => {
                                console.log(user);
                                const newTable = createFriendTable(user);
                                scrollView.appendChild(newTable);
                            });
                        } else {
                            scrollView.innerHTML = `<h1 id="scroll-view-text">You do not have any friends now</h1>`;
                            var error = JSON.stringify(json.error);
                            console.log(error);
                        }
                    })
                    .catch((error) => console.log(error))
                    .finally(() => {
                        document.location.reload();
                    });
            });
        });
    }
});
