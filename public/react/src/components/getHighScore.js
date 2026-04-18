import { HighScore, checkAccessToken } from "../api.js";

const { useQuery, QueryClient, QueryClientProvider } = window.ReactQuery;
const queryClient = new QueryClient({
    defaultOptions: {queries: {refetchOnWindowFocus: false}}
});

const isLocalhost =
    location.hostname === 'localhost' || location.hostname === '127.0.0.1';
const STORAGE_API_HOST = isLocalhost
    ? `http://localhost:4000`
    : `https://ades-host-server.herokuapp.com`;

    let accessToken = localStorage.getItem('accessToken');
    let refreshToken = localStorage.getItem('refreshToken');

// Getting high score for profile page
export function GetHighScore(props){

    const { data, isLoading, error } = useQuery(
        ['HighScore'], 
        () => HighScore(),)

        console.log(data)
    return(
        (isLoading) ?
        <p id="topScore" style={{textAlign:"center"}}>Loading High Score...</p> :
        (error) ? 
        <p>{error.message}</p> : 
        <p id="topScore" style={{textAlign:"center"}}>
            High Score:{data}
        </p>
    )
}

window.addEventListener('DOMContentLoaded', function() {
    const domContainer = document.querySelector("#score");
    const root = ReactDOM.createRoot(domContainer);
    root.render(
        <QueryClientProvider client={queryClient}>
            <GetHighScore/>
            </QueryClientProvider>
            )
})