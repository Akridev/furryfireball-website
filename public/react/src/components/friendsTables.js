import { removeFriend } from "../api.js";
import PlayerInfoPopUp from "./playerInfoPopUp.js";

export default function FriendsTables(props) {
    if (props.haveFriends === false) {
        return <h1 id="no-friends">You have not added any friends!</h1>;
    }

    const input = props.input;
    const data = props.data;
    const isLoading = props.isLoading;
    const error = props.error;

    const [showPopUp, setShowPopUp] = React.useState(false);
    const [selectedId, setSelectedId] = React.useState(undefined);

    const displayPopUp = (e) => {
        setSelectedId(e.currentTarget.id);
        setShowPopUp(true);
    };

    const confirmDelete = (e) => {
        let text =
            "Are you sure you want to remove '" +
            e.currentTarget.name +
            "' as friend?";
        if (confirm(text) == true) {
            text = "ok";
        } else {
            text = "cancel";
        }

        if (text === "ok") {
            console.log(e.currentTarget.id);
            const friendId = parseInt(e.currentTarget.id);
            removeFriend(friendId);
        } else {
            console.log(text);
        }
    };

    console.log(input);

    function hidePopup() {
        setShowPopUp(false);
    }

    return error ? (
        <article>
            <h1 id="error-msg" style={{ textAlign: "center" }}>
                {error.message}
            </h1>
        </article>
    ) : (
        <article>
            {showPopUp && (
                <PlayerInfoPopUp
                    data={data}
                    isLoading={isLoading}
                    error={error}
                    id={selectedId}
                    state={showPopUp}
                    hidePopup={hidePopup}
                />
            )}
            {Object.values(data)
                .filter((friend) =>
                    friend.username
                        .toLowerCase()
                        .startsWith(input.toLowerCase())
                )
                .map((friend) => (
                    <table>
                        <tr>
                            <th class="friend-name">
                                <a id={friend.user_id} onClick={displayPopUp}>
                                    {friend.username}
                                </a>
                            </th>
                            <th class="remove-button">
                                <button
                                    class="remove-friend"
                                    id={friend.user_id}
                                    name={friend.username}
                                    onClick={confirmDelete}
                                >
                                    Remove Friend
                                </button>
                            </th>
                        </tr>
                    </table>
                ))}
        </article>
    );
}
