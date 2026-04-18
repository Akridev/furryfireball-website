var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { getMorePlayerInfo } from "../api.js";

var useQuery = window.ReactQuery.useQuery;


export default function PlayerInfoPopUp(props) {
    var data2 = props.data;
    var isLoading2 = props.isLoading;
    var error2 = props.error;
    var id = props.id;
    var hidePopup = props.hidePopup;
    var totalGames = 0;
    var time_rush = [];
    var enemy_rush = [];
    var endless = [];

    var _useQuery = useQuery(["getMorePlayerInfo"], function () {
        return getMorePlayerInfo(id);
    }),
        data = _useQuery.data,
        isLoading = _useQuery.isLoading,
        error = _useQuery.error;

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

    var userInfoArr = data2.filter(function (e) {
        return e.user_id == id;
    });

    var userInfo = userInfoArr[0];

    var _React$useState = React.useState(userInfo.pic_url),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        url = _React$useState2[0],
        setUrl = _React$useState2[1];

    var closePopUp = function closePopUp(e) {
        hidePopup();
    };

    window.changePicUrl = function (url) {
        setUrl(url);
    };
    window.getPicUrl = url;
    React.useEffect(function () {
        if (url == null || url == undefined || url == "") {
            setUrl("autoProfilePic.jpg");
        }
    }, []);
    window.handleChecking = function (set) {
        setIsChecking(set);
    };

    return isLoading ? React.createElement(
        "div",
        { "class": "PopUp", id: "loading" },
        "Loading..."
    ) : React.createElement(
        "div",
        { onLoad: populateArray(), "class": "PopUp" },
        React.createElement(
            "button",
            { id: "button", onClick: closePopUp },
            "X"
        ),
        React.createElement("input", {
            type: "image",
            src: "./images/profile_pic/" + url,
            id: "image"
        }),
        React.createElement(
            "div",
            null,
            React.createElement(
                "p",
                { "class": "username" },
                userInfo.username
            ),
            React.createElement("br", null),
            React.createElement(
                "p",
                { "class": "level" },
                "Level ",
                userInfo.level
            )
        ),
        React.createElement(
            "div",
            null,
            React.createElement("hr", null),
            React.createElement(
                "h1",
                null,
                "Player Info"
            ),
            React.createElement(
                "div",
                { "class": "grid" },
                React.createElement(
                    "label",
                    { "class": "label" },
                    "Games Played",
                    React.createElement(
                        "div",
                        { "class": "result result1" },
                        getGamesPlayed()
                    )
                ),
                React.createElement(
                    "label",
                    { "class": "label" },
                    "Time-Rush Played",
                    React.createElement(
                        "div",
                        { "class": "result result2" },
                        getNoOfTimeRush()
                    )
                ),
                React.createElement(
                    "label",
                    { "class": "label" },
                    "Time-Rush Highest Score",
                    React.createElement(
                        "div",
                        { "class": "result result3" },
                        getTimeRushHighScore()
                    )
                ),
                React.createElement(
                    "label",
                    { "class": "label" },
                    "Enemy-Rush Played",
                    React.createElement(
                        "div",
                        { "class": "result result4" },
                        getNoOfEnemyRush()
                    )
                ),
                React.createElement(
                    "label",
                    { "class": "label" },
                    "Enemy-Rush Highest Score",
                    React.createElement(
                        "div",
                        { "class": "result result5" },
                        getEnemyRushHighScore()
                    )
                ),
                React.createElement(
                    "label",
                    { "class": "label" },
                    "Endless Played",
                    React.createElement(
                        "div",
                        { "class": "result result6" },
                        getNoOfEndless()
                    )
                ),
                React.createElement(
                    "label",
                    { "class": "label" },
                    "Endless Highest Score",
                    React.createElement(
                        "div",
                        { "class": "result result7" },
                        getEndlessHighScore()
                    )
                )
            )
        )
    );
}