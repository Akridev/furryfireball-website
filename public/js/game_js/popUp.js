require('dotenv').config();
const API_SERVER = process.env.API_SERVER;
const isLocalhost =
    location.hostname === 'localhost' || location.hostname === '127.0.0.1';
const STORAGE_API_HOST = isLocalhost
    ? `http://localhost:4000`
    : API_SERVER;

let accessToken = localStorage.getItem('accessToken');

function toggle(div_id) {
    var el = document.getElementById(div_id);
    if (el.style.display == 'none') {
        el.style.display = 'block';
    }
    //else {el.style.display = 'none';}
}
function blanket_size(popUpDivVar) {
    let viewportheight;
    let blanket_height;
    if (typeof window.innerWidth != 'undefined') {
        viewportheight = window.innerHeight;
    } else {
        viewportheight = document.documentElement.clientHeight;
    }
    if (
        viewportheight > document.body.parentNode.scrollHeight &&
        viewportheight > document.body.parentNode.clientHeight
    ) {
        blanket_height = viewportheight;
    } else {
        if (
            document.body.parentNode.clientHeight >
            document.body.parentNode.scrollHeight
        ) {
            blanket_height = document.body.parentNode.clientHeight;
        } else {
            blanket_height = document.body.parentNode.scrollHeight;
        }
    }
    var blanket = document.getElementById('blanket');
    blanket.style.height = blanket_height + 'px';
    var popUpDiv = document.getElementById(popUpDivVar);
    let popUpDiv_height = blanket_height / 2 - 200; //200 is half popup's height
    popUpDiv.style.top = popUpDiv_height + 'px';
}
function window_pos(popUpDivVar) {
    let viewportwidth;
    let window_width;
    if (typeof window.innerWidth != 'undefined') {
        viewportwidth = window.innerHeight;
    } else {
        viewportwidth = document.documentElement.clientHeight;
    }
    if (
        viewportwidth > document.body.parentNode.scrollWidth &&
        viewportwidth > document.body.parentNode.clientWidth
    ) {
        window_width = viewportwidth;
    } else {
        if (
            document.body.parentNode.clientWidth >
            document.body.parentNode.scrollWidth
        ) {
            window_width = document.body.parentNode.clientWidth;
        } else {
            window_width = document.body.parentNode.scrollWidth;
        }
    }
    var popUpDiv = document.getElementById(popUpDivVar);
    popUpDiv.style.zIndex = 10000;
    window_width = window_width / 2 - 200; //200 is half popup's width
    popUpDiv.style.left = window_width + 'px';
}
function addContent(
    popUpDivVar,
    gameScore,
    gameTime,
    gameDistance,
    gameHighScore
) {
    var popUpDiv = document.getElementById(popUpDivVar);

    //first line(game end)
    const gameEnd = document.createElement('h1');
    gameEnd.innerText = 'GAME ENDED';
    gameEnd.style.textAlign = 'center';
    gameEnd.style.marginTop = '20px';
    popUpDiv.appendChild(gameEnd);

    //current
    const score = document.createElement('p');
    score.innerText = 'Score: ' + gameScore;
    score.style.textAlign = 'center';
    score.style.fontSize = '25px';
    score.style.marginTop = '20px';
    score.style.fontWeight = '700';
    popUpDiv.appendChild(score);

    //game time
    let timeInSec = (gameTime * 0.001).toFixed(1);
    const time = document.createElement('p');
    time.innerText = 'Time: ' + timeInSec + 's';
    time.style.textAlign = 'center';
    time.style.padding = '0px';
    time.style.marginTop = '20px';
    popUpDiv.appendChild(time);

    //game distance travelled
    const distance = document.createElement('p');
    distance.innerText =
        'Distance Travelled: ' + Math.floor(gameDistance) + 'm';
    distance.style.textAlign = 'center';
    distance.style.padding = '0px';
    popUpDiv.appendChild(distance);

    //High score
    // if(accessToken != null && accessToken != ""){
    //user = JSON.parse(user);
    const highScoreText = document.createElement('p');
    // getHighScore(highScore)
    highScoreText.innerText = 'High Score: ' + gameHighScore;
    highScoreText.style.textAlign = 'center';
    highScoreText.style.marginTop = '20px';
    highScoreText.style.padding = '0px';
    popUpDiv.appendChild(highScoreText);
    // }

    //retry button
    const retry = document.createElement('button');
    retry.innerHTML = 'Play Again';
    retry.style.position = 'absolute';
    retry.style.left = '50px';
    retry.style.bottom = '50px';
    retry.style.fontSize = '25px';
    //function for retry
    retry.onclick = function () {
        location.reload();
    };
    popUpDiv.appendChild(retry);

    //button if user do not want to play again
    const endGame = document.createElement('button');
    endGame.innerHTML = 'End Game';
    endGame.style.position = 'absolute';
    endGame.style.right = '50px';
    endGame.style.bottom = '50px';
    endGame.style.fontSize = '25px';

    //function for when game ended
    endGame.onclick = function () {
        window.location.href = '/home';
    };
    popUpDiv.appendChild(endGame);

    // if(user != null && user != ""){
    //     //user = JSON.parse(user);
    //     insertScore(user.userId, gameScore, timeInSec)
    // }
}

