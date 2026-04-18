export default function InputField(props) {
    return (
        <div class="input-field">
            <i class={props.icon}></i>
            <input
                type={props.type}
                placeholder={props.placeholder}
                id={props.id}
                name={props.name}
                value={props.value}
                onChange={(e) => {
                    e.preventDefault();
                    props.setValue(e.target.value);
                }}
                disabled={props.disabled}
                required
            />
        </div>
    );
}
