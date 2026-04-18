export default function Product(props) {
    console.log('checking product-----------------');
    console.log(props.name);
    if (props.soldout == true) {
        console.log('ProductsDisplay sold');
        console.log(props.name);
        return React.createElement(
            'div',
            {
                'class': 'card',
                onClick: function onClick() {
                    props.onClick();
                }
            },
            React.createElement('img', {
                src: './images/store/sold_out.png',
                alt: 'Sold Out',
                id: 'soldOutBanner'
            }),
            React.createElement('img', { src: props.image, alt: 'product', id: 'soldProduct' }),
            React.createElement('hr', {
                style: {
                    width: '100%',
                    background: 'lime',
                    height: '3px',
                    marginTop: '6px',
                    marginBottom: '4px'
                }
            }),
            React.createElement(
                'p',
                null,
                props.name
            ),
            React.createElement(
                'div',
                { 'class': 'price' },
                React.createElement(
                    'p',
                    null,
                    props.price
                ),
                React.createElement('img', { src: './images/player-coin.png' })
            )
        );
    } else {
        return React.createElement(
            'div',
            {
                'class': 'card',
                onClick: function onClick() {
                    props.onClick();
                }
            },
            React.createElement('img', { src: props.image, alt: 'product', 'class': 'productImg' }),
            React.createElement('hr', {
                style: {
                    width: '100%',
                    background: 'lime',
                    height: '3px',
                    marginTop: '6px',
                    marginBottom: '4px'
                }
            }),
            React.createElement(
                'p',
                null,
                props.name
            ),
            React.createElement(
                'div',
                { 'class': 'price' },
                React.createElement(
                    'p',
                    null,
                    props.price
                ),
                React.createElement('img', { src: './images/player-coin.png' })
            )
        );
    }
}