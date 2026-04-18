export default function DropdownNav(props){

    function ActiveNav(){
        let activeNavElement;
            console.log(props.currentPage)
            switch(props.currentPage){
                case "home":
                    activeNavElement = 
                        <div>
                            <span class="PB__dropdownLabel">
                            Home
                            </span>
                            <img
                                className="PB__dropdownImgLabel"
                                src="./images/home.png"
                                width="50"
                            />
                        </div>
                    break;
                case "leaderboard":
                    activeNavElement = 
                        <div>
                            <span class="PB__dropdownLabel PB__leaderboardActive">
                            Leaderboard
                            </span>
                            <img
                                className="PB__dropdownImgLabel"
                                src="./images/leaderboard/trophy.png"
                                width="35"
                            />
                        </div>
                    break;
                case "luckyDraw":
                    activeNavElement = 
                        <div>
                            <span class="PB__dropdownLabel PB__luckyDrawActive">
                            Lucky Draw
                            </span>
                            <img
                                className="PB__dropdownImgLabel PB__luckyDrawActiveImg"
                                src="./images/player-spinwheel.png"
                                width="50"
                            />
                        </div>
                    break;
                case "inventory":
                    activeNavElement = 
                        <div>
                            <span class="PB__dropdownLabel">
                            Inventory
                            </span>
                            <img
                                className="PB__dropdownImgLabel"
                                src="./images/player-inventory.png"
                                width="50"
                            />
                        </div>
                    break;
                case "gameStore":
                    activeNavElement = 
                        <div>
                            <span class="PB__dropdownLabel">
                            Store
                            </span>
                            <svg
                                className="PB__dropdownImgLabel"
                                width="41"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512"
                            >
                                <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
                            </svg>
                        </div>
                    break;
                case "friends":
                case "friendRequest":
                case "search":
                    activeNavElement = 
                        <div>
                            <span class="PB__dropdownLabel">
                            Friends
                            </span>
                            <svg 
                                className="PB__dropdownImgLabel"
                                width="41"
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 640 512"
                            >
                                <path d="M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32 80 82.1 80 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zM480 256c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48 0-61.9-50.1-112-112-112z"/>
                            </svg>
                        </div>
                    break;
                case "campaign":
                    activeNavElement = 
                        <div>
                            <span class="PB__dropdownLabel">
                            Campaign
                            </span>
                            <img
                                className="PB__dropdownImgLabel"
                                src="./images/player-campaign.png"
                                width="50"
                            />
                        </div>
                    break;
                case "profile":
                    activeNavElement = 
                        <div>
                            <span class="PB__dropdownLabel">
                            Profile
                            </span>
                            <img
                                className="PB__dropdownImgLabel"
                                src="./images/leaderboard/profile.png"
                                width="50"
                            />
                        </div>
                    break;
                default:
                    activeNavElement = 
                    <div>
                        <img
                            className="PB__dropdownImgs PB__dropdownImgsPositioning"
                            src="./images/home.png"
                            width="45"
                        />
                        <img
                            className="PB__dropdownImgs PB__dropdownImgsPositioning"
                            src="./images/leaderboard/trophy.png"
                            width="35"
                        />
                        <img
                            className="PB__dropdownImgs PB__dropdownImgsPositioning"
                            src="./images/player-spinwheel.png"
                            width="40"
                        />
                        <img
                            className="PB__dropdownImgs PB__dropdownImgsPositioning"
                            src="./images/player-inventory.png"
                            width="40"
                        />
                        <svg
                            className="PB__dropdownImgs PB__dropdownImgsPositioning"
                            width="41"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512"
                        >
                            <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
                        </svg>
                    </div>
            }
                                
        return(activeNavElement)
    }

    let currentNavPages = [
        {
            path: ["home"],
            imgElement: <img
                            className="PB__dropdownSelectImg PB__dropdownSelectImgPositioning"
                            src="./images/home.png"
                            width="41"
                        />,
            label: "Home",
            authorised: false
        },{
            path: ["campaign"],
            imgElement:<img
                            className="PB__dropdownSelectImg PB__dropdownSelectImgPositioning"
                            src="./images/player-campaign.png"
                            width="50"
                        />,
            label: "Campaign",
            authorised: true
        },{
            path: ["leaderboard"],
            imgElement: <img
                            className="PB__dropdownSelectImg PB__dropdownSelectImgPositioning"
                            src="./images/leaderboard/trophy.png"
                            width="35"
                        />,
            label: "Leaderboard",
            authorised: false
        },{
            path: ["friends","search","friendRequest"],
            imgElement:<svg 
                            className="PB__dropdownSelectImg PB__dropdownSelectImgPositioning"
                            width="45"
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 640 512"
                        >
                            <path d="M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32 80 82.1 80 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zM480 256c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48 0-61.9-50.1-112-112-112z"/>
                        </svg>,
            label: "Friends",
            authorised: true
        },
        {
            path: ["luckyDraw"],
            imgElement: <img
                            className="PB__dropdownSelectImg PB__dropdownSelectImgPositioning"
                            src="./images/player-spinwheel.png"
                            width="41"
                        />,
            label: "Lucky Draw",
            authorised: true
        },{
            path: ["inventory"],
            imgElement: <img
                            className="PB__dropdownSelectImg PB__dropdownSelectImgPositioning"
                            src="./images/player-inventory.png"
                            width="41"
                        />,
            label: "Inventory",
            authorised: true
        },{
            path: ["gameStore"],
            imgElement: <svg
                            className="PB__dropdownSelectImg PB__dropdownSelectImgPositioning"
                            width="41"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512"
                        >
                            <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
                        </svg>,
            label: "Store",
            authorised: true
        }
    ]

    function DropdownContent(){

        if(!props.isLoggedIn) {
            currentNavPages = currentNavPages.filter(
                (navPage) => !navPage.authorised
            )
        };

        

        currentNavPages.forEach((navPage) => {

            navPage.path.forEach((path)=> {
                if(path === props.currentPage)
                currentNavPages.splice(currentNavPages.indexOf(navPage), 1);
            })
            
        })

        const navItems = currentNavPages.map((navItem) => 
            <a key={navItem.path[0]} href={"/" + navItem.path[0]}>
                <span class="PB__dropdownSelect PB__dropdownSelectPositioning">
                    {navItem.label}
                </span>
                {navItem.imgElement}
            </a>
        )

        return navItems;
    }
    return(
        <div class="PB__dropdown">
            <button class="PB__dropbtn">
                <ActiveNav />
            </button>
            <svg 
                class="PB__dropdownIcon" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 320 512"
                width="25"
            >
                <path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"/>
            </svg>
            <div class="PB__dropdown-content">
                <DropdownContent />
            </div>
        </div>
    )
}