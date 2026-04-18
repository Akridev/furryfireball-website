import { getMorePlayerInfo } from "../api.js";

const { useQuery } = window.ReactQuery;

export default function PlayerInfoPopUp(props) {
    const data2 = props.data;
    const isLoading2 = props.isLoading;
    const error2 = props.error;
    const id = props.id;
    const hidePopup = props.hidePopup;
    var totalGames = 0;
    var time_rush = [];
    var enemy_rush = [];
    var endless = [];

    const { data, isLoading, error } = useQuery(["getMorePlayerInfo"], () =>
        getMorePlayerInfo(id)
    );

    if (!isLoading2) {
        console.log(data2);
        console.log(error2);
        console.log(id);
    }

    if (!isLoading) {
        console.log(data);
        console.log(error);
    }

    function getGamesPlayed() {
        for (var i = 0; i < 3; i++) {
            if (data.result[i] == undefined) {
                totalGames += 0;
            } else {
                totalGames += parseInt(data.result[i].games_played);
            }
        }
        return totalGames;
    }

    function populateArray() {
        time_rush = data.result.filter(function (e) {
            return e.gamemode == "Time-Rush";
        });

        enemy_rush = data.result.filter(function (e) {
            return e.gamemode == "Enemy-Rush";
        });

        endless = data.result.filter(function (e) {
            return e.gamemode == "Endless";
        });
    }

    function getNoOfTimeRush() {
        if (time_rush[0] != undefined) {
            return time_rush[0].games_played;
        } else {
            return 0;
        }
    }

    function getNoOfEnemyRush() {
        if (enemy_rush[0] != undefined) {
            return enemy_rush[0].games_played;
        } else {
            return 0;
        }
    }

    function getNoOfEndless() {
        if (endless[0] != undefined) {
            return endless[0].games_played;
        } else {
            return 0;
        }
    }

    function getTimeRushHighScore() {
        if (time_rush[0] != undefined) {
            return time_rush[0].highest_score;
        } else {
            return 0;
        }
    }

    function getEnemyRushHighScore() {
        if (enemy_rush[0] != undefined) {
            return enemy_rush[0].highest_score;
        } else {
            return 0;
        }
    }

    function getEndlessHighScore() {
        if (endless[0] != undefined) {
            return endless[0].highest_score;
        } else {
            return 0;
        }
    }

    const userInfoArr = data2.filter(function (e) {
        return e.user_id == id;
    });

    const userInfo = userInfoArr[0];

    const [url, setUrl] = React.useState(userInfo.pic_url);

    const closePopUp = (e) => {
        hidePopup();
    };

    window.changePicUrl = function (url) {
        setUrl(url);
    };
    window.getPicUrl = url;
    React.useEffect(() => {
        if (url == null || url == undefined || url == "") {
            setUrl("autoProfilePic.jpg");
        }
    }, []);
    window.handleChecking = function (set) {
        setIsChecking(set);
    };

    return isLoading ? (
        <div class="PopUp" id="loading">
            Loading...
        </div>
    ) : (
        <div onLoad={populateArray()} class="PopUp">
            <button id="button" onClick={closePopUp}>
                X
            </button>
            <input
                type="image"
                src={"./images/profile_pic/" + url}
                id="image"
            />
            <div>
                <p class="username">{userInfo.username}</p>
                <br />
                <p class="level">Level {userInfo.level}</p>
            </div>
            <div>
                <hr />
                <h1>Player Info</h1>
                <div class="grid">
                    <label class="label">
                        Games Played
                        <div class="result result1">{getGamesPlayed()}</div>
                    </label>
                    <label class="label">
                        Time-Rush Played
                        <div class="result result2">{getNoOfTimeRush()}</div>
                    </label>
                    <label class="label">
                        Time-Rush Highest Score
                        <div class="result result3">
                            {getTimeRushHighScore()}
                        </div>
                    </label>
                    <label class="label">
                        Enemy-Rush Played
                        <div class="result result4">{getNoOfEnemyRush()}</div>
                    </label>
                    <label class="label">
                        Enemy-Rush Highest Score
                        <div class="result result5">
                            {getEnemyRushHighScore()}
                        </div>
                    </label>
                    <label class="label">
                        Endless Played
                        <div class="result result6">{getNoOfEndless()}</div>
                    </label>
                    <label class="label">
                        Endless Highest Score
                        <div class="result result7">
                            {getEndlessHighScore()}
                        </div>
                    </label>
                </div>
            </div>
        </div>
    );
}
