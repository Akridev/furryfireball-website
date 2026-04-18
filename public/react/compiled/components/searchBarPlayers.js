var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import PlayersTableDisplay from "./playersTables.js";

export default function SearchBarPlayers(props) {
    var data = props.data;
    var isLoading = props.isLoading;
    var error = props.error;

    var _React$useState = React.useState(""),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        input = _React$useState2[0],
        setInput = _React$useState2[1];

    return isLoading ? React.createElement(
        "h1",
        { id: "loading", style: { textAlign: "center" } },
        "Loading..."
    ) : error ? React.createElement(
        "h1",
        null,
        error
    ) : React.createElement(
        "div",
        { "class": "body" },
        React.createElement(
            "div",
            { "class": "whole-container" },
            React.createElement(
                "div",
                { "class": "topnav" },
                React.createElement(
                    "a",
                    {
                        "class": "button",
                        id: "back",
                        type: "button",
                        onClick: function onClick() {
                            return window.history.back();
                        }
                    },
                    "Back"
                ),
                React.createElement(
                    "form",
                    null,
                    React.createElement("input", {
                        type: "text",
                        id: "search",
                        placeholder: "Search for players..",
                        value: input,
                        onChange: function onChange(e) {
                            return setInput(e.target.value);
                        }
                    })
                ),
                React.createElement(
                    "a",
                    {
                        "class": "button",
                        id: "friend-request",
                        type: "button",
                        onClick: function onClick() {
                            return window.location.href = "http://localhost:3001/friendRequest";
                        }
                    },
                    "Friend Requests"
                ),
                React.createElement(
                    "a",
                    {
                        "class": "button",
                        id: "view-friends",
                        type: "button",
                        onClick: function onClick() {
                            return window.location.href = "http://localhost:3001/friends";
                        }
                    },
                    "View Friends"
                )
            ),
            React.createElement("hr", { id: "hr1" }),
            React.createElement(
                "div",
                { "class": "container" },
                React.createElement(
                    "div",
                    { "class": "button-container" },
                    React.createElement(
                        "p",
                        { id: "we-found" },
                        "We found..."
                    ),
                    React.createElement("hr", { id: "hr2" }),
                    React.createElement(
                        "article",
                        { id: "scroll-view" },
                        React.createElement(PlayersTableDisplay, {
                            input: input,
                            data: data,
                            isLoading: isLoading,
                            error: error
                        })
                    )
                )
            )
        )
    );
}