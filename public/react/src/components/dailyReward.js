import { popupMain, hide } from "../../../js/game_js/popUp.js";
import { updateDailyRewardDate } from "../api.js";
const { useQuery, QueryClient, QueryClientProvider, useMutation } = window.ReactQuery;
const queryClient = new QueryClient({
    defaultOptions: {queries: {refetchOnWindowFocus: false}}
});

function DailyReward(){
    const [ timer, setTimer ] = React.useState('00:00:00');
    const [ distance, setDistance ] = React.useState("loading");
    const [ date, setDate ] = React.useState('loading');
    
    const Ref = React.useRef(null);
    
    const {error, isLoading,mutateAsync } = useMutation(() => {

        let now = new Date();
        now.setHours(now.getHours()+24);
        // now.setMinutes(now.getMinutes() + 1)
        updateDailyRewardDate(now);
    })

    React.useEffect(() => {
        if(date != 'loading')
            clearTimer(getDeadTime(date));
    }, [date]);

    window.handleDate = function (set) { 
        setDate(set)
    }

    function handleDistance (set) {
        setDistance(set)
    }

    function handleTimer (set) {
        setTimer(set)
    }
    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }
    
    const startTimer = (e) => {
        let currDate = window.getDailyRewardDate();
        let { total, hours, minutes, seconds } 
                    = getTimeRemaining(e);
        if (total >= 0) {
            // update the timer
            // check if less than 10 then we need to 
            // add '0' at the beginning of the variable
            handleTimer(
                (hours > 9 ? hours : '0' + hours) + ' hr : '  +
                (minutes > 9 ? minutes : '0' + minutes) + ' min : '
                + (seconds > 9 ? seconds : '0' + seconds) +' s'
            )
            handleDistance("start")
            //console.log(handleTimer)
        }
        else{
            if(currDate != 'loading' )
                handleDistance("end")
            else
                handleDistance("loading")
        }
    }

    const clearTimer = (e) => {
  
        // If you adjust it you should also need to
        // adjust the Endtime formula we are about
        // to code next    
        handleTimer('00 hr : 00 min : 00 s');
  
        // If you try to remove this line the 
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTime = (date) => {
        let deadline = new Date();
        let time = new Date()

        // Get today's date and time and extend(TEMPORARY)
        time.setMinutes(time.getMinutes()+5)
        //let settime = time.getTime()
        //console.log(date)
        let enddate;
        // --------------------------------
        if(date != null && date != ""){
            enddate = date;
            enddate = Date.parse(enddate)
            enddate = new Date(enddate)
        }
        else{    
            enddate = new Date().getTime();
        }
         let now = new Date().getTime();
        // --------------------------------

         // Find the distance between now and the count down date
        //var distance = settime - now;
        var distance = enddate - now;
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        // This is where you need to adjust if 
        // you entend to add more time
        
        deadline.setHours(hours + deadline.getHours());
        deadline.setMinutes(minutes + deadline.getMinutes());
        deadline.setSeconds(seconds + deadline.getSeconds());

        return deadline;
    }
    
    

    const closeOnClick = () => {
        let daily = document.querySelector("#popUpDaily")
        hide(daily)
    }

    
    const collectOnClick = () => {
        let rewardPopUp = document.querySelector("#popUpReward");
        let dailyPopUp = document.querySelector("#popUpDaily");
        

        window.randomReward = dailyReward[ Math.floor( Math.random() * dailyReward.length) ];
        window.handleReward(randomReward)
        console.log(randomReward)
        
        mutateAsync().then(()=>{
            if( randomReward.type == "coin" ){
                window.addCoins(randomReward.amount);
            }
            else if ( randomReward.type == "exp" ){
                window.addXp(randomReward.amount);
            }
            else if ( randomReward.type == "luckyDrawChance" ){
                const luckyChance = window.getLuckyChance();
                window.setLuckyDrawChance(luckyChance + randomReward.amount, 0);
            }
            hide(dailyPopUp)
            rewardPopUp.style.display="block";
            //confetti.start();
            //setTimeout(function(){ confetti.stop(); }, 5000);
            let now = new Date();
            now.setHours(now.getHours()+24);
            // now.setMinutes(now.getMinutes() + 1)

            handleDistance('start');
            //set timer
            clearTimer(getDeadTime(now));
        })
    }

    return(
        <div>
            <h1>Daily Reward</h1>
        {
        ( distance === "loading" || isLoading ) ?
        <div class="loader"></div> :
        ( error ) ?
            <h1>{error.message}</h1>:        
            ( distance === "start" ) ?
                <div>
                    <h1 style={{marginTop:"-3%", fontSize:"20px"}}>Time Left:</h1>
                    <h1 class="timer" style={{marginTop:"-3%"}}>{timer}</h1>
                </div> :
                <div>
                    <h1 style={{marginTop:"-3%", fontSize:"20px"}}>Time Left:</h1>
                    <h1 class="timer" style={{marginTop:"-3%"}}>{timer}</h1>
                    <h2 class="collect" onClick={collectOnClick}>Click Here to Collect Reward</h2>
                </div>
        }
    <button id="close" onClick={closeOnClick}>Close</button>
    </div>
    )
    
    
}

window.addEventListener('DOMContentLoaded', function() {
    const domContainer = document.querySelector("#popUpDaily");
    const root = ReactDOM.createRoot(domContainer);

    root.render(
        <QueryClientProvider client={queryClient}>
            <DailyReward/>
        </QueryClientProvider>
    )
   
})

const dailyReward = [
    {
        type:"exp",
        amount: Math.floor(Math.random() * 50 + 1)
    },
    {
        type:"coin",
        amount: Math.floor(Math.random() * 100 + 1),
        image: "./images/player-coin.png"
    },
    {
        type:"luckyDrawChance",
        amount: Math.floor(Math.random() * 2 + 1),
        image: "./images/fourLeaf.png"
    }
]