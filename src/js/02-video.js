import Player from '@vimeo/player';

let localStorageKey = "videoplayer-current-time"; 

const iframe = document.querySelector('#vimeo-player');
const iframePlayer = new Player(iframe);

iframePlayer.on('timeupdate', onPlay );

iframePlayer.setCurrentTime(80).then(function(seconds) {
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
});

function onPlay ({seconds}){
    let currentTime = seconds
    let currentTimeJSON = JSON.stringify(currentTime)
    console.log(currentTimeJSON)

}


