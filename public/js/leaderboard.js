const isLocalhost =
    location.hostname === 'localhost' || location.hostname === '127.0.0.1';
const STORAGE_API_HOST = isLocalhost
    ? `http://localhost:4000`
    : `https://ades-host-server.herokuapp.com`;

let accessToken = localStorage.getItem("accessToken");
let refreshToken = localStorage.getItem("refreshToken");

// get user id of user if logged in

function getLoggedInUserId() {
    return new Promise((resolve) => {

        fetch(`${STORAGE_API_HOST}/getLoggedInUserId`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken + ' ' + refreshToken,
            },
        })
            .then((response) => response.json())
            .then((userId) => {
                if(userId.error){
                    if (userId.error === 'TokenExpiredError Not authorized') {
                        alert('Session has expired. Please re-login.');
                        localStorage.removeItem('accessToken');
                        window.location.href = '/registerLogin';
                    } 

                    resolve(null);
                }
                
                else localStorage.removeItem('highestAttempt')
                resolve(userId);
            })
            .catch((error) => {

                switch(error.message){
                    // expected errors
                    case "Failed to fetch":
                        break;
                    // if unexpected then alert
                    default:
                        alert(error.message)
                }
                
            })
    });
}

window.addEventListener('DOMContentLoaded', function () {
    const global = document.getElementById('global');
    const local = document.getElementById('local');
    const friends = document.getElementById('friends');
    const type_title = document.getElementById('type-title');
    const prompt_content = document.getElementById('prompt-content');
    const prompt_text = document.getElementById('prompt-text');
    const prompt_btn = document.getElementById('prompt-btn');
    const lb_content = document.getElementById('lb-content');
    const attribute = document.getElementById('attribute');
    const modeSelect = document.getElementById('gamemode-select');
    const refresh = document.getElementById('refresh');

    $('#refresh').click(() => {
        if (!refresh.disabled) {
            reload();
            refresh.classList.toggle('refresh-start');
            setTimeout(() => refresh.classList.toggle('refresh-start'), 500);
        }
    });

    const url = new URL(window.location);
    modeSelect.onchange = () => {
        url.searchParams.set('gamemode', modeSelect.value);
        window.history.pushState({}, '', url);
        lbStorage.gamemode = modeSelect.value;
        reload();
    };

    const controls = [refresh, global, local, friends, modeSelect];

    function disablePage() {
        controls.forEach((control) => (control.disabled = true));
    }

    function enablePage() {
        controls.forEach((control) => (control.disabled = false));
    }

    var lbStorage = {
        gamemode: 'Endless',
        type: 'global',
    };

    async function reload() {
        let loggedInId = await getLoggedInUserId();
        console.log(loggedInId);
        $('#lb-list').empty();
        disablePage();
        $('#lb-content').fadeOut(0);
        $('#loading').fadeIn(0);
        console.log("Fetching...")
        fetchLbData(loggedInId)
    }

    const loadFade = 300; // transition time for loading

    function fetchLbData(loggedInId) {
        console.log(loggedInId);
        if (!loggedInId && lbStorage.type != 'global') {
            $('#loading').fadeOut(0);
            $('#attribute').fadeOut(0);
            if (lbStorage.type == 'local')
                showPrompt(
                    'Login to view players in your area!',
                    'Log In',
                    '/registerLogin'
                );
            else
                showPrompt(
                    'Login to view your friends!',
                    'Log In',
                    '/registerLogin'
                );
            $('#lb-content').fadeIn(loadFade);
            $('#loading').fadeOut(loadFade);
            enablePage();
            modeSelect.disabled = true;
            if (lbStorage.type == 'global') global.disabled = true;
            else if (lbStorage.type == 'local') local.disabled = true;
            else if (lbStorage.type == 'friends') friends.disabled = true;
        } else {
            console.log(accessToken)
            fetch(`${STORAGE_API_HOST}/leaderboard/${lbStorage.type}?gamemode=${lbStorage.gamemode}`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + accessToken + " " + refreshToken
                }
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log('=======================');
                    console.log(lbStorage);
                    console.log(json);
                    console.log('=======================');

                    if (lbStorage.type == 'global' && !loggedInId) {
                        $('#loading').fadeOut(0);
                        $('#attribute').fadeOut(0);

                        let highestAttempt = JSON.parse(
                            localStorage.getItem('highestAttempt')
                        );
                        let gamemodeAttempt = null;
                        if (highestAttempt != null) {
                            gamemodeAttempt = highestAttempt.find(
                                (attempt) =>
                                    attempt['gamemode'] == lbStorage.gamemode
                            );
                        }

                        if (gamemodeAttempt == null) {
                            gamemodeAttempt = {
                                score: 0,
                                time: 0,
                            };
                        }

                        json.data.push({
                            "username": "Guest",
                            "user_id": "Guest",
                            "pic_url": "autoProfilePic.jpg",
                            "score": gamemodeAttempt.score,
                            "time": gamemodeAttempt.time
                        })
                        json.data.sort((a,b) => b.score - a.score || a.time - b.time)
                    }

                    if(json.data){
                        attribute.style.display = "block"

                        let rank = 1;
                        json.data.forEach(lbObj => {
                            console.log(lbObj);
                            //compile the data needed for the card creation
                            
                            let lbData ={
                                "rank": rank++,
                                "id": lbObj.user_id,
                                "name": lbObj.username,
                                "pic": lbObj.pic_url,
                                "score": lbObj.score,
                                "time": lbObj.time
                            }
                            
                            //create the card and save the html output
                            let lbItem = createLbItem(lbData, loggedInId);

                            //add the card as a child to the parent container(id=lb-list)
                            $('#lb-list').append(lbItem);
                        });
                    } else {
                        $('#loading').fadeOut(0);
                        $('#attribute').fadeOut(0);
                        if (loggedInId && lbStorage.type == 'friends')
                            showPrompt(
                                'Uh Oh! Looks like you have not added any friends!',
                                'Add Friends',
                                '/search'
                            );
                    }
                })
                .catch((error) => {

                    switch(error.message){
                        // expected errors
                        case "Failed to fetch":
                            break;
                        // if unexpected then alert
                        default:
                            alert(error.message)
                    }
                    
                })
                .finally(() => {
                    $('#lb-content').fadeIn(loadFade);
                    $('#loading').fadeOut(loadFade);
                    enablePage();
                    if (lbStorage.type == 'global') global.disabled = true;
                    else if (lbStorage.type == 'local') local.disabled = true;
                    else if (lbStorage.type == 'friends')
                        friends.disabled = true;
                });
        }
    }

    const gamemodeArr = ["Endless", "Time-Rush", "Enemy-Rush"]

    new Promise(() => {

        // dynamically add gamemode selection
        for(let i=0; i<gamemodeArr.length;i++){
            $('#gamemode-select').append(`<option>${gamemodeArr[i]}</option>`)
        }

        const type = window.location.hash.substring(1)
        const urlParams = new URLSearchParams(window.location.search)
        const gamemode = urlParams.get("gamemode");
        switch(type){
            case "local":
            case "friends":
                lbStorage.type = type;
        }
        type_title.innerHTML = type.charAt(0).toUpperCase()+type.slice(1);
        $(`#${lbStorage.type}`).addClass("type-button-on");
        if(gamemodeArr.includes(gamemode)) lbStorage.gamemode = gamemode;

        modeSelect.value = lbStorage.gamemode;
        console.log(gamemode);
    }).then(reload())
    

    function showPrompt(prompt, btnText, btnLink) {
        lb_content.style.display = 'none';
        prompt_content.style.display = 'block';
        prompt_text.innerHTML = prompt;
        prompt_btn.innerHTML = btnText;
        prompt_btn.onclick = function () {
            window.location.href = btnLink;
        };
    }

    global.onclick = () => {
        global.classList.add('type-button-on');
        local.classList.remove('type-button-on');
        friends.classList.remove('type-button-on');
        type_title.innerHTML = 'Global';
        prompt_content.style.display = 'none';
        lb_content.style.display = 'block';
        $('#lb-list').empty();

        lbStorage.type = 'global';
        reload();
    };

    local.onclick = () => {
        global.classList.remove('type-button-on');
        local.classList.add('type-button-on');
        friends.classList.remove('type-button-on');
        type_title.innerHTML = 'Local';
        prompt_content.style.display = 'none';
        lb_content.style.display = 'block';
        $('#lb-list').empty();

        lbStorage.type = 'local';
        reload();
    };

    friends.onclick = () => {
        type_title.innerHTML = 'Friends';
        global.classList.remove('type-button-on');
        local.classList.remove('type-button-on');
        friends.classList.add('type-button-on');
        prompt_content.style.display = 'none';
        lb_content.style.display = 'block';
        $('#lb-list').empty();

        lbStorage.type = 'friends';
        reload();
    };
});

function createLbItem(user, loggedInId) {
    let lbItem;
    if ((!loggedInId && user.id == 'Guest') || loggedInId == user.id) {
        lbItem = `
        <div class="lb-item you">
            <div class="rank-box"><span class="li-rank">${user.rank}</span></div>
            <img class="li-pic" src="./images/profile_pic/${user.pic || "autoProfilePic.jpg"}" alt="pic"/>
            <span class="li-name">${user.name}</span>
            <span class="li-score">${user.score}</span>
            <span class="li-time">${user.time}</span>
        </div>`;
    } else {
        lbItem = `
        <div class="lb-item">
            <div class="rank-box"><span class="li-rank">${user.rank}</span></div>
            <img class="li-pic" src="./images/profile_pic/${user.pic || "autoProfilePic.jpg"}" alt="pic" />
            <span class="li-name">${user.name}</span>
            <span class="li-score">${user.score}</span>
            <span class="li-time">${user.time}</span>
        </div>`;
    }

    return lbItem;
}
