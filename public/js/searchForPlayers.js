const isLocalhost =
    location.hostname === 'localhost' || location.hostname === '127.0.0.1';
const STORAGE_API_HOST = isLocalhost
    ? `http://localhost:4000`
    : `https://furryfireball-server.vercel.app`;

const websiteURL = `http://localhost:3001`;

let accessToken = localStorage.getItem('accessToken');
let refreshToken = localStorage.getItem('refreshToken');
let token;

if (refreshToken != null || refreshToken != "") {
    token = refreshToken
    console.log("refresh token:"+token)

}
if (accessToken != null && accessToken != "") {
    token = accessToken
    console.log(token)
}

window.addEventListener('DOMContentLoaded', function () {
    // window.localStorage.removeItem('removeFriendWithId');

    if(token === null || token === ""){
        window.location.href = "/"
    }
    else {
        // Nav Bar
        const backButton = document.getElementById('back');
        const searchInput = document.getElementById('search');
        const searchButton = document.getElementById('search-button');
        const friendRequest = document.getElementById('friend-request');
        const viewFriends = document.getElementById('view-friends');

        // Page Header
        const header = document.getElementById('we-found');

        // Section(Article) For Table
        const scrollView = document.getElementById('scroll-view');

        // All intractable controls (e.g. input, buttons, etc...)
        const controls = [
            backButton,
            searchInput,
            searchButton,
            friendRequest,
            viewFriends,
            scrollView
        ];

        fetch(`${STORAGE_API_HOST}/getUserId`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken + " " + refreshToken,
            },
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.error !== undefined) {
                    console.log(response.error);
                }
                //token expired
                if(response.error === "TokenExpiredError Not authorized"){
                    alert("Token is expired. Please re-login to access user information");
                    localStorage.removeItem("accessToken");
                    window.location.href = '/registerLogin';
                }
                else {
                    // window.localStorage.setItem('userId', response.user_id);
                }
            })
            .catch((error) => {
                //alert(error);
                alert(error)
                window.location.href = '/';
            })
        
        function createUserTable(user) {
            let table = document.createElement("table");
            table.innerHTML = `
                <tr>
                    <th class="add-friend"><img class="notification-icon" src="images/notification.svg" alt="notification-icon" />
                        <span class="add-friend">Add friend?</span>
                    </th>
                </tr>
                <tr>
                    <td class="friend-name">${user.username}</td>
                    <td class="send-request-button"><button class="send-request" id=${user.user_id} onClick="getUserId(this.id)">Send Request</button></td>
                </tr>
                `

            return table;
        }

        backButton.onclick = function() {
            history.back();
        }

        friendRequest.onclick = function() {
            window.location.href = '/friendRequest'
        }

        viewFriends.onclick = function() {
            window.location.href = '/friends'
        }

        searchButton.onclick = function() {
            const userNameInput = searchInput.value;
            // const userId = window.localStorage.getItem("userId");
            const myUrl = websiteURL + '/public/searchForPlayers.html';
            if (userNameInput === "") {
                loadUserData();
                return;
            }
            scrollView.innerHTML = `<h1 id="scroll-view-text">Loading...</h1>`;
            fetch(`${STORAGE_API_HOST}/users/user?userName=${userNameInput}`)
                .then((response) => {
                    if (response.status === 400) {
                        // return window.alert(`No user with id "${userId}" found!`);
                    }
                    else if (response.status === 403) {
                        return window.alert('No special characters, please!');
                    }
                    else if (response.status === 404) {
                        scrollView.innerHTML = `<h1 id="scroll-view-text" class="friend-not-found">No user(s) of username starting with "${userNameInput.trim()}"</h1>`;
                        throw(`No users having username starting with "${userNameInput.trim()}" found`);
                    }
                    return response.json();
                })
                .then((json) => {
                    scrollView.innerHTML = "";
                    if (json.error === undefined || json.error === null) {
                        console.log(json);
                        json.forEach((user) => {
                            console.log(user);
                            const newTable = createUserTable(user);
                            scrollView.appendChild(newTable);
                        });
                    }
                    else {
                        scrollView.innerHTML = `<h1 id="scroll-view-text">No user(s) with username starting with "${userNameInput.trim()}"</h1>`;
                        var error = JSON.stringify(json.error);
                        console.log(error);
                    }
                })
                .catch((error) => console.log(error))
                // .finally(() => enablePage());
            };

        function loadUserData() {
            // disablePage();
            scrollView.innerHTML = `<h1 id="scroll-view-text">Loading...</h1>`;
            fetch(`${STORAGE_API_HOST}/friends/suggestions`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + accessToken + " " + refreshToken
                }
            })
                .then((response) => {
                    if (response.error === 'TokenExpiredError Not Authorized') {
                        alert('Token is expired. Please re-login to access user information');
                        localStorage.removeItem('accessToken');
                        // window.location.href = '/';
                    }
                    else if (response.status === 400) {
                        // window.location.href = '/';
                        return window.alert(`No user with id found!`);
                    }
                    return response.json();
                })
                .then((json) => {
                    scrollView.innerHTML = "";
                    if (json.error === undefined || json.error === null) {
                        console.log(json);
                        json.forEach((user) => {
                            console.log(user);
                            const newTable = createUserTable(user);
                            scrollView.appendChild(newTable);
                        });
                    }
                    else {
                        scrollView.innerHTML = `<h1 id="scroll-view-text">You have added all users as friends</h1>`;
                        var error = JSON.stringify(json.error);
                        console.log(error);
                    }
                })
                .catch((error) => console.log(error))
                // .finally(() => enablePage());
        }

        // const userId = window.localStorage.getItem('userId');
        // if (userId) loadUserData(userId)
        
        $(document).ready(function() {
            loadUserData();
            $("body").on('click', '.send-request-button', () => {
                var newFriendIdString = window.localStorage.getItem('addFriendWithId');
                const newFriendId = parseInt(newFriendIdString);
                // var userId = window.localStorage.getItem('userId');
                // console.log(userId);
                
                fetch(`${STORAGE_API_HOST}/friendReq/send`, {
                    method: 'POST',
                    body: JSON.stringify({
                        second_userid : newFriendId
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + accessToken + " " + refreshToken
                    }
                })
                    .then((response) => {
                        if (response.error === 'TokenExpiredError Not Authorized') {
                            alert('Token is expired. Please re-login to access user information');
                            localStorage.removeItem('accessToken');
                            // window.location.href = '/';
                        }
                        else if (response.status === 400) {
                            // window.location.href = '/';
                            // return window.alert(`No user with id "${userId}" found!`);
                        }
                        return response.json();
                    })
                    .then((json) => {
                        scrollView.innerHTML = "";
                        if (json.error === undefined || json.error === null) {
                            console.log(json);
                            json.forEach((user) => {
                                console.log(user);
                                const newTable = createUserTable(user);
                                scrollView.appendChild(newTable);
                            });
                        }
                        else {
                            scrollView.innerHTML = `<h1 id="scroll-view-text">You have added all users as friends</h1>`;
                            var error = JSON.stringify(json.error);
                            console.log(error);
                        }
                    })
                    .catch((error) => console.log(error))
                    .finally(() => {
                        document.location.reload();
                    });
            });
        })
    }
})