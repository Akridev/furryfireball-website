import { addUser, cancelRequest } from "../api.js";

export default function ButtonAddFriend(props) {
    const [sendStatus, setSendStatus] = React.useState(false);

    var id = props.id;
    var name = props.name;

    var confirmAdd = (e) => {
        let text =
            "Are you sure you want to add '" +
            e.currentTarget.name +
            "' as friend?";
        if (confirm(text) == true) {
            text = "ok";
        } else {
            text = "cancel";
        }

        if (text === "ok") {
            // console.log(e.currentTarget.id);
            var friendId = parseInt(e.currentTarget.id);
            setSendStatus((sendStatus) => !sendStatus);
            addUser(friendId);
        } else {
            console.log(text);
        }
    };

    var confirmCancel = (e) => {
        let text =
            "Are you sure you want to remove friend request?";
        if (confirm(text) == true) {
            text = "ok";
        } else {
            text = "cancel";
        }

        if (text === "ok") {
            // console.log(e.currentTarget.id);
            var friendId = parseInt(e.currentTarget.id);
            setSendStatus((sendStatus) => !sendStatus);
            cancelRequest(friendId);
        } else {
            console.log(text);
        }
    };

    return sendStatus ? (
        <button class="cancel-request" id={id} name={name} onClick={confirmCancel}>
            Cancel
        </button>
    ) : (
        <button class="send-request" id={id} name={name} onClick={confirmAdd}>
            Send Request
        </button>
    );
}
