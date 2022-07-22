import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
import '../css/common.css'

const LOCAL_STORAGE_KEY = "videoplayer-current-time"; 

const iframe = document.querySelector('#vimeo-player');
const iframePlayer = new Player(iframe);

if (localStorage.getItem(LOCAL_STORAGE_KEY)) setPlayerTime(localStorage.getItem(LOCAL_STORAGE_KEY));

iframePlayer.on('timeupdate', throttle(onPlay, 1000) );

function onPlay ({seconds}){
    localStorage.setItem(LOCAL_STORAGE_KEY, seconds)
}

function setPlayerTime (seconds) {iframePlayer.setCurrentTime(seconds).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});}
