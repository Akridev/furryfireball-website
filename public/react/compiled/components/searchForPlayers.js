import { loadSuggestedUsers } from "../api.js";
import SearchBarPlayers from "./searchBarPlayers.js";

var _window$ReactQuery = window.ReactQuery,
    useQuery = _window$ReactQuery.useQuery,
    QueryClient = _window$ReactQuery.QueryClient,
    QueryClientProvider = _window$ReactQuery.QueryClientProvider;

var queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } }
});

function SearchForPlayers() {
    var _useQuery = useQuery(["loadSuggestedUsers"], function () {
        return loadSuggestedUsers();
    }),
        data = _useQuery.data,
        isLoading = _useQuery.isLoading,
        error = _useQuery.error;

    console.log(isLoading);
    if (!isLoading) {
        console.log(data);
    }

    return isLoading ? React.createElement(
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
                    { "class": "button", id: "back", type: "button" },
                    "Back"
                ),
                React.createElement(
                    "form",
                    null,
                    React.createElement("input", {
                        type: "text",
                        id: "search",
                        placeholder: "Search for players.."
                    })
                ),
                React.createElement(
                    "a",
                    { "class": "button", id: "friend-request", type: "button" },
                    "Friend Requests"
                ),
                React.createElement(
                    "a",
                    { "class": "button", id: "view-friends", type: "button" },
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
                        "We Found..."
                    ),
                    React.createElement("hr", { id: "hr2" }),
                    React.createElement(
                        "article",
                        { id: "scroll-view" },
                        React.createElement(
                            "h1",
                            { id: "loading", style: { textAlign: "center" } },
                            "Loading..."
                        )
                    )
                )
            )
        )
    ) : data.error ? React.createElement(
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
                        placeholder: "Search for players.."
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
                        React.createElement(
                            "h1",
                            { id: "added-all" },
                            "You have added all users as friends!"
                        )
                    )
                )
            )
        )
    ) : React.createElement(SearchBarPlayers, { data: data, isLoading: isLoading, error: error });
}

window.addEventListener("DOMContentLoaded", function () {
    var root = ReactDOM.createRoot(document.querySelector("#root"));
    root.render(React.createElement(
        QueryClientProvider,
        { client: queryClient },
        React.createElement(SearchForPlayers, null)
    ));
});