import { useProduct, unUseProduct } from '../api.js';
const { useMutation } = window.ReactQuery;

export function ItemDetailBoard(props) {
    let productData = {
        productName: props.productInfo.name,
        productType: props.productInfo.type,
        amount: props.productInfo.amount,
    };
    let isDefault;
    const { error, isLoading, mutateAsync } = useMutation(() => {
        console.log(isDefault);
        if (isDefault) {
            // when default product is selected, unUse the purchased product that with the same type
            return unUseProduct(productData.productType).then((msg) =>
                alert(msg)
            );
        } else {
            if (props.productInfo.type === 'ExMedicine') {
                window.addXp(props.productInfo.increasement);
            }
            return useProduct(productData).then((msg) => alert(msg));
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

            {props.productInfo.equipped == true ? (
                <button class="btn" id="inUseBtn">
                    In Use
                </button>
            ) : // update to db equip button --> purcahsed product
            props.productInfo.name != 'Sun Burn' &&
              props.productInfo.name != 'Sun Dive' &&
              props.productInfo.name != 'Sun Roll' &&
              props.productInfo.name != 'Normal Shield' &&
              (props.productInfo.type === 'fireball' ||
                  props.productInfo.type === 'roll' ||
                  props.productInfo.type === 'dive' ||
                  props.productInfo.type === 'equipment') ? (
                // when the attack or shield is not in use --> equipped=false
                <button
                    class="btn"
                    onClick={(e) => {
                        e.preventDefault();
                        isDefault = false;
                        // alert(productName + productType + amountOwned);
                        mutateAsync().then(() => props.onUseProduct());
                    }}
                >
                    Equip
                </button>
            ) : // update to db equip button --> default product
            props.productInfo.type === 'fireball' ||
              props.productInfo.type === 'roll' ||
              props.productInfo.type === 'dive' ||
              props.productInfo.type === 'equipment' ? (
                // when the attack or shield is not in use --> equipped=false
                <button
                    class="btn"
                    onClick={(e) => {
                        e.preventDefault();
                        // alert(productName + productType + amountOwned);
                        isDefault = true;
                        mutateAsync().then(() => props.onUseProduct());
                    }}
                >
                    Equip Default
                </button>
            ) : props.productInfo.type === 'ExMedicine' ? (
                <button
                    class="btn"
                    onClick={(e) => {
                        e.preventDefault();
                        // alert(productName + productType + amountOwned);

                        mutateAsync().then(() => props.onUseProduct());
                    }}
                >
                    Use ExMedicine
                </button>
            ) : (
                <button class="btn" id="lifeMedicine">
                    Use In Game
                </button>
            )}
        </div>
    );
}
