export function StoreNavBar(props) {
    return (
        <ul>
            <li>
                <a
                    href="#attack"
                    onClick={() =>
                        props.onRefresh('Attack', props.activeProInfo)
                    }
                    style={{
                        backgroundColor:
                            props.activeButton === 'Attack'
                                ? '#bfddfc'
                                : '#8de0df',
                    }}
                >
                    Attack
                </a>
            </li>
            <li>
                <a
                    href="#equipment"
                    onClick={() => {
                        props.onRefresh('Equipment', props.activeProInfo);
                    }}
                    style={{
                        backgroundColor:
                            props.activeButton === 'Equipment'
                                ? '#bfddfc'
                                : '#8de0df',
                    }}
                >
                    Equipment
                </a>
            </li>
            <li>
                <a
                    href="#medicine"
                    onClick={() =>
                        props.onRefresh('Medicine', props.activeProInfo)
                    }
                    style={{
                        backgroundColor:
                            props.activeButton === 'Medicine'
                                ? '#bfddfc'
                                : '#8de0df',
                    }}
                >
                    Medicine
                </a>
            </li>
        </ul>
    );
}
