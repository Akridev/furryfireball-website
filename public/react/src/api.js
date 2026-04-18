const isLocalhost =
    location.hostname === 'localhost' || location.hostname === '127.0.0.1';
const STORAGE_API_HOST = isLocalhost
    ? `http://localhost:4000`
    : `https://ades-host-server.herokuapp.com`;
const AUTH_SERVER_HOST = isLocalhost
    ? `http://localhost:4001`
    : ` https://ades-host-auth-server.herokuapp.com`;

let accessToken = localStorage.getItem('accessToken');
let refreshToken = localStorage.getItem('refreshToken');

export function checkAccessToken(accessToken) {
    if (accessToken != null && accessToken != '') {
        localStorage.setItem('accessToken', accessToken);
    }
}

export function HighScore() {
    const url = new URL(`/game/highScore`, STORAGE_API_HOST);

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken + ' ' + refreshToken,
        },
    })
        .then((response) => response.json())
        .then((response) => {
            if (response.error === 'TokenExpiredError Not authorized') {
                alert('Your session has expired. Please login again');
                localStorage.removeItem('accessToken');
                window.location.href = '/registerLogin';
            }
            checkAccessToken(response.accessToken);
            return response.score;
        })
        .catch((err) => {
            console.log(err);
            return err;
        });
}

export function getUserDetails() {
    const url = new URL(`/getUser`, STORAGE_API_HOST);

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken + ' ' + refreshToken,
        },
    })
        .then((response) => response.json())
        .then((response) => {
            if (response.error === 'TokenExpiredError Not authorized') {
                alert('Your session has expired. Please login again');
                localStorage.removeItem('accessToken');
                window.location.href = '/registerLogin';
            } else {
                if (response.error) {
                    alert(response.error);
                    window.location.href = '/';
                }
            }
            checkAccessToken(response.result.accessToken);
            return response;
        })
        .catch((error) => {
            return error;
        });
}

export function Login(loginData) {
    const url = new URL(`/login`, AUTH_SERVER_HOST);

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            if (response.error) {
                return { error: response.error };
            } else {
                if (response.refreshToken) {
                    return {
                        accessToken: response.accessToken,
                        refreshToken: response.refreshToken,
                    };
                } else {
                    return { accessToken: response.accessToken };
                }
            }
        })
        .catch((error) => alert(error.message));
}

export function Register(registerData) {
    const url = new URL(`/register`, STORAGE_API_HOST);

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
    })
        .then((response) => response.json())
        .then((response) => {
            if (response.error) {
                return { errMsg: response.error };
            } else {
                return { result: response.result };
            }
        })
        .catch((error) => alert(error.message));
}

export function getStoreData() {
    const url = new URL(`/getStoreData`, STORAGE_API_HOST);

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken + ' ' + refreshToken,
        },
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            console.log('back to api-----------');
            console.log(response.data); // here is the data returned back
            if (response.errMsg) {
                return response.errMsg;
            } else {
                return response.data;
            }
        })
        .catch((error) => alert(error.message));
}

export function productPurchase(purchaseData) {
    const url = new URL(`/productPurchase`, STORAGE_API_HOST);

    console.log(
        'here is the api for purchase data--------------------------------'
    );
    console.log(purchaseData);
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken + ' ' + refreshToken,
        },
        body: JSON.stringify(purchaseData),
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            console.log('back to api-----------');
            console.log(response.successMsg); // here is the message returned back
            if (response.errMsg) {
                return response.errMsg;
            } else {
                return response.successMsg;
            }
        })
        .catch((error) => alert(error.message));
}

export function getAllImage() {
    const url = new URL(`/getAllProfileImage`, STORAGE_API_HOST);
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken + ' ' + refreshToken,
        },
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            if (response.error === 'TokenExpiredError Not authorized') {
                alert('Your session has expired. Please login again');
                localStorage.removeItem('accessToken');
                window.location.href = '/registerLogin';
            } else {
                if (response.error) {
                    alert(response.error);
                    //window.location.href = '/';
                }
            }
            checkAccessToken(response.accessToken);
            return response.result;
        });
}

