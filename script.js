const songs = [
    { title: "Let It Go", file: "songs/let-it-go.mp3", cover: "covers/let-it-go.webp" },
    { title: "Believer", file: "songs/believer.mp3", cover: "covers/believer.webp" },
    { title: "Unstoppable", file: "songs/unstoppable.mp3", cover: "covers/unstoppable.webp" },
    { title: "Dandelions", file: "songs/dandelions.mp3", cover: "covers/dandelions.webp" },
    { title: "The Night We Met", file: "songs/the-night_we_met.mp3", cover: "covers/the-night_we_met.webp" }
];

let songIndex = 0;
let isShuffle = false;
let isRepeat = false;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const volumeSlider = document.getElementById("volume");
const playlistEl = document.getElementById("playlist");
const coverImg = document.getElementById("cover");
const repeatBtn = document.getElementById("repeat");
const shuffleBtn = document.getElementById("shuffle");
const themeToggle = document.getElementById("themeToggle");

function loadSong(index) {
    const song = songs[index];
    title.textContent = song.title;
    audio.src = song.file;
    coverImg.src = song.cover;
}

function playSong() {
    audio.play();
    playBtn.textContent = "⏸️";
}

function pauseSong() {
    audio.pause();
    playBtn.textContent = "▶️";
}

function togglePlay() {
    audio.paused ? playSong() : pauseSong();
}

function nextSong() {
    if (isShuffle) {
        songIndex = Math.floor(Math.random() * songs.length);
    } else {
        songIndex = (songIndex + 1) % songs.length;
    }
    loadSong(songIndex);
    playSong();
}

function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
    playSong();
}

audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        progress.value = (audio.currentTime / audio.duration) * 100;
    }
});

progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

volumeSlider.value = 0.8;
audio.volume = 0.8;

volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
});

// Repeat and Shuffle Buttons
repeatBtn.addEventListener("click", () => {
    isRepeat = !isRepeat;
    repeatBtn.textContent = `🔁 Repeat: ${isRepeat ? "On" : "Off"}`;
});

shuffleBtn.addEventListener("click", () => {
    isShuffle = !isShuffle;
    shuffleBtn.textContent = `🔀 Shuffle: ${isShuffle ? "On" : "Off"}`;
});

// Auto play next or repeat
audio.addEventListener("ended", () => {
    isRepeat ? playSong() : nextSong();
});

// Playlist
function populatePlaylist() {
    songs.forEach((song, index) => {
        const li = document.createElement("li");
        li.textContent = song.title;
        li.addEventListener("click", () => {
            songIndex = index;
            loadSong(songIndex);
            playSong();
        });
        playlistEl.appendChild(li);
    });
}

// Theme toggle
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

// Keyboard Shortcuts
document.addEventListener("keydown", (e) => {
    switch (e.code) {
        case "Space":
            e.preventDefault();
            togglePlay();
            break;
        case "ArrowRight":
            nextSong();
            break;
        case "ArrowLeft":
            prevSong();
            break;
    }
});

// Load
loadSong(songIndex);
populatePlaylist();

// Play/Pause/Next/Prev Listeners
playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

const themeToggleBtn = document.getElementById("themeToggle");

themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
        themeToggleBtn.textContent = "🌞 Light Mode";
    } else {
        themeToggleBtn.textContent = "🌓 Dark Mode";
    }
});
