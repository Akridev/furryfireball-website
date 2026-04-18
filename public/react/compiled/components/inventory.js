var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import BoughtItem from './boughtItem.js';
import { ItemDetailBoard } from './itemDetailBoard.js';
import { StoreNavBar } from './storeNavBar.js';
import { TopInfo } from './topInfo.js';
import { getUserPurhcase } from '../api.js';

var _window$ReactQuery = window.ReactQuery,
    useQuery = _window$ReactQuery.useQuery,
    QueryClient = _window$ReactQuery.QueryClient,
    QueryClientProvider = _window$ReactQuery.QueryClientProvider;


var attacksPro = [];
var equipsPro = [];
var medicine = [];
var inUsePro = [{
    name: 'Sun Burn',
    increasement: '0',
    type: 'fireball',
    image: './images/default/fireball.png',
    amount: 1,
    equipped: true
}, {
    name: 'Sun Dive',
    increasement: '0',
    type: 'dive',
    image: './images/default/fireball.png',
    amount: 1,
    equipped: true
}, {
    name: 'Sun Roll',
    increasement: '0',
    type: 'roll',
    image: './images/default/fireball.png',
    amount: 1,
    equipped: true
}, {
    name: 'Normal Shield',
    increasement: '0',
    type: 'equipment',
    image: './images/default/shield.png',
    amount: 1,
    equipped: true
}];

function initProducts() {
    attacksPro = [{
        name: 'Sun Burn',
        increasement: '0',
        type: 'fireball',
        image: './images/default/fireball.png',
        amount: 1,
        equipped: true
    }, {
        name: 'Sun Dive',
        increasement: '0',
        type: 'dive',
        image: './images/default/fireball.png',
        amount: 1,
        equipped: true
    }, {
        name: 'Sun Roll',
        increasement: '0',
        type: 'roll',
        image: './images/default/fireball.png',
        amount: 1,
        equipped: true
    }];
    equipsPro = [{
        name: 'Normal Shield',
        increasement: '0',
        type: 'equipment',
        image: './images/default/shield.png',
        amount: 1,
        equipped: true
    }];
    medicine = [];
    inUsePro = [{
        name: 'Sun Burn',
        increasement: '0',
        type: 'fireball',
        image: './images/default/fireball.png',
        amount: 1,
        equipped: true
    }, {
        name: 'Sun Dive',
        increasement: '0',
        type: 'dive',
        image: './images/default/fireball.png',
        amount: 1,
        equipped: true
    }, {
        name: 'Sun Roll',
        increasement: '0',
        type: 'roll',
        image: './images/default/fireball.png',
        amount: 1,
        equipped: true
    }, {
        name: 'Normal Shield',
        increasement: '0',
        type: 'equipment',
        image: './images/default/shield.png',
        amount: 1,
        equipped: true
    }];

    // attacksPro[0] = inUsePro[0];
    // attacksPro[1] = inUsePro[1];
    // attacksPro[2] = inUsePro[2];
    // equipsPro[0] = inUsePro[3];
}

function splitProducts(data) {
    // to ensure the arrays are empty at beginning when reload
    initProducts();
    console.log('Loading bought products...');
    console.log(data);
    // the data should be loaded from db
    var products = data;

    // to split all the data into individual array
    products.map(function (product) {
        // for change the default inventory settings, and push the in used product
        if (product.equipped == true && product.type == 'fireball') {
            inUsePro[0].equipped = false;
            attacksPro[0].equipped = false;
            inUsePro[0] = product;
            attacksPro.push(product);
        } else if (product.equipped == true && product.type == 'dive') {
            inUsePro[1].equipped = false;
            attacksPro[1].equipped = false;
            inUsePro[1] = product;
            attacksPro.push(product);
        } else if (product.equipped == true && product.type == 'roll') {
            inUsePro[2].equipped = false;
            attacksPro[2].equipped = false;
            inUsePro[2] = product;
            attacksPro.push(product);
        } else if (product.equipped == true && product.type == 'equipment') {
            inUsePro[3].equipped = false;
            equipsPro[0].equipped = false;
            inUsePro[3] = product;
            equipsPro.push(product);
        }

        // for purchased data and not equipped display
        if (product.equipped == false && (product.type === 'fireball' || product.type === 'dive' || product.type === 'roll')) {
            console.log('pushing data at inventory--------');
            attacksPro.push(product);
            console.log(attacksPro);
        } else if (product.equipped == false && product.type === 'equipment') {
            equipsPro.push(product);
        } else if (product.type === 'lifeMedicine' || product.type === 'ExMedicine') {
            // lifeMedicine + exMedicine
            medicine.push(product);
            console.log(medicine);
        }
    });
}

