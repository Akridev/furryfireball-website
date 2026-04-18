import UserProfileForm from "./userProfileForm.js";
import { ProfilePic } from "./profilePic.js";
import { getUserDetails } from "../api.js";
var isLocalhost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
var STORAGE_API_HOST = isLocalhost ? "http://localhost:4000" : "https://ades-host-server.herokuapp.com";

var accessToken = localStorage.getItem('accessToken');
var refreshToken = localStorage.getItem('refreshToken');

var _window$ReactQuery = window.ReactQuery,
    useQuery = _window$ReactQuery.useQuery,
    QueryClient = _window$ReactQuery.QueryClient,
    QueryClientProvider = _window$ReactQuery.QueryClientProvider;

var queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } }
});

function Profile() {
    var _useQuery = useQuery(['getUserDetails'], function () {
        return getUserDetails();
    }),
        data = _useQuery.data,
        isLoading = _useQuery.isLoading,
        error = _useQuery.error;

    console.log(data);
    return isLoading ? React.createElement("div", { "class": "loader" }) : error ? React.createElement(
        "h1",
        null,
        error.message
    ) : React.createElement(
        "div",
        null,
        React.createElement(ProfilePic, {
            url: data.result.pic_url
        }),
        React.createElement(UserProfileForm, {
            username: data.result.username,
            email: data.result.email,
            country: data.result.country,
            password: data.result.password
        })
    );
}

window.addEventListener('DOMContentLoaded', function () {
    var domContainer = document.querySelector(".profile");
    var root = ReactDOM.createRoot(domContainer);
    root.render(React.createElement(
        QueryClientProvider,
        { client: queryClient },
        React.createElement(Profile, null)
    ));
});