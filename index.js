
// get player name
// var playerName = prompt("Welcome\nEnter Your Name");




// soundmode check starts here
function soundFunc()
{
var sound = document.getElementById("sound-btn");
    if(sound.value=="ON")
    {
        localStorage.setItem("soundis",0);
        document.getElementById("soundImg").src = "mute.png";
        document.getElementById("sound-btn").style.background= "#FF0000";
        sound.value = "OFF";

    }
    else if(sound.value=="OFF")
    {
        localStorage.setItem("soundis",1);
        document.getElementById("soundImg").src = "sound.png";
        document.getElementById("sound-btn").style.background= "#39FF14";
        sound.value = "ON";
    }
}
// soundmode check ends here

// hintmode check starts here
function hintFunc()
{
var hint = document.getElementById("hint-btn");
    if(hint.value=="ON")
    {
        localStorage.setItem("hintis",0);
        document.getElementById("hint-btn").style.background= "#FF0000";
        hint.value = "OFF";

    }
    else if(hint.value=="OFF")
    {
        localStorage.setItem("hintis",1);
        document.getElementById("hint-btn").style.background= "#FFFF00";
        hint.value = "ON";
    }
}
// soundmode check ends here





// play fucnction starts here

function sendData () {
    var data = document.getElementById("username").value;
    localStorage.setItem("username", data);
    window.open("gamepage.html");
    // console.log(localStorage.getItem("username"));

}
var playerName=localStorage.getItem("username");
var soundMode=localStorage.getItem("soundis");
var hintMode=localStorage.getItem("hintis");

if(hintMode==0)
{
    document.getElementById("h1").style.display="none";
    document.getElementById("h2").style.display="none";
    document.getElementById("h3").style.display="none";
    document.getElementById("h4").style.display="none";
}


playerName=playerName.toUpperCase()
if(playerName==""){
    document.querySelector(".player-name h6").innerText="UNKNOWN";  
}
else{
    document.querySelector(".player-name h6").innerText=playerName;
}

function waitforme(ms){
    return new Promise( resolve => {
        setTimeout(()=> {resolve('')},ms );
    }
        
    )
}


// play onclick
async function gameStart()
{
    document.querySelector(".play-btn").style.display="none";
    document.querySelector(".turn h6").style.color="Yellow";

    if(playerName==""){
        document.querySelector(".player-name h6").innerText="UNKNOWN";  
    }
    else{
        document.querySelector(".player-name h6").innerText=playerName;
    }

    var i,j,lastLevel=20;
    var compArr=[];
    var currentLevel = 1;
    var random, delay=1000;

    for(i=1;i<=lastLevel;i++) 
    {
        document.querySelector(".turn h6").innerText="Computer";
        document.querySelector(".turn h6").style.color="Yellow";
        document.querySelector(".level h6").innerText="level "+currentLevel; 
        await waitforme(1000); //delay befor each level starts

        if(i%2==0){delay=delay-50;}

        // computer turn
        for(j=1;j<=currentLevel;j++)
            {
                random = Math.random();
                random = random*4;
                random = Math.floor(random)+1;  
                compArr[j] = random;
                console.log(compArr[j]+" ");
                document.querySelector(".btn"+compArr[j]).classList.add("btn-highlight"+compArr[j]);
                
                if(soundMode==1)
                {
                var audio = new Audio('audioCue.mp3');
                audio.play();
                }

                await waitforme(delay);
                document.querySelector(".btn"+compArr[j]).classList.remove("btn-highlight"+compArr[j]);
                await waitforme(delay);
    
            }
        
        // playerturn
        document.querySelector(".turn h6").innerText="Your Turn";
        document.querySelector(".turn h6").style.color="#39FF14";
        console.log("step1");  
        var responseTrigger,responseValue;
        
        for(j=1;j<=currentLevel;j++)
            {
                responseTrigger=0;
                while(responseTrigger==0)
                {
                    await waitforme(10);

                    document.querySelector(".btn1").addEventListener ("click", responseFunction1, false);
                    async function responseFunction1() 
                    {
                        responseValue=1;
                        responseTrigger=9;
                        document.querySelector(".btn1").classList.add("btn-pressed1");
                        await waitforme(200);
                        document.querySelector(".btn1").classList.remove("btn-pressed1");   
                    }

                    document.querySelector(".btn2").addEventListener ("click", responseFunction2, false);
                    async function responseFunction2() 
                    {
                        responseValue=2;
                        responseTrigger=9;
                        document.querySelector(".btn2").classList.add("btn-pressed2");
                        await waitforme(200);
                        document.querySelector(".btn2").classList.remove("btn-pressed2");
                    }

                    document.querySelector(".btn3").addEventListener ("click", responseFunction3, false);
                    async function responseFunction3() 
                    {
                        responseValue=3;
                        responseTrigger=9;
                        document.querySelector(".btn3").classList.add("btn-pressed3");
                        await waitforme(200);
                        document.querySelector(".btn3").classList.remove("btn-pressed3");
                    }

                    document.querySelector(".btn4").addEventListener ("click", responseFunction4, false);
                    async function responseFunction4() 
                    {
                        responseValue=4;
                        responseTrigger=9;
                        document.querySelector(".btn4").classList.add("btn-pressed4");
                        await waitforme(200);
                        document.querySelector(".btn4").classList.remove("btn-pressed4");
                    }
                }
                if(responseValue!=compArr[j])
                    {
                        document.querySelector(".player-name h6").innerText="You Lost";
                        document.querySelector(".score-card").innerText="Last Score: "+currentLevel;
                        document.querySelector(".play-btn").innerHTML="RESTART";
                        document.querySelector(".play-btn").style.display="inline";
                        if(soundMode==1)
                        {
                        var audio = new Audio('audioError.mp3');
                        }
                        audio.play();
                        gameOver();
                    }
                    // console.log("response is: "+responseValue);
            }
        
        currentLevel=currentLevel+1;
        console.log(compArr);

    }

}


