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
const { useQuery, QueryClient, QueryClientProvider } = window.ReactQuery;
const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
});
// ==========================================

// ==== Fetch API Functions =================
import {
    getPlayerInfo,
    getLevelInfo,
    updateCoins,
    updateXp,
    updateXpAndLevel,
    userLuckyDraw,
} from '../api.js';
// ==========================================

// ==== Import Components ===================
import DropdownNav from './dropdownNav.js';
// ==========================================

function PlayerInfoBar(props) {
    const [level, setLevel] = React.useState(0);
    const [xpNeeded, setXpNeeded] = React.useState(999999);
    const [xpCurr, setXpCurr] = React.useState(0);
    const [showPopup, setShowPopup] = React.useState(false);
    const [luckyChance, setLuckyChance] = React.useState(0);
    const [coins, setCoins] = React.useState(0);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isLevelRendered, setIsLevelRendered] = React.useState(false);
    const [profilePic, setProfilePic] = React.useState('autoProfilePic.jpg');
    const [currentPage, setCurrentPage] = React.useState('');
    const [dailyRewardDate, setDailyRewardDate] = React.useState('loading');

    const {
        isLoading: isLevelInfoLoading,
        data: levelStorage,
        error: levelError,
    } = useQuery(['getLevelInfo'], () => getLevelInfo());

    const {
        isLoading: isPlayerInfoLoading,
        data: playerData,
        error: playerError,
    } = useQuery(
        ['getPlayerInfo'],
        () => getPlayerInfo(),

        {
            onSuccess: (data) => {
                if (!data.error) {
                    setLevel(data.result.level);
                    setXpNeeded(levelStorage[data.result.level - 1].xpNeeded);
                    setXpCurr(data.result.xp);
                    setCoins(data.result.coins);
                    setLuckyChance(data.result.luckyDrawChance);
                    setDailyRewardDate(data.result.daily_reward_date);

                    // check if global variable exists
                    if (typeof window.handleDate === 'function')
                        window.handleDate(data.result.daily_reward_date);

                    if (
                        data.result.pic_url != null &&
                        data.result.pic_url != ''
                    )
                        setProfilePic(data.result.pic_url);
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }

                setCurrentPage(window.location.pathname.substring(1));
            },
            enabled: levelStorage ? true : false, // so that it is executed after levelStorage is defined
        }
    );

    React.useEffect(() => {
        // prevent this from executing when level is first rendered
        if (isLevelRendered && isLoggedIn) {
            setShowPopup(true);
            confetti.start();
            const levelObj = levelStorage[level - 1];
            setXpNeeded(levelObj.xpNeeded);
            addCoins(levelObj.coinsEarned);
            return function () {
                confetti.stop();
            };
        }
    }, [level]);

    window.handleInfoBarPic = (set) => {
        setProfilePic(set);
    };

    function calculateFinalXpLevel(xpRemainder) {
        let finalLevel = level + 1;

        while (xpRemainder > levelStorage[finalLevel - 1].xpNeeded)
            xpRemainder -= levelStorage[finalLevel++ - 1].xpNeeded;

        if (levelStorage[finalLevel - 1].xpNeeded == 'Max') xpRemainder = 0;

        let finalXpLevel = {
            xp: xpRemainder,
            level: finalLevel,
        };

        return finalXpLevel;
    }

    addXp = function (xpPoints) {
        if (isNaN(parseInt(xpPoints)))
            return console.log('xpPoints must be a number!! (At addXp)');
        setIsLevelRendered(true);
        xpPoints = +xpPoints;
        if (xpNeeded != 'Max' && level != 0) {
            if (xpCurr + xpPoints >= xpNeeded) {
                let xpRemainder = xpCurr + xpPoints - xpNeeded;
                let finalXpLevel = calculateFinalXpLevel(xpRemainder);
                setLevel(finalXpLevel.level);
                setXpCurr(finalXpLevel.xp);
                updateXpAndLevel(finalXpLevel);
            } else {
                updateXp(xpPoints);
                setXpCurr(xpCurr + xpPoints);
            }
        }
    };

    willXpExceed = function (xpPoints) {
        if (isNaN(parseInt(xpPoints)))
            return console.log('xpPoints must be a number!! (At willXpExceed)');

        if (xpCurr + xpPoints >= xpNeeded) return true;
        else return false;
    };

    addCoins = function (coinsToAdd) {
        if (!isNaN(coinsToAdd)) {
            updateCoins(coinsToAdd);
            setCoins(coins + coinsToAdd);
        }
    };

    getLuckyChance = function () {
        return luckyChance;
    };

    getCoins = function () {
        return coins;
    };

    getDailyRewardDate = function () {
        return dailyRewardDate;
    };

    setLuckyDrawChance = function (luckyChanceToEdit, coinsEarned) {
        if (!isNaN(luckyChanceToEdit)) {
            userLuckyDraw(luckyChanceToEdit, coinsEarned).then((msg) => {
                alert(msg);
                setLuckyChance(luckyChanceToEdit);
                setCoins(coins + coinsEarned); // update coins to infobar
            });
        }
    };

    function LevelUpPopup() {
        const levelObj = levelStorage[level - 1];
        const { coinsEarned, attackSlot } = levelObj;
        return (
            <div className="PB__levelPopup">
                <h2>
                    Leveled up from {level - 1} to {level}!
                </h2>
                {coinsEarned != 0 && (
                    <h2>
                        {coinsEarned}{' '}
                        <img src="./images/player-coin.png" width="50" />{' '}
                        Earned!
                    </h2>
                )}
                {attackSlot == '1' && <h2>New Attack Unlocked! {level == 4 && "(Dive) ArrowDown to use"} {level == 8 && "(Fireball) Spacebar to use"}</h2>}
                <b
                    onClick={() => {
                        setShowPopup(false);
                        confetti.stop();
                    }}
                    className="PB__closeLevelPopup"
                >
                    X
                </b>
            </div>
        );
    }

    function logoutPlayer() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.reload();
    }

    return isPlayerInfoLoading || isLevelInfoLoading ? (
        <div>
            <div class="PB__gameIcon">
                <img src="./images/web_icon.png" width="90" />
                <div class="PB__gameName">FF</div>
            </div>
            <div className="PB__player_pic PB__skeleton"></div>
            <div className="PB__player-status PB__skeleton PB__skeleton-text PB__skeleton-border"></div>
            <div class="PB__skeleton-player-level">
                <svg
                    class="PB__skeleton PB__skeleton-border"
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    viewBox="0 0 461.91 512"
                ></svg>
            </div>
            <div class="PB__skeleton-nav PB__skeleton"></div>
            <div class="PB__skeleton-progress PB__skeleton"></div>
            <div className="PB__luck PB__skeleton"></div>
            <div className="PB__coin PB__skeleton"></div>
            <div class="PB__barWidget PB__logBtn PB__skeleton"></div>
        </div>
    ) : playerError || levelError ? (
        <div>
            <h1>Unexpected Error occurred while loading.</h1>
            <button onClick={() => window.location.reload()}></button>
        </div>
    ) : !isLoggedIn ? (
        <div>
            <div class="PB__gameIcon">
                <img src="./images/web_icon.png" width="90" />
                <div class="PB__gameName">FF</div>
            </div>
            <img
                title="Log in to access your profile"
                className="PB__player_pic_guest"
                src={'./images/profile_pic/' + profilePic}
            />
            <div className="PB__player-status">Guest</div>
            <DropdownNav currentPage={currentPage} isLoggedIn={isLoggedIn} />
            <div
                class="PB__barWidget PB__logBtn PB__blue"
                onClick={() => (window.location.href = '/registerLogin')}
            >
                <span class="PB__loginLabel">Log In</span>
            </div>
        </div>
    ) : (
        <div>
            <div class="PB__gameIcon">
                <img src="./images/web_icon.png" width="90" />
                <div class="PB__gameName">FF</div>
            </div>
            <a href="/profile">
                <img
                    title="Profile"
                    className="PB__player_pic"
                    src={'./images/profile_pic/' + profilePic}
                />
            </a>

            <div
                className="PB__player-status"
            >
                {playerData.result.username}
            </div>
            <div className="PB__player-level">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    viewBox="0 0 461.91 512"
                >
                    <path
                        id="PB__levelShape"
                        d="M25.045,128,256,0,486.955,128V384L256,512,25.045,384Z"
                        transform="translate(-25.045)"
                        fill="#e21b1b"
                    />
                    <text
                        x="50%"
                        y="53%"
                        dominant-baseline="middle"
                        text-anchor="middle"
                    >
                        {level}
                    </text>
                </svg>
                <div id="PB__progress">
                    <div
                        style={{
                            width:
                                level == levelStorage.length
                                    ? '100%'
                                    : parseInt((xpCurr / xpNeeded) * 100) + '%',
                        }}
                        className="PB__xpCurr"
                    ></div>
                    <span class="PB__xpSpecifics">
                        {level == levelStorage.length
                            ? 'MAX'
                            : xpCurr + '/' + xpNeeded}
                    </span>
                </div>
            </div>

            <DropdownNav currentPage={currentPage} isLoggedIn={isLoggedIn} />

            <div className="PB__luck">
                <span className="PB__luckyChance">{luckyChance}</span>
                <img
                    className="PB__luckImg"
                    src="./images/fourLeaf.png"
                    width="50"
                />
            </div>
            <div className="PB__coin">
                <span className="PB__coinValue">{coins}</span>
                <img
                    className="PB__coinImg"
                    src="./images/player-coin.png"
                    width="50"
                />
            </div>
            <div
                class="PB__barWidget PB__logBtn PB__red"
                onClick={() => logoutPlayer()}
            >
                <span class="PB__logoutLabel">Log Out</span>
            </div>
            {showPopup && <LevelUpPopup />}
        </div>
    );
}

window.addEventListener('DOMContentLoaded', function () {
    const root = ReactDOM.createRoot(document.getElementById('playerInfoBar'));
    root.render(
        <QueryClientProvider client={queryClient}>
            <PlayerInfoBar />
        </QueryClientProvider>
    );
});
