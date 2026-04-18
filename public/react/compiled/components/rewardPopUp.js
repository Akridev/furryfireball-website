var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function RewardPopUp() {
    var _React$useState = React.useState(window.randomReward),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        reward = _React$useState2[0],
        setReward = _React$useState2[1]; // set reward


    var _React$useState3 = React.useState(false),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        isOpen = _React$useState4[0],
        setIsOpen = _React$useState4[1];

    React.useEffect(function () {
        var present = document.querySelector('.present');
        var rewardPopUp = document.querySelector('#popUpReward');
        console.log(isOpen);
        if (reward != null) {
            rewardPopUp.onclick = null;
            console.log(rewardPopUp.onclick);

            // set for 1 sec
            setTimeout(function () {
                console.log("timout " + isOpen);

                confetti.start();
                present.classList.toggle('open');
                handleIsOpen(true);

                rewardPopUp.onclick = function () {
                    rewardPopUp.style.display = "none";
                    confetti.stop();
                    present.classList.toggle('open');
                    alert(reward.amount + " " + reward.type + " is gained");
                };
            }, 1000);

            // set for 5 sec
            setTimeout(function () {
                confetti.stop();
            }, 5000);
        }
    }, [reward]);

    window.handleReward = function (set) {
        setReward(set);
    };
    function handleIsOpen(set) {
        setIsOpen(set);
    }
    return React.createElement(
        'div',
        null,
        React.createElement(
            'div',
            { 'class': 'present' },
            React.createElement(
                'div',
                { 'class': 'name' },
                reward != null ? React.createElement(
                    'div',
                    null,
                    reward != null && (reward.type == "coin" || reward.type == "luckyDrawChance") ? React.createElement('img', { src: reward.image }) : React.createElement('div', null),
                    React.createElement(
                        'h1',
                        { id: 'textReward' },
                        reward.amount + " " + reward.type
                    )
                ) : React.createElement(
                    'h1',
                    { id: 'textReward' },
                    'No reward'
                )
            ),
            React.createElement(
                'div',
                { 'class': 'rotate-container' },
                React.createElement('div', { 'class': 'bottom' }),
                React.createElement('div', { 'class': 'front' }),
                React.createElement('div', { 'class': 'left' }),
                React.createElement('div', { 'class': 'back' }),
                React.createElement('div', { 'class': 'right' }),
                React.createElement(
                    'div',
                    { 'class': 'lid' },
                    React.createElement('div', { 'class': 'lid-top' }),
                    React.createElement('div', { 'class': 'lid-front' }),
                    React.createElement('div', { 'class': 'lid-left' }),
                    React.createElement('div', { 'class': 'lid-back' }),
                    React.createElement('div', { 'class': 'lid-right' })
                )
            )
        )
    );
}

window.addEventListener('DOMContentLoaded', function () {
    var domContainer = document.querySelector("#popUpReward");
    var root = ReactDOM.createRoot(domContainer);

    root.render(React.createElement(RewardPopUp, null));
});