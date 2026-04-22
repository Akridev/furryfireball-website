require('dotenv').config();
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
    if (token === null || token === '') {
        window.location.href = '/';
    } else {
        // Nav Bar
        const backButton = document.getElementById('back');
        const searchInput = document.getElementById('search-button');
        const searchButton = document.getElementById('search-button');

        // Page Header
        const header = document.getElementById('my-friends');

        // Section(Article) For Table
        const scrollView = document.getElementById('scroll-view');

        // Hidden field
        const textInput = document.getElementById('hidden-input');

        // All intractable controls (e.g. input, buttons, etc...)
        const controls = [backButton, searchInput, searchButton, scrollView];

        console.log(controls);

        function disablePage() {
            controls.forEach((control) => (control.disabled = true));
        }

        function enablePage() {
            controls.forEach((control) => (control.disabled = false));
        }

        const userIdObj = {
            idArr: new Array(),
        };

        function getReq() {
            disablePage();
            fetch(`${STORAGE_API_HOST}/friendReqs`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + accessToken + ' ' + refreshToken,
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log(json);
                    console.log(json);
                    if (json.data) {
                        var array = new Array();
                        var i = 0;
                        json.data.forEach((frObj) => {
                            console.log(frObj);
                            //compile the data needed for the card creation

                            let frData = {
                                id: i,
                                name: frObj.username,
                            };
                            i++;
                            array.push(frObj.user_id);
                            //create the card and save the html output
                            let frItem = createfrItem(frData);

                            //add the card as a child to the parent container(id=fr-list)
                            $('#scroll-view').append(frItem);
                        });

                        userIdObj.idArr = array;
                    } else {
                        $('#scroll-view').append(
                            `<div><h1>No friend requests</h1></div>`
                        );
                    }
                })
                .catch((error) => alert(error.message))
                .finally(() => {
                    let rejBtns = document.querySelectorAll('.reject');
                    let accBtns = document.querySelectorAll('.accept');

                    for (let i = 0; i < rejBtns.length; i++) {
                        rejBtns[i].onclick = function () {
                            console.log(userIdObj.idArr[rejBtns[i].id]);
                            rejectReq(
                                rejBtns[i].id,
                                userIdObj.idArr[rejBtns[i].id],
                                rejBtns,
                                accBtns
                            );
                        };
                    }

                    for (let i = 0; i < accBtns.length; i++) {
                        accBtns[i].onclick = function () {
                            console.log(userIdObj.idArr[accBtns[i].id]);
                            // $(`#${accBtns[i].id}`).remove()
                            acceptReq(
                                accBtns[i].id,
                                userIdObj.idArr[accBtns[i].id],
                                rejBtns,
                                accBtns
                            );
                        };
                    }

                    enablePage();
                });
        }

        getReq();

        backButton.onclick = function () {
            history.back();
        };

        function rejectReq(btnId, id, rejBtns, accBtns) {
            disablePage();
            rejBtns.forEach((rejBtn) => (rejBtn.disabled = true));
            accBtns.forEach((accBtn) => (accBtn.disabled = true));
            fetch(`${STORAGE_API_HOST}/friendReq/reject`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + accessToken + ' ' + refreshToken,
                },
                body: JSON.stringify({
                    second_userid: id,
                }),
            })
                .catch((error) => alert(error.message))
                .finally(() => {
                    enablePage();
                    rejBtns.forEach((rejBtn) => (rejBtn.disabled = false));
                    accBtns.forEach((accBtn) => (accBtn.disabled = false));
                    $(`#${btnId}`).remove();
                });
        }

        function acceptReq(btnId, id, rejBtns, accBtns) {
            disablePage();
            rejBtns.forEach((rejBtn) => (rejBtn.disabled = true));
            accBtns.forEach((accBtn) => (accBtn.disabled = true));
            fetch(`${STORAGE_API_HOST}/friendReq/accept`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + accessToken + ' ' + refreshToken,
                },
                body: JSON.stringify({
                    second_userid: id,
                }),
            })
                .then((response) => response.json())
                .then((json) => {
                    if (json.message == 'Delete successful!')
                        fetch(`${STORAGE_API_HOST}/friendReq/accept`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization:
                                    'Bearer ' +
                                    accessToken +
                                    ' ' +
                                    refreshToken,
                            },
                            body: JSON.stringify({
                                second_userid: id,
                            }),
                        })
                            .then((response) => response.json())
                            .then((json) => {
                                console.log(json);
                            })
                            .catch((error) => alert(error.message));
                })
                .catch((error) => alert(error.message))
                .finally(() => {
                    enablePage();
                    rejBtns.forEach((rejBtn) => (rejBtn.disabled = false));
                    accBtns.forEach((accBtn) => (accBtn.disabled = false));
                    $(`#${btnId}`).remove();
                });
        }

        $('#scroll-view').delegate('#accept', 'click', function () {
            var index = $(this).index() + 1;
            // var index = $(this).index();
            alert('Index: ' + index);
        });
    }
});

function createfrItem(user) {
    let frItem = `
    <table id=${user.id}>
        <tr>
            <th class="add-friend"><img class="notification-icon" src="images/notification.svg" alt="notification-icon" />
                <span class="add-friend">Add friend?</span>
            </th>
        </tr>
        <tr>
            <td class="friend-name">${user.name}</td>
            <td><a class="button accept" id=${user.id}>Accept</a></td>
            <td><a class="button reject" id=${user.id}>Reject</a></td>
        </tr>
    </table>
    
    `;

    return frItem;
}
