import { loadFriendRequests } from "../api.js";
import SearchBarRequests from "./searchBarRequests.js";

const { useQuery, QueryClient, QueryClientProvider } = window.ReactQuery;
const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

function FriendReq() {
    var { data, isLoading, error } = useQuery(["loadFriendRequests"], () =>
        loadFriendRequests()
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
                            placeholder="Search for requests.."
                        />
                    </form>
                    <a class="button" id="add-friend" type="button">
                        Add Friend
                    </a>
                    <a class="button" id="view-friends" type="button">
                        View Friends
                    </a>
                </div>
                <hr id="hr1" />
                <div class="container">
                    <div class="button-container">
                        <p id="friend-request">Friend Requests</p>
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
                            placeholder="Search for requests.."
                        />
                    </form>
                    <a
                        class="button"
                        id="add-friend"
                        type="button"
                        onClick={() =>
                            (window.location.href =
                                "http://localhost:3001/search")
                        }
                    >
                        Add Friend
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
                        <p id="friend-request">Friend Requests</p>
                        <hr id="hr2" />
                        <article id="scroll-view">
                            <h1 id="no-request">
                                You do not have any friend requests!
                            </h1>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <SearchBarRequests data={data} isLoading={isLoading} error={error} />
    );
}

window.addEventListener("DOMContentLoaded", function () {
    const root = ReactDOM.createRoot(document.querySelector("#root"));
    root.render(
        <QueryClientProvider client={queryClient}>
            <FriendReq />
        </QueryClientProvider>
    );
});
