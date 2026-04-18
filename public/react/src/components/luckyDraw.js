const { useMutation, QueryClient, QueryClientProvider } = window.ReactQuery;

let coinsEarned;

function shuffle(array) {
    var currentIndex = array.length;
    let randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[currentIndex],
            array[currentIndex],
        ];
    }
    return array;
}

function spin() {
    wheel.play();
    const box = document.getElementById('box');
    // console.log('this is box element');
    // console.log(box);
    const element = document.getElementById('mainbox');
    let SelectItem = '';

    let coin10 = shuffle([1890, 2250, 2610]);
    let coin20 = shuffle([1850, 2210, 2570]);
    let coin30 = shuffle([1770, 2130, 2490]);
    let coin40 = shuffle([1810, 2170, 2530]);
    let coin50 = shuffle([1750, 2110, 2470]);

    // to shuffle the coins getting
    let results = shuffle([
        coin10[0],
        coin20[0],
        coin30[0],
        coin40[0],
        coin50[0],
    ]);

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

    return new Promise((resolve, reject) => {
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
                backdrop: `
                      rgba(0,0,123,0.4)
                      url("./images/runningDog.gif")
                      left top
                      no-repeat
                    `,
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
        const luckyChance = window.getLuckyChance();
        console.log('your lucky chance-----------------');
        console.log(luckyChance);
        if (luckyChance != 0) {
            spin().then(() => {
                console.log('promise..............');
                window.setLuckyDrawChance(luckyChance - 1, coinsEarned);
            });
        } else {
            alert("You don't have any lucky draw chance yet");
        }
    }

    return (
        <div class="mainbox" id="mainbox">
            <div class="box" id="box">
                <div class="box1">
                    <span class="font span1">
                        <h5>30 Coins</h5>
                    </span>
                    <span class="font span2">
                        <h5>50 Coins</h5>
                    </span>
                    <span class="font span3">
                        <h5>10 Coins</h5>
                    </span>
                    <span class="font span4">
                        <h5>20 Coins</h5>
                    </span>
                    <span class="font span5">
                        <h5>40 Coins</h5>
                    </span>
                </div>
                <div class="box2">
                    <span class="font span1">
                        <h5>30 Coins</h5>
                    </span>
                    <span class="font span2">
                        <h5>50 Coins</h5>
                    </span>
                    <span class="font span3">
                        <h5>10 Coins</h5>
                    </span>
                    <span class="font span4">
                        <h5>20 Coins</h5>
                    </span>
                    <span class="font span5">
                        <h5>40 Coins</h5>
                    </span>
                </div>
            </div>
            <button
                class="spin"
                onClick={(e) => {
                    e.preventDefault();
                    onSpinning();
                }}
            >
                SPIN
            </button>
        </div>
    );
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
}); // declare the query client
function LuckyDraw() {
    return (
        <QueryClientProvider client={queryClient}>
            <SpinWheel />
        </QueryClientProvider>
    );
}
window.addEventListener('DOMContentLoaded', function () {
    const root = ReactDOM.createRoot(
        document.querySelector('#luckyDrawContainer')
    );

    root.render(<LuckyDraw />);
});
