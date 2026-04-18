var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import Product from './product.js';
import { ProductBoard } from './productBoard.js';
import { StoreNavBar } from './storeNavBar.js';
import { getStoreData } from '../api.js';

var _window$ReactQuery = window.ReactQuery,
    useQuery = _window$ReactQuery.useQuery,
    QueryClient = _window$ReactQuery.QueryClient,
    QueryClientProvider = _window$ReactQuery.QueryClientProvider;


var attacksPro = [];
var equipsPro = [];
var medicine = [];

function splitProducts(data) {
    // to ensure the arrays are empty at beginning when reload
    attacksPro = [];
    equipsPro = [];
    medicine = [];
    console.log('Loading products format');
    console.log(data);
    // the data should be loaded from db
    var products = data;

    // to split all the data into individual array
    products.map(function (product) {
        if (product.type === 'fireball' || product.type === 'dive' || product.type === 'roll') {
            console.log('pushing data at store--------');

            attacksPro.push(product);
            console.log(attacksPro);
        } else if (product.type === 'equipment') {
            equipsPro.push(product);
        } else {
            // lifeMedicine + exMedicine
            medicine.push(product);
        }
    });
}

/**
 * To display the products in store
 */
function ProductsDisplay(props) {
    return props.products.map(function (product) {
        return React.createElement(Product, {
            image: product.image,
            name: product.name,
            price: product.price,
            soldout: product.soldout,
            onClick: function onClick() {
                props.setProBoardInfo(product);
                // alert('product card clicked');
            }
        });
    });
}

// This is the whole store
function Store(props) {
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

    // Get data from db ---------------------------------------------


    var _useQuery = useQuery(
    // specific identifier, query key
    ['getStoreData'],
    // function used to get data from db
    function () {
        return getStoreData();
    }),
        data = _useQuery.data,
        error = _useQuery.error,
        isLoading = _useQuery.isLoading,
        isRefetching = _useQuery.isRefetching,
        refetch = _useQuery.refetch;

    React.useEffect(function () {
        console.log('use effect load data---------------------');
        // only setSatate when data is loaded
        if (data) {
            console.log(data);
            splitProducts(data);
            setActiveProInfo(attacksPro);
            setProBoardInfo(attacksPro[0]);
        }
    }, [data]);
    //--------------------------------------------------------------------

    // User purchase product ---------------------------------------------
    /**
     * Update & Refetch data
     */
    var onBoughtProduct = React.useCallback(function () {
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
        { id: 'storeContainer' },
        React.createElement(
            'div',
            { id: 'title' },
            React.createElement(
                'h4',
                null,
                'Store'
            )
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
                React.createElement(ProductBoard, {
                    productInfo: proBoardInfo,
                    onBoughtProduct: onBoughtProduct
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
function GameStore() {
    return React.createElement(
        QueryClientProvider,
        { client: queryClient },
        React.createElement(Store, null)
    );
}
window.addEventListener('DOMContentLoaded', function () {
    var root = ReactDOM.createRoot(document.querySelector('#store'));

    root.render(React.createElement(GameStore, null));
});