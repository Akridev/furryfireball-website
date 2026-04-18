import { useProduct, unUseProduct } from '../api.js';
var useMutation = window.ReactQuery.useMutation;


export function ItemDetailBoard(props) {
    var productData = {
        productName: props.productInfo.name,
        productType: props.productInfo.type,
        amount: props.productInfo.amount
    };
    var isDefault = void 0;

    var _useMutation = useMutation(function () {
        console.log(isDefault);
        if (isDefault) {
            // when default product is selected, unUse the purchased product that with the same type
            return unUseProduct(productData.productType).then(function (msg) {
                return alert(msg);
            });
        } else {
            if (props.productInfo.type === 'ExMedicine') {
                window.addXp(props.productInfo.increasement);
            }
            return useProduct(productData).then(function (msg) {
                return alert(msg);
            });
        }
    }),
        error = _useMutation.error,
        isLoading = _useMutation.isLoading,
        mutateAsync = _useMutation.mutateAsync;

    return isLoading ? 'Loading product Board...' : error ? React.createElement(
        'p',
        null,
        error.message
    ) : React.createElement(
        'div',
        { id: 'productBoard' },
        React.createElement('img', { src: props.productInfo.image, alt: 'product' }),
        React.createElement(
            'p',
            null,
            props.productInfo.name
        ),
        React.createElement(
            'p',
            null,
            'Amount Owned: ',
            props.productInfo.amount
        ),
        props.productInfo.type === 'fireball' || props.productInfo.type === 'roll' || props.productInfo.type === 'dive' ? React.createElement(
            'p',
            null,
            ' Attack + ',
            props.productInfo.increasement,
            ' '
        ) : props.productInfo.type === 'equipment' ? React.createElement(
            'p',
            null,
            ' Protection + ',
            props.productInfo.increasement,
            ' '
        ) : props.productInfo.type === 'lifeMedicine' ? React.createElement(
            'p',
            null,
            ' Life + ',
            props.productInfo.increasement,
            ' '
        ) : React.createElement(
            'p',
            null,
            ' Ex + ',
            props.productInfo.increasement,
            ' '
        ),
        props.productInfo.equipped == true ? React.createElement(
            'button',
            { 'class': 'btn', id: 'inUseBtn' },
            'In Use'
        ) : // update to db equip button --> purcahsed product
        props.productInfo.name != 'Sun Burn' && props.productInfo.name != 'Sun Dive' && props.productInfo.name != 'Sun Roll' && props.productInfo.name != 'Normal Shield' && (props.productInfo.type === 'fireball' || props.productInfo.type === 'roll' || props.productInfo.type === 'dive' || props.productInfo.type === 'equipment') ?
        // when the attack or shield is not in use --> equipped=false
        React.createElement(
            'button',
            {
                'class': 'btn',
                onClick: function onClick(e) {
                    e.preventDefault();
                    isDefault = false;
                    // alert(productName + productType + amountOwned);
                    mutateAsync().then(function () {
                        return props.onUseProduct();
                    });
                }
            },
            'Equip'
        ) : // update to db equip button --> default product
        props.productInfo.type === 'fireball' || props.productInfo.type === 'roll' || props.productInfo.type === 'dive' || props.productInfo.type === 'equipment' ?
        // when the attack or shield is not in use --> equipped=false
        React.createElement(
            'button',
            {
                'class': 'btn',
                onClick: function onClick(e) {
                    e.preventDefault();
                    // alert(productName + productType + amountOwned);
                    isDefault = true;
                    mutateAsync().then(function () {
                        return props.onUseProduct();
                    });
                }
            },
            'Equip Default'
        ) : props.productInfo.type === 'ExMedicine' ? React.createElement(
            'button',
            {
                'class': 'btn',
                onClick: function onClick(e) {
                    e.preventDefault();
                    // alert(productName + productType + amountOwned);

                    mutateAsync().then(function () {
                        return props.onUseProduct();
                    });
                }
            },
            'Use ExMedicine'
        ) : React.createElement(
            'button',
            { 'class': 'btn', id: 'lifeMedicine' },
            'Use In Game'
        )
    );
}