/**
 * To display the products in store
 */
function ProductsDisplay(props) {
    return props.products.map(function (product) {
        return React.createElement(BoughtItem, {
            image: product.image,
            name: product.name,
            onClick: function onClick() {
                props.setProBoardInfo(product);
                // alert('product card clicked');
            }
        });
    });
}

// This is the whole store
function Inventory(props) {
    var _React$useState = React.useState('Attack'),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        activeButton = _React$useState2[0],
        setActiveButton = _React$useState2[1];

    var _React$useState3 = React.useState([]),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        activeProInfo = _React$useState4[0],
        setActiveProInfo = _React$useState4[1];

    var _React$useState5 = React.useState({}),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        proBoardInfo = _React$useState6[0],
        setProBoardInfo = _React$useState6[1];
    // used for the four square later


    var _React$useState7 = React.useState(inUsePro),
        _React$useState8 = _slicedToArray(_React$useState7, 2),
        usingPro = _React$useState8[0],
        setUsingPro = _React$useState8[1];

    // Get data from db ---------------------------------------------


    var _useQuery = useQuery(
    // specific identifier, query key
    ['getUserPurhcase'],
    // function used to get data from db
    function () {
        return getUserPurhcase();
    }),
        data = _useQuery.data,
        error = _useQuery.error,
        isLoading = _useQuery.isLoading,
        isRefetching = _useQuery.isRefetching,
        refetch = _useQuery.refetch;

    React.useEffect(function () {
        console.log('use effect load data---------------------');
        initProducts();
        // only setSatate when data is loaded
        if (data) {
            console.log(data);
            splitProducts(data);
            setActiveProInfo(attacksPro);
            setProBoardInfo(attacksPro[0]);
            setUsingPro(inUsePro);
        }
    }, [data]);
    //--------------------------------------------------------------------

    // User purchase product ---------------------------------------------
    /**
     * Update & Refetch data
     */
    var onUseProduct = React.useCallback(function () {
        refetch();
    }, [refetch]);
    //--------------------------------------------------------------------

    // to onchange products displayed
    var onRefresh = function onRefresh(whichType) {
        setActiveButton(whichType);
        if (whichType === 'Attack') {
            setActiveProInfo(attacksPro);
        } else if (whichType === 'Equipment') {
            setActiveProInfo(equipsPro);
        } else {
            setActiveProInfo(medicine);
        }
    };

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
        { id: 'inventoryContainer' },
        React.createElement(
            'div',
            { id: 'title' },
            React.createElement(
                'h4',
                null,
                'Inventory'
            )
        ),
        React.createElement(
            'div',
            { id: 'topInfoContainer' },
            React.createElement(TopInfo, { equippedInfo: usingPro })
        ),
        React.createElement(
            'div',
            { id: 'navBar' },
            React.createElement(StoreNavBar, {
                activeButton: activeButton,
                activeProInfo: activeProInfo,
                onRefresh: onRefresh
            })
        ),
        React.createElement(
            'div',
            { id: 'proConatiner' },
            React.createElement(
                'div',
                { id: 'products' },
                React.createElement(ProductsDisplay, {
                    products: activeProInfo,
                    setProBoardInfo: setProBoardInfo
                })
            ),
            React.createElement(
                'div',
                { id: 'detailBoard' },
                React.createElement(ItemDetailBoard, {
                    productInfo: proBoardInfo,
                    onUseProduct: onUseProduct
                })
            )
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
function GameInventory() {
    return React.createElement(
        QueryClientProvider,
        { client: queryClient },
        React.createElement(Inventory, null)
    );
}
window.addEventListener('DOMContentLoaded', function () {
    var root = ReactDOM.createRoot(document.querySelector('#inventory'));

    root.render(React.createElement(GameInventory, null));
});