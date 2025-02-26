console.log('Hello, World!');
var currentsong = new Audio();
let mp3s;
let curFolder;
function formatTime(seconds) {
    seconds = Math.floor(seconds);
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    
    // Ensuring two-digit format
    let formattedMinutes = String(minutes).padStart(2, '0');
    let formattedSeconds = String(remainingSeconds).padStart(2, '0');
    
    return `${formattedMinutes}:${formattedSeconds}`;
}



async function getSongs(folder) {
    curFolder = folder;
    let a = await fetch(`http://127.0.0.1:3000/${folder}/`);
    let responce = await a.text();
    let div = document.createElement('div');
    div.innerHTML = responce;
    let as = div.getElementsByTagName('a');
    document.getElementById
    mp3s = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.includes('.mp3')) {
           mp3s.push(element.href.split(`/${folder}/`)[1]);
        }
    }
   

    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    songUL.innerHTML = "";
    for (const mp3 of mp3s) {
        songUL.innerHTML = songUL.innerHTML + `
         <li>
                            <div class="playnow cursorPointer">
                                <img class="invert" src="music.svg" alt="playnow">
                                <div class="songinfobar">
                                    <h3>${mp3.replaceAll("%20", " ")}</h3>
                                    <h4>${mp3.replaceAll("%20", " ")}</h4>
                                </div>
                                <div class="playbutton">
                                    <img class="musicPlay invert" src="playsong.svg" alt="play">
                                </div>
                            </div>
                        </li>
        `;
        
    }

    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(element => {
        let songName = element.querySelector(".songinfobar>h3").innerHTML.replaceAll("amp;", "");
        element.querySelector("div").addEventListener("click", e=>{
           playMusic(songName);
           play.src = 'paussong.svg';
           let playmusic = element.querySelector(".musicPlay");
            playmusic.src = 'paussong.svg';
            
        })
        
    });


}

const playMusic = (trake , pause = false)=>{
    currentsong.src = `/${curFolder}/` + trake

    if(!pause){

        currentsong.play();
    }
    document.querySelector(".songifo").innerHTML = trake; 
    document.querySelector(".songTime").innerHTML = "00.00"; 
}
async function main() {
    
    await getSongs("song/ncm");

    playMusic(mp3s[0].replaceAll("%20", " "), true);
    
    console.log(mp3s);
 
    play.addEventListener("click", ()=>{
        if (currentsong.paused) {
            currentsong.play();
            play.src = 'paussong.svg';
        }else{
            currentsong.pause();
            play.src = "playsong.svg";
            
           
        }
    })

    currentsong.addEventListener("timeupdate", ()=>{
        
        document.querySelector(".songTime").innerHTML = formatTime(currentsong.currentTime) + " / " + formatTime(currentsong.duration);
        document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";
    })
    

    document.querySelector(".playbartime").addEventListener("click", (e)=>{
        let percent =(e.offsetX / e.target.getBoundingClientRect().width
    ) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentsong.currentTime = (currentsong.duration / 100) * percent;
        console.log(e.offsetX , e.target.getBoundingClientRect().width);
    })
    previous.addEventListener("click", ()=>{
        console.log(currentsong.src);
        let index = mp3s.indexOf(currentsong.src.split(`/${curFolder}/`)[1]);
        // console.log(index);
        if(index-1 >= 0){
            playMusic(mp3s[index - 1].replaceAll('%20', ' '));
            play.src = 'paussong.svg';
        }
    })
    next.addEventListener("click", ()=>{
        let index = mp3s.indexOf(currentsong.src.split(`/${curFolder}/`)[1]);
        console.log(index);
        if(index+1 < mp3s.length){
            playMusic(mp3s[index + 1].replaceAll('%20', ' '));
            play.src = 'paussong.svg';
        }
    })



    Array.from(document.getElementsByClassName("card")).forEach((e)=>{
        e.addEventListener("click", async (item)=>{
            console.log(item.currentTarget.dataset.folder);
            curFolder = `song/${item.currentTarget.dataset.folder}`;
            mp3s = await getSongs(cur);
            console.log(mp3s);
        })
    })
    // console.log(mp3s);
    // var audio = new Audio(mp3s[0]);
    //     let duration = audio.duration;
    //     console.log(duration , audio.currentTime);
    // })
    
}

main();