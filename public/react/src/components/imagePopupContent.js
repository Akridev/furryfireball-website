import { getAllImage,getPurchasedImage, insertPurchasedImage, checkAccessToken } from "../api.js";
const { useQuery, QueryClient, QueryClientProvider, useMutation } = window.ReactQuery;
const queryClient = new QueryClient({
    defaultOptions: {queries: {refetchOnWindowFocus: false}}
});


const isLocalhost =
    location.hostname === 'localhost' || location.hostname === '127.0.0.1';
const STORAGE_API_HOST = isLocalhost
    ? `http://localhost:4000`
    : `https://ades-host-server.herokuapp.com`;


    let accessToken = localStorage.getItem('accessToken');
    let refreshToken = localStorage.getItem('refreshToken');

function ImagePopUpContent(props){
    const allImage = useQuery(
        ['getAllImage'], 
        () => getAllImage()
        ,)
    const purchasedImage = useQuery(
        ['getPurchasedImage'],
        () => getPurchasedImage()
    )

    function btnOnClick(){
        let imgName;
        let imagesInDiv = document.querySelectorAll(".pImage");
        for(const image of imagesInDiv){
            if(image.style.filter=="brightness(20%)"){
                
                let array = image.src.split("/")
                imgName = array.slice(-1)[0]
            }
        }

        if(imgName != null && imgName != ""){
            window.handleChecking(true);
            let popUpDiv = window.document.getElementById("popUpDiv")
            window.hidePopUp(popUpDiv)

            fetch(`${STORAGE_API_HOST}/updateUserImage?imageUrl=${imgName}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + accessToken + " " + refreshToken,
                    },
            })
            .then((response) => response.json())
            .then((response) => {
                    if(response.error === "TokenExpiredError Not authorized"){
                        alert("Token is expired. Please re-login to check information");
                        localStorage.removeItem("accessToken");
                        window.location.href = '/';
                    }
                    checkAccessToken(response.accessToken)
                    //alert(response.message)
                    window.changePicUrl(imgName)
                    window.handleInfoBarPic(imgName)
            })
            .catch((err) => {
                    alert(err)
            })
            .finally(() => {
                    window.handleChecking(false);
            })
        }
        else{
            alert("Please choose an image")
        }
    }

    const onPurchase = React.useCallback(() =>{ 
        console.log("REFETCH")
        purchasedImage.refetch();
     },[purchasedImage.refetch])

    return(
        <div style={{height:"100%"}}>
            <p>Choose your Profile Picture:</p>
                {   
                    (allImage.isLoading || purchasedImage.isLoading || purchasedImage.isRefetching) ? 
                        <div class="centerLoader" style={{textAlign:"center"}}></div> :
                    (allImage.error || purchasedImage.error) ?
                        <h1>{allImage.error.message || purchasedImage.error}</h1> :
                        <div id="centerImage">
                            {
                                allImage.data.map((row, index) => 
                                    (
                                    <DisplayImage 
                                        url={row.pic_url} 
                                        purchasable={row.purchasable} 
                                        amount={row.amount} 
                                        purchased={purchasedImage.data}
                                        onPurchase={onPurchase}
                                        />
                                        
                                    ))
                            }
                            
                 </div>   
            }
        
        <button id="button" onClick={btnOnClick}>Select Image</button>
        </div>
    )
}

function DisplayImage(props){
    const [ checking, setIsChecking ] = React.useState(false);
    const currentPicUrl = window.getPicUrl

    const {error, isLoading,mutateAsync } = useMutation(() => {
        window.addCoins(-props.amount)
        insertPurchasedImage(props.url)
    })
    
    function handleChecking(set){
        setIsChecking(set);
    }

    // For images that are not locked / unlocked ==> able to choose and change profile image 
    const unlockedImgOnClick = (e) =>{
        let imagesInDiv = document.querySelectorAll("#unlockedImage");
        for(const image of imagesInDiv){
            image.style.filter="brightness(100%)"
        }
        e.target.style.filter="brightness(20%)"
        let array = e.target.src.split("/")
        console.log(array.slice(-1)[0])

    }

    // For images that are locked ==> able to purchase profile image
    const lockedImgOnClick = (e) =>{
        let coins = window.getCoins();

        if(coins >= props.amount){
            let c = confirm("Do you want to purchase this profile image?")

            if(c){
                mutateAsync().then(()=>props.onPurchase())
            }
        }
        else
            alert("You do not have enough coins to purchase this image")

    }

    React.useEffect(() => {
        props.purchased.map((row) => {
        if(row.image_url == props.url)
            handleChecking(true);
        })
    },[])

    return(
        (isLoading)   ?
        <div class="loader" style={{display:"inline-block"}}></div>:
        (error) ?
        <h1>error.message</h1>:

            // checking if image is free / purchased already
            (props.purchasable == "no" || checking) ?
                <div class="containImage">
                    <img 
                        class="pImage" 
                        id="unlockedImage"
                        src={'./images/profile_pic/'+props.url} 
                        style={
                            {filter:(currentPicUrl == props.url)?
                                "brightness(20%)":
                                "brightness(100%)"}
                            } 
                        onClick={(e) => unlockedImgOnClick(e)}/>
                </div>
            :
            // checking if image is not purchased
                <div class="containImage" style={{top:"15%"}}>
                    <img class="pImage" 
                        id="lockedImage"
                        src={'./images/profile_pic/'+props.url} 
                        style={{filter:"brightness(50%)",zIndex: "1"}} 
                        onClick={lockedImgOnClick}
                        />

                    <div class="centeredText">
                    
                    <p style={{filter:"brightness(100%)"}}>LOCKED</p>

                    <img src={"./images/player-coin.png"} style={{height:"15%",width:"15%",marginLeft:"-30px",zIndex: "3"}}/>
                    <p style={{filter:"brightness(100%)",float:"left",marginLeft:"50px", fontSize:"25px"}}>{props.amount}</p>
                    </div>
                </div>

    )
}

window.addEventListener('DOMContentLoaded', function() {
    const domContainer = document.querySelector(".popup");
    const root = ReactDOM.createRoot(domContainer);

    root.render(
        <QueryClientProvider client={queryClient}>
            <ImagePopUpContent/>
        </QueryClientProvider>
            )
   
})