console.log("Spotify");

//Intialize the variable
let songIndex = 0;
let audioELemnt = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
myProgressBar.value = 0;
let gif = document.getElementById("gif");
let current = document.getElementById("current");
let totalTime = document.getElementById("totalTime");
let masterSongName = document.getElementById("masterSongName");
let songItem = Array.from(document.getElementsByClassName("songItem"));
let songs = [
  {
    songName: "BGM 1",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songName: "BGM 2",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
  },
  {
    songName: "BGM 3",
    filePath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
  },
  {
    songName: "BGM 4",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
  },
  {
    songName: "BGM 5",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
  },
  {
    songName: "BGM 6",
    filePath: "songs/6.mp3",
    coverPath: "covers/6.jpg",
  },
  {
    songName: "BGM 7",
    filePath: "songs/7.mp3",
    coverPath: "covers/7.jpg",
  },
  {
    songName: "BGM 8",
    filePath: "songs/8.mp3",
    coverPath: "covers/8.jpg",
  },
  {
    songName: "BGM 9",
    filePath: "songs/9.mp3",
    coverPath: "covers/9.jpg",
  },
];
songItem.forEach((element, i) => {
  let audio = document.createElement("audio");
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByTagName("span")[0].innerText = songs[i].songName;
  audio.src = songs[i].filePath;
  audio.addEventListener("loadedmetadata", () => {
    let min = parseInt(audio.duration / 60);
    let sec = parseInt(audio.duration % 60);
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    element.getElementsByClassName("timestamp")[0].innerHTML =
      `${min}:${sec} ` +
      element.getElementsByClassName("timestamp")[0].innerHTML;
  });
});
// audioELemnt.play();
 const cTime = ()=>{
    let cmin = parseInt(audioELemnt.currentTime / 60);
    let csec = parseInt(audioELemnt.currentTime % 60);
    cmin = cmin < 10 ? "0" + cmin : cmin;
    csec = csec < 10 ? "0" + csec : csec;
    current.innerHTML = `${cmin}:${csec}`;
 }
 const dTime = ()=>{
  audioELemnt.addEventListener("loadedmetadata", () => {
    let min = parseInt(audioELemnt.duration / 60);
    let sec = parseInt(audioELemnt.duration % 60);
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    totalTime.innerHTML = `${min}:${sec} `
  });
 }
//Hadle play pause click
masterPlay.addEventListener("click", () => {
    if(songIndex==0)
        songIndex =1;
  if (audioELemnt.paused || audioELemnt.currentTime <= 0) {
    audioELemnt.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
    cTime();
    dTime();
    let min = parseInt(audioELemnt.duration / 60);
    let sec = parseInt(audioELemnt.duration % 60);
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    totalTime.innerHTML = `${min}:${sec} `
    masterSongName.innerText = songs[songIndex-1].songName;
    makeallplays();
    let temp = document.getElementById(songIndex);
    temp.classList.remove('fa-circle-play');
    temp.classList.add('fa-circle-pause');
  } else {
    audioELemnt.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
    let temp = document.getElementById(songIndex);
    temp.classList.remove('fa-circle-pause');
    temp.classList.add('fa-circle-play');
  }
});

//Listen to Event
audioELemnt.addEventListener("timeupdate", () => {
  //update Seek Bar
  let progress = parseInt(
    (audioELemnt.currentTime / audioELemnt.duration) * 100
  );
  myProgressBar.value = progress;
  let cmin = parseInt(audioELemnt.currentTime / 60);
  let csec = parseInt(audioELemnt.currentTime % 60);
  cmin = cmin < 10 ? "0" + cmin : cmin;
  csec = csec < 10 ? "0" + csec : csec;
  current.innerHTML = `${cmin}:${csec}`;
  if(audioELemnt.currentTime == audioELemnt.duration){
    document.getElementById('next').click();
  }
});

myProgressBar.addEventListener("change", () => {
  audioELemnt.currentTime = (myProgressBar.value * audioELemnt.duration) / 100;
});

const makeallplays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.add("fa-circle-play");
      element.classList.remove("fa-circle-pause");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.parentElement.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-circle-play")) {
        makeallplays();
         songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        // console.log(new URL(audioELemnt.src).pathname+'hi '+`http://127.0.0.1:5500/songs/${songIndex}.mp3`);
        if(new URL(audioELemnt.src).pathname ==`/songs/${songIndex}.mp3`){
            masterPlay.click();
        }
        else{
        audioELemnt.src = `songs/${songIndex}.mp3`;
        masterPlay.click();
    }
      } else {
        if (e.target.classList.contains("fa-circle-pause")) {
          e.target.classList.remove("fa-circle-pause");
          e.target.classList.add("fa-circle-play");
          masterPlay.click()
;        }
      }
    });
  }
);

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex==1){
        songIndex = songs.length;
        console.log(songIndex);
    }else{
        songIndex -= 1;
    }
    audioELemnt.src = `songs/${songIndex}.mp3`
    masterPlay.click();
})
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex== songs.length){
        songIndex = 0;
    }else{
        songIndex += 1;
    }
    audioELemnt.src = `songs/${songIndex}.mp3`
    masterPlay.click();
})

document.addEventListener('keydown', event => {
    if (event.code === 'Space') {
        event.preventDefault();
      masterPlay.click();
    }
    if (event.code == 'MediaPlayPause') {
        console.log('Play/Pause'); 
        masterPlay.click();
      }
  })