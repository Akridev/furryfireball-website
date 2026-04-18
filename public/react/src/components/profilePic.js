import { popupMain,hide } from "../../../js/game_js/popUp.js";
import { checkAccessToken } from "../api.js";

const isLocalhost =
    location.hostname === 'localhost' || location.hostname === '127.0.0.1';
const STORAGE_API_HOST = isLocalhost
    ? `http://localhost:4000`
    : `https://ades-host-server.herokuapp.com`;


    let accessToken = localStorage.getItem('accessToken');
    let refreshToken = localStorage.getItem('refreshToken');
    
export function ProfilePic(props){
    const [ url, setUrl ] = React.useState(props.url);
    const [ checking, setIsChecking ] = React.useState(false);
    //change pic url in global scope
    window.changePicUrl = function(url){
        setUrl(url)
    }
    window.getPicUrl = url;
    React.useEffect(()=>{
        if(props.url == null || props.url == undefined || props.url == ""){
            setUrl("autoProfilePic.jpg")
        }
    },[])
    window.handleChecking = function(set){
        setIsChecking(set)
    }
    function imageOnClick(event){
        //addContent()
        popupMain('popUpDiv')
    }
    
    return(
        <div class="image">
            {(checking) ?
                <div>
                    <div class="loader" id="image" style={{height: "30px", width: "30px",border:"5px solid white",borderTop:"5px solid black", margin:"15px"}}></div>
                </div>
                :
                <input type="image" src={"./images/profile_pic/"+url} onClick={imageOnClick} id="image"/>
            }
            </div>
    )

}


