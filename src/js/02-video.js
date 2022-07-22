import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

let localStorageKey = "videoplayer-current-time"; 

const iframe = document.querySelector('#vimeo-player');
const iframePlayer = new Player(iframe);

if (localStorage.getItem(localStorageKey)) setPlayerTime(localStorage.getItem(localStorageKey));

iframePlayer.on('timeupdate', throttle(onPlay, 1000) );

function onPlay ({seconds}){
    localStorage.setItem(localStorageKey, seconds)
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
