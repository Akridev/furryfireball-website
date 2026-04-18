var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { popupMain, hide } from "../../../js/game_js/popUp.js";
import { updateDailyRewardDate } from "../api.js";
var _window$ReactQuery = window.ReactQuery,
    useQuery = _window$ReactQuery.useQuery,
    QueryClient = _window$ReactQuery.QueryClient,
    QueryClientProvider = _window$ReactQuery.QueryClientProvider,
    useMutation = _window$ReactQuery.useMutation;

var queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } }
});

function DailyReward() {
    var _React$useState = React.useState('00:00:00'),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        timer = _React$useState2[0],
        setTimer = _React$useState2[1];

    var _React$useState3 = React.useState("loading"),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        distance = _React$useState4[0],
        setDistance = _React$useState4[1];

    var _React$useState5 = React.useState('loading'),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        date = _React$useState6[0],
        setDate = _React$useState6[1];

    var Ref = React.useRef(null);

    var _useMutation = useMutation(function () {

        var now = new Date();
        now.setHours(now.getHours() + 24);
        // now.setMinutes(now.getMinutes() + 1)
        updateDailyRewardDate(now);
    }),
        error = _useMutation.error,
        isLoading = _useMutation.isLoading,
        mutateAsync = _useMutation.mutateAsync;

    React.useEffect(function () {
        if (date != 'loading') clearTimer(getDeadTime(date));
    }, [date]);

    window.handleDate = function (set) {
        setDate(set);
    };

    function handleDistance(set) {
        setDistance(set);
    }

    function handleTimer(set) {
        setTimer(set);
    }
    var getTimeRemaining = function getTimeRemaining(e) {
        var total = Date.parse(e) - Date.parse(new Date());
        var seconds = Math.floor(total / 1000 % 60);
        var minutes = Math.floor(total / 1000 / 60 % 60);
        var hours = Math.floor(total / 1000 / 60 / 60 % 24);
        return {
            total: total, hours: hours, minutes: minutes, seconds: seconds
        };
    };

    var startTimer = function startTimer(e) {
        var currDate = window.getDailyRewardDate();

        var _getTimeRemaining = getTimeRemaining(e),
            total = _getTimeRemaining.total,
            hours = _getTimeRemaining.hours,
            minutes = _getTimeRemaining.minutes,
            seconds = _getTimeRemaining.seconds;

        if (total >= 0) {
            // update the timer
            // check if less than 10 then we need to 
            // add '0' at the beginning of the variable
            handleTimer((hours > 9 ? hours : '0' + hours) + ' hr : ' + (minutes > 9 ? minutes : '0' + minutes) + ' min : ' + (seconds > 9 ? seconds : '0' + seconds) + ' s');
            handleDistance("start");
            //console.log(handleTimer)
        } else {
            if (currDate != 'loading') handleDistance("end");else handleDistance("loading");
        }
    };

    var clearTimer = function clearTimer(e) {

        // If you adjust it you should also need to
        // adjust the Endtime formula we are about
        // to code next    
        handleTimer('00 hr : 00 min : 00 s');

        // If you try to remove this line the 
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (Ref.current) clearInterval(Ref.current);
        var id = setInterval(function () {
            startTimer(e);
        }, 1000);
        Ref.current = id;
    };

    var getDeadTime = function getDeadTime(date) {
        var deadline = new Date();
        var time = new Date();

        // Get today's date and time and extend(TEMPORARY)
        time.setMinutes(time.getMinutes() + 5);
        //let settime = time.getTime()
        //console.log(date)
        var enddate = void 0;
        // --------------------------------
        if (date != null && date != "") {
            enddate = date;
            enddate = Date.parse(enddate);
            enddate = new Date(enddate);
        } else {
            enddate = new Date().getTime();
        }
        var now = new Date().getTime();
        // --------------------------------

        // Find the distance between now and the count down date
        //var distance = settime - now;
        var distance = enddate - now;
        var hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        var minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
        var seconds = Math.floor(distance % (1000 * 60) / 1000);
        // This is where you need to adjust if 
        // you entend to add more time

        deadline.setHours(hours + deadline.getHours());
        deadline.setMinutes(minutes + deadline.getMinutes());
        deadline.setSeconds(seconds + deadline.getSeconds());

        return deadline;
    };

    var closeOnClick = function closeOnClick() {
        var daily = document.querySelector("#popUpDaily");
        hide(daily);
    };

    var collectOnClick = function collectOnClick() {
        var rewardPopUp = document.querySelector("#popUpReward");
        var dailyPopUp = document.querySelector("#popUpDaily");

        window.randomReward = dailyReward[Math.floor(Math.random() * dailyReward.length)];
        window.handleReward(randomReward);
        console.log(randomReward);

        mutateAsync().then(function () {
            if (randomReward.type == "coin") {
                window.addCoins(randomReward.amount);
            } else if (randomReward.type == "exp") {
                window.addXp(randomReward.amount);
            } else if (randomReward.type == "luckyDrawChance") {
                var luckyChance = window.getLuckyChance();
                window.setLuckyDrawChance(luckyChance + randomReward.amount, 0);
            }
            hide(dailyPopUp);
            rewardPopUp.style.display = "block";
            //confetti.start();
            //setTimeout(function(){ confetti.stop(); }, 5000);
            var now = new Date();
            now.setHours(now.getHours() + 24);
            // now.setMinutes(now.getMinutes() + 1)

            handleDistance('start');
            //set timer
            clearTimer(getDeadTime(now));
        });
    };

    return React.createElement(
        "div",
        null,
        React.createElement(
            "h1",
            null,
            "Daily Reward"
        ),
        distance === "loading" || isLoading ? React.createElement("div", { "class": "loader" }) : error ? React.createElement(
            "h1",
            null,
            error.message
        ) : distance === "start" ? React.createElement(
            "div",
            null,
            React.createElement(
                "h1",
                { style: { marginTop: "-3%", fontSize: "20px" } },
                "Time Left:"
            ),
            React.createElement(
                "h1",
                { "class": "timer", style: { marginTop: "-3%" } },
                timer
            )
        ) : React.createElement(
            "div",
            null,
            React.createElement(
                "h1",
                { style: { marginTop: "-3%", fontSize: "20px" } },
                "Time Left:"
            ),
            React.createElement(
                "h1",
                { "class": "timer", style: { marginTop: "-3%" } },
                timer
            ),
            React.createElement(
                "h2",
                { "class": "collect", onClick: collectOnClick },
                "Click Here to Collect Reward"
            )
        ),
        React.createElement(
            "button",
            { id: "close", onClick: closeOnClick },
            "Close"
        )
    );
}

window.addEventListener('DOMContentLoaded', function () {
    var domContainer = document.querySelector("#popUpDaily");
    var root = ReactDOM.createRoot(domContainer);

    root.render(React.createElement(
        QueryClientProvider,
        { client: queryClient },
        React.createElement(DailyReward, null)
    ));
});

var dailyReward = [{
    type: "exp",
    amount: Math.floor(Math.random() * 50 + 1)
}, {
    type: "coin",
    amount: Math.floor(Math.random() * 100 + 1),
    image: "./images/player-coin.png"
}, {
    type: "luckyDrawChance",
    amount: Math.floor(Math.random() * 2 + 1),
    image: "./images/fourLeaf.png"
}];