import { loadFriendRequests } from "../api.js";
import SearchBarRequests from "./searchBarRequests.js";

var _window$ReactQuery = window.ReactQuery,
    useQuery = _window$ReactQuery.useQuery,
    QueryClient = _window$ReactQuery.QueryClient,
    QueryClientProvider = _window$ReactQuery.QueryClientProvider;

var queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } }
});

function FriendReq() {
    var _useQuery = useQuery(["loadFriendRequests"], function () {
        return loadFriendRequests();
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
                        placeholder: "Search for requests.."
                    })
                ),
                React.createElement(
                    "a",
                    { "class": "button", id: "add-friend", type: "button" },
                    "Add Friend"
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
                        { id: "friend-request" },
                        "Friend Requests"
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
                        placeholder: "Search for requests.."
                    })
                ),
                React.createElement(
                    "a",
                    {
                        "class": "button",
                        id: "add-friend",
                        type: "button",
                        onClick: function onClick() {
                            return window.location.href = "http://localhost:3001/search";
                        }
                    },
                    "Add Friend"
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
                        { id: "friend-request" },
                        "Friend Requests"
                    ),
                    React.createElement("hr", { id: "hr2" }),
                    React.createElement(
                        "article",
                        { id: "scroll-view" },
                        React.createElement(
                            "h1",
                            { id: "no-request" },
                            "You do not have any friend requests!"
                        )
                    )
                )
            )
        )
    ) : React.createElement(SearchBarRequests, { data: data, isLoading: isLoading, error: error });
}

window.addEventListener("DOMContentLoaded", function () {
    var root = ReactDOM.createRoot(document.querySelector("#root"));
    root.render(React.createElement(
        QueryClientProvider,
        { client: queryClient },
        React.createElement(FriendReq, null)
    ));
});