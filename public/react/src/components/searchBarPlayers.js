import PlayersTableDisplay from "./playersTables.js";

export default function SearchBarPlayers(props) {
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
                            placeholder="Search for players.."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
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
                            <PlayersTableDisplay
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
