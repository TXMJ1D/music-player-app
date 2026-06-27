//this is for logic

const songTitle = document.getElementById("songTitle");
const playBtn =  document.querySelector(".playBtn");
const prevBtn = document.querySelector(".prevBtn");
const skipBtn = document.querySelector(".skipBtn");


let songs = [
    {title: "Her Old Friends",artist: "PartynextDoor"},
    {title: "Lights Out", artist: "Chris Brown"},
    {title: "Brand New", artist: "Drake"},
    {title: "Come Through", artist: "H.E.R"},
    {title: "Slow Down", artist: "Chase Atlantic"}
]

let isPlaying = false;
let currentSongIndex = 0;


playBtn.addEventListener("click", () => {
    if (isPlaying === false){
        playBtn.textContent = "⏸";
        // songTitle.textContent = "Playing";
        isPlaying = true;
    }else{
        playBtn.textContent = "▶︎";
        // songTitle.textContent = "Paused";
        isPlaying = false;
    }
});

skipBtn.addEventListener("click", () => {
    currentSongIndex += 1;
    if (currentSongIndex >= songs.length){
        currentSongIndex = 0;
    }
    songTitle.textContent = songs[currentSongIndex].title;
});

prevBtn.addEventListener("click", () => {
    currentSongIndex -= 1
    if (currentSongIndex < 0){
        currentSongIndex = songs.length-1;
    }
    songTitle.textContent = songs[currentSongIndex].title;
});