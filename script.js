//this is for logic

const songTitle = document.getElementById("songTitle");
const playBtn =  document.querySelector(".playBtn");
const prevBtn = document.querySelector(".prevBtn");
const skipBtn = document.querySelector(".skipBtn");
const coverImage = document.querySelector(".coverImage");
// const progressBar = document.querySelector(".progressBar");
const progressFill = document.querySelector(".progressFill");
const shuffleBtn = document.querySelector(".shuffleBtn");
const loopBtn  = document.querySelector(".loopBtn");

//audio
const audio = new Audio();


let songs = [
    {title: "Her Old Friends",artist: "PartynextDoor", file: "assets/music/herOldFriends.mp3", cover: "assets/images/herOldFriends.jpg"},
    {title: "Lights Out", artist: "Chris Brown", file: "assets/music/lightsOut.mp3", cover: "assets/images/lightsOut.png"},
    {title: "Brand New", artist: "Drake", file: "assets/music/brandNew.mp3", cover: "assets/images/brandNew.jpg"},
    {title: "Come Through", artist: "H.E.R", file: "assets/music/comeThrough.mp3", cover: "assets/images/comeThrough2.png"},
    {title: "Slow Down", artist: "Chase Atlantic", file: "assets/music/slowDown.mp3", cover: "assets/images/slowDown.jpg"},
    {title: "Next To You", artist: "Bryson Tiller", file:"assets/music/nextToYou.mp3", cover:"assets/images/nextToYou.png"},
    {title: "Who? What!", artist: "Travis Scott", file: "assets/music/whoWhat.mp3", cover:"assets/images/whoWhat.png"}
];

let songsBackUp = [];
let songsShuffled = [];
let songsLooped = [];

//create backup tracklist of orginal
for (let i=0;i<songs.length;i++){
    songsBackUp.push(songs[i]);
}

let isShuffleClicked  = false;
let isLoopClicked = false;
let isPlaying = false;
let currentSongIndex = 0;
let duration = 0;

audio.addEventListener("loadedmetadata", () => {
    duration = audio.duration
    console.log(duration);
});

audio.addEventListener("timeupdate", () => {
    let currentDuration = audio.currentTime;
    let percentage = (currentDuration/duration) * 100;
    // progressBar.value = percentage;
    //gradient as song progresses
//     progressBar.style.background = `
//     linear-gradient(
//         to right,
//         rgba(239, 143, 26, 0.8) 0%,
//         rgba(239, 143, 26, 0.8) ${percentage}%,
//         rgba(61, 61, 60, 0.8) ${percentage}%,
//         rgba(61, 61, 60, 0.8) 100%
//     )
// `;
    progressFill.style.height = `${percentage}%`;
});

audio.addEventListener("ended", () => {
    currentSongIndex++
    if (currentSongIndex >= songs.length){
        currentSongIndex = 0;
    }
    loadSong();
    audio.play();
    playBtn.textContent = "⏸";
    isPlaying = true;
})

function loadSong(){
    songTitle.textContent = songs[currentSongIndex].title;
    audio.src = songs[currentSongIndex].file;
    coverImage.style.backgroundImage = `url(${songs[currentSongIndex].cover})`;
    console.log(coverImage);
    // progressBar.value = 0;
    progressFill.value = 0;
}
loadSong();

function shuffle(){
    let shuffleIndex = songs.length;

    for (i=0;i<songs.length;i++){
        songsShuffled.push(songs[i]);
    }

    while (shuffleIndex != 0){
        let randomIndex = Math.floor(Math.random() * shuffleIndex);
        shuffleIndex--;
        //swap current elements
        [songsShuffled[shuffleIndex], songsShuffled[randomIndex]] = [songsShuffled[randomIndex], songsShuffled[shuffleIndex]];
    }
}

function loop(){
    songsLooped.push(songs[currentSongIndex]);
    audio.loop = true;
}

loopBtn.addEventListener("click", () => {
    if (isLoopClicked === false){
        isLoopClicked = true;
        loop(songs);
        songs = songsLooped;
        loopBtn.style.outline = `2px solid white`;
    }
    else{
        isLoopClicked = false;
        audio.loop = true;
        songsLooped = [];
        loopBtn.style.outline = `none`;
        songs = songsBackUp;
    }
})

shuffleBtn.addEventListener("click", () => {
    if (isShuffleClicked === false){
        isShuffleClicked = true;
        shuffle(songs);
        songs = songsShuffled;
        shuffleBtn.style.outline = `2px solid white`;
    }
    else{
        songsShuffled = [];
        isShuffleClicked = false;
        shuffleBtn.style.outline = `none`;
        songs = songsBackUp;
    }
})

playBtn.addEventListener("click", () => {
    if (isPlaying === false){
        isPlaying = true;
        playBtn.textContent = "⏸";
        audio.play();
    }else{
        playBtn.textContent = "▶︎";
        isPlaying = false;
        audio.pause();
    }
});

skipBtn.addEventListener("click", () => {
    currentSongIndex += 1;

    if (currentSongIndex >= songs.length){
        currentSongIndex = 0;
    }

    audio.pause();
    isPlaying = false;
    playBtn.textContent = "▶︎";
    loadSong();

    if (isPlaying){
        audio.play();
    }
});

prevBtn.addEventListener("click", () => {
    currentSongIndex -= 1

    if (currentSongIndex < 0){
        currentSongIndex = songs.length-1;
    }

    audio.pause();
    isPlaying = false;
    playBtn.textContent = "▶︎";
    loadSong();

    if (isPlaying){
        audio.play();
    }
});