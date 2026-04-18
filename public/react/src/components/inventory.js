import BoughtItem from './boughtItem.js';
import { ItemDetailBoard } from './itemDetailBoard.js';
import { StoreNavBar } from './storeNavBar.js';
import { TopInfo } from './topInfo.js';
import { getUserPurhcase } from '../api.js';

const { useQuery, QueryClient, QueryClientProvider } = window.ReactQuery;

let attacksPro = [];
let equipsPro = [];
let medicine = [];
let inUsePro = [
    {
        name: 'Sun Burn',
        increasement: '0',
        type: 'fireball',
        image: './images/default/fireball.png',
        amount: 1,
        equipped: true,
    },
    {
        name: 'Sun Dive',
        increasement: '0',
        type: 'dive',
        image: './images/default/fireball.png',
        amount: 1,
        equipped: true,
    },
    {
        name: 'Sun Roll',
        increasement: '0',
        type: 'roll',
        image: './images/default/fireball.png',
        amount: 1,
        equipped: true,
    },
    {
        name: 'Normal Shield',
        increasement: '0',
        type: 'equipment',
        image: './images/default/shield.png',
        amount: 1,
        equipped: true,
    },
];

function initProducts() {
    attacksPro = [
        {
            name: 'Sun Burn',
            increasement: '0',
            type: 'fireball',
            image: './images/default/fireball.png',
            amount: 1,
            equipped: true,
        },
        {
            name: 'Sun Dive',
            increasement: '0',
            type: 'dive',
            image: './images/default/fireball.png',
            amount: 1,
            equipped: true,
        },
        {
            name: 'Sun Roll',
            increasement: '0',
            type: 'roll',
            image: './images/default/fireball.png',
            amount: 1,
            equipped: true,
        },
    ];
    equipsPro = [
        {
            name: 'Normal Shield',
            increasement: '0',
            type: 'equipment',
            image: './images/default/shield.png',
            amount: 1,
            equipped: true,
        },
    ];
    medicine = [];
    inUsePro = [
        {
            name: 'Sun Burn',
            increasement: '0',
            type: 'fireball',
            image: './images/default/fireball.png',
            amount: 1,
            equipped: true,
        },
        {
            name: 'Sun Dive',
            increasement: '0',
            type: 'dive',
            image: './images/default/fireball.png',
            amount: 1,
            equipped: true,
        },
        {
            name: 'Sun Roll',
            increasement: '0',
            type: 'roll',
            image: './images/default/fireball.png',
            amount: 1,
            equipped: true,
        },
        {
            name: 'Normal Shield',
            increasement: '0',
            type: 'equipment',
            image: './images/default/shield.png',
            amount: 1,
            equipped: true,
        },
    ];

    // attacksPro[0] = inUsePro[0];
    // attacksPro[1] = inUsePro[1];
    // attacksPro[2] = inUsePro[2];
    // equipsPro[0] = inUsePro[3];
}

function splitProducts(data) {
    // to ensure the arrays are empty at beginning when reload
    initProducts();
    console.log('Loading bought products...');
    console.log(data);
    // the data should be loaded from db
    let products = data;

    // to split all the data into individual array
    products.map((product) => {
        // for change the default inventory settings, and push the in used product
        if (product.equipped == true && product.type == 'fireball') {
            inUsePro[0].equipped = false;
            attacksPro[0].equipped = false;
            inUsePro[0] = product;
            attacksPro.push(product);
        } else if (product.equipped == true && product.type == 'dive') {
            inUsePro[1].equipped = false;
            attacksPro[1].equipped = false;
            inUsePro[1] = product;
            attacksPro.push(product);
        } else if (product.equipped == true && product.type == 'roll') {
            inUsePro[2].equipped = false;
            attacksPro[2].equipped = false;
            inUsePro[2] = product;
            attacksPro.push(product);
        } else if (product.equipped == true && product.type == 'equipment') {
            inUsePro[3].equipped = false;
            equipsPro[0].equipped = false;
            inUsePro[3] = product;
            equipsPro.push(product);
        }

        // for purchased data and not equipped display
        if (
            product.equipped == false &&
            (product.type === 'fireball' ||
                product.type === 'dive' ||
                product.type === 'roll')
        ) {
            console.log('pushing data at inventory--------');
            attacksPro.push(product);
            console.log(attacksPro);
        } else if (product.equipped == false && product.type === 'equipment') {
            equipsPro.push(product);
        } else if (
            product.type === 'lifeMedicine' ||
            product.type === 'ExMedicine'
        ) {
            // lifeMedicine + exMedicine
            medicine.push(product);
            console.log(medicine);
        }
    });
}

/**
 * To display the products in store
 */
function ProductsDisplay(props) {
    return props.products.map((product) => (
        <BoughtItem
            image={product.image}
            name={product.name}
            onClick={() => {
                props.setProBoardInfo(product);
                // alert('product card clicked');
            }}
        />
    ));
}

// This is the whole store
function Inventory(props) {
    const [activeButton, setActiveButton] = React.useState('Attack');
    const [activeProInfo, setActiveProInfo] = React.useState([]);
    const [proBoardInfo, setProBoardInfo] = React.useState({});
    // used for the four square later
    const [usingPro, setUsingPro] = React.useState(inUsePro);

    // Get data from db ---------------------------------------------
    const { data, error, isLoading, isRefetching, refetch } = useQuery(
        // specific identifier, query key
        ['getUserPurhcase'],
        // function used to get data from db
        () => getUserPurhcase()
    );

    React.useEffect(() => {
        console.log('use effect load data---------------------');
        initProducts();
        // only setSatate when data is loaded
        if (data) {
            console.log(data);
            splitProducts(data);
            setActiveProInfo(attacksPro);
            setProBoardInfo(attacksPro[0]);
            setUsingPro(inUsePro);
        }
    }, [data]);
    //--------------------------------------------------------------------

    // User purchase product ---------------------------------------------
    /**
     * Update & Refetch data
     */
    const onUseProduct = React.useCallback(() => {
        refetch();
    }, [refetch]);
    //--------------------------------------------------------------------

    // to onchange products displayed
    const onRefresh = (whichType) => {
        setActiveButton(whichType);
        if (whichType === 'Attack') {
            setActiveProInfo(attacksPro);
        } else if (whichType === 'Equipment') {
            setActiveProInfo(equipsPro);
        } else {
            setActiveProInfo(medicine);
        }
    };

    return isLoading || isRefetching ? (
        <p>Loading...</p>
    ) : error ? (
        <p>{error.message}</p>
    ) : (
        <div id="inventoryContainer">
            <div id="title">
                <h4>Inventory</h4>
            </div>
            <div id="topInfoContainer">
                <TopInfo equippedInfo={usingPro} />
            </div>
            <div id="navBar">
                <StoreNavBar
                    activeButton={activeButton}
                    activeProInfo={activeProInfo}
                    onRefresh={onRefresh}
                />
            </div>

            <div id="proConatiner">
                <div id="products">
                    <ProductsDisplay
                        products={activeProInfo}
                        setProBoardInfo={setProBoardInfo}
                    />
                </div>
                <div id="detailBoard">
                    <ItemDetailBoard
                        productInfo={proBoardInfo}
                        onUseProduct={onUseProduct}
                    />
                </div>
            </div>
        </div>
    );
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
}); // declare the query client
function GameInventory() {
    return (
        <QueryClientProvider client={queryClient}>
            <Inventory />
        </QueryClientProvider>
    );
}
window.addEventListener('DOMContentLoaded', function () {
    const root = ReactDOM.createRoot(document.querySelector('#inventory'));

    root.render(<GameInventory />);
});
