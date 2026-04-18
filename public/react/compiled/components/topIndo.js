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
                "Attack + 10"
            ),
            React.createElement(
                "p",
                null,
                "Life + 10"
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
                        src: "./images/store/attacks/a4.png",
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
                        src: "./images/store/attacks/a4.png",
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
                        src: "./images/store/attacks/a4.png",
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
                        src: "./images/store/attacks/a4.png",
                        alt: "Shield Image"
                    })
                )
            )
        )
    );
}