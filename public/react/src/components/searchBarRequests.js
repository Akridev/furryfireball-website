import RequestsTables from "./requestsTables.js";

export default function SearchBarRequests(props) {
    var data = props.data;
    var isLoading = props.isLoading;
    var error = props.error;

    var [input, setInput] = React.useState("");

    return isLoading ? (
        <h1 id="loading" style={{ textAlign: "center" }}>
            Loading...
        </h1>
    ) : error ? (
        <h1>{error}</h1>
    ) : (
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
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
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
                            <RequestsTables
                                input={input}
                                data={data}
                                isLoading={isLoading}
                                error={error}
                            />
                        </article>
                    </div>
                </div>
            </div>
        </div>
    )
}
