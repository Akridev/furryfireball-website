var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { addUser, cancelRequest } from "../api.js";

export default function ButtonAddFriend(props) {
    var _React$useState = React.useState(false),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        sendStatus = _React$useState2[0],
        setSendStatus = _React$useState2[1];

    var id = props.id;
    var name = props.name;

    var confirmAdd = function confirmAdd(e) {
        var text = "Are you sure you want to add '" + e.currentTarget.name + "' as friend?";
        if (confirm(text) == true) {
            text = "ok";
        } else {
            text = "cancel";
        }

        if (text === "ok") {
            // console.log(e.currentTarget.id);
            var friendId = parseInt(e.currentTarget.id);
            setSendStatus(function (sendStatus) {
                return !sendStatus;
            });
            addUser(friendId);
        } else {
            console.log(text);
        }
    };

    var confirmCancel = function confirmCancel(e) {
        var text = "Are you sure you want to remove friend request?";
        if (confirm(text) == true) {
            text = "ok";
        } else {
            text = "cancel";
        }

        if (text === "ok") {
            // console.log(e.currentTarget.id);
            var friendId = parseInt(e.currentTarget.id);
            setSendStatus(function (sendStatus) {
                return !sendStatus;
            });
            cancelRequest(friendId);
        } else {
            console.log(text);
        }
    };

    return sendStatus ? React.createElement(
        "button",
        { "class": "cancel-request", id: id, name: name, onClick: confirmCancel },
        "Cancel"
    ) : React.createElement(
        "button",
        { "class": "send-request", id: id, name: name, onClick: confirmAdd },
        "Send Request"
    );
}