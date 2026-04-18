var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { getAllImage, getPurchasedImage, insertPurchasedImage, checkAccessToken } from "../api.js";
var _window$ReactQuery = window.ReactQuery,
    useQuery = _window$ReactQuery.useQuery,
    QueryClient = _window$ReactQuery.QueryClient,
    QueryClientProvider = _window$ReactQuery.QueryClientProvider,
    useMutation = _window$ReactQuery.useMutation;

var queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } }
});

var isLocalhost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
var STORAGE_API_HOST = isLocalhost ? 'http://localhost:4000' : 'https://ades-host-server.herokuapp.com';

var accessToken = localStorage.getItem('accessToken');
var refreshToken = localStorage.getItem('refreshToken');

function ImagePopUpContent(props) {
    var allImage = useQuery(['getAllImage'], function () {
        return getAllImage();
    });
    var purchasedImage = useQuery(['getPurchasedImage'], function () {
        return getPurchasedImage();
    });

    function btnOnClick() {
        var imgName = void 0;
        var imagesInDiv = document.querySelectorAll(".pImage");
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = imagesInDiv[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var image = _step.value;

                if (image.style.filter == "brightness(20%)") {

                    var array = image.src.split("/");
                    imgName = array.slice(-1)[0];
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        if (imgName != null && imgName != "") {
            window.handleChecking(true);
            var popUpDiv = window.document.getElementById("popUpDiv");
            window.hidePopUp(popUpDiv);

            fetch(STORAGE_API_HOST + '/updateUserImage?imageUrl=' + imgName, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + accessToken + " " + refreshToken
                }
            }).then(function (response) {
                return response.json();
            }).then(function (response) {
                if (response.error === "TokenExpiredError Not authorized") {
                    alert("Token is expired. Please re-login to check information");
                    localStorage.removeItem("accessToken");
                    window.location.href = '/';
                }
                checkAccessToken(response.accessToken);
                //alert(response.message)
                window.changePicUrl(imgName);
                window.handleInfoBarPic(imgName);
            }).catch(function (err) {
                alert(err);
            }).finally(function () {
                window.handleChecking(false);
            });
        } else {
            alert("Please choose an image");
        }
    }

    var onPurchase = React.useCallback(function () {
        console.log("REFETCH");
        purchasedImage.refetch();
    }, [purchasedImage.refetch]);

    return React.createElement(
        'div',
        { style: { height: "100%" } },
        React.createElement(
            'p',
            null,
            'Choose your Profile Picture:'
        ),
        allImage.isLoading || purchasedImage.isLoading || purchasedImage.isRefetching ? React.createElement('div', { 'class': 'centerLoader', style: { textAlign: "center" } }) : allImage.error || purchasedImage.error ? React.createElement(
            'h1',
            null,
            allImage.error.message || purchasedImage.error
        ) : React.createElement(
            'div',
            { id: 'centerImage' },
            allImage.data.map(function (row, index) {
                return React.createElement(DisplayImage, {
                    url: row.pic_url,
                    purchasable: row.purchasable,
                    amount: row.amount,
                    purchased: purchasedImage.data,
                    onPurchase: onPurchase
                });
            })
        ),
        React.createElement(
            'button',
            { id: 'button', onClick: btnOnClick },
            'Select Image'
        )
    );
}

function DisplayImage(props) {
    var _React$useState = React.useState(false),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        checking = _React$useState2[0],
        setIsChecking = _React$useState2[1];

    var currentPicUrl = window.getPicUrl;

    var _useMutation = useMutation(function () {
        window.addCoins(-props.amount);
        insertPurchasedImage(props.url);
    }),
        error = _useMutation.error,
        isLoading = _useMutation.isLoading,
        mutateAsync = _useMutation.mutateAsync;

    function handleChecking(set) {
        setIsChecking(set);
    }

    // For images that are not locked / unlocked ==> able to choose and change profile image 
    var unlockedImgOnClick = function unlockedImgOnClick(e) {
        var imagesInDiv = document.querySelectorAll("#unlockedImage");
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = imagesInDiv[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var image = _step2.value;

                image.style.filter = "brightness(100%)";
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        e.target.style.filter = "brightness(20%)";
        var array = e.target.src.split("/");
        console.log(array.slice(-1)[0]);
    };

    // For images that are locked ==> able to purchase profile image
    var lockedImgOnClick = function lockedImgOnClick(e) {
        var coins = window.getCoins();

        if (coins >= props.amount) {
            var c = confirm("Do you want to purchase this profile image?");

            if (c) {
                mutateAsync().then(function () {
                    return props.onPurchase();
                });
            }
        } else alert("You do not have enough coins to purchase this image");
    };

    React.useEffect(function () {
        props.purchased.map(function (row) {
            if (row.image_url == props.url) handleChecking(true);
        });
    }, []);

    return isLoading ? React.createElement('div', { 'class': 'loader', style: { display: "inline-block" } }) : error ? React.createElement(
        'h1',
        null,
        'error.message'
    ) :

    // checking if image is free / purchased already
    props.purchasable == "no" || checking ? React.createElement(
        'div',
        { 'class': 'containImage' },
        React.createElement('img', {
            'class': 'pImage',
            id: 'unlockedImage',
            src: './images/profile_pic/' + props.url,
            style: { filter: currentPicUrl == props.url ? "brightness(20%)" : "brightness(100%)" },
            onClick: function onClick(e) {
                return unlockedImgOnClick(e);
            } })
    ) :
    // checking if image is not purchased
    React.createElement(
        'div',
        { 'class': 'containImage', style: { top: "15%" } },
        React.createElement('img', { 'class': 'pImage',
            id: 'lockedImage',
            src: './images/profile_pic/' + props.url,
            style: { filter: "brightness(50%)", zIndex: "1" },
            onClick: lockedImgOnClick
        }),
        React.createElement(
            'div',
            { 'class': 'centeredText' },
            React.createElement(
                'p',
                { style: { filter: "brightness(100%)" } },
                'LOCKED'
            ),
            React.createElement('img', { src: "./images/player-coin.png", style: { height: "15%", width: "15%", marginLeft: "-30px", zIndex: "3" } }),
            React.createElement(
                'p',
                { style: { filter: "brightness(100%)", float: "left", marginLeft: "50px", fontSize: "25px" } },
                props.amount
            )
        )
    );
}

window.addEventListener('DOMContentLoaded', function () {
    var domContainer = document.querySelector(".popup");
    var root = ReactDOM.createRoot(domContainer);

    root.render(React.createElement(
        QueryClientProvider,
        { client: queryClient },
        React.createElement(ImagePopUpContent, null)
    ));
});