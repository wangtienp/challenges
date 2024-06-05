const video = document.querySelector('video')
const volume = document.querySelector(`input[name='volume']`)
const playPause = document.querySelector('.play-pause')
const volumeIcon = document.querySelector('.fa-icons.volume')
const miniPlayerButton = document.querySelector('.mini-player')
const theaterButton = document.querySelector('.theater-mode')
const player = document.querySelector('.player')
const videoPlayer = document.querySelector('.video-player')
const fullScreenButton = document.querySelector('.fullscreen')
const playbackButton = document.querySelector('.speed-button')
const speed = document.querySelector('.speed')
const controller = document.querySelector('.player__controls')
const currentTime = document.querySelector('.current-time')
const totalTime = document.querySelector('.total-time')
const progress = document.querySelector('.progress')
const progressBar = document.querySelector('.progress__filled')

video.controls = false
//keydown
document.addEventListener('keydown', (e) => {
    e.preventDefault()
    handleControllerShow()
    switch (e.key.toLowerCase()) {
        case 'k':
        case ' ':
            togglePlayPause()
            break
        case 'm':
            toggleMute()
            break
        case 'i':
            toggleMiniPlayer()
            break
        case 't':
            toggleTheater()
            break
        case 'f':
            toggleFullScreen()
            break
        case 'arrowright':
            skip(5)
            break;
        case 'arrowleft':
            skip(-5)
            break;
        case 'arrowup':
            controlVolume(0.05)
            break;
        case 'arrowdown':
            controlVolume(-0.05)
            break;

    }
    resetTimer()
})
video.addEventListener('mousedown', togglePlayPause)
video.addEventListener('dblclick', toggleFullScreen)

//volume controller
const min = volume.min
const max = volume.max
const value = volume.value

volume.style.background = `linear-gradient(to right, red 0%, red ${(value - min) / (max - min) * 100}%, #DEE2E6 ${(value - min) / (max - min) * 100}%, #DEE2E6 100%)`
volume.oninput = function () {
    this.style.background = `linear-gradient(to right, red 0%, red ${(this.value - this.min) / (this.max - this.min) * 100}%, #DEE2E6 ${(this.value - this.min) / (this.max - this.min) * 100}%, #DEE2E6 100%)`
};
volume.addEventListener('input', (e) => {
    volume.value = e.target.value
    video.volume = volume.value
    video.muted = volume.value === '0'


})
volumeIcon.addEventListener('click', toggleMute)
video.addEventListener('volumechange', () => {
    volume.value = video.volume
    if (video.muted || video.volume === 0) {
        volumeIcon.className = 'fa-solid fa-volume-xmark fa-icons volume'
        volume.value = '0'
        volume.style.background = `linear-gradient(to right, red 0%, red ${(volume.value - volume.min) / (volume.max - volume.min) * 100}%, #DEE2E6 ${(volume.value - volume.min) / (volume.max - volume.min) * 100}%, #DEE2E6 100%)`
    }
    else {
        volume.style.background = `linear-gradient(to right, red 0%, red ${(volume.value - volume.min) / (volume.max - volume.min) * 100}%, #DEE2E6 ${(volume.value - volume.min) / (volume.max - volume.min) * 100}%, #DEE2E6 100%)`
        if (video.volume < '0.5') volumeIcon.className = 'fa-solid fa-volume-low fa-icons volume'
        else volumeIcon.className = 'fa-solid fa-volume-high fa-icons volume'
    }
})
function controlVolume(value) {
    video.volume += value
}

function toggleMute() {
    video.muted = !video.muted
}
//play pause
playPause.addEventListener('click', togglePlayPause)
function togglePlayPause() {
    if (video.paused) {
        video.play()
        playPause.className = 'fa-solid fa-pause fa-icons play-pause'
    } else {
        video.pause()
        playPause.className = 'fa-solid fa-play fa-icons play-pause'
    }
}

//mini player
miniPlayerButton.addEventListener('click', toggleMiniPlayer)
video.addEventListener('enterpictureinpicture', () => {
    video.classList.add('miniplayer')
})
function toggleMiniPlayer() {
    if (video.classList.contains('miniplayer')) {
        video.classList.remove('miniplayer')
        document.exitPictureInPicture()
    }
    video.requestPictureInPicture()
}

//theater
theaterButton.addEventListener('click', toggleTheater)
function toggleTheater() {
    player.classList.toggle('theater')
    if (player.classList.contains('theater')) {
        theaterButton.className = 'fa-solid fa-compress fa-icons theater-mode'
    } else
        theaterButton.className = 'fa-solid fa-expand fa-icons theater-mode'
}

//full screen
fullScreenButton.addEventListener('click', toggleFullScreen)
function toggleFullScreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen()
        fullScreenButton.className = 'fa-solid fa-maximize fa-icons fullscreen'
    } else {
        videoPlayer.requestFullscreen()
        fullScreenButton.className = 'fa-solid fa-minimize fa-icons fullscreen'
    }
}


//speed
playbackButton.addEventListener('click', controlPlayBack)
function controlPlayBack() {
    let videoPlayback = Number(speed.textContent)
    if (videoPlayback >= 2) videoPlayback = 0.25
    else videoPlayback += 0.25
    video.playbackRate = videoPlayback
    speed.textContent = videoPlayback
    console.log(video.playbackRate)
}
// skip time function
function skip(time) {
    video.currentTime += time
}
//duration
video.addEventListener('loadeddata', () =>
    totalTime.textContent = formatDuration(video.duration))
video.addEventListener('timeupdate', () => {
    currentTime.textContent = formatDuration(video.currentTime)
})
function formatDuration(time) {
    const seconds = Math.floor(time % 60)
    const minutes = Math.floor(time / 60) % 60
    const hours = Math.floor(time / 3600)

    if (hours == 0) {
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    } else {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
}

//timeline scrubbing
video.addEventListener('timeupdate', handleProgress)
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${percent}%`
}
let mousedown = false
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

function scrub(e) {
    console.log(mousedown, e.offsetX, progress.offsetWidth)
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// active or not active (mousemove)
let cursorVisible = true;
let idleTimeout;


function handleControllerCollapse() {
    video.style.cursor = 'none'
    controller.style.display = 'none'
    cursorVisible = false
}
function handleControllerShow() {
    video.style.cursor = 'auto'
    controller.style.display = 'block'
    cursorVisible = true
}
function resetTimer() {
    if (idleTimeout) clearTimeout(idleTimeout)
    if (!cursorVisible) handleControllerShow()
    idleTimeout = setTimeout(handleControllerCollapse, 5000)
}
video.addEventListener('mousemove', resetTimer)
resetTimer()
