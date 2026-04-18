export function TopInfo(props) {
    return (
        <div id="topInfo">
            <div id="playerInfo">
                <img src="./images/player.gif" alt="Running Dog" />
                <p>Attack + {props.equippedInfo[0].increasement}</p>
                <p>Life + {props.equippedInfo[3].increasement}</p>
            </div>
            <div id="playerEquip">
                <div class="row">
                    <div class="column">
                        <h5>Fireball</h5>
                        <img
                            src={props.equippedInfo[0].image}
                            alt="Fireball Image"
                        />
                    </div>
                    <div class="column">
                        <h5>Dive</h5>
                        <img
                            src={props.equippedInfo[1].image}
                            alt="Dive Image"
                        />
                    </div>
                </div>

                <div class="row">
                    <div class="column">
                        <h5>Roll</h5>
                        <img
                            src={props.equippedInfo[2].image}
                            alt="Roll Image"
                        />
                    </div>
                    <div class="column">
                        <h5>Shield</h5>
                        <img
                            src={props.equippedInfo[3].image}
                            alt="Shield Image"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
