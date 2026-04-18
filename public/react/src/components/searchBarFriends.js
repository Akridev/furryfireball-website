import FriendsTableDisplay from "./friendsTables.js";

export default function SearchBarFriends(props) {
    const data = props.data;
    const isLoading = props.isLoading;
    const error = props.error;

    const [input, setInput] = React.useState("");

    if (!isLoading) {
        console.log(props.haveFriends);
    }

    const pull_info = (info) => {
        props.func(info);
    }

    return isLoading ? (
        <h1 id="loading" style={{ textAlign: "center" }}>
            Loading...
        </h1>
    ) : error ? (
        <h1>{error.message}</h1>
    ) : !error && props.haveFriends === true ? (
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
                            placeholder="Search for friends.."
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
                        id="add-friend"
                        type="button"
                        onClick={() =>
                            (window.location.href =
                                "http://localhost:3001/search")
                        }
                    >
                        Add Friend
                    </a>
                </div>
                <hr id="hr1" />
                <div class="container">
                    <div class="button-container">
                        <p id="my-friends">My Friends</p>
                        <hr id="hr2" />
                        <article id="scroll-view">
                            <FriendsTableDisplay
                                haveFriends={props.haveFriends}
                                input={input}
                                data={data}
                                isLoading={isLoading}
                                error={error}
                                func={pull_info}
                            />
                        </article>
                    </div>
                </div>
            </div>
        </div>
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
                            placeholder="Search for friends.."
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
                        id="add-friend"
                        type="button"
                        onClick={() =>
                            (window.location.href =
                                "http://localhost:3001/search")
                        }
                    >
                        Add Friend
                    </a>
                </div>
                <hr id="hr1" />
                <div class="container">
                    <div class="button-container">
                        <p id="my-friends">My Friends</p>
                        <hr id="hr2" />
                        <article id="friends-list">
                            <FriendsTableDisplay
                                haveFriends={props.haveFriends}
                                input={input}
                                data={data}
                                isLoading={isLoading}
                                error={error}
                                func={pull_info}
                            />
                        </article>
                    </div>
                </div>
            </div>
        </div>
    );
}
