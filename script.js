//this is for logic

const songTitle = document.getElementById("songTitle");
const playBtn =  document.querySelector(".playBtn");
const prevBtn = document.querySelector(".prevBtn");
const skipBtn = document.querySelector(".skipBtn");

//audio
const audio = new Audio();


let songs = [
    {title: "Her Old Friends",artist: "PartynextDoor", file: "assets/music/herOldFriends.mp3"},
    {title: "Lights Out", artist: "Chris Brown", file: "assets/music/herOldFriends.mp3"},
    {title: "Brand New", artist: "Drake", file: "assets/music/herOldFriends.mp3"},
    {title: "Come Through", artist: "H.E.R", file: "assets/music/herOldFriends.mp3"},
    {title: "Slow Down", artist: "Chase Atlantic", file: "assets/music/herOldFriends.mp3"}
]

let isPlaying = false;
let currentSongIndex = 0;
let duration = 0;

audio.addEventListener("loadedmetadata", () => {
    duration = audio.duration;
    console.log(duration)
});

function loadSong(){
    songTitle.textContent = songs[currentSongIndex].title;
    audio.src = songs[currentSongIndex].file;
}
loadSong();

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