import { loadFriendData } from "../api.js";
import SearchBarFriends from "./searchBarFriends.js";

var _window$ReactQuery = window.ReactQuery,
    useQuery = _window$ReactQuery.useQuery,
    QueryClient = _window$ReactQuery.QueryClient,
    QueryClientProvider = _window$ReactQuery.QueryClientProvider;

var queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } }
});

function FriendsList() {
    var _useQuery = useQuery(["loadFriendData"], function () {
        return loadFriendData();
    }),
        data = _useQuery.data,
        isLoading = _useQuery.isLoading,
        error = _useQuery.error;

    if (!isLoading) {
        console.log(data);
    }

    var pull_info = function pull_info(info) {
        console.log(info);
    };

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
                        placeholder: "Search for friends.."
                    })
                ),
                React.createElement(
                    "a",
                    { "class": "button", id: "friend-request", type: "button" },
                    "Friend Requests"
                ),
                React.createElement(
                    "a",
                    { "class": "button", id: "add-friend", type: "button" },
                    "Add Friend"
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
                        { id: "my-friends" },
                        "My Friends"
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
    ) : error ? React.createElement(
        "p",
        null,
        error.message
    ) : !data.error ? React.createElement(SearchBarFriends, {
        haveFriends: true,
        data: data,
        isLoading: isLoading,
        error: error,
        func: pull_info
    }) : React.createElement(SearchBarFriends, { haveFriends: false });
}

window.addEventListener("DOMContentLoaded", function () {
    var root = ReactDOM.createRoot(document.querySelector("#root"));
    root.render(React.createElement(
        QueryClientProvider,
        { client: queryClient },
        React.createElement(FriendsList, null)
    ));
});