export function getPurchasedImage() {
    const url = new URL(`/getPurchasedProfileImage`, STORAGE_API_HOST);
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken + ' ' + refreshToken,
        },
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            //console.log(response)
            if (response.error === 'TokenExpiredError Not authorized') {
                alert('Your session has expired. Please login again');
                localStorage.removeItem('accessToken');
                window.location.href = '/registerLogin';
            } else {
                if (response.error) {
                    alert(response.error);
                    //window.location.href = '/';
                }
            }
            checkAccessToken(response.accessToken);
            return response.result;
        });
}

export function insertPurchasedImage(picurl) {
    const url = new URL(
        `/insertPurchaseImage?picurl=${picurl}`,
        STORAGE_API_HOST
    );
    return fetch(url, {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken + ' ' + refreshToken,
        },
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            console.log(response);
            if (response.error === 'TokenExpiredError Not authorized') {
                alert('Your session has expired. Please login again');
                localStorage.removeItem('accessToken');
                window.location.href = '/registerLogin';
            } else {
                if (response.error) {
                    alert(response.error);
                    //window.location.href = '/';
                }
            }
            checkAccessToken(response.accessToken);
            return response;
        });
}
export function userLuckyDraw(luckyDrawChance, coinsEarned) {
    console.log(luckyDrawChance + 'apiiiiiiiiiiiiiiiiiiiii');
    const url = new URL(`/luckyDraw`, STORAGE_API_HOST);

    console.log(
        'here is the api for updating lucky draw chance --------------------------------'
    );

    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken + ' ' + refreshToken,
        },
        body: JSON.stringify({
            luckyDrawChance: luckyDrawChance,
            coinsEarned: coinsEarned,
        }),
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            console.log('back to api-----------');
            console.log(response.successMsg); // here is the message returned back
            if (response.errMsg) {
                return response.errMsg;
            } else {
                return response.successMsg;
            }
        })
        .catch((error) => alert(error.message));
}

export function getPlayerInfo() {
    const url = new URL(`/player/infoBar`, STORAGE_API_HOST);

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken + ' ' + refreshToken,
        },
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            if (response.error === 'TokenExpiredError Not authorized') {
                alert('Your session has expired. Please login again');
                localStorage.removeItem('accessToken');
                window.location.href = '/registerLogin';
            } else {
                if (response.error) {
                    console.log(response.error);
                }
            }
            return response;
        })
        .catch((error) => {
            return error;
        });
}

export function getLevelInfo() {
    const url = new URL(`/level`, STORAGE_API_HOST);

    return fetch(url)
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            return response.result;
        })
        .catch((error) => {
            return error;
        });
}

export function updateXp(xp) {
    const url = new URL(`/player/level`, STORAGE_API_HOST);
    console.log('xpIncrease: ' + xp);

    return fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken + ' ' + refreshToken,
        },
        body: JSON.stringify({
            xp: xp,
        }),
    })
        .then((response) => response.json())
        .then((response) => {
            console.log('==== Update XP API =====');
            console.log(response);
            if (response.error) {
                console.log(response.error);
            }
            return response;
        })
        .catch((error) => {
            return error;
        });
}

export function updateXpAndLevel(xpLevelData) {
    const url = new URL(`/player/level`, STORAGE_API_HOST);
    console.log('xpLevelData : ');
    console.log(xpLevelData);
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken + ' ' + refreshToken,
        },
        body: JSON.stringify(xpLevelData),
    })
        .then((response) => response.json())
        .then((response) => {
            console.log('==== Update XP&LVL API =====');
            console.log(response);
            if (response.error) {
                console.log(response.error);
            }
            return response;
        })
        .catch((error) => {
            return error;
        });
}

export function updateCoins(coins) {
    const url = new URL(`/player/coins`, STORAGE_API_HOST);

    return fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken + ' ' + refreshToken,
        },
        body: JSON.stringify({
            coins: coins,
        }),
    })
        .then((response) => response.json())
        .then((response) => {
            console.log('==== Update COINS API =====');
            console.log(response);
            if (response.error) {
                console.log(response.error);
            }
            return response;
        })
        .catch((error) => {
            return error;
        });
}

