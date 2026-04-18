var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { Player } from '../../../js/game_js/player.js';
import { getUserMedicine, useProduct } from '../api.js';
var _window$ReactQuery = window.ReactQuery,
    useQuery = _window$ReactQuery.useQuery,
    useMutation = _window$ReactQuery.useMutation,
    QueryClient = _window$ReactQuery.QueryClient,
    QueryClientProvider = _window$ReactQuery.QueryClientProvider;


var queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
}); // declare the query client
function MedicineContainer() {
    // let productData = {
    //     productName: props.productInfo.name,
    //     productType: props.productInfo.type,
    //     amount: props.productInfo.amount,
    var _React$useState = React.useState(),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        lowMedNum = _React$useState2[0],
        setLowMedNum = _React$useState2[1];

    var _React$useState3 = React.useState(),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        mediumMedNum = _React$useState4[0],
        setMediumMedNum = _React$useState4[1];

    var _React$useState5 = React.useState(),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        highMedNum = _React$useState6[0],
        setHighMedNum = _React$useState6[1];

    var _React$useState7 = React.useState(),
        _React$useState8 = _slicedToArray(_React$useState7, 2),
        reviveMedNum = _React$useState8[0],
        setReviveMedNum = _React$useState8[1];

    var _React$useState9 = React.useState(),
        _React$useState10 = _slicedToArray(_React$useState9, 2),
        lowIncrease = _React$useState10[0],
        setLowIncrease = _React$useState10[1];

    var _React$useState11 = React.useState(),
        _React$useState12 = _slicedToArray(_React$useState11, 2),
        medIncrease = _React$useState12[0],
        setMedIncrease = _React$useState12[1];

    var _React$useState13 = React.useState(),
        _React$useState14 = _slicedToArray(_React$useState13, 2),
        highIncrease = _React$useState14[0],
        setHighIncrease = _React$useState14[1];

    window.useLowMedicine = function () {
        if (window.getCurrentHealth() < window.getMaxHealth()) {
            if (lowMedNum <= 0) {
                alert("You don't have enough medicine to use!");
            } else {
                mutateAsync({
                    productName: 'Low Recovery Medicine',
                    productType: 'lifeMedicine',
                    amount: lowMedNum
                }).then(function () {
                    // console.log(window.getCurrentHealth() + lowIncrease);
                    // console.log(window.getMaxHealth());
                    if (parseInt(window.getCurrentHealth()) + lowIncrease >= window.getMaxHealth()) {
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
                    amount: mediumMedNum
                }).then(function () {
                    if (parseInt(window.getCurrentHealth()) + medIncrease >= window.getMaxHealth()) {
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
                    amount: highMedNum
                }).then(function () {
                    if (parseInt(window.getCurrentHealth()) + highIncrease >= window.getMaxHealth()) {
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
                amount: reviveMedNum
            }).then(function () {
                window.setReviveHealth();
                setReviveMedNum(reviveMedNum - 1);
            });
        }
    };

    // Get data from db ---------------------------------------------

    var _useQuery = useQuery(
    // specific identifier, query key
    ['getUserMedicine'],
    // function used to get data from db
    function () {
        return getUserMedicine();
    }),
        data = _useQuery.data,
        error = _useQuery.error,
        isLoading = _useQuery.isLoading,
        isRefetching = _useQuery.isRefetching,
        refetch = _useQuery.refetch;

    var _useMutation = useMutation(function (medData) {
        console.log('usingggggggggggggg life medicine');
        // if (window.getCoins() > 0) {
        //     addCoins(-props.productInfo.price);
        //     return productPurchase(purchaseData).then((msg) => alert(msg));
        // } else {
        //     alert('You dont have enough coins to buy!');
        // }

        onUseLifeMedicine(medData);
    }),
        mutateAsync = _useMutation.mutateAsync;

    React.useEffect(function () {
        console.log('use effect load medicine data---------------------');
        // only setSatate when data is loaded
        if (data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                if (data[i].amount == null) {
                    data[i].amount = 0;
                    console.log('hello amount');
                    console.log(data[i].amount);
                }

                if (data[i].name == 'Low Recovery Medicine') {
                    setLowIncrease(parseInt(data[i].increasement));
                    console.log('here is the low increase---------' + lowIncrease);
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
    var onUseLifeMedicine = React.useCallback(function (productData) {
        useProduct(productData).then(function (msg) {
            // alert(msg);
            refetch();
        });
    }, [refetch]);
    //--------------------------------------------------------------------

    return isLoading || isRefetching ? React.createElement(
        'p',
        null,
        'Loading...'
    ) : error ? React.createElement(
        'p',
        null,
        error.message
    ) : React.createElement(
        'div',
        null,
        React.createElement(
            'div',
            { 'class': 'item' },
            React.createElement(
                'div',
                null,
                React.createElement(
                    'span',
                    { 'class': 'num-badge' },
                    lowMedNum
                ),
                React.createElement('img', { src: './images/store/medicine/m1.png', alt: '' })
            ),
            React.createElement(
                'p',
                null,
                'Life + ',
                lowIncrease
            )
        ),
        React.createElement(
            'div',
            { 'class': 'item' },
            React.createElement(
                'div',
                null,
                React.createElement(
                    'span',
                    { 'class': 'num-badge' },
                    mediumMedNum
                ),
                React.createElement('img', { src: './images/store/medicine/m2.png', alt: '' })
            ),
            React.createElement(
                'p',
                null,
                'Life + ',
                medIncrease
            )
        ),
        React.createElement(
            'div',
            { 'class': 'item' },
            React.createElement(
                'div',
                null,
                React.createElement(
                    'span',
                    { 'class': 'num-badge' },
                    highMedNum
                ),
                React.createElement('img', { src: './images/store/medicine/m3.png', alt: '' })
            ),
            React.createElement(
                'p',
                null,
                'Life + ',
                highIncrease
            )
        ),
        React.createElement(
            'div',
            { 'class': 'item' },
            React.createElement(
                'div',
                null,
                React.createElement(
                    'span',
                    { 'class': 'num-badge' },
                    reviveMedNum
                ),
                React.createElement('img', { src: './images/store/medicine/revive.png', alt: '' })
            ),
            React.createElement(
                'p',
                null,
                'Revive'
            )
        )
    );
}

window.addEventListener('DOMContentLoaded', function () {
    var root = ReactDOM.createRoot(document.getElementById('medicineContainer'));
    root.render(React.createElement(
        QueryClientProvider,
        { client: queryClient },
        React.createElement(MedicineContainer, null)
    ));
});