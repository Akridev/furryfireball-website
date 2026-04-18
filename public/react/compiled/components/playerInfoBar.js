var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// ==== Global Functions ====================
window.addXp = function () {};
window.willXpExceed = function () {};
window.getCoins = function () {};
window.addCoins = function () {};
window.setLuckyDrawChance = function () {};
window.getLuckyChance = function () {};
window.getDailyRewardDate = function () {};
window.startDailyRewardTimer = function () {};
// ==========================================

// ==== React Query =========================
var _window$ReactQuery = window.ReactQuery,
    useQuery = _window$ReactQuery.useQuery,
    QueryClient = _window$ReactQuery.QueryClient,
    QueryClientProvider = _window$ReactQuery.QueryClientProvider;

var queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } }
});
// ==========================================

// ==== Fetch API Functions =================
import { getPlayerInfo, getLevelInfo, updateCoins, updateXp, updateXpAndLevel, userLuckyDraw } from '../api.js';
// ==========================================

// ==== Import Components ===================
import DropdownNav from './dropdownNav.js';
// ==========================================

function PlayerInfoBar(props) {
    var _React$useState = React.useState(0),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        level = _React$useState2[0],
        setLevel = _React$useState2[1];

    var _React$useState3 = React.useState(999999),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        xpNeeded = _React$useState4[0],
        setXpNeeded = _React$useState4[1];

    var _React$useState5 = React.useState(0),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        xpCurr = _React$useState6[0],
        setXpCurr = _React$useState6[1];

    var _React$useState7 = React.useState(false),
        _React$useState8 = _slicedToArray(_React$useState7, 2),
        showPopup = _React$useState8[0],
        setShowPopup = _React$useState8[1];

    var _React$useState9 = React.useState(0),
        _React$useState10 = _slicedToArray(_React$useState9, 2),
        luckyChance = _React$useState10[0],
        setLuckyChance = _React$useState10[1];

    var _React$useState11 = React.useState(0),
        _React$useState12 = _slicedToArray(_React$useState11, 2),
        coins = _React$useState12[0],
        setCoins = _React$useState12[1];

    var _React$useState13 = React.useState(false),
        _React$useState14 = _slicedToArray(_React$useState13, 2),
        isLoggedIn = _React$useState14[0],
        setIsLoggedIn = _React$useState14[1];

    var _React$useState15 = React.useState(false),
        _React$useState16 = _slicedToArray(_React$useState15, 2),
        isLevelRendered = _React$useState16[0],
        setIsLevelRendered = _React$useState16[1];

    var _React$useState17 = React.useState('autoProfilePic.jpg'),
        _React$useState18 = _slicedToArray(_React$useState17, 2),
        profilePic = _React$useState18[0],
        setProfilePic = _React$useState18[1];

    var _React$useState19 = React.useState(''),
        _React$useState20 = _slicedToArray(_React$useState19, 2),
        currentPage = _React$useState20[0],
        setCurrentPage = _React$useState20[1];

    var _React$useState21 = React.useState('loading'),
        _React$useState22 = _slicedToArray(_React$useState21, 2),
        dailyRewardDate = _React$useState22[0],
        setDailyRewardDate = _React$useState22[1];

    var _useQuery = useQuery(['getLevelInfo'], function () {
        return getLevelInfo();
    }),
        isLevelInfoLoading = _useQuery.isLoading,
        levelStorage = _useQuery.data,
        levelError = _useQuery.error;

    var _useQuery2 = useQuery(['getPlayerInfo'], function () {
        return getPlayerInfo();
    }, {
        onSuccess: function onSuccess(data) {
            if (!data.error) {
                setLevel(data.result.level);
                setXpNeeded(levelStorage[data.result.level - 1].xpNeeded);
                setXpCurr(data.result.xp);
                setCoins(data.result.coins);
                setLuckyChance(data.result.luckyDrawChance);
                setDailyRewardDate(data.result.daily_reward_date);

                // check if global variable exists
                if (typeof window.handleDate === 'function') window.handleDate(data.result.daily_reward_date);

                if (data.result.pic_url != null && data.result.pic_url != '') setProfilePic(data.result.pic_url);
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }

            setCurrentPage(window.location.pathname.substring(1));
        },
        enabled: levelStorage ? true : false // so that it is executed after levelStorage is defined
    }),
        isPlayerInfoLoading = _useQuery2.isLoading,
        playerData = _useQuery2.data,
        playerError = _useQuery2.error;

    React.useEffect(function () {
        // prevent this from executing when level is first rendered
        if (isLevelRendered && isLoggedIn) {
            setShowPopup(true);
            confetti.start();
            var levelObj = levelStorage[level - 1];
            setXpNeeded(levelObj.xpNeeded);
            addCoins(levelObj.coinsEarned);
            return function () {
                confetti.stop();
            };
        }
    }, [level]);

    window.handleInfoBarPic = function (set) {
        setProfilePic(set);
    };

    function calculateFinalXpLevel(xpRemainder) {
        var finalLevel = level + 1;

        while (xpRemainder > levelStorage[finalLevel - 1].xpNeeded) {
            xpRemainder -= levelStorage[finalLevel++ - 1].xpNeeded;
        }if (levelStorage[finalLevel - 1].xpNeeded == 'Max') xpRemainder = 0;

        var finalXpLevel = {
            xp: xpRemainder,
            level: finalLevel
        };

        return finalXpLevel;
    }

    addXp = function addXp(xpPoints) {
        if (isNaN(parseInt(xpPoints))) return console.log('xpPoints must be a number!! (At addXp)');
        setIsLevelRendered(true);
        xpPoints = +xpPoints;
        if (xpNeeded != 'Max' && level != 0) {
            if (xpCurr + xpPoints >= xpNeeded) {
                var xpRemainder = xpCurr + xpPoints - xpNeeded;
                var finalXpLevel = calculateFinalXpLevel(xpRemainder);
                setLevel(finalXpLevel.level);
                setXpCurr(finalXpLevel.xp);
                updateXpAndLevel(finalXpLevel);
            } else {
                updateXp(xpPoints);
                setXpCurr(xpCurr + xpPoints);
            }
        }
    };

    willXpExceed = function willXpExceed(xpPoints) {
        if (isNaN(parseInt(xpPoints))) return console.log('xpPoints must be a number!! (At willXpExceed)');

        if (xpCurr + xpPoints >= xpNeeded) return true;else return false;
    };

    addCoins = function addCoins(coinsToAdd) {
        if (!isNaN(coinsToAdd)) {
            updateCoins(coinsToAdd);
            setCoins(coins + coinsToAdd);
        }
    };

    getLuckyChance = function getLuckyChance() {
        return luckyChance;
    };

    getCoins = function getCoins() {
        return coins;
    };

    getDailyRewardDate = function getDailyRewardDate() {
        return dailyRewardDate;
    };

    setLuckyDrawChance = function setLuckyDrawChance(luckyChanceToEdit, coinsEarned) {
        if (!isNaN(luckyChanceToEdit)) {
            userLuckyDraw(luckyChanceToEdit, coinsEarned).then(function (msg) {
                alert(msg);
                setLuckyChance(luckyChanceToEdit);
                setCoins(coins + coinsEarned); // update coins to infobar
            });
        }
    };

    function LevelUpPopup() {
        var levelObj = levelStorage[level - 1];
        var coinsEarned = levelObj.coinsEarned,
            attackSlot = levelObj.attackSlot;

        return React.createElement(
            'div',
            { className: 'PB__levelPopup' },
            React.createElement(
                'h2',
                null,
                'Leveled up from ',
                level - 1,
                ' to ',
                level,
                '!'
            ),
            coinsEarned != 0 && React.createElement(
                'h2',
                null,
                coinsEarned,
                ' ',
                React.createElement('img', { src: './images/player-coin.png', width: '50' }),
                ' ',
                'Earned!'
            ),
            attackSlot == '1' && React.createElement(
                'h2',
                null,
                'New Attack Unlocked! ',
                level == 4 && "(Dive) ArrowDown to use",
                ' ',
                level == 8 && "(Fireball) Spacebar to use"
            ),
            React.createElement(
                'b',
                {
                    onClick: function onClick() {
                        setShowPopup(false);
                        confetti.stop();
                    },
                    className: 'PB__closeLevelPopup'
                },
                'X'
            )
        );
    }

    function logoutPlayer() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.reload();
    }

    return isPlayerInfoLoading || isLevelInfoLoading ? React.createElement(
        'div',
        null,
        React.createElement(
            'div',
            { 'class': 'PB__gameIcon' },
            React.createElement('img', { src: './images/web_icon.png', width: '90' }),
            React.createElement(
                'div',
                { 'class': 'PB__gameName' },
                'FF'
            )
        ),
        React.createElement('div', { className: 'PB__player_pic PB__skeleton' }),
        React.createElement('div', { className: 'PB__player-status PB__skeleton PB__skeleton-text PB__skeleton-border' }),
        React.createElement(
            'div',
            { 'class': 'PB__skeleton-player-level' },
            React.createElement('svg', {
                'class': 'PB__skeleton PB__skeleton-border',
                xmlns: 'http://www.w3.org/2000/svg',
                width: '60',
                viewBox: '0 0 461.91 512'
            })
        ),
        React.createElement('div', { 'class': 'PB__skeleton-nav PB__skeleton' }),
        React.createElement('div', { 'class': 'PB__skeleton-progress PB__skeleton' }),
        React.createElement('div', { className: 'PB__luck PB__skeleton' }),
        React.createElement('div', { className: 'PB__coin PB__skeleton' }),
        React.createElement('div', { 'class': 'PB__barWidget PB__logBtn PB__skeleton' })
    ) : playerError || levelError ? React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            'Unexpected Error occurred while loading.'
        ),
        React.createElement('button', { onClick: function onClick() {
                return window.location.reload();
            } })
    ) : !isLoggedIn ? React.createElement(
        'div',
        null,
        React.createElement(
            'div',
            { 'class': 'PB__gameIcon' },
            React.createElement('img', { src: './images/web_icon.png', width: '90' }),
            React.createElement(
                'div',
                { 'class': 'PB__gameName' },
                'FF'
            )
        ),
        React.createElement('img', {
            title: 'Log in to access your profile',
            className: 'PB__player_pic_guest',
            src: './images/profile_pic/' + profilePic
        }),
        React.createElement(
            'div',
            { className: 'PB__player-status' },
            'Guest'
        ),
        React.createElement(DropdownNav, { currentPage: currentPage, isLoggedIn: isLoggedIn }),
        React.createElement(
            'div',
            {
                'class': 'PB__barWidget PB__logBtn PB__blue',
                onClick: function onClick() {
                    return window.location.href = '/registerLogin';
                }
            },
            React.createElement(
                'span',
                { 'class': 'PB__loginLabel' },
                'Log In'
            )
        )
    ) : React.createElement(
        'div',
        null,
        React.createElement(
            'div',
            { 'class': 'PB__gameIcon' },
            React.createElement('img', { src: './images/web_icon.png', width: '90' }),
            React.createElement(
                'div',
                { 'class': 'PB__gameName' },
                'FF'
            )
        ),
        React.createElement(
            'a',
            { href: '/profile' },
            React.createElement('img', {
                title: 'Profile',
                className: 'PB__player_pic',
                src: './images/profile_pic/' + profilePic
            })
        ),
        React.createElement(
            'div',
            {
                className: 'PB__player-status'
            },
            playerData.result.username
        ),
        React.createElement(
            'div',
            { className: 'PB__player-level' },
            React.createElement(
                'svg',
                {
                    xmlns: 'http://www.w3.org/2000/svg',
                    width: '60',
                    viewBox: '0 0 461.91 512'
                },
                React.createElement('path', {
                    id: 'PB__levelShape',
                    d: 'M25.045,128,256,0,486.955,128V384L256,512,25.045,384Z',
                    transform: 'translate(-25.045)',
                    fill: '#e21b1b'
                }),
                React.createElement(
                    'text',
                    {
                        x: '50%',
                        y: '53%',
                        'dominant-baseline': 'middle',
                        'text-anchor': 'middle'
                    },
                    level
                )
            ),
            React.createElement(
                'div',
                { id: 'PB__progress' },
                React.createElement('div', {
                    style: {
                        width: level == levelStorage.length ? '100%' : parseInt(xpCurr / xpNeeded * 100) + '%'
                    },
                    className: 'PB__xpCurr'
                }),
                React.createElement(
                    'span',
                    { 'class': 'PB__xpSpecifics' },
                    level == levelStorage.length ? 'MAX' : xpCurr + '/' + xpNeeded
                )
            )
        ),
        React.createElement(DropdownNav, { currentPage: currentPage, isLoggedIn: isLoggedIn }),
        React.createElement(
            'div',
            { className: 'PB__luck' },
            React.createElement(
                'span',
                { className: 'PB__luckyChance' },
                luckyChance
            ),
            React.createElement('img', {
                className: 'PB__luckImg',
                src: './images/fourLeaf.png',
                width: '50'
            })
        ),
        React.createElement(
            'div',
            { className: 'PB__coin' },
            React.createElement(
                'span',
                { className: 'PB__coinValue' },
                coins
            ),
            React.createElement('img', {
                className: 'PB__coinImg',
                src: './images/player-coin.png',
                width: '50'
            })
        ),
        React.createElement(
            'div',
            {
                'class': 'PB__barWidget PB__logBtn PB__red',
                onClick: function onClick() {
                    return logoutPlayer();
                }
            },
            React.createElement(
                'span',
                { 'class': 'PB__logoutLabel' },
                'Log Out'
            )
        ),
        showPopup && React.createElement(LevelUpPopup, null)
    );
}

window.addEventListener('DOMContentLoaded', function () {
    var root = ReactDOM.createRoot(document.getElementById('playerInfoBar'));
    root.render(React.createElement(
        QueryClientProvider,
        { client: queryClient },
        React.createElement(PlayerInfoBar, null)
    ));
});