function createTickCross(element) {
    const tickOrCross = document.createElement('i');
    tickOrCross.fontSize = '22px';
    tickOrCross.style.marginRight = '2%';
    if (element == 'tick') {
        tickOrCross.className = 'fa fa-check';
    } else {
        tickOrCross.className = 'fa fa-close';
    }

    return tickOrCross;
}

function createStars(num) {
    const starDiv = document.createElement('h1');
    for (let i = 0; i < 3; i++) {
        const star = document.createElement('i');
        star.className = 'fa fa-star';

        if (i <= num - 1) star.style.color = '#f3f033';
        else star.style.color = '#cfc3c3';
        starDiv.append(star);
    }

    return starDiv;
}

function createRewardTable(tableData) {
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.fontSize = '25px';

    const trTitle = document.createElement('tr');
    const thNameTitle = document.createElement('th');
    thNameTitle.innerHTML = 'First Time Bonus';
    trTitle.appendChild(thNameTitle);
    const thCoinsTitle = document.createElement('th');
    thCoinsTitle.innerHTML = 'Coins';
    trTitle.appendChild(thCoinsTitle);
    const thXpTitle = document.createElement('th');
    thXpTitle.innerHTML = 'Xp';
    trTitle.appendChild(thXpTitle);
    table.appendChild(trTitle);
    let bonusCoins = 0;
    let bonusXp = 0;
    table.style.fontSize = '22px';
    tableData.forEach((bonus) => {
        const tr = document.createElement('tr');
        const thName = document.createElement('td');
        thName.innerHTML = bonus.name;
        tr.appendChild(thName);
        const thCoins = document.createElement('td');
        thCoins.innerHTML = bonus.coins;
        tr.appendChild(thCoins);
        const thXp = document.createElement('td');
        thXp.innerHTML = bonus.xp;
        tr.appendChild(thXp);
        table.appendChild(tr);

        bonusCoins += bonus.coins;
        bonusXp += bonus.xp;
    });
    if (window.willXpExceed(bonusXp))
        document.getElementById('playerInfoBar').style.zIndex = '999999'; // to make the level popup visible
    window.addXp(bonusXp);
    window.addCoins(bonusCoins);
    table.style.fontSize = '25px';

    const trTotal = document.createElement('tr');
    const thNameTotal = document.createElement('th');
    thNameTotal.innerHTML = 'Total';
    trTotal.appendChild(thNameTotal);
    const thCoinsTotal = document.createElement('th');
    thCoinsTotal.innerHTML = bonusCoins;
    trTotal.appendChild(thCoinsTotal);
    const thXpTotal = document.createElement('th');
    thXpTotal.innerHTML = bonusXp;
    trTotal.appendChild(thXpTotal);

    table.appendChild(trTotal);

    return table;
}

