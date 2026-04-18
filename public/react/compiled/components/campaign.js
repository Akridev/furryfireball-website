var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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
import { getUserCampaignData, getCampaignData } from '../api.js';
// ==========================================

function Campaign() {
    var _React$useState = React.useState(0),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        starsEarned = _React$useState2[0],
        setStarsEarned = _React$useState2[1];

    var queryMultiple = function queryMultiple() {
        var res1 = useQuery(['getUserCampaignData'], function () {
            return getUserCampaignData();
        }, {
            onSuccess: function onSuccess(data) {
                if (data.error) {
                    window.location.href = './home';
                }
            },

            onError: function onError() {
                alert("An unexpected error occurred, you will be redirected back to home page.");
                window.location.href = './home';
            }
        });

        var res2 = useQuery(['getCampaignData'], function () {
            return getCampaignData();
        });
        return [res1, res2];
    };

    var _queryMultiple = queryMultiple(),
        _queryMultiple2 = _slicedToArray(_queryMultiple, 2),
        _queryMultiple2$ = _queryMultiple2[0],
        isUserCamapignInfoLoading = _queryMultiple2$.isLoading,
        userCampaignData = _queryMultiple2$.data,
        userCampaignError = _queryMultiple2$.error,
        _queryMultiple2$2 = _queryMultiple2[1],
        isCampaignInfoLoading = _queryMultiple2$2.isLoading,
        campaignData = _queryMultiple2$2.data,
        campaignError = _queryMultiple2$2.error;

    var isLoading = isUserCamapignInfoLoading || isCampaignInfoLoading;
    var error = userCampaignError || campaignError;

    var stageData = [{
        level: 1,
        topOffset: "60.5%",
        leftOffset: "6%",
        locked: true,
        stars: 0
    }, {
        level: 2,
        topOffset: "60.5%",
        leftOffset: "19.2%",
        locked: true,
        stars: 0
    }, {
        level: 3,
        topOffset: "34%",
        leftOffset: "19.2%",
        locked: true,
        stars: 0
    }, {
        level: 4,
        topOffset: "34%",
        leftOffset: "34%",
        locked: true,
        stars: 0
    }, {
        level: 5,
        topOffset: "34%",
        leftOffset: "48.5%",
        locked: true,
        stars: 0
    }, {
        level: 6,
        topOffset: "57.5%",
        leftOffset: "48.5%",
        locked: true,
        stars: 0
    }, {
        level: 7,
        topOffset: "80.5%",
        leftOffset: "48.5%",
        locked: true,
        stars: 0
    }, {
        level: 8,
        topOffset: "80.5%",
        leftOffset: "65%",
        locked: true,
        stars: 0
    }, {
        level: 9,
        topOffset: "60.5%",
        leftOffset: "65%",
        locked: true,
        stars: 0
    }, {
        level: 10,
        topOffset: "60.5%",
        leftOffset: "77.5%",
        locked: true,
        stars: 0
    }, {
        level: 11,
        topOffset: "60.5%",
        leftOffset: "90%",
        locked: true,
        stars: 0
    }];

    function StageDisplay() {

        var totalStars = 0;
        if (!error && userCampaignData && !isLoading) {
            console.log(userCampaignData);
            var stageArr = userCampaignData.result;
            if (stageArr.length != 0) for (var i = 0; i < stageArr.length; i++) {
                if (stageArr[i].stage_level == stageData[i].level) {
                    stageData[i].locked = false;
                    stageData[i].stars = parseInt(stageArr[i].obj_one) + parseInt(stageArr[i].obj_two) + parseInt(stageArr[i].obj_three);
                    totalStars += stageData[i].stars;
                    stageData[i].obj = {
                        o1: stageArr[i].obj_one == '1' ? true : false,
                        o2: stageArr[i].obj_two == '1' ? true : false,
                        o3: stageArr[i].obj_three == '1' ? true : false
                    };
                }
            } else {
                stageData[0].locked = false;
                stageData[0].obj = {
                    o1: false,
                    o2: false,
                    o3: false
                };
            }
        }

        setStarsEarned(totalStars);

        var stageDisplay = stageData.map(function (stageLevel) {

            if (stageLevel.locked) {
                return React.createElement(
                    'div',
                    { key: stageLevel.level, style: { top: stageLevel.topOffset, left: stageLevel.leftOffset }, 'data-label': stageLevel.level, 'class': 'game-stage-locked' },
                    isLoading && React.createElement('div', { 'class': 'loading' })
                );
            } else {
                var star1 = stageLevel.stars >= 1 ? "yellow" : "gray";
                var star2 = stageLevel.stars >= 2 ? "yellow" : "gray";
                var star3 = stageLevel.stars == 3 ? "yellow" : "gray";
                return React.createElement(
                    'div',
                    { 'class': 'obj_trigger' },
                    React.createElement(
                        'div',
                        { key: stageLevel.level, style: { top: stageLevel.topOffset, left: stageLevel.leftOffset }, 'data-label': stageLevel.level, 'class': 'game-stage', onClick: function onClick() {
                                return window.location.href = "/game?cpm=" + stageLevel.level;
                            } },
                        React.createElement('i', { 'class': "fa fa-star star-one " + star1 }),
                        React.createElement('i', { 'class': "fa fa-star star-two " + star2 }),
                        React.createElement('i', { 'class': "fa fa-star star-three " + star3 })
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'obj_dropdown-content' },
                        React.createElement(
                            'p',
                            { 'class': 'obj_header' },
                            'Stage ',
                            stageLevel.level,
                            ' Objectives'
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'objectives' },
                            React.createElement(
                                'p',
                                { 'class': 'obj_1' },
                                stageLevel.obj.o1 ? React.createElement('i', { 'class': 'fa fa-check' }) : React.createElement('i', { 'class': 'fa fa-close' }),
                                React.createElement(
                                    'span',
                                    { 'class': 'obj_text' },
                                    campaignData[stageLevel.level - 1].objective1
                                )
                            ),
                            React.createElement(
                                'p',
                                { 'class': 'obj_2' },
                                stageLevel.obj.o1 ? React.createElement('i', { 'class': 'fa fa-check' }) : React.createElement('i', { 'class': 'fa fa-close' }),
                                React.createElement(
                                    'span',
                                    { 'class': 'obj_text' },
                                    campaignData[stageLevel.level - 1].objective2
                                )
                            ),
                            React.createElement(
                                'p',
                                { 'class': 'obj_3' },
                                stageLevel.obj.o1 ? React.createElement('i', { 'class': 'fa fa-check' }) : React.createElement('i', { 'class': 'fa fa-close' }),
                                React.createElement(
                                    'span',
                                    { 'class': 'obj_text' },
                                    campaignData[stageLevel.level - 1].objective3
                                )
                            )
                        )
                    )
                );
            }
        });

        return stageDisplay;
    }

    return React.createElement(
        'div',
        null,
        React.createElement('img', { 'class': 'backgroundImg', src: '../images/campaign_bg/desert.png' }),
        React.createElement(
            'div',
            { 'class': 'totalStars' },
            isLoading ? React.createElement('div', { 'class': 'totalStarsLoading' }) : React.createElement(
                'div',
                { 'class': 'totalStarsContent' },
                starsEarned + "/" + campaignData.length * 3
            ),
            React.createElement('i', { 'class': 'fa fa-star yellow totalStarsStar' })
        ),
        React.createElement(StageDisplay, null)
    );
}

window.addEventListener('DOMContentLoaded', function () {
    var root = ReactDOM.createRoot(document.getElementById('campaign'));
    root.render(React.createElement(
        QueryClientProvider,
        { client: queryClient },
        React.createElement(Campaign, null)
    ));
});