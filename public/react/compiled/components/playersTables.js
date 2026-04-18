var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import ButtonAddFriend from "./buttonAddFriend.js";
import PlayerInfoPopUp from "./playerInfoPopUp.js";

export default function PlayersTables(props) {
    var input = props.input;
    var data = props.data;
    var isLoading = props.isLoading;
    var error = props.error;

    var _React$useState = React.useState(false),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        showPopUp = _React$useState2[0],
        setShowPopUp = _React$useState2[1];

    var _React$useState3 = React.useState(undefined),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        selectedId = _React$useState4[0],
        setSelectedId = _React$useState4[1];

    var displayPopUp = function displayPopUp(e) {
        setSelectedId(e.currentTarget.id);
        setShowPopUp(true);
    };

    console.log(input);
    if (!isLoading) {
        console.log(data);
    }

    function hidePopup() {
        setShowPopUp(false);
    }

    return error ? React.createElement(
        "article",
        null,
        React.createElement(
            "h1",
            { id: "error-msg", style: { textAlign: "center" } },
            error
        )
    ) : data ? React.createElement(
        "article",
        null,
        showPopUp && React.createElement(PlayerInfoPopUp, {
            data: data,
            isLoading: isLoading,
            error: error,
            id: selectedId,
            state: showPopUp,
            hidePopup: hidePopup
        }),
        Object.values(data).filter(function (user) {
            return user.username.toLowerCase().startsWith(input.toLowerCase());
        }).map(function (user) {
            return React.createElement(
                "table",
                null,
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        { "class": "add-friend" },
                        React.createElement("img", {
                            "class": "notification-icon",
                            src: "images/notification.svg",
                            alt: "notification-icon"
                        }),
                        React.createElement(
                            "span",
                            { "class": "add-friend" },
                            "Add friend?"
                        )
                    )
                ),
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "td",
                        { "class": "friend-name" },
                        React.createElement(
                            "a",
                            { "class": "friend-name-td", id: user.user_id, onClick: displayPopUp },
                            user.username
                        )
                    ),
                    React.createElement(
                        "td",
                        { "class": "send-request-button" },
                        React.createElement(ButtonAddFriend, {
                            id: user.user_id,
                            name: user.username
                        })
                    )
                )
            );
        })
    ) : React.createElement(
        "h1",
        null,
        "I was here"
    );
}