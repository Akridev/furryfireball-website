export default function BoughtItem(props) {
    console.log('checking product-----------------');
    console.log(props.name);

    return (
        <div
            class="card"
            onClick={() => {
                props.onClick();
            }}
        >
            <img src={props.image} alt="product" class="productImg" />
            <hr
                style={{
                    width: '100%',
                    background: 'lime',
                    height: '3px',
                    marginTop: '6px',
                    marginBottom: '4px',
                }}
            />
            <p>{props.name}</p>
        </div>
    );
}
