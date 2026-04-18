export function TopInfo(props) {
    return React.createElement(
        "div",
        { id: "topInfo" },
        React.createElement(
            "div",
            { id: "playerInfo" },
            React.createElement("img", { src: "./images/player.gif", alt: "Running Dog" }),
            React.createElement(
                "p",
                null,
                "Attack + ",
                props.equippedInfo[0].increasement
            ),
            React.createElement(
                "p",
                null,
                "Life + ",
                props.equippedInfo[3].increasement
            )
        ),
        React.createElement(
            "div",
            { id: "playerEquip" },
            React.createElement(
                "div",
                { "class": "row" },
                React.createElement(
                    "div",
                    { "class": "column" },
                    React.createElement(
                        "h5",
                        null,
                        "Fireball"
                    ),
                    React.createElement("img", {
                        src: props.equippedInfo[0].image,
                        alt: "Fireball Image"
                    })
                ),
                React.createElement(
                    "div",
                    { "class": "column" },
                    React.createElement(
                        "h5",
                        null,
                        "Dive"
                    ),
                    React.createElement("img", {
                        src: props.equippedInfo[1].image,
                        alt: "Dive Image"
                    })
                )
            ),
            React.createElement(
                "div",
                { "class": "row" },
                React.createElement(
                    "div",
                    { "class": "column" },
                    React.createElement(
                        "h5",
                        null,
                        "Roll"
                    ),
                    React.createElement("img", {
                        src: props.equippedInfo[2].image,
                        alt: "Roll Image"
                    })
                ),
                React.createElement(
                    "div",
                    { "class": "column" },
                    React.createElement(
                        "h5",
                        null,
                        "Shield"
                    ),
                    React.createElement("img", {
                        src: props.equippedInfo[3].image,
                        alt: "Shield Image"
                    })
                )
            )
        )
    );
}