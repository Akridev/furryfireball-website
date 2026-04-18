import ButtonAddFriend from "./buttonAddFriend.js";
import PlayerInfoPopUp from "./playerInfoPopUp.js";

export default function PlayersTables(props) {
    var input = props.input;
    var data = props.data;
    var isLoading = props.isLoading;
    var error = props.error;

    const [showPopUp, setShowPopUp] = React.useState(false);
    const [selectedId, setSelectedId] = React.useState(undefined);

    const displayPopUp = (e) => {
        setSelectedId(e.currentTarget.id);
        setShowPopUp(true);
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
                                <a class="friend-name-td" id={user.user_id} onClick={displayPopUp}>
                                    {user.username}
                                </a>
                            </td>
                            <td class="send-request-button">
                                <ButtonAddFriend
                                    id={user.user_id}
                                    name={user.username}
                                />
                            </td>
                        </tr>
                    </table>
                ))}
        </article>
    ) : (<h1>I was here</h1>);
}
