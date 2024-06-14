const playButton = document.querySelector("#PlayAndPause .play");
const pauseButton = document.querySelector("#PlayAndPause .pause");
const song = new Audio("Playlist/Niykee Heaton - Bad Intentions ft. Migos.mp3");
let isPlayed = false;
const playmusic = () => {
    song.play();
    isPlayed = true;
    pauseButton.style.display = "inline-block";
    playButton.style.display = "none";
};
const pausemusic = () => {
    song.pause();
    isPlayed = false;
    pauseButton.style.display = "none";
    playButton.style.display = "inline-block";
};
playButton.addEventListener('click', () => {
    isPlayed ? pausemusic() : playmusic();
})
pauseButton.addEventListener('click', () => {
    isPlayed ? pausemusic() : playmusic();
})
//play and pause funtionality end
const Progress = document.querySelector(".progress");
const SeekBar = document.querySelector(".SeekBar");
song.ontimeupdate = function () {
    Progress.style.width = Math.floor(song.currentTime * 100 / song.duration) + "%";
    if (Progress.style.width === "100%") {
        isPlayed ? pausemusic() : playmusic(); //if width is 100% during non repeat stop button activate
    }
}
SeekBar.onclick = function (e) {
    song.currentTime = ((e.offsetX / SeekBar.offsetWidth) * song.duration);
    Progress.style.transform = `scale(1.02)`;
}
//seekbar functionality end
const prevButton = document.querySelector(".backward");
const nextButton = document.querySelector(".forward");
const title = document.querySelector("#songName");
const Artist = document.querySelector("#Artist");
const images = document.querySelector("img");
const playerContainer = document.querySelector(".PlayerContainer");
const music = [
    {
        name: "song-1",
        title: "Faded",
        Artist: "Alan Walker",
        image: "img-1",
        background: "#5F8481",
    },
    {
        name: "song-2",
        title: "Attention",
        Artist: "Charlie Puth",
        image: "img-2",
        background: "#2B220F",
    },
    {
        name: "song-3",
        title: "Fe!n",
        Artist: "Travis Scott",
        image: "img-3",
        background: "#B77C63",
    },
    {
        name: "song-4",
        title: "3:59 AM",
        Artist: "DIVINE",
        image: "img-4",
        background: "#812ABF",
    },
    {
        name: "song-5",
        title: "StarBoy",
        Artist: "ft.Daft Punk",
        image: "img-5",
        background: "#F32F8A",
    },
    {
        name: "song-6",
        title: "Left and Right",
        Artist: "Charlie Puth, ft.BTS",
        image: "img-6",
        background: "#5A5A5A",
    },
];
const loadSongs = (music) => {
    title.textContent = music.title;
    Artist.textContent = music.Artist;
    song.src = "Playlist/" + music.name + ".mp3";
    images.src = "assets/" + music.image + ".jpg";
    playerContainer.style.backgroundColor = music.background;
}
musicIndex = 0;
const nextSong = () => {
    musicIndex = (musicIndex + 1) % music.length;
    loadSongs(music[musicIndex]);
    playmusic();
}
const prevSong = () => {
    musicIndex = (musicIndex - 1 + music.length) % music.length;
    loadSongs(music[musicIndex]);
    playmusic();
}
const firstSong = () => {
    loadSongs(music[0]);
    musicIndex = 0;
}
firstSong();
nextButton.addEventListener('click', nextSong);
prevButton.addEventListener('click', prevSong);
//music and their content change functionality end
document.addEventListener('keyup', function (event) {
    if (event.key === 'ArrowLeft') {
        prevSong();
    } else if (event.key === 'ArrowRight') {
        nextSong();
    }
    else if (event.key === ' ' || e.code === 'Space') {
        isPlayed ? pausemusic() : playmusic();
    }
    else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        vol.oninput();
    }
    else if (event.keyCode === "77") {

    }
});
//keyboard functionality end
const repeat = document.querySelector(".fa-repeat");
let isrepeat = false;
const repeatfunc = () => {
    if (!isrepeat) {
        isrepeat = true;
        song.addEventListener("ended", nextSong);
        repeat.style.color = "#0dc4f7";
    }
    else {
        isrepeat = false;
        song.removeEventListener('ended', nextSong);
        repeat.style.color = "#040f16";
    }
}
repeat.addEventListener('click', repeatfunc);
// repeatition of songs end 
const vol = document.querySelector("input");
let number = document.querySelector(".volumeValue");
const progressBar = document.querySelector("progress");
vol.oninput = () => {
    progressBar.value = vol.value;
    song.volume = vol.value / 100;
    number.innerHTML = vol.value;
}
//volume progress bar end
const volBtn = document.querySelector(".fa-volume-high");
let ismuted = false;
const mutedfunc = () => {
    if (!ismuted) {
        ismuted = true;
        song.volume = 0;
        volBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
        volBtn.style.color = "#0dc4f7";
    }
    else {
        ismuted = false;
        song.volume = vol.value / 100;
        volBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
        volBtn.style.color = "#040f16";
    }
}
volBtn.addEventListener('click', mutedfunc);
//mute function audio end
//volume keyboard functionality
document.addEventListener("keydown", (event) => {
    if (event.keyCode === 38) {
        // Increase volume
        const newVolume = Math.min(100, parseInt(vol.value) + 5);
        progressBar.value = vol.value;
        vol.value = newVolume;
        song.volume = newVolume / 100;
        number.innerHTML = newVolume;
    }
    else if (event.keyCode === 40) {
        //decrease volume
        const newVolume = Math.min(100, parseInt(vol.value) - 5);
        progressBar.value = vol.value;
        vol.value = newVolume;
        song.volume = newVolume / 100;
        number.innerHTML = newVolume;
    }
});
//volume funtionality end
const replaybtn = document.querySelector(".fa-rotate-right");
let isreplay = false;
const replay = () => {
if (!isreplay) {
    isreplay = true;
    song.addEventListener("ended", playmusic);
    replaybtn.style.color = "#0dc4f7";
}
else {
    isreplay = false;
    song.removeEventListener("ended", playmusic);
    replaybtn.style.color = "#040f16";
}
}
replaybtn.addEventListener("click", replay);
// replay functionality end