import Product from './product.js';
import { ProductBoard } from './productBoard.js';
import { StoreNavBar } from './storeNavBar.js';
import { getStoreData } from '../api.js';

const { useQuery, QueryClient, QueryClientProvider } = window.ReactQuery;

let attacksPro = [];
let equipsPro = [];
let medicine = [];

function splitProducts(data) {
    // to ensure the arrays are empty at beginning when reload
    attacksPro = [];
    equipsPro = [];
    medicine = [];
    console.log('Loading products format');
    console.log(data);
    // the data should be loaded from db
    let products = data;

    // to split all the data into individual array
    products.map((product) => {
        if (
            product.type === 'fireball' ||
            product.type === 'dive' ||
            product.type === 'roll'
        ) {
            console.log('pushing data at store--------');

            attacksPro.push(product);
            console.log(attacksPro);
        } else if (product.type === 'equipment') {
            equipsPro.push(product);
        } else {
            // lifeMedicine + exMedicine
            medicine.push(product);
        }
    });
}

/**
 * To display the products in store
 */
function ProductsDisplay(props) {
    return props.products.map((product) => (
        <Product
            image={product.image}
            name={product.name}
            price={product.price}
            soldout={product.soldout}
            onClick={() => {
                props.setProBoardInfo(product);
                // alert('product card clicked');
            }}
        />
    ));
}

// This is the whole store
function Store(props) {
    const [activeButton, setActiveButton] = React.useState('Attack');
    const [activeProInfo, setActiveProInfo] = React.useState([]);
    const [proBoardInfo, setProBoardInfo] = React.useState({});

    // Get data from db ---------------------------------------------
    const { data, error, isLoading, isRefetching, refetch } = useQuery(
        // specific identifier, query key
        ['getStoreData'],
        // function used to get data from db
        () => getStoreData()
    );

    React.useEffect(() => {
        console.log('use effect load data---------------------');
        // only setSatate when data is loaded
        if (data) {
            console.log(data);
            splitProducts(data);
            setActiveProInfo(attacksPro);
            setProBoardInfo(attacksPro[0]);
        }
    }, [data]);
    //--------------------------------------------------------------------

    // User purchase product ---------------------------------------------
    /**
     * Update & Refetch data
     */
    const onBoughtProduct = React.useCallback(() => {
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
        <div id="storeContainer">
            <div id="title">
                <h4>Store</h4>
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
                    <ProductBoard
                        productInfo={proBoardInfo}
                        onBoughtProduct={onBoughtProduct}
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
function GameStore() {
    return (
        <QueryClientProvider client={queryClient}>
            <Store />
        </QueryClientProvider>
    );
}
window.addEventListener('DOMContentLoaded', function () {
    const root = ReactDOM.createRoot(document.querySelector('#store'));

    root.render(<GameStore />);
});
