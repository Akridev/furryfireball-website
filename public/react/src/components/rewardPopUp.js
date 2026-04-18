function RewardPopUp(){
    const [ reward, setReward ] = React.useState(window.randomReward); // set reward
    const [ isOpen, setIsOpen ] = React.useState(false);
    
   React.useEffect(() =>{
    const present = document.querySelector('.present')   
    const rewardPopUp = document.querySelector('#popUpReward')
    console.log(isOpen)
    if(reward != null){
            rewardPopUp.onclick = null
            console.log(rewardPopUp.onclick)

        // set for 1 sec
        setTimeout(function() {
            console.log("timout "+isOpen)

            confetti.start();
            present.classList.toggle('open')
            handleIsOpen(true)
            
            rewardPopUp.onclick = function(){
                rewardPopUp.style.display = "none"
                confetti.stop();
                present.classList.toggle('open')
                alert(reward.amount + " " + reward.type + " is gained")
            }

    }, 1000);

    // set for 5 sec
    setTimeout(function() {
            confetti.stop();
    }, 5000);
    }
   },[reward])

    window.handleReward = function(set){
        setReward(set)
    }
    function handleIsOpen(set){
        setIsOpen(set)
    } 
    return(
        <div>

<div class="present">
	<div class="name">
        {(reward != null) ?
        <div>
        {(reward != null && (reward.type == "coin" || reward.type == "luckyDrawChance")) ?
            <img src={reward.image}/>:
            <div></div>
        }
        <h1 id="textReward">{reward.amount + " " +reward.type}</h1>
                
        </div>:
        <h1 id="textReward">No reward</h1>
    }</div>
    <div class="rotate-container">
		<div class="bottom"></div>
		<div class="front"></div>
		<div class="left"></div>
		<div class="back"></div>
		<div class="right"></div>
		
		<div class="lid">
			<div class="lid-top"></div>
			<div class="lid-front"></div>
			<div class="lid-left"></div>
			<div class="lid-back"></div>
			<div class="lid-right"></div>
		</div>
	</div>
	
	
</div>

        </div>
    )    
}

window.addEventListener('DOMContentLoaded', function() {
    const domContainer = document.querySelector("#popUpReward");
    const root = ReactDOM.createRoot(domContainer);

    root.render(
            <RewardPopUp/>
    )
   
})