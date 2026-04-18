import { removeRequest, acceptRequest } from "../api.js";
import PlayerInfoPopUp from "./playerInfoPopUp.js";

export default function RequestsTables(props) {
    var input = props.input;
    var data = props.data.data;
    var isLoading = props.isLoading;
    var error = props.error;

    const [showPopUp, setShowPopUp] = React.useState(false);
    const [selectedId, setSelectedId] = React.useState(undefined);

    const displayPopUp = (e) => {
        setSelectedId(e.currentTarget.id);
        setShowPopUp(true);
    };

    var confirmAccept = (e) => {
        let text = "Are you sure you want to accept friend request?";
        if (confirm(text) == true) {
            text = "ok";
        } else {
            text = "cancel";
        }

        if (text === "ok") {
            // console.log(e.currentTarget.id);
            var friendId = parseInt(e.currentTarget.id);
            acceptRequest(friendId);
        } else {
            console.log(text);
        }
    };

    var confirmReject = (e) => {
        let text = "Are you sure you want to reject friend request?";
        if (confirm(text) == true) {
            text = "ok";
        } else {
            text = "cancel";
        }

        if (text === "ok") {
            // console.log(e.currentTarget.id);
            var friendId = parseInt(e.currentTarget.id);
            removeRequest(friendId);
        } else {
            console.log(text);
        }
    };

    console.log(input);
    if (!isLoading) {
        console.log(data);
    }

    function hidePopup() {
        setShowPopUp(false);
    }

    return error ? (
        <article>
            <h1 id="error-msg" style={{ textAlign: "center" }}>
                {error}
            </h1>
        </article>
    ) : data ? (
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
                .filter((user) =>
                    user.username.toLowerCase().startsWith(input.toLowerCase())
                )
                .map((user) => (
                    <table>
                        <tr>
                            <th class="add-friend">
                                <img
                                    class="notification-icon"
                                    src="images/notification.svg"
                                    alt="notification-icon"
                                />
                                <span class="add-friend">Add friend?</span>
                            </th>
                        </tr>
                        <tr>
                            <td class="friend-name">
                                <a
                                    class="friend-name-td"
                                    id={user.user_id}
                                    onClick={displayPopUp}
                                >
                                    {user.username}
                                </a>
                            </td>
                            <td>
                                <button
                                    class="button accept"
                                    id={user.user_id}
                                    onClick={confirmAccept}
                                >
                                    Accept
                                </button>
                            </td>
                            <td class="td-button-reject">
                                <button
                                    class="button reject"
                                    id={user.user_id}
                                    onClick={confirmReject}
                                >
                                    Reject
                                </button>
                            </td>
                        </tr>
                    </table>
                ))}
        </article>
    ) : (
        <h1 id="no-request">You do not have any friend requests!</h1>
    );
}
