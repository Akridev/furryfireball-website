export function StoreNavBar(props) {
    return React.createElement(
        'ul',
        null,
        React.createElement(
            'li',
            null,
            React.createElement(
                'a',
                {
                    href: '#attack',
                    onClick: function onClick() {
                        return props.onRefresh('Attack', props.activeProInfo);
                    },
                    style: {
                        backgroundColor: props.activeButton === 'Attack' ? '#bfddfc' : '#8de0df'
                    }
                },
                'Attack'
            )
        ),
        React.createElement(
            'li',
            null,
            React.createElement(
                'a',
                {
                    href: '#equipment',
                    onClick: function onClick() {
                        props.onRefresh('Equipment', props.activeProInfo);
                    },
                    style: {
                        backgroundColor: props.activeButton === 'Equipment' ? '#bfddfc' : '#8de0df'
                    }
                },
                'Equipment'
            )
        ),
        React.createElement(
            'li',
            null,
            React.createElement(
                'a',
                {
                    href: '#medicine',
                    onClick: function onClick() {
                        return props.onRefresh('Medicine', props.activeProInfo);
                    },
                    style: {
                        backgroundColor: props.activeButton === 'Medicine' ? '#bfddfc' : '#8de0df'
                    }
                },
                'Medicine'
            )
        )
    );
}