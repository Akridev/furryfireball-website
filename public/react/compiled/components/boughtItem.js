export default function BoughtItem(props) {
    console.log('checking product-----------------');
    console.log(props.name);

    return React.createElement(
        "div",
        {
            "class": "card",
            onClick: function onClick() {
                props.onClick();
            }
        },
        React.createElement("img", { src: props.image, alt: "product", "class": "productImg" }),
        React.createElement("hr", {
            style: {
                width: '100%',
                background: 'lime',
                height: '3px',
                marginTop: '6px',
                marginBottom: '4px'
            }
        }),
        React.createElement(
            "p",
            null,
            props.name
        )
    );
}