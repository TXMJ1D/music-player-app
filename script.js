//this is for logic

const songTitle = document.getElementById("songTitle");
const playBtn =  document.querySelector(".playBtn");
const prevBtn = document.querySelector(".prevBtn");
const skipBtn = document.querySelector(".skipBtn");

let isPlaying = false;

playBtn.addEventListener("click", () => {
    if (isPlaying === false){
        playBtn.textContent = "⏸";
        songTitle.textContent = "Playing";
        isPlaying = true;
    }else{
        playBtn.textContent = "▶︎";
        songTitle.textContent = "Paused";
        isPlaying = false;
    }
});

skipBtn.addEventListener("click", () => {
    songTitle.textContent = "Next Song"
});

prevBtn.addEventListener("click", () => {
    songTitle.textContent = "Previous Song"
});