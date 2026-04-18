import { popupMain, hide } from "./game_js/popUp.js";

const isLocalhost =
    location.hostname === 'localhost' || location.hostname === '127.0.0.1';
const STORAGE_API_HOST = isLocalhost
    ? `http://localhost:4000`
    : `https://ades-host-server.herokuapp.com`;

let token;
const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');
if (refreshToken != null && refreshToken != '') {
    token = refreshToken;
} else if (accessToken != null && accessToken != '') {
    token = accessToken;
}

window.addEventListener('DOMContentLoaded', function () {
    //get all the elements
    const friendsBtn = document.querySelector('#friendsBtn');
    const leaderboardBtn = document.querySelector('#leaderboardBtn');
    const campaignBtn = document.querySelector('#campaignBtn');
    const blanket = document.querySelector('#blanket');
    const popUpDiv = document.querySelector('#popUpDiv');
    const popUpDivPlayer = document.querySelector('#popUpDivPlayer');
    const popUpDivMode = document.querySelector('#popUpDivMode');
    const backgrounds = document.querySelectorAll('#bg');
    const players = document.querySelectorAll('#player');
    const playerSkip = document.querySelector('#playerSkip');
    const bgSkip = document.querySelector('#bgSkip');
    const gameModes = document.querySelectorAll('#mode');
    const pastRecordBtn = document.querySelector('#pastRecordBtn');
    const popUpLevel = document.querySelector("#popUpLevel");
    const storeBtn = document.querySelector("#storeBtn");
    const inventoryBtn = document.querySelector("#inventoryBtn");
    const luckyBtn = this.document.querySelector("#luckyBtn");
    const playerBack = document.querySelector("#pBackArrow");
    const modeBack = document.querySelector("#mBackArrow");
    const playLeaderboardBtn = document.querySelector("#playLeaderboardBtn");
    const playGame = document.querySelector("#play");
    const dailyBtn = document.querySelector("#dailyBtn");
    const popUpDaily = document.querySelector("#popUpDaily");
    const popUpReward = document.querySelector("#popUpReward");
    const title = document.querySelector("#title")
    const loginContent = document.querySelector("#loginContent")
    //--------------------------------------------------------------
    let bg;
    let play;
    let mode;

    //-----buttons onclick--------------------------------------------------

    playLeaderboardBtn.onclick = function(){
        popupMain('popUpDiv');
    }

    blanket.onclick = function(){

        blanket.style.display = 'none'
        popUpDiv.style.display = 'none'
        popUpDivPlayer.style.display = 'none'
        popUpDivMode.style.display = 'none'
        popUpLevel.style.display = 'none'
        popUpDaily.style.display = 'none'
        popUpReward.style.display = "none"
    }
    
    //redirect to leaderboard
    leaderboardBtn.onclick = function () {
        window.location.href = '/leaderboard';
    };
    
    //choose the background of game

    for(const background of backgrounds) {
        background.onclick = function(){
            for(const back2 of backgrounds){
                back2.style.backgroundColor = "rgb(12, 79, 23)"
                back2.style.color = "rgba(245, 222, 179, 0.767)"
            }
            bg = background.innerHTML
            background.style.backgroundColor = "yellowgreen"
            background.style.color = "rgb(67, 66, 66)"
            
            hide(popUpDiv)
            popupMain('popUpDivPlayer');
        }
    }

    //background skip --> default background
    bgSkip.onclick = function(){
        hide(popUpDiv)
        popupMain('popUpDivPlayer');
        if(bg == null || bg == "")
            bg='City';
    }

  //choose player
    playerBack.onclick = function(){
        hide(popUpDivPlayer)
        popupMain('popUpDiv');
    }
    for (const player of players) {
        player.onclick = function () {
            for(const player2 of players){
                player2.style.backgroundColor = "rgb(12, 79, 23)"
                player2.style.color = "rgba(245, 222, 179, 0.767)"
            }
            player.style.backgroundColor = "yellowgreen"
            player.style.color = "rgb(67, 66, 66)"
            
            play = player.innerHTML;

            hide(popUpDivPlayer);
            popupMain('popUpDivMode');
        }

    }
    //player skip --> default player
    playerSkip.onclick = function () {
        //window.location.href = `/game?background=${bg}&player=${play}`
        if(play == null || play == "")
            play="Shadow_Dog";
        hide(popUpDivPlayer)
        popupMain('popUpDivMode');
    }
    modeBack.onclick = function(){
        hide(popUpDivMode)
        popupMain('popUpDivPlayer');
    }
    //selecting game Mode
    for (const gameMode of gameModes) {
        gameMode.onclick = function () {
            mode = gameMode.innerHTML
            for(const gameMode2 of gameModes){
                gameMode2.style.backgroundColor = "rgb(12, 79, 23)"
                gameMode2.style.color = "rgba(245, 222, 179, 0.767)"
            }
            gameMode.style.backgroundColor = "yellowgreen"
            gameMode.style.color = "rgb(67, 66, 66)"

        };
    }

    playGame.onclick = function(){
        bg = bg.replace(' ', '-');
        play = play.replace(' ', '_');
        mode = mode.replace(' ', '-');
        window.location.href = `/game?background=${bg}&player=${play}&gameMode=${mode}`;
    }

    function displayer(element){
        element.style.display = 'block'
    }

    //----------check if there is token in localstorage-------------------------------------
    if (token != null && token != '') {

        const elements = [campaignBtn, pastRecordBtn, storeBtn, inventoryBtn, friendsBtn, dailyBtn, luckyBtn]
        elements.forEach((element) => displayer(element))
        //--------------------------------------------
        //redirect to campaign
        
        campaignBtn.onclick = function () {
            window.location.href = '/campaign';
        };
        //--------------------------------------------
        //View Past Record
        pastRecordBtn.onclick = function () {
            window.location.href = '/pastRecord';
        };

        storeBtn.onclick= function(){
            window.location.href = '/gameStore';
        }
        inventoryBtn.onclick= function(){
            window.location.href = '/inventory';
        }
        
        luckyBtn.onclick = function(){
            window.location.href = '/luckyDraw';
        }

        //daily
        dailyBtn.onclick = function(){
            popupMain("popUpDaily")
        }

        loginContent.style.display = 'none'

        //redirect to profile page
        // loginOrProfile.onclick = function () {
        //     window.location.href = '/profile';
        // };

        //redirect to friends page
        friendsBtn.onclick = function () {
            window.location.href = '/friends';
        };

        //remove tokens in localstorage
        // logout.onclick = function () {
        //     localStorage.removeItem('accessToken');
        //     localStorage.removeItem('refreshToken');

        //     window.location.reload();
        // };

    } else {
        // loginOrProfile.innerHTML = 'Login';
        // logout.style.display = 'none';
        displayer(loginContent)
        leaderboardBtn.className = 'bottomRight'
        title.style.right = "45%"
        friendsBtn.style.display = 'none';
        dailyBtn.style.display = 'none'
        campaignBtn.style.display = 'none'
        pastRecordBtn.style.display = 'none';
        storeBtn.style.display = 'none';
        luckyBtn.style.display = 'none';
        inventoryBtn.style.display = 'none';
        // loginOrProfile.onclick = function () {
        //     window.location.href = '/';
        // };
    }
});

