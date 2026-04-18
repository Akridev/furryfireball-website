

// ==== React Query =========================
const { useQuery, QueryClient, QueryClientProvider } = window.ReactQuery;
const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
});
// ==========================================

// ==== Fetch API Functions =================
import {
    getUserCampaignData,
    getCampaignData
} from '../api.js';
// ==========================================

function Campaign(){
    const [starsEarned, setStarsEarned] = React.useState(0);
    
    const queryMultiple = () => {
        const res1 = useQuery(
            ['getUserCampaignData'],
            () => getUserCampaignData(),
    
            {
                onSuccess: (data) => {
                    if (data.error) {
                        window.location.href = './home';
                    }
                },
    
                onError: () => {
                    alert("An unexpected error occurred, you will be redirected back to home page.");
                    window.location.href = './home';
                }
            }
        )

        const res2 = useQuery(
            ['getCampaignData'], 
            () => getCampaignData()
        );
        return [res1, res2];
    }
      
    const [
        { isLoading: isUserCamapignInfoLoading, data: userCampaignData , error: userCampaignError},
        { isLoading: isCampaignInfoLoading, data: campaignData, error:  campaignError}
    ] = queryMultiple()

    const isLoading = isUserCamapignInfoLoading || isCampaignInfoLoading;
    const error = userCampaignError || campaignError;

    const stageData = [
        {
            level: 1,
            topOffset: "60.5%",
            leftOffset: "6%",
            locked: true,
            stars: 0
        },
        {
            level: 2,
            topOffset: "60.5%",
            leftOffset: "19.2%",
            locked: true,
            stars: 0
        },
        {
            level: 3,
            topOffset: "34%",
            leftOffset: "19.2%",
            locked: true,
            stars: 0
        },
        {
            level: 4,
            topOffset: "34%",
            leftOffset: "34%",
            locked: true,
            stars: 0
        },
        {
            level: 5,
            topOffset: "34%",
            leftOffset: "48.5%",
            locked: true,
            stars: 0
        },
        {
            level: 6,
            topOffset: "57.5%",
            leftOffset: "48.5%",
            locked: true,
            stars: 0
        },
        {
            level: 7,
            topOffset: "80.5%",
            leftOffset: "48.5%",
            locked: true,
            stars: 0
        },
        {
            level: 8,
            topOffset: "80.5%",
            leftOffset: "65%",
            locked: true,
            stars: 0
        },
        {
            level: 9,
            topOffset: "60.5%",
            leftOffset: "65%",
            locked: true,
            stars: 0
        },
        {
            level: 10,
            topOffset: "60.5%",
            leftOffset: "77.5%",
            locked: true,
            stars: 0
        },
        {
            level: 11,
            topOffset: "60.5%",
            leftOffset: "90%",
            locked: true,
            stars: 0
        },
    ]

    function StageDisplay(){
        
        let totalStars = 0;
        if(!error && userCampaignData && !isLoading){
            console.log(userCampaignData)
            const stageArr = userCampaignData.result;
            if(stageArr.length != 0)
            for(let i=0; i<stageArr.length; i++){
                if(stageArr[i].stage_level==stageData[i].level){
                    stageData[i].locked = false;
                    stageData[i].stars = parseInt(stageArr[i].obj_one) + parseInt(stageArr[i].obj_two) + parseInt(stageArr[i].obj_three)
                    totalStars += stageData[i].stars
                    stageData[i].obj={
                        o1: stageArr[i].obj_one == '1' ? true : false,
                        o2: stageArr[i].obj_two == '1' ? true : false,
                        o3: stageArr[i].obj_three == '1' ? true : false,
                    }
                }

            }
            
            else{
                stageData[0].locked=false;
                stageData[0].obj={
                    o1: false,
                    o2: false,
                    o3: false
                }
            }
        }
        

        setStarsEarned(totalStars)

        const stageDisplay = stageData.map((stageLevel)=>{
            
            if(stageLevel.locked){
                return <div key={stageLevel.level} style={{top: stageLevel.topOffset, left: stageLevel.leftOffset }} data-label={stageLevel.level} class="game-stage-locked">
                            {isLoading && <div class="loading"></div>}
                        </div>
            }else{
                let star1 = (stageLevel.stars>=1) ? "yellow" : "gray";
                let star2 = (stageLevel.stars>=2) ? "yellow" : "gray";
                let star3 = (stageLevel.stars==3) ? "yellow" : "gray";
                return  <div class="obj_trigger">
                            <div key={stageLevel.level} style={{top: stageLevel.topOffset, left: stageLevel.leftOffset }} data-label={stageLevel.level} class="game-stage" onClick={()=> window.location.href="/game?cpm=" + stageLevel.level}>
                                <i class={"fa fa-star star-one " + star1}></i>
                                <i class={"fa fa-star star-two " + star2}></i>
                                <i class={"fa fa-star star-three " + star3}></i>
                            </div>
                            <div class="obj_dropdown-content">
                                <p class="obj_header">Stage {stageLevel.level} Objectives</p>
                                <div class="objectives">
                                    <p class="obj_1">{stageLevel.obj.o1 ? <i class="fa fa-check"></i> : <i class="fa fa-close"></i>}<span class="obj_text">{campaignData[stageLevel.level-1].objective1}</span></p>
                                    <p class="obj_2">{stageLevel.obj.o1 ? <i class="fa fa-check"></i> : <i class="fa fa-close"></i>}<span class="obj_text">{campaignData[stageLevel.level-1].objective2}</span></p>
                                    <p class="obj_3">{stageLevel.obj.o1 ? <i class="fa fa-check"></i> : <i class="fa fa-close"></i>}<span class="obj_text">{campaignData[stageLevel.level-1].objective3}</span></p>
                                </div>
                            </div>
                        </div>
            }
        })

        return stageDisplay
    }

    return(
        <div>
            <img class="backgroundImg" src="../images/campaign_bg/desert.png"></img>
            <div class="totalStars">
                {isLoading ? <div class="totalStarsLoading"></div> : <div class="totalStarsContent">{starsEarned + "/" + campaignData.length*3}</div>}
                <i class="fa fa-star yellow totalStarsStar"></i>
            </div>
            <StageDisplay />
        </div>
    )
}

window.addEventListener('DOMContentLoaded', function () {
    const root = ReactDOM.createRoot(document.getElementById('campaign'));
    root.render(
        <QueryClientProvider client={queryClient}>
            <Campaign />
        </QueryClientProvider>
    );
});