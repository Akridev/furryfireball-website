export default function InputField(props) {
    return React.createElement(
        "div",
        { "class": "input-field" },
        React.createElement("i", { "class": props.icon }),
        React.createElement("input", {
            type: props.type,
            placeholder: props.placeholder,
            id: props.id,
            name: props.name,
            value: props.value,
            onChange: function onChange(e) {
                e.preventDefault();
                props.setValue(e.target.value);
            },
            disabled: props.disabled,
            required: true
        })
    );
}