export function getUserPurhcase() {
    const url = new URL(`/getUserPurhcase`, STORAGE_API_HOST);

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken + ' ' + refreshToken,
        },
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            console.log('back to api-----------');
            console.log(response.data); // here is the data returned back
            if (response.errMsg) {
                return response.errMsg;
            } else {
                return response.data;
            }
        })
        .catch((error) => alert(error.message));
}

export function getUserMedicine() {
    const url = new URL(`/getUserMedicine`, STORAGE_API_HOST);

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken + ' ' + refreshToken,
        },
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            console.log('back to api medicinessssss-----------');
            console.log(response.data); // here is the data returned back
            if (response.errMsg) {
                return response.errMsg;
            } else {
                return response.data;
            }
        })
        .catch((error) => alert(error.message));
}

export function getUserEquip() {
    const url = new URL(`/getUserEquip`, STORAGE_API_HOST);

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken + ' ' + refreshToken,
        },
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            console.log('back to api equipsssssss-----------');
            console.log(response.data); // here is the data returned back
            if (response.errMsg) {
                return response.errMsg;
            } else {
                return response.data;
            }
        })
        .catch((error) => alert(error.message));
}

export function useProduct(productData) {
    const url = new URL(`/useProduct`, STORAGE_API_HOST);

    console.log(
        'here is the api for use purchased product--------------------------------'
    );
    console.log(productData);
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken + ' ' + refreshToken,
        },
        body: JSON.stringify(productData),
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            console.log('back to api-----------');
            console.log(response.successMsg); // here is the message returned back
            if (response.errMsg) {
                return response.errMsg;
            } else {
                return response.successMsg;
            }
        })
        .catch((error) => alert(error.message));
}

export function unUseProduct(productType) {
    const url = new URL(`/unUseProduct`, STORAGE_API_HOST);

    console.log(
        'here is the api to unuse product--------------------------------'
    );
    console.log(productType);
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken + ' ' + refreshToken,
        },
        body: JSON.stringify({ productType: productType }),
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            console.log('back to api-----------');
            console.log(response.successMsg); // here is the message returned back
            if (response.errMsg) {
                return response.errMsg;
            } else {
                return response.successMsg;
            }
        })
        .catch((error) => alert(error.message));
}

// Campaign

export function getUserCampaignData() {
    const url = new URL(`/campaign`, STORAGE_API_HOST);

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken + ' ' + refreshToken,
        },
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            if (response.error === 'TokenExpiredError Not authorized') {
                alert('Your session has expired. Please login again');
                localStorage.removeItem('accessToken');
                window.location.href = '/registerLogin';
            } else {
                if (response.error) {
                    console.log(response.error);
                }
            }
            return response;
        })
        .catch((error) => {
            return error;
        });
}

export function getCampaignData() {
    var url = new URL('/campaignStorage', STORAGE_API_HOST);

    return fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response);
            return response.result;
        })
        .catch(function (error) {
            return error;
        });
}

export function updateDailyRewardDate(date) {
    const url = new URL(`/updateDailyRewardDate`, STORAGE_API_HOST);
    url.searchParams.append('date', date);
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken + ' ' + refreshToken,
        },
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            //if (response.message) alert(response.message);
            if (response.error) alert(response.error);
        });
}

// Friends

export function loadFriendData() {
    const url = new URL(`/users/friends`, STORAGE_API_HOST);

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken + ' ' + refreshToken,
        },
    })
        .then((response) => {
            if (response.error === 'TokenExpiredError Not Authorized') {
                alert('Your session has expired. Please login again');
                localStorage.removeItem('accessToken');
            }
            return response.json();
        })
        .catch((error) =>
            error.message !== 'Failed to fetch'
                ? alert(error)
                : console.log('Failed to fetch')
        );
}

