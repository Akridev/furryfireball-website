export default function Product(props) {
    console.log('checking product-----------------');
    console.log(props.name);
    if (props.soldout == true) {
        console.log('ProductsDisplay sold');
        console.log(props.name);
        return (
            <div
                class="card"
                onClick={() => {
                    props.onClick();
                }}
            >
                <img
                    src="./images/store/sold_out.png"
                    alt="Sold Out"
                    id="soldOutBanner"
                />
                <img src={props.image} alt="product" id="soldProduct" />
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
                <div class="price">
                    <p>{props.price}</p>
                    <img src="./images/player-coin.png" />
                </div>
            </div>
        );
    } else {
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
                <div class="price">
                    <p>{props.price}</p>
                    <img src="./images/player-coin.png" />
                </div>
            </div>
        );
    }
}
