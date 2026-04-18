import { loadSuggestedUsers } from "../api.js";
import SearchBarPlayers from "./searchBarPlayers.js";

const { useQuery, QueryClient, QueryClientProvider } = window.ReactQuery;
const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

function SearchForPlayers() {
    var { data, isLoading, error } = useQuery(["loadSuggestedUsers"], () =>
        loadSuggestedUsers()
    );

    console.log(isLoading);
    if (!isLoading) {
        console.log(data);
    }

    return isLoading ? (
        <div class="body">
            <div class="whole-container">
                <div class="topnav">
                    <a class="button" id="back" type="button">
                        Back
                    </a>
                    <form>
                        <input
                            type="text"
                            id="search"
                            placeholder="Search for players.."
                        />
                    </form>
                    <a class="button" id="friend-request" type="button">
                        Friend Requests
                    </a>
                    <a class="button" id="view-friends" type="button">
                        View Friends
                    </a>
                </div>
                <hr id="hr1" />
                <div class="container">
                    <div class="button-container">
                        <p id="we-found">We Found...</p>
                        <hr id="hr2" />
                        <article id="scroll-view">
                            <h1 id="loading" style={{ textAlign: "center" }}>
                                Loading...
                            </h1>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    ) : data.error ? (
        <div class="body">
            <div class="whole-container">
                <div class="topnav">
                    <a
                        class="button"
                        id="back"
                        type="button"
                        onClick={() => window.history.back()}
                    >
                        Back
                    </a>
                    <form>
                        <input
                            type="text"
                            id="search"
                            placeholder="Search for players.."
                        />
                    </form>
                    <a
                        class="button"
                        id="friend-request"
                        type="button"
                        onClick={() =>
                            (window.location.href =
                                "http://localhost:3001/friendRequest")
                        }
                    >
                        Friend Requests
                    </a>
                    <a
                        class="button"
                        id="view-friends"
                        type="button"
                        onClick={() =>
                            (window.location.href =
                                "http://localhost:3001/friends")
                        }
                    >
                        View Friends
                    </a>
                </div>
                <hr id="hr1" />
                <div class="container">
                    <div class="button-container">
                        <p id="we-found">We found...</p>
                        <hr id="hr2" />
                        <article id="scroll-view">
                            <h1 id="added-all">You have added all users as friends!</h1>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <SearchBarPlayers data={data} isLoading={isLoading} error={error} />
    )
}

window.addEventListener("DOMContentLoaded", function () {
    const root = ReactDOM.createRoot(document.querySelector("#root"));
    root.render(
        <QueryClientProvider client={queryClient}>
            <SearchForPlayers />
        </QueryClientProvider>
    );
});