function addCampaignContent(
    popUpDivVar,
    isCompleted,
    gameScore = 0,
    gameTime = 0,
    gameDistance = 0,
    stageData,
    completedObj,
    tableBonusData
) {
    var popUpDiv = document.getElementById(popUpDivVar);
    popUpDiv.innerHTML = '';
    popUpDiv.style.height = '500px';
    popUpDiv.style.marginTop = '0%';
    // buttons

    //retry button
    const retry = document.createElement('button');
    retry.innerHTML = 'Retry';
    retry.style.position = 'absolute';
    retry.style.bottom = '30px';
    retry.style.fontSize = '25px';
    //function for retry
    retry.onclick = function () {
        location.reload();
    };

    const campaignbtn = document.createElement('button');
    campaignbtn.innerHTML = 'Back to Campaign';
    campaignbtn.style.position = 'absolute';
    campaignbtn.style.bottom = '30px';
    campaignbtn.style.fontSize = '25px';

    campaignbtn.onclick = function () {
        window.location.href = '/campaign';
    };

    //first line(stage completed)
    const gameEnd = document.createElement('h1');
    gameEnd.innerText = isCompleted
        ? `Stage ${stageData.stage_id} Completed!`
        : `Stage ${stageData.stage_id} Failed`;
    gameEnd.style.textAlign = 'center';
    gameEnd.style.marginTop = '20px';
    popUpDiv.appendChild(gameEnd);

    // score and time
    let timeInSec = (gameTime * 0.001).toFixed(1);
    const scoreTime = document.createElement('h1');
    scoreTime.innerText = 'Score: ' + gameScore + ' | Time: ' + timeInSec + 's';
    scoreTime.style.textAlign = 'center';
    scoreTime.style.fontSize = '25px';
    scoreTime.style.marginTop = '-15px';
    scoreTime.style.fontWeight = '700';
    popUpDiv.appendChild(scoreTime);

    let stars = 0;

    if (completedObj.o1) stars++;
    if (completedObj.o2) stars++;
    if (completedObj.o3) stars++;

    popUpDiv.appendChild(createStars(stars));
    if (isCompleted) {
        retry.style.bottom = '15px';
        campaignbtn.style.bottom = '15px';

        const objectiveTitle = document.createElement('h1');
        objectiveTitle.innerText = 'Objectives';
        objectiveTitle.style.textAlign = 'center';
        objectiveTitle.style.borderBottom = '1px solid black';
        objectiveTitle.style.fontSize = '25px';
        objectiveTitle.style.marginTop = '0px';
        objectiveTitle.style.fontWeight = '700';

        popUpDiv.appendChild(objectiveTitle);

        const obj_one = document.createElement('h1');

        obj_one.innerText = stageData.objective1;
        obj_one.style.textAlign = 'left';
        obj_one.style.marginLeft = '5%';
        obj_one.style.fontSize = '22px';
        obj_one.style.marginTop = '-15px';
        obj_one.style.fontWeight = '700';
        if (completedObj.o1) obj_one.prepend(createTickCross('tick'));
        else obj_one.prepend(createTickCross('cross'));

        popUpDiv.appendChild(obj_one);

        const obj_two = document.createElement('h1');
        obj_two.innerText = stageData.objective2;
        obj_two.style.textAlign = 'left';
        obj_two.style.marginLeft = '5%';
        obj_two.style.fontSize = '22px';
        obj_two.style.marginTop = '-15px';
        obj_two.style.fontWeight = '700';
        if (completedObj.o2) obj_two.prepend(createTickCross('tick'));
        else obj_two.prepend(createTickCross('cross'));
        popUpDiv.appendChild(obj_two);

        const obj_three = document.createElement('h1');
        obj_three.innerText = stageData.objective3;
        obj_three.style.textAlign = 'left';
        obj_three.style.marginLeft = '5%';
        obj_three.style.fontSize = '22px';
        obj_three.style.marginTop = '-15px';
        obj_three.style.fontWeight = '700';
        if (completedObj.o3) obj_three.prepend(createTickCross('tick'));
        else obj_three.prepend(createTickCross('cross'));
        popUpDiv.appendChild(obj_three);

        if (tableBonusData.length != 0) {
            popUpDiv.style.height = '660px';
            popUpDiv.style.marginTop = '-6%';
            popUpDiv.className += ' campaignTable';
            popUpDiv.appendChild(createRewardTable(tableBonusData));
        } else {
            const noFirstTimes = document.createElement('h1');
            noFirstTimes.innerText = 'No First Time Bonuses';
            noFirstTimes.style.textAlign = 'center';
            noFirstTimes.style.fontSize = '25px';
            noFirstTimes.style.marginTop = '-5px';
            noFirstTimes.style.fontWeight = '700';
            noFirstTimes.style.borderTop = '1px solid black';

            popUpDiv.appendChild(noFirstTimes);
        }

        // button placement
        retry.style.left = '30px';
        campaignbtn.style.left = '129px';

        const nextLvlBtn = document.createElement('button');
        nextLvlBtn.innerHTML = 'Next Level';
        nextLvlBtn.style.position = 'absolute';
        nextLvlBtn.style.bottom = '15px';
        nextLvlBtn.style.fontSize = '25px';
        nextLvlBtn.style.right = '20px';

        nextLvlBtn.onclick = function () {
            window.location.href = `/game?cpm=${stageData.stage_id + 1}`;
        };

        popUpDiv.appendChild(nextLvlBtn);
    } else {
        const distance = document.createElement('h1');
        distance.innerText =
            'Distance: ' + gameDistance + '/' + stageData.distance + 'm';
        distance.style.textAlign = 'center';
        distance.style.fontSize = '25px';
        distance.style.fontWeight = '700';

        popUpDiv.appendChild(distance);

        const distancePercentage = (
            (gameDistance / stageData.distance) *
            100
        ).toFixed(1);
        const distanceAnalysis = document.createElement('h1');
        distanceAnalysis.innerText =
            'You are ' + distancePercentage + '% of the way to victory!';
        distanceAnalysis.style.textAlign = 'center';
        distanceAnalysis.style.fontSize = '25px';
        distanceAnalysis.style.fontWeight = '700';

        popUpDiv.appendChild(distanceAnalysis);

        if (stars < 3) {
            // encouragement if player has not achieved 3 stars yet
            let encouragementText =
                'So Close! Worth using a revive if you have some?';
            if (distancePercentage < 25)
                encouragementText =
                    'Check out the shop to buy some fancy items that can help you to beat this level!';
            else if (distancePercentage < 50)
                encouragementText =
                    'The shop has boosts and cool items that will surely help you beat this level!';
            else if (distancePercentage < 75)
                encouragementText = "Don't Give Up!";
            else if (distancePercentage < 90)
                encouragementText = 'Almost there!';

            const encouragement = document.createElement('h1');
            encouragement.innerText = encouragementText;
            encouragement.style.textAlign = 'center';
            encouragement.style.fontSize = '25px';
            encouragement.style.fontWeight = '700';

            popUpDiv.appendChild(encouragement);

            // button placement
            retry.style.left = '50px';
            campaignbtn.style.right = '50px';
        }
    }

    popUpDiv.appendChild(retry);
    popUpDiv.appendChild(campaignbtn);
}

