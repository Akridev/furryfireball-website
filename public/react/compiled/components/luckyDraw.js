var _window$ReactQuery = window.ReactQuery,
    useMutation = _window$ReactQuery.useMutation,
    QueryClient = _window$ReactQuery.QueryClient,
    QueryClientProvider = _window$ReactQuery.QueryClientProvider;


var coinsEarned = void 0;

function shuffle(array) {
    var currentIndex = array.length;
    var randomIndex = void 0;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        var _ref = [array[currentIndex], array[currentIndex]];
        array[currentIndex] = _ref[0];
        array[randomIndex] = _ref[1];
    }
    return array;
}

function spin() {
    wheel.play();
    var box = document.getElementById('box');
    // console.log('this is box element');
    // console.log(box);
    var element = document.getElementById('mainbox');
    var SelectItem = '';

    var coin10 = shuffle([1890, 2250, 2610]);
    var coin20 = shuffle([1850, 2210, 2570]);
    var coin30 = shuffle([1770, 2130, 2490]);
    var coin40 = shuffle([1810, 2170, 2530]);
    var coin50 = shuffle([1750, 2110, 2470]);

    // to shuffle the coins getting
    var results = shuffle([coin10[0], coin20[0], coin30[0], coin40[0], coin50[0]]);

    if (coin10.includes(results[0])) {
        SelectItem = '10 Coins';
        coinsEarned = 10;
    } else if (coin20.includes(results[0])) {
        SelectItem = '20 Coins';
        coinsEarned = 20;
    } else if (coin30.includes(results[0])) {
        SelectItem = '30 Coins';
        coinsEarned = 30;
    } else if (coin40.includes(results[0])) {
        SelectItem = '40 Coins';
        coinsEarned = 40;
    } else if (coin50.includes(results[0])) {
        SelectItem = '50 Coins';
        coinsEarned = 50;
    }

    box.style.setProperty('transition', 'all ease 5s');
    box.style.transform = 'rotate(' + results[0] + 'deg)';
    // to drop lucky draw animation
    element.classList.remove('animate');

    return new Promise(function (resolve, reject) {
        // to rotate the spinner 5s
        setTimeout(function () {
            element.classList.add('animate');
        }, 5000);

        // pop up msg box when spinner stopped
        setTimeout(function () {
            ding.play();
            // alert when spinning done
            Swal.fire({
                title: 'Congratulations!\nYou won ' + SelectItem,
                width: 600,
                padding: '3em',
                color: '#716add',
                background: '#fff url(./images/popUpBack.png)',
                backdrop: '\n                      rgba(0,0,123,0.4)\n                      url("./images/runningDog.gif")\n                      left top\n                      no-repeat\n                    '
            });
        }, 5200);

        // to reset the spinner position
        setTimeout(function () {
            box.style.setProperty('transition', 'initial');
            box.style.transform = 'rotate(90deg)';
            resolve();
        }, 6000);
    });
}

// This is the whole spinner
function SpinWheel(props) {
    // to Spin
    function onSpinning() {
        // addXp(500);
        var luckyChance = window.getLuckyChance();
        console.log('your lucky chance-----------------');
        console.log(luckyChance);
        if (luckyChance != 0) {
            spin().then(function () {
                console.log('promise..............');
                window.setLuckyDrawChance(luckyChance - 1, coinsEarned);
            });
        } else {
            alert("You don't have any lucky draw chance yet");
        }
    }

    return React.createElement(
        'div',
        { 'class': 'mainbox', id: 'mainbox' },
        React.createElement(
            'div',
            { 'class': 'box', id: 'box' },
            React.createElement(
                'div',
                { 'class': 'box1' },
                React.createElement(
                    'span',
                    { 'class': 'font span1' },
                    React.createElement(
                        'h5',
                        null,
                        '30 Coins'
                    )
                ),
                React.createElement(
                    'span',
                    { 'class': 'font span2' },
                    React.createElement(
                        'h5',
                        null,
                        '50 Coins'
                    )
                ),
                React.createElement(
                    'span',
                    { 'class': 'font span3' },
                    React.createElement(
                        'h5',
                        null,
                        '10 Coins'
                    )
                ),
                React.createElement(
                    'span',
                    { 'class': 'font span4' },
                    React.createElement(
                        'h5',
                        null,
                        '20 Coins'
                    )
                ),
                React.createElement(
                    'span',
                    { 'class': 'font span5' },
                    React.createElement(
                        'h5',
                        null,
                        '40 Coins'
                    )
                )
            ),
            React.createElement(
                'div',
                { 'class': 'box2' },
                React.createElement(
                    'span',
                    { 'class': 'font span1' },
                    React.createElement(
                        'h5',
                        null,
                        '30 Coins'
                    )
                ),
                React.createElement(
                    'span',
                    { 'class': 'font span2' },
                    React.createElement(
                        'h5',
                        null,
                        '50 Coins'
                    )
                ),
                React.createElement(
                    'span',
                    { 'class': 'font span3' },
                    React.createElement(
                        'h5',
                        null,
                        '10 Coins'
                    )
                ),
                React.createElement(
                    'span',
                    { 'class': 'font span4' },
                    React.createElement(
                        'h5',
                        null,
                        '20 Coins'
                    )
                ),
                React.createElement(
                    'span',
                    { 'class': 'font span5' },
                    React.createElement(
                        'h5',
                        null,
                        '40 Coins'
                    )
                )
            )
        ),
        React.createElement(
            'button',
            {
                'class': 'spin',
                onClick: function onClick(e) {
                    e.preventDefault();
                    onSpinning();
                }
            },
            'SPIN'
        )
    );
}

var queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
}); // declare the query client
function LuckyDraw() {
    return React.createElement(
        QueryClientProvider,
        { client: queryClient },
        React.createElement(SpinWheel, null)
    );
}
window.addEventListener('DOMContentLoaded', function () {
    var root = ReactDOM.createRoot(document.querySelector('#luckyDrawContainer'));

    root.render(React.createElement(LuckyDraw, null));
});