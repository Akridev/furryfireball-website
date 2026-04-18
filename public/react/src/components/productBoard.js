import { productPurchase } from '../api.js';
const { useMutation } = window.ReactQuery;

export function ProductBoard(props) {
    let purchaseData = {
        productName: props.productInfo.name,
        productType: props.productInfo.type,
        amountOwned: props.productInfo.amount,
    };
    const { error, isLoading, mutateAsync } = useMutation(() => {
        console.log('purchsinggggggggggggggg');
        if (window.getCoins() > 0) {
            addCoins(-props.productInfo.price);
            return productPurchase(purchaseData).then((msg) => alert(msg));
        } else {
            alert('You dont have enough coins to buy!');
        }
    });

    return isLoading ? (
        'Loading product Board...'
    ) : error ? (
        <p>{error.message}</p>
    ) : (
        <div id="productBoard">
            <img src={props.productInfo.image} alt="product" />
            <p>{props.productInfo.name}</p>
            <p>Amount Owned: {props.productInfo.amount}</p>
            {props.productInfo.type === 'fireball' ||
            props.productInfo.type === 'roll' ||
            props.productInfo.type === 'dive' ? (
                <p> Attack + {props.productInfo.increasement} </p>
            ) : props.productInfo.type === 'equipment' ? (
                <p> Protection + {props.productInfo.increasement} </p>
            ) : props.productInfo.type === 'lifeMedicine' ? (
                <p> Life + {props.productInfo.increasement} </p>
            ) : (
                <p> Ex + {props.productInfo.increasement} </p>
            )}
            <div class="price" id="boardPrice">
                <p>{props.productInfo.price}</p>
                <img src="./images/player-coin.png" id="coinAtBoard" />
            </div>

            {props.productInfo.soldout ? (
                <button class="btn" id="soldOutBtn">
                    Sold Out
                </button>
            ) : (
                <button
                    class="btn"
                    onClick={(e) => {
                        e.preventDefault();
                        // alert(productName + productType + amountOwned);

                        mutateAsync().then(() => props.onBoughtProduct());
                    }}
                >
                    Buy now
                </button>
            )}
        </div>
    );
}
