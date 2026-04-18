import { Player } from '../../../js/game_js/player.js';
import { getUserMedicine, useProduct } from '../api.js';
const { useQuery, useMutation, QueryClient, QueryClientProvider } =
    window.ReactQuery;

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
}); // declare the query client
function MedicineContainer() {
    // let productData = {
    //     productName: props.productInfo.name,
    //     productType: props.productInfo.type,
    //     amount: props.productInfo.amount,
    // };
    const [lowMedNum, setLowMedNum] = React.useState();
    const [mediumMedNum, setMediumMedNum] = React.useState();
    const [highMedNum, setHighMedNum] = React.useState();
    const [reviveMedNum, setReviveMedNum] = React.useState();
    const [lowIncrease, setLowIncrease] = React.useState();
    const [medIncrease, setMedIncrease] = React.useState();
    const [highIncrease, setHighIncrease] = React.useState();
    window.useLowMedicine = function () {
        if (window.getCurrentHealth() < window.getMaxHealth()) {
            if (lowMedNum <= 0) {
                alert("You don't have enough medicine to use!");
            } else {
                mutateAsync({
                    productName: 'Low Recovery Medicine',
                    productType: 'lifeMedicine',
                    amount: lowMedNum,
                }).then(() => {
                    // console.log(window.getCurrentHealth() + lowIncrease);
                    // console.log(window.getMaxHealth());
                    if (
                        parseInt(window.getCurrentHealth()) + lowIncrease >=
                        window.getMaxHealth()
                    ) {
                        console.log('here is add low increase-------');
                        window.setMaxHealth();
                    } else {
                        window.addHealth(lowIncrease);
                    }
                    setLowMedNum(lowMedNum - 1);
                });
            }
        }
    };

    window.useMedMedicine = function () {
        if (window.getCurrentHealth() < window.getMaxHealth()) {
            if (mediumMedNum <= 0) {
                alert("You don't have enough medicine to use!");
            } else {
                mutateAsync({
                    productName: 'Medium Recovery Medicine',
                    productType: 'lifeMedicine',
                    amount: mediumMedNum,
                }).then(() => {
                    if (
                        parseInt(window.getCurrentHealth()) + medIncrease >=
                        window.getMaxHealth()
                    ) {
                        console.log('here is add med increase-------');

                        window.setMaxHealth();
                    } else {
                        window.addHealth(medIncrease);
                    }
                    setMediumMedNum(mediumMedNum - 1);
                });
            }
        }
    };

    window.useHighMedicine = function () {
        if (window.getCurrentHealth() < window.getMaxHealth()) {
            if (highMedNum <= 0) {
                alert("You don't have enough medicine to use!");
            } else {
                mutateAsync({
                    productName: 'High Recovery Medicine',
                    productType: 'lifeMedicine',
                    amount: highMedNum,
                }).then(() => {
                    if (
                        parseInt(window.getCurrentHealth()) + highIncrease >=
                        window.getMaxHealth()
                    ) {
                        console.log('here is add high increase-------');
                        window.setMaxHealth();
                    } else {
                        window.addHealth(highIncrease);
                    }
                    setHighMedNum(highMedNum - 1);
                });
            }
        }
    };

    window.useReviveMedicine = function () {
        if (reviveMedNum <= 0) {
            alert("You don't have enough medicine to use!");
        } else {
            mutateAsync({
                productName: 'Revive Medicine',
                productType: 'lifeMedicine',
                amount: reviveMedNum,
            }).then(() => {
                window.setReviveHealth();
                setReviveMedNum(reviveMedNum - 1);
            });
        }
    };

    // Get data from db ---------------------------------------------
    const { data, error, isLoading, isRefetching, refetch } = useQuery(
        // specific identifier, query key
        ['getUserMedicine'],
        // function used to get data from db
        () => getUserMedicine()
    );

    const { mutateAsync } = useMutation((medData) => {
        console.log('usingggggggggggggg life medicine');
        // if (window.getCoins() > 0) {
        //     addCoins(-props.productInfo.price);
        //     return productPurchase(purchaseData).then((msg) => alert(msg));
        // } else {
        //     alert('You dont have enough coins to buy!');
        // }

        onUseLifeMedicine(medData);
    });

    React.useEffect(() => {
        console.log('use effect load medicine data---------------------');
        // only setSatate when data is loaded
        if (data) {
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                if (data[i].amount == null) {
                    data[i].amount = 0;
                    console.log('hello amount');
                    console.log(data[i].amount);
                }

                if (data[i].name == 'Low Recovery Medicine') {
                    setLowIncrease(parseInt(data[i].increasement));
                    console.log(
                        'here is the low increase---------' + lowIncrease
                    );
                    setLowMedNum(data[i].amount);
                } else if (data[i].name == 'Medium Recovery Medicine') {
                    setMedIncrease(parseInt(data[i].increasement));
                    setMediumMedNum(data[i].amount);
                } else if (data[i].name == 'High Recovery Medicine') {
                    setHighIncrease(parseInt(data[i].increasement));
                    setHighMedNum(data[i].amount);
                } else {
                    setReviveMedNum(data[i].amount);
                }
            }
        }
    }, [data]);
    //--------------------------------------------------------------------

    // User use lifeMedicine ---------------------------------------------
    /**
     * Update & Refetch data
     */
    const onUseLifeMedicine = React.useCallback(
        (productData) => {
            useProduct(productData).then((msg) => {
                // alert(msg);
                refetch();
            });
        },
        [refetch]
    );
    //--------------------------------------------------------------------

    return isLoading || isRefetching ? (
        <p>Loading...</p>
    ) : error ? (
        <p>{error.message}</p>
    ) : (
        <div>
            <div class="item">
                <div>
                    <span class="num-badge">{lowMedNum}</span>
                    <img src="./images/store/medicine/m1.png" alt="" />
                </div>
                <p>Life + {lowIncrease}</p>
            </div>
            <div class="item">
                <div>
                    <span class="num-badge">{mediumMedNum}</span>
                    <img src="./images/store/medicine/m2.png" alt="" />
                </div>
                <p>Life + {medIncrease}</p>
            </div>
            <div class="item">
                <div>
                    <span class="num-badge">{highMedNum}</span>
                    <img src="./images/store/medicine/m3.png" alt="" />
                </div>
                <p>Life + {highIncrease}</p>
            </div>
            <div class="item">
                <div>
                    <span class="num-badge">{reviveMedNum}</span>
                    <img src="./images/store/medicine/revive.png" alt="" />
                </div>
                <p>Revive</p>
            </div>
        </div>
    );
}

window.addEventListener('DOMContentLoaded', function () {
    const root = ReactDOM.createRoot(
        document.getElementById('medicineContainer')
    );
    root.render(
        <QueryClientProvider client={queryClient}>
            <MedicineContainer />
        </QueryClientProvider>
    );
});
