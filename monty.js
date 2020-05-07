
//game values 
let winningDoor = 0, 
    reveal = 0,
    selection=0,
    remaining = 0,
    madeSelection=false,
    isGameOver = false, 
    possibleDoors = [1,2,3]; 
    secondSelection = false; 
    firstSelection=false; 

//UI
let UIgame = document.querySelector('.game'),
    startBtn = document.querySelector('.startBtn'),
    door1 = document.querySelector('.d1Btn'),
    door2 = document.querySelector('.d2Btn'),
    door3 = document.querySelector('.d3Btn'), 
    message = document.querySelector('#message'), 
    keepButton = document.querySelector(".keepBtn"), 
    switchButton = document.querySelector(".switchBtn"),
    allButStart = [door1, door2, door3, keepButton, switchButton];
     



//message function 
function setMessage(msg, color){
    message.textContent = msg
    message.style.color = color
}

//game over Function 
function gameOver(won, msg){
    let color; 
    won===true? color='green': color='red'; 
    setMessage(msg, color);
    isGameOver = true
    

}

//turn doors off and on 
function disableDoors(){
    door1.disabled=true; 
    door2.disabled=true; 
    door3.disabled=true; 
    }
    
function enableDoors(){
        door1.disabled=false; 
        door2.disabled=false; 
        door3.disabled=false;
    }


function disableAll(){
    allButStart.forEach(function(butt){
        butt.disabled=true; 
    })
}

//reveal cash
function revealCash(win){
    if(win===1){
        door1.innerHTML=`<img class="picture" src="cash.png"></img>`
    }else if(win===2){
        door2.innerHTML=`<img class="picture" src="cash.png"></img>`
    }else if(win===3){
        door3.innerHTML=`<img class="picture" src="cash.png"></img>`
    }
}

//reveal goat
function secondGoat(sel){
    if(sel===1){
        door1.innerHTML=`<img src="goat.png"></img>`
    }else if(sel===2){
        door2.innerHTML=`<img src="goat.png"></img>`
    }else if(sel===3){
        door3.innerHTML=`<img src="goat.png"></img>`
    }

}

//before start 
setMessage('Behind one door, CASH. Behind the other doors, GOATS. To begin, press "start game"')
document.querySelector('#keep-switch').style.visibility = 'hidden'; 
disableDoors(); 





//start game
UIgame.addEventListener('click', function(e){
    if(e.target.className ==='startBtn'){
        setMessage('The game has begun. pick a door.');
        selection=0;
        // hide "start game button"
        startBtn.style.visibility = 'hidden'; 

        //enable doors
        enableDoors(); 

    }
    if(firstSelection==false){
        //first guess
        door1.addEventListener('click',function(e){
            madeSelection=true;
            selection = 1 ;
        })
        door2.addEventListener('click',function(e){
            madeSelection=true;
            selection = 2 ;
            
        })
        door3.addEventListener('click',function(e){
            madeSelection=true;
            selection = 3 ;
            
        })
        firstSelection=true

}




    //after first selection is made 
    if (madeSelection==true){
        // turn off submit for the doors
        disableDoors();  


        //randomly generate winning door 
        
        winningDoor = Math.floor((Math.random()*3)+1);
        //reduce possibilities for the remaining dooors 
        let unselectedDoors = possibleDoors;

        let selectedIndex = possibleDoors.indexOf(selection)
        for(let i=0; i<possibleDoors.length; i++){
            if(i ===selectedIndex){
                possibleDoors.splice(selectedIndex,1)
            }
        }
        //reveal a losing door \/
 
             // if user selected losing door. there  is 1  door to reveal and the non revealed door is remaining

             let winningIndex = unselectedDoors.indexOf(winningDoor)
            if(winningDoor!=selection){
                for(let i=0; i<unselectedDoors.length; i++){
                    if(i ===winningIndex){
                        unselectedDoors.splice(winningIndex,1)
                    }
                }
                reveal=unselectedDoors[0]
                remaining=winningDoor
                ; 

                console.log(`reamining: ${remaining}, revealed:${reveal}, winning:${winningDoor}, selection:${selection} `)
            }else if (winningDoor===selection){    
                
           
                    
            // if user selected winning door. there are 2 doors left. pick a random door to reveal and the other one is reamining. 
            
            let posInd = Math.floor((Math.random()*2))
            
            reveal = unselectedDoors[posInd]
            revealInd = unselectedDoors.indexOf(reveal)

            for (let i=0; i<unselectedDoors.length; i++){
                if(i===revealInd){
                    unselectedDoors.splice(revealInd,1)
                }
            }remaining = unselectedDoors[0];

            console.log(`reamining: ${remaining}, revealed:${reveal}, winning:${winningDoor}, selection:${selection} `)

            }
        

        //inform user of reveal
        setMessage(`you have selected door ${selection}.\n \r
         there is a goat behind door ${reveal}. \n \r
         would you like to KEEP your selection of door ${selection}, or SWITCH your selection to ${remaining}`)

        //remove revealed button to do. change reveal image to goat 
        if(reveal===1){
            door1.innerHTML =`<img src="goat.png"></img>`
        }else if(reveal===2){
            door2.innerHTML =`<img src="goat.png"></img>`
        }else if(reveal===3){
            door3.innerHTML =`<img src="goat.png"></img>`
        }
        


        //create pop-up keep and siwtch buttons 
        document.querySelector('#keep-switch').style.visibility = 'visible'; 
        keepButton.value =  `keep door ${selection}`;
        switchButton.value = `switch to door ${remaining}`;

//there's a bug in the remaining !!


        //add event listener for keep and switch
        UIgame.addEventListener('mousedown',function(g){
                if (g.target.className==="switchBtn"){
                    selection=remaining;
                    secondSelection=true;
                    isGameOver=true; 
                    document.querySelector('#keep-switch').style.visibility = 'hidden';
                    keepButton.disabled=true; 
                    switchButton.disabled = true; 
                    setMessage('')
                  
                }
                else if(g.target.className==='keepBtn'){
                    isGameOver=true;
                    document.querySelector('#keep-switch').style.visibility = 'hidden';
                    secondSelection=true;
                    keepButton.disabled=true; 
                    switchButton.disabled = true; 
                    setMessage('')
                }

                                //add play again button 
                
                if (isGameOver===true){
                    disableDoors();
                    startBtn.style.visibility = 'visible';
                    startBtn.value = 'play again?';
                    document.querySelector('#keep-switch').style.visibility = 'hidden'; 
                    UIgame.addEventListener('mousedown',function(e){
                        if(e.target.className ==='startBtn'){
                            window.location.reload();
                        }
                    })

                    if(selection===winningDoor){
                        madeSelection=false;
                        gameOver(true, `you win the cash! it was behind door ${winningDoor}`)
                        revealCash(winningDoor); 

                    }else if (selection != winningDoor){
                        madeSelection=false;
                        gameOver(false, `you lose, the cash was behind door${winningDoor}`)
                        secondGoat(selection);
                    }
                    

                }
        
            });




       
    }

    

});
