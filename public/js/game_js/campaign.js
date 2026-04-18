var isLocalhost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
var STORAGE_API_HOST = isLocalhost ? 'http://localhost:4000' : 'https://ades-host-server.herokuapp.com';

var accessToken = localStorage.getItem('accessToken');
var refreshToken = localStorage.getItem('refreshToken');

import { Background } from './background.js';
import {
    BatEnemy,
    MonsterEnemy,
    InsectEnemy,
    PlantEnemy,
    SpiderEnemy,
} from './enemies.js';



export async function verifyCampaignData(stage){
    const totalNumOfStages = await getTotalNumOfStages();
    if(stage<=0 || stage > totalNumOfStages || isNaN(stage)){
        alert('Invalid stage!')
        window.location.href='/home'
    }
    return fetch(`${STORAGE_API_HOST}/campaign?stage=${stage}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + accessToken + " " + refreshToken,
        }
    })    
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            if(json.error){
                window.location.href='/home'
            }else if(json.result.locked){
                
                console.log(stage)
                if(+stage === 1){
                    return [unlockStage(stage), totalNumOfStages]
                    
                }else{
                    alert("You have not unlocked this stage yet!")
                    window.location.href='/campaign'
                }
                
            }
            return [json.result, totalNumOfStages];
        })
        .catch((error) => console.log(error))
}

export async function getStageData(stage){
    stage = parseInt(stage);
    return fetch(`${STORAGE_API_HOST}/campaignStorage?stage=${stage}`)
        .then((response) => response.json())
        .then((json) => {
            return json.result;
        })
}

export async function getUserLevel(){
    const url = new URL(`/player/level`, STORAGE_API_HOST);
    
        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken + ' ' + refreshToken,
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                if(response.error) return false
                else return response.result
            })
            .catch((error) => console.log(error.message));
}

export async function getEquippedItems(){
    const url = new URL(`/game/equippedItems`, STORAGE_API_HOST);
    
        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken + ' ' + refreshToken,
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                console.log(response.data); // here is the data returned back
                if (response.errMsg) {
                    return response.errMsg;
                } else {
                    return response.data;
                }
            })
            .catch((error) => console.log(error.message));
}

async function getTotalNumOfStages(){
    return fetch(`${STORAGE_API_HOST}/campaignStorage/totalNumOfStages`)
        .then((response) => response.json())
        .then((json) => parseInt(json.result.count))
}

export async function unlockStage(stage){
    stage = parseInt(stage)
    return fetch(`${STORAGE_API_HOST}/campaign`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + accessToken + " " + refreshToken,
        },
        body: JSON.stringify({
            "stage": stage
        })
    })
        .then((response) => response.json())
        .then((json) => {
            if(json.result){
                if(json.result.message == 'New stage unlocked' && stage == 1) {
                    json.result = {
                        stage_level: 1,
                        obj_one: '0',
                        obj_three: '0',
                        obj_two: '0',
                        completed: '0'
                    }
                    return json.result
                }
            }   
            
        })
}

export class Campaign {
    
    constructor(game, userStageData, totalNumOfStages){
        this.game = game;
        this.stage = userStageData.stage_level;
        this.isLastStage = this.stage == totalNumOfStages
        this.obj_one = +userStageData.obj_one == 1 ? true : false;
        this.obj_two = +userStageData.obj_two == 1 ? true : false;
        this.obj_three = +userStageData.obj_three == 1 ? true : false;
        this.completed = +userStageData.completed == 1 ? true : false;
        this.props;
    }

    setStagePlace(){
        if(this.stage <= 11){
            this.game.place = 'Beach'
            this.game.background = new Background(this.game);
        }
    }

    setStageEnemies(){
        const stageEnemies = [
            [   // stage 1 enemies
                new MonsterEnemy(this.game, 5, 0.5),
            ],
            [   // stage 2 enemies
                new MonsterEnemy(this.game, 5, 0.8),
            ],
            [   // stage 3 enemies
                new BatEnemy(this.game, 7, 0.3),
                new MonsterEnemy(this.game, 7, 0.7),
            ],
            [   // stage 4 enemies
                new BatEnemy(this.game, 10, 0.4),
                new MonsterEnemy(this.game, 5, 0.7),
                new PlantEnemy(this.game,10, 0.2)
            ],
            [   // stage 5 enemies
                new BatEnemy(this.game, 10, 0.5),
                new MonsterEnemy(this.game, 5, 0.7),
                new PlantEnemy(this.game, 15, 0.5)
            ],
            [   // stage 6 enemies
                new BatEnemy(this.game, 10, 0.6),
                new MonsterEnemy(this.game, 10, 0.8),
                new PlantEnemy(this.game, 15, 0.7)
            ],
            [   // stage 7 enemies
                new BatEnemy(this.game, 15, 0.7),
                new MonsterEnemy(this.game, 10, 0.8),
                new PlantEnemy(this.game, 15, 0.8)
            ],
            [   // stage 8 enemies
                new BatEnemy(this.game, 15, 0.7),
                new MonsterEnemy(this.game, 10, 0.8),
                new PlantEnemy(this.game, 15, 0.8),
                new InsectEnemy(this.game, 10, 0.5)
            ],
            [   // stage 8 enemies
                new BatEnemy(this.game, 15, 0.7),
                new MonsterEnemy(this.game, 15, 0.8),
                new PlantEnemy(this.game, 20, 0.8),
                new InsectEnemy(this.game, 10, 0.6)
            ],
            [   // stage 9 enemies
                new BatEnemy(this.game, 15, 0.8),
                new MonsterEnemy(this.game, 15, 0.8),
                new PlantEnemy(this.game, 20, 0.8),
                new InsectEnemy(this.game, 15, 0.75)
            ],
            [   // stage 10 enemies
                new BatEnemy(this.game, 15, 0.8),
                new MonsterEnemy(this.game, 15, 0.9),
                new PlantEnemy(this.game, 15, 0.9),
                new InsectEnemy(this.game, 25, 0.8),
                new SpiderEnemy(this.game, 20, 0.5)
            ],
            [   // stage 11 enemies
                new BatEnemy(this.game, 15, 0.9),
                new MonsterEnemy(this.game, 15, 0.9),
                new PlantEnemy(this.game, 25, 0.9),
                new InsectEnemy(this.game, 20, 0.9),
                new SpiderEnemy(this.game, 30, 0.7)
            ]     
        ]

        this.game.stageEnemies = stageEnemies[this.stage-1]
    }

    processFirstTimeData(completedObj){
        let firstTimeData = []
        if(!this.completed) 
            firstTimeData.push({name: "Completion", coins: this.props.completion_coins, xp: this.props.completion_xp})
        if(!this.obj_one && completedObj.o1)
            firstTimeData.push({name: "Objective 1", coins: this.props.objective1_coins, xp: this.props.objective1_xp})
        if(!this.obj_two && completedObj.o2)
            firstTimeData.push({name: "Objective 2", coins: this.props.objective2_coins, xp: this.props.objective2_xp})
        if(!this.obj_three && completedObj.o3)
            firstTimeData.push({name: "Objective 3", coins: this.props.objective3_coins, xp: this.props.objective3_xp})
        
        return firstTimeData;
    }

    processCompletedObjectives(completedObj){
        return {
            o1: this.obj_one || completedObj.o1,
            o2: this.obj_two || completedObj.o2,
            o3: this.obj_three || completedObj.o3
        }
    }

    async updateStageCompletion(obj){
        return fetch(`${STORAGE_API_HOST}/campaign`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + accessToken + " " + refreshToken,
            },
            body: JSON.stringify({
                "stage": this.stage,
                "obj_one": obj.o1 ? 1 : 0,
                "obj_two": obj.o2 ? 1 : 0,
                "obj_three": obj.o3 ? 1 : 0,
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('updateStageCompletion')
                console.log(json)
            })
    }
    

    async updateObjectivesDone(obj){
        return fetch(`${STORAGE_API_HOST}/campaign`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + accessToken + " " + refreshToken,
            },
            body: JSON.stringify({
                "stage": this.stage,
                "obj_one": this.obj_one || obj.o1 ? 1 : 0,
                "obj_two": this.obj_one || obj.o2 ? 1 : 0,
                "obj_three": this.obj_one || obj.o3 ? 1 : 0,
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('updateStageObjectives')
                console.log(json)
            })
    }
}