export function removeFriend(friendId) {
    const url = new URL(`/friends/${friendId}`, STORAGE_API_HOST);

    return fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken + ' ' + refreshToken,
        },
    })
        .then((response) => {
            if (response.error === 'TokenExpiredError Not Authorized') {
                alert('Your session has expired. Please login again');
                localStorage.removeItem('accessToken');
            }
            return response.json();
        })
        .catch((error) => alert(error.message))
        .finally(() => {
            document.location.reload();
        });
}

export function loadSuggestedUsers() {
    const url = new URL(`/friends/suggestions`, STORAGE_API_HOST);

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken + ' ' + refreshToken,
        },
    })
        .then((response) => {
            if (response.error === 'TokenExpiredError Not Authorized') {
                alert('Your session has expired. Please login again');
                localStorage.removeItem('accessToken');
                window.location.href = '/';
            } else if (response.status === 400) {
                window.location.href = '/';
                return window.alert(`No user with id found!`);
            }
            return response.json();
        })
        .catch((error) =>
            error.message !== 'Failed to fetch'
                ? alert(error)
                : console.log('Failed to fetch')
        );
}

export function addUser(newFriendId) {
    const url = new URL(`/friendReq/send`, STORAGE_API_HOST);

    return fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            second_userid: newFriendId,
        }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken + ' ' + refreshToken,
        },
    })
        .then((response) => {
            if (response.error === 'TokenExpiredError Not Authorized') {
                alert('Your session has expired. Please login again');
                localStorage.removeItem('accessToken');
                window.location.href = '/';
            } else if (response.status === 400) {
                window.location.href = '/';
                return window.alert(`No user with id found!`);
            }
            return response.json();
        })
        .catch((error) => console.log(error));
}

export function cancelRequest(friendId) {
    const url = new URL(`/friendReq/cancel/${friendId}`, STORAGE_API_HOST);

    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken + ' ' + refreshToken,
        },
    }).catch((error) =>
        error.message !== 'Failed to fetch'
            ? alert(error)
            : console.log('Failed to fetch')
    );
}

export function loadFriendRequests() {
    const url = new URL(`/friendReqs`, STORAGE_API_HOST);

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken + ' ' + refreshToken,
        },
    })
        .then((response) => response.json())
        .catch((error) =>
            error.message !== 'Failed to fetch'
                ? alert(error)
                : console.log('Failed to fetch')
        );
}

export function removeRequest(userId) {
    const url = new URL(`friendReq/reject/${userId}`, STORAGE_API_HOST);

    return fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken + ' ' + refreshToken,
        },
    })
        .catch((error) =>
            error.message !== 'Failed to fetch'
                ? alert(error)
                : console.log('Failed to fetch')
        )
        .finally(() => {
            document.location.reload();
        });
}

export function acceptRequest(userId) {
    const url = new URL(`/friendReq/accept/${userId}`, STORAGE_API_HOST);

    return fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken + ' ' + refreshToken,
        },
    })
        .then((response) => response.json())
        .then((json) => {
            if (json.message == 'Delete successful!')
                fetch(`${STORAGE_API_HOST}/friendReq/accept/${userId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:
                            'Bearer ' + accessToken + ' ' + refreshToken,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        console.log(json);
                    })
                    .catch((error) =>
                        error.message !== 'Failed to fetch'
                            ? alert(error)
                            : console.log('Failed to fetch')
                    );
        })
        .catch((error) =>
            error.message !== 'Failed to fetch'
                ? alert(error)
                : console.log('Failed to fetch')
        )
        .finally(() => {
            document.location.reload();
        });
}

export function getMorePlayerInfo(userId) {
    var url = new URL(`/player/info/${userId}/`, STORAGE_API_HOST);

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken + ' ' + refreshToken
        }
    }).then(function (response) {
        return response.json();
    }).then(function (response) {
        console.log(response);
        if (response.error === 'TokenExpiredError Not authorized') {
            alert('Your session has expired. Please login again');
            localStorage.removeItem('accessToken');
            window.location.href = '/registerLogin';
        } else {
            if (response.error) {
                console.log(response.error);
            }
        }
        return response;
    }).catch(function (error) {
        return error.message !== 'Failed to fetch' ? alert(error) : console.log('Failed to fetch');
    })
}
