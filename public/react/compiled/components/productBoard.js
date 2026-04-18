import { productPurchase } from '../api.js';
var useMutation = window.ReactQuery.useMutation;


export function ProductBoard(props) {
    var purchaseData = {
        productName: props.productInfo.name,
        productType: props.productInfo.type,
        amountOwned: props.productInfo.amount
    };

    var _useMutation = useMutation(function () {
        console.log('purchsinggggggggggggggg');
        if (window.getCoins() > 0) {
            addCoins(-props.productInfo.price);
            return productPurchase(purchaseData).then(function (msg) {
                return alert(msg);
            });
        } else {
            alert('You dont have enough coins to buy!');
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
        React.createElement(
            'div',
            { 'class': 'price', id: 'boardPrice' },
            React.createElement(
                'p',
                null,
                props.productInfo.price
            ),
            React.createElement('img', { src: './images/player-coin.png', id: 'coinAtBoard' })
        ),
        props.productInfo.soldout ? React.createElement(
            'button',
            { 'class': 'btn', id: 'soldOutBtn' },
            'Sold Out'
        ) : React.createElement(
            'button',
            {
                'class': 'btn',
                onClick: function onClick(e) {
                    e.preventDefault();
                    // alert(productName + productType + amountOwned);

                    mutateAsync().then(function () {
                        return props.onBoughtProduct();
                    });
                }
            },
            'Buy now'
        )
    );
}