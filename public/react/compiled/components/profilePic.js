var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { popupMain, hide } from "../../../js/game_js/popUp.js";
import { checkAccessToken } from "../api.js";

var isLocalhost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
var STORAGE_API_HOST = isLocalhost ? "http://localhost:4000" : "https://ades-host-server.herokuapp.com";

var accessToken = localStorage.getItem('accessToken');
var refreshToken = localStorage.getItem('refreshToken');

export function ProfilePic(props) {
    var _React$useState = React.useState(props.url),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        url = _React$useState2[0],
        setUrl = _React$useState2[1];

    var _React$useState3 = React.useState(false),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        checking = _React$useState4[0],
        setIsChecking = _React$useState4[1];
    //change pic url in global scope


    window.changePicUrl = function (url) {
        setUrl(url);
    };
    window.getPicUrl = url;
    React.useEffect(function () {
        if (props.url == null || props.url == undefined || props.url == "") {
            setUrl("autoProfilePic.jpg");
        }
    }, []);
    window.handleChecking = function (set) {
        setIsChecking(set);
    };
    function imageOnClick(event) {
        //addContent()
        popupMain('popUpDiv');
    }

    return React.createElement(
        "div",
        { "class": "image" },
        checking ? React.createElement(
            "div",
            null,
            React.createElement("div", { "class": "loader", id: "image", style: { height: "30px", width: "30px", border: "5px solid white", borderTop: "5px solid black", margin: "15px" } })
        ) : React.createElement("input", { type: "image", src: "./images/profile_pic/" + url, onClick: imageOnClick, id: "image" })
    );
}