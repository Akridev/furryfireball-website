import { HighScore, checkAccessToken } from "../api.js";

var _window$ReactQuery = window.ReactQuery,
    useQuery = _window$ReactQuery.useQuery,
    QueryClient = _window$ReactQuery.QueryClient,
    QueryClientProvider = _window$ReactQuery.QueryClientProvider;

var queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } }
});

var isLocalhost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
var STORAGE_API_HOST = isLocalhost ? 'http://localhost:4000' : 'https://ades-host-server.herokuapp.com';

var accessToken = localStorage.getItem('accessToken');
var refreshToken = localStorage.getItem('refreshToken');

// Getting high score for profile page
export function GetHighScore(props) {
    var _useQuery = useQuery(['HighScore'], function () {
        return HighScore();
    }),
        data = _useQuery.data,
        isLoading = _useQuery.isLoading,
        error = _useQuery.error;

    console.log(data);
    return isLoading ? React.createElement(
        'p',
        { id: 'topScore', style: { textAlign: "center" } },
        'Loading High Score...'
    ) : error ? React.createElement(
        'p',
        null,
        error.message
    ) : React.createElement(
        'p',
        { id: 'topScore', style: { textAlign: "center" } },
        'High Score:',
        data
    );
}

window.addEventListener('DOMContentLoaded', function () {
    var domContainer = document.querySelector("#score");
    var root = ReactDOM.createRoot(domContainer);
    root.render(React.createElement(
        QueryClientProvider,
        { client: queryClient },
        React.createElement(GetHighScore, null)
    ));
});