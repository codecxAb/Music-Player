const songs = [
    {
        title: "Song 1",
        artist: "Artist 1",
        url: 'Songs/Song1.mp3',
        thumbnail: 'https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?q=80&w=2400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        title: "Song 2",
        artist: "Artist 2",
        url: 'Songs/Song2.mp3',
        thumbnail: 'https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?q=80&w=2400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        title: "Song 3",
        artist: "Artist 3",
        url: 'Songs/Song3.mp3',
        thumbnail: 'https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?q=80&w=2400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
];

const title = document.querySelector('#title');
const artist = document.querySelector("#artist");
const thumbnail = document.querySelector('#thumbnail');
const currentTimeEl = document.querySelector('#currentTime');
const totalTimeEl = document.querySelector('#totalTime');
const repeat = document.querySelector('#repeat');
const previous = document.querySelector('#previous');
const playEl = document.querySelector('#play');
const next = document.querySelector('#next');
const shuffle = document.querySelector('#shuffle');
const playlist = document.querySelector('#playlist');

songs.forEach((song, index) => {
    const songBtn = document.createElement('button');
    const songEl = document.createElement('audio');
    songBtn.className = 'py-2 flex justify-between w-full hover:font-bold';
    songEl.src = song.url;

    playlist.appendChild(songEl);

    songEl.addEventListener('loadedmetadata', () => {
        const { duration } = songEl;
        const time = formatTime(duration);
        songBtn.innerHTML = `${song.title} <span> ${time} </span>`;
        playlist.appendChild(songBtn);
    });
});


const audioElements = document.querySelectorAll('audio');
const progressElements = document.querySelectorAll('#progress');
const currentTimeElements = document.querySelectorAll('#currentTime');
const totalTimeElements = document.querySelectorAll('#totalTime');
let currentAudioIndex = 0;

function updateProgress() {
    const currentAudio = audioElements[currentAudioIndex];
    const progress = progressElements[currentAudioIndex];
    const currentTimeEl = currentTimeElements[currentAudioIndex];
    const totalTimeEl = totalTimeElements[currentAudioIndex];

    const { currentTime, duration } = currentAudio;
    const progressPercentage = (currentTime / duration) * 100;
    progress.style.width = `${progressPercentage}%`;

    currentTimeEl.textContent = formatTime(currentTime);
    totalTimeEl.textContent = formatTime(duration);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

audioElements.forEach((audioElement, index) => {
    audioElement.addEventListener('loadedmetadata', () => {
        const { duration } = audioElement;
        const time = formatTime(duration);
        totalTimeElements[index].textContent = time;
    });
});

function playAudio(index) {
    audioElements[index].play();
    currentAudioIndex = index;
    setInterval(updateProgress, 1000);
}

function pauseAudio() {
    audioElements[currentAudioIndex].pause();
    clearInterval(updateProgress);
}

// Example usage:
playEl.addEventListener('click', () => {
    const currentAudioElement = audioElements[currentAudioIndex];

    if (currentAudioElement.paused) {
        playAudio(currentAudioIndex);
        playEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-player-pause" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" /><path d="M14 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" /></svg>`;
    } else {
        pauseAudio();
        playEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-player-play" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 4v16l13 -8z" /></svg>`;
    }
});


function playNext() {
    pauseAudio();
    currentAudioIndex = (currentAudioIndex + 1) % audioElements.length;
    playAudio(currentAudioIndex);
}

function playPrevious() {
    pauseAudio();
    currentAudioIndex = (currentAudioIndex - 1 + audioElements.length) % audioElements.length;
    playAudio(currentAudioIndex);
}

next.addEventListener('click', playNext);
previous.addEventListener('click', playPrevious);