function addRevivePrompt(popUpDivVar) {
    var popUpDiv = document.getElementById(popUpDivVar);
    popUpDiv.innerHTML = '';
    popUpDiv.style.marginTop = '11%';
    popUpDiv.style.height = '230px';
    const prompt = document.createElement('h1');
    prompt.innerText = 'Do you want to revive? 10s';
    prompt.style.textAlign = 'center';
    prompt.style.marginTop = '20px';
    popUpDiv.appendChild(prompt);

    //yes button
    const yesBtn = document.createElement('button');
    yesBtn.innerHTML = 'Yes';
    yesBtn.style.position = 'absolute';
    yesBtn.style.bottom = '30px';
    yesBtn.style.left = '100px';
    yesBtn.style.fontSize = '25px';

    //no button
    const noBtn = document.createElement('button');
    noBtn.innerHTML = 'No';
    noBtn.style.position = 'absolute';
    noBtn.style.bottom = '30px';
    noBtn.style.right = '100px';
    noBtn.style.fontSize = '25px';

    popUpDiv.appendChild(yesBtn);
    popUpDiv.appendChild(noBtn);

    return new Promise((resolve) => {
        let i = 10;

        const promptTimer = setTimeout(() => resolve(false), 10000);
        const timeLeft = setInterval(() => {
            prompt.innerText = 'Do you want to revive? ' + i + 's';
            i--;
            if (i <= 0) clearInterval(timeLeft);
        }, 1000);

        yesBtn.onclick = function () {
            window.useReviveMedicine();
            clearTimeout(promptTimer);
            clearInterval(timeLeft);
            resolve(true);
        };

        noBtn.onclick = function () {
            clearTimeout(promptTimer);
            clearInterval(timeLeft);
            resolve(false);
        };
    });
}

export function popup(windowname, score, time, distance, highScore) {
    blanket_size(windowname);
    window_pos(windowname);
    toggle('blanket');
    toggle(windowname);
    addContent(windowname, score, time, distance, highScore);
}

export function popupCampaign(
    windowname,
    isCompleted,
    score,
    time,
    distance,
    stageData,
    completedObj,
    tableBonusData
) {
    blanket_size(windowname);
    window_pos(windowname);
    toggle('blanket');
    toggle(windowname);
    addCampaignContent(
        windowname,
        isCompleted,
        score,
        time,
        distance,
        stageData,
        completedObj,
        tableBonusData
    );
}

export async function popupRevivePrompt(
    windowname,
    isCompleted,
    score,
    time,
    distance,
    stageData,
    completedObj,
    tableBonusData,
    game
) {
    blanket_size(windowname);
    window_pos(windowname);
    toggle('blanket');
    toggle(windowname);
    const wantToRevive = await addRevivePrompt(windowname);
    if (wantToRevive) {
        hide(document.getElementById(windowname));
        game.gameOver = false;
        game.revivePlayer();
        console.log(game);
    } else
        addCampaignContent(
            windowname,
            isCompleted,
            score,
            time,
            distance,
            stageData,
            completedObj,
            tableBonusData
        );
}

export function popupMain(
    windowname,
    isCampaign = false,
    game,
    objectiveTracker
) {
    if (isCampaign && game.campaign) {
        document.getElementById('objDisplay').style.display = 'block';
        document
            .querySelectorAll('.popupMainBtns')
            .forEach((btn) => (btn.className += ' cpmBtn'));
        document.getElementById('popUpMain').style.height = '670px';
        let obj = objectiveTracker(game.campaign.props.stage_id);
        const crossCheck = (o) => {
            if (o) return `<i class="fa fa-check"></i>`;
            else return `<i class="fa fa-close"></i>`;
        };
        document.getElementById('objHeader').innerHTML =
            'Stage ' + game.campaign.props.stage_id + ' Objectives';
        document.getElementById('obj1').innerHTML =
            crossCheck(obj.o1) + game.campaign.props.objective1;
        document.getElementById('obj2').innerHTML =
            crossCheck(obj.o2) + game.campaign.props.objective2;
        document.getElementById('obj3').innerHTML =
            crossCheck(obj.o3) + game.campaign.props.objective3;
    }
    blanket_size(windowname);
    window_pos(windowname);
    toggle('blanket');
    toggle(windowname);
}

export function popUpInstruction(windowname) {
    blanket_size(windowname);
    window_pos(windowname);
    toggle('blanket');
    toggle(windowname);
}

export function hide(windowname) {
    windowname.style.display = 'none';
    var blanket = document.getElementById('blanket');
    blanket.style.display = 'none';
}
