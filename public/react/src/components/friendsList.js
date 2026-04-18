import { loadFriendData } from "../api.js";
import SearchBarFriends from "./searchBarFriends.js";

const { useQuery, QueryClient, QueryClientProvider } = window.ReactQuery;
const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

function FriendsList() {
    const { data, isLoading, error } = useQuery(["loadFriendData"], () =>
        loadFriendData()
    );

    if (!isLoading) {
        console.log(data);
    }

    const pull_info = (info) => {
        console.log(info);
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
                            placeholder="Search for friends.."
                        />
                    </form>
                    <a class="button" id="friend-request" type="button">
                        Friend Requests
                    </a>
                    <a class="button" id="add-friend" type="button">
                        Add Friend
                    </a>
                </div>
                <hr id="hr1" />
                <div class="container">
                    <div class="button-container">
                        <p id="my-friends">My Friends</p>
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
    ) : error ? (
        <p>{error.message}</p>
    ) : !data.error ? (
        <SearchBarFriends
            haveFriends={true}
            data={data}
            isLoading={isLoading}
            error={error}
            func={pull_info}
        />
    ) : (
        <SearchBarFriends haveFriends={false} />
    );
}

window.addEventListener("DOMContentLoaded", function () {
    const root = ReactDOM.createRoot(document.querySelector("#root"));
    root.render(
        <QueryClientProvider client={queryClient}>
            <FriendsList />
        </QueryClientProvider>
    );
});
