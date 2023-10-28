var currentAudioIndex = 0;
        var audioList = [
            document.getElementById('audio1'),
            document.getElementById('audio2'),
            document.getElementById('audio3'),
            document.getElementById('audio4'),
            document.getElementById('audio5'),
             document.getElementById('audio6'),
             document.getElementById('audio7'),
             document.getElementById('audio8'),
             //document.getElementById('audio9'),
            // document.getElementById('audio10'),
            // document.getElementById('audio11'),
            // document.getElementById('audio12')
        ];

        var playButtonGlobal = document.getElementById('playButtonGlobal');
        var currentTimeDisplay = document.getElementById('currentTime');
        var totalTimeDisplay = document.getElementById('totalTime');
        var seekBar = document.getElementById('seekBar');
        var activeAudio = null;
        updateDurationsOnLoad();

        function toggleAudio(audioId, playButtonId) {
            var audio = document.getElementById(audioId);
            var playButton = document.getElementById(playButtonId);

            if (activeAudio && activeAudio !== audio) {
                activeAudio.pause();
                activeAudio.currentTime = 0;
                var playButtonGlobalId = activeAudio.id.replace('audio', 'playButton');
                document.getElementById(playButtonGlobalId).classList.remove('fa-pause');
                document.getElementById(playButtonGlobalId).classList.add('fa-play');

                var item = document.querySelector(`[data-audio-id="${activeAudio.id}"]`);
                var itemPlayButton = item.querySelector('.play').firstElementChild;
                itemPlayButton.classList.remove('fa-pause');
                itemPlayButton.classList.add('fa-play');
            }

            if (audio.paused) {
                audio.currentTime = audio.currentTime || 0;
                audio.play();
                playButton.classList.remove('fa-play');
                playButton.classList.add('fa-pause');
                playButtonGlobal.classList.remove('fa-play');
                playButtonGlobal.classList.add('fa-pause');
                activeAudio = audio;

                updateCurrentlyPlayingSong(audioId);
                updateNextSongInfo();
                var item = document.querySelector(`[data-audio-id="${audio.id}"]`);
                var itemPlayButton = item.querySelector('.play').firstElementChild;
                itemPlayButton.classList.remove('fa-play');
                itemPlayButton.classList.add('fa-pause');

                
                    //nextAudio();
            } else {
                audio.pause();
                activeAudio.currentTime = audio.currentTime;
                playButton.classList.remove('fa-pause');
                playButton.classList.add('fa-play');
                playButtonGlobal.classList.remove('fa-pause');
                playButtonGlobal.classList.add('fa-play');
                activeAudio = null;

                var item = document.querySelector(`[data-audio-id="${audio.id}"]`);
                var itemPlayButton = item.querySelector('.play').firstElementChild;
                itemPlayButton.classList.remove('fa-pause');
                itemPlayButton.classList.add('fa-play');
            }
        }

        function stopAudio() {
            if (activeAudio) {
                activeAudio.pause();
                activeAudio.currentTime = 0; 
            }
        }

        function toggleGlobalAudio() {
            if (activeAudio) {
                toggleAudio(activeAudio.id, activeAudio.id.replace('audio', 'playButton'));
            } else {
                var audio = audioList[currentAudioIndex];
                toggleAudio(audio.id, audio.id.replace('audio', 'playButton'));
            }
        }

        function updateSeekBar() {
            if (activeAudio) {
                var currentTime = activeAudio.currentTime;
                var duration = activeAudio.duration;

                currentTimeDisplay.textContent = formatTime(currentTime);
                totalTimeDisplay.textContent = formatTime(duration);

                seekBar.value = (currentTime / duration) * 100;

                if (activeAudio.ended) {
                    nextAudio();
                }
            }
        }

        function formatTime(time) {
            var minutes = Math.floor(time / 60);
            var seconds = Math.floor(time % 60);
            return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        }

        function seekAudio() {
            if (activeAudio) {
                var duration = activeAudio.duration;
                var seekTime = (seekBar.value / 100) * duration;
                activeAudio.currentTime = seekTime;
            }
        }

        function nextAudio() {
            if (activeAudio) {
                activeAudio.pause();
                activeAudio.currentTime = 0;
                var playButtonGlobalId = activeAudio.id.replace('audio', 'playButton');
                document.getElementById(playButtonGlobalId).classList.remove('fa-pause');
                document.getElementById(playButtonGlobalId).classList.add('fa-play');
                resetSeekBar();
            }

            if (isShuffling) {
        var currentIndex = currentAudioIndex;
        while (currentIndex === currentAudioIndex) {
            currentIndex = Math.floor(Math.random() * audioList.length);
        }
        currentAudioIndex = currentIndex;
    } else {
        
        currentAudioIndex = (currentAudioIndex + 1) % audioList.length;
    }

            //currentAudioIndex = (currentAudioIndex + 1) % audioList.length;
            activeAudio = audioList[currentAudioIndex];
            activeAudio.play();
            playButtonGlobal.classList.remove('fa-play');
            playButtonGlobal.classList.add('fa-pause');

            updateCurrentlyPlayingSong(activeAudio.id);
            updateNextSongInfo();
            updateItemPlayButtons(activeAudio.id); 
            resetLoopButtonColor();          
            resetLikeButton();
        }

        function previousAudio() {
            if (activeAudio) {
                activeAudio.pause();
                activeAudio.currentTime = 0;
                var playButtonGlobalId = activeAudio.id.replace('audio', 'playButton');
                document.getElementById(playButtonGlobalId).classList.remove('fa-pause');
                document.getElementById(playButtonGlobalId).classList.add('fa-play');
                resetSeekBar();
            }


            if (isShuffling) {
        var currentIndex = currentAudioIndex;
        while (currentIndex === currentAudioIndex) {
            currentIndex = Math.floor(Math.random() * audioList.length);
        }
        currentAudioIndex = currentIndex;
    } else {
        currentAudioIndex = (currentAudioIndex + 1) % audioList.length;
    }

            activeAudio = audioList[currentAudioIndex];
            activeAudio.play();
            playButtonGlobal.classList.remove('fa-play');
            playButtonGlobal.classList.add('fa-pause');

            updateCurrentlyPlayingSong(activeAudio.id);
            updateNextSongInfo(); 
            updateItemPlayButtons(activeAudio.id);
            resetLoopButtonColor();
            resetLikeButton();
        }


        function resetSeekBar() {
            currentTimeDisplay.textContent = '0:00';
            seekBar.value = 0;
        }

        function updateCurrentSongDetails(title, description, imageUrl) {
            var currentSongTitle = document.getElementById('currentSongTitle');
            var currentSongDescription = document.getElementById('currentSongDescription');
            var currentSongImage = document.getElementById('currentSongImage');

            currentSongTitle.textContent = title;
            currentSongDescription.textContent = description;
            currentSongDescription.style.color = '#888';
            currentSongImage.src = imageUrl;

        }

        function updateCurrentlyPlayingSong(audioId) {
            var audio = document.getElementById(audioId);
            var title = audio.parentElement.querySelector('h4').textContent;
            var description = audio.parentElement.querySelector('p').textContent;
            var imageUrl = audio.parentElement.querySelector('img').src;
            updateCurrentSongDetails(title, description, imageUrl);
        }

        setInterval(updateSeekBar, 500);

        // Function to toggle the heart icon
        // function toggleHeart(icon) {
        //     icon.classList.toggle('far'); 
        //     icon.classList.toggle('fas');
        // }

        function updateItemPlayButtons(activeAudioId) {
    var itemCards = document.querySelectorAll('.item');
    itemCards.forEach(function (item) {
        var audioId = item.getAttribute('data-audio-id');
        var playButton = item.querySelector('.play').firstElementChild;
        if (audioId === activeAudioId) {
            playButton.classList.remove('fa-play');
            playButton.classList.add('fa-pause');
        } else {
            playButton.classList.remove('fa-pause');
            playButton.classList.add('fa-play');
        }
    });

    var playButtonGlobalId = activeAudioId.replace('audio', 'playButton');
    var globalPlayButton = document.getElementById(playButtonGlobalId);
    if (globalPlayButton) {
        globalPlayButton.classList.remove('fa-play');
        globalPlayButton.classList.add('fa-pause');
    }
}


function updateDurationsOnLoad() {
    audioList.forEach(function (audio) {
       audio.addEventListener('loadedmetadata', function () {
            var audioId = audio.id;
            var item = document.querySelector(`[data-audio-id="${audioId}"]`);
            var durationDisplay = item.querySelector('.duration');
            durationDisplay.textContent = formatTime(audio.duration);
        });
    });
}


function adjustSound() {
    var soundSlider = document.getElementById('soundSlider');
    var soundIcon = document.getElementById('soundIcon');
    if (activeAudio) {
        var volume = soundSlider.value / 100;
        activeAudio.volume = volume;

        volume = Math.max(0, Math.min(1, volume));

        for (var i = 0; i < audioList.length; i++) {
            audioList[i].volume = volume;
        }

        
        if (volume === 0) {
            soundIcon.classList.remove('fas', 'fa-volume-up');
            soundIcon.classList.add('fas', 'fa-volume-mute');
        } else if (volume <= 0.5) {
            soundIcon.classList.remove('fas', 'fa-volume-mute');
            soundIcon.classList.remove('fas', 'fa-volume-up');
            soundIcon.classList.add('fas', 'fa-volume-down');
        } else {
            soundIcon.classList.remove('fas', 'fa-volume-mute');
            soundIcon.classList.remove('fas', 'fa-volume-down');
            soundIcon.classList.add('fas', 'fa-volume-up');
        }
    }
}

var soundSliderValue = 100; 
var isMuted = false; 

function toggleMute() {
    var soundSlider = document.getElementById('soundSlider');
    var soundIcon = document.getElementById('soundIcon');
    
    if (activeAudio) {
        var volume = soundSlider.value / 100;
        if (isMuted) {
           
            isMuted = false;
            activeAudio.volume = soundSliderValue / 100;
            soundSlider.value = soundSliderValue;
            soundIcon.classList.remove('fas', 'fa-volume-mute');
            soundIcon.classList.add('fas', 'fa-volume-up');
        } else {
            
            isMuted = true;
            soundSliderValue = soundSlider.value; 
            activeAudio.volume = 0;
            soundSlider.value = 0; 
            soundIcon.classList.remove('fas', 'fa-volume-up');
            soundIcon.classList.add('fas', 'fa-volume-mute');
        }
    }
}

function playAudio(audioElement) {
    activeAudio = audioElement;

    if (isMuted) {
        
        audioElement.volume = 0;
    } else {
        audioElement.volume = soundSliderValue / 100;
    }

    audioElement.play();
}





function updateNextSongInfo() {
    var nextAudioIndex;


    if (isShuffling) {
        var currentIndex = currentAudioIndex;
        while (currentIndex === currentAudioIndex) {
            currentIndex = Math.floor(Math.random() * audioList.length);
        }
        nextAudioIndex = currentIndex;
    } else {
        nextAudioIndex = (currentAudioIndex + 1) % audioList.length;
    }


    var nextAudioElement = audioList[nextAudioIndex];
    var nextSongTitle = nextAudioElement.parentElement.querySelector('h4').textContent;
    var nextSongDescription = nextAudioElement.parentElement.querySelector('p').textContent;
    var nextSongImage = nextAudioElement.parentElement.querySelector('img').src;

    var nextSongTitleElement = document.getElementById('nextSongTitle');
    var nextSongDescriptionElement = document.getElementById('nextSongDescription');
    var nextSongImageElement = document.getElementById('nextSongImage');

    nextSongTitleElement.textContent = nextSongTitle;
    nextSongDescriptionElement.textContent = nextSongDescription;
    nextSongDescriptionElement.style.color = '#888';
    nextSongImageElement.src = nextSongImage;
}



document.addEventListener('keydown', function(event) {
            if (event.keyCode === 32) {
                event.preventDefault();

                toggleGlobalAudio();
            }
        });



document.addEventListener('keydown', function(event) {
        if (event.keyCode === 37) {
            
            previousAudio();
        } else if (event.keyCode === 39) {
            nextAudio();
        } else if (event.keyCode === 40 || event.keyCode === 38) {
            event.preventDefault(); 
            adjustSoundKeyboard(event);
        }
});

var soundSlider = document.getElementById('soundSlider');
var soundIcon = document.getElementById('soundIcon');

function adjustSoundKeyboard(event) {
        var volume = soundSlider.value / 100;

        if (event.keyCode === 40) { 
            volume -= 0.05; 
        } else if (event.keyCode === 38) { 
            volume += 0.05; 
        }

        volume = Math.max(0, Math.min(1, volume));

        for (var i = 0; i < audioList.length; i++) {
            audioList[i].volume = volume;
        }

        soundSlider.value = volume * 100;
        if (volume === 0) {
            soundIcon.classList.remove('fas', 'fa-volume-up');
            soundIcon.classList.add('fas', 'fa-volume-mute');
        } else if (volume <= 0.5) {
            soundIcon.classList.remove('fas', 'fa-volume-mute');
            soundIcon.classList.remove('fas', 'fa-volume-up');
            soundIcon.classList.add('fas', 'fa-volume-down');
        } else {
            soundIcon.classList.remove('fas', 'fa-volume-mute');
            soundIcon.classList.remove('fas', 'fa-volume-down');
            soundIcon.classList.add('fas', 'fa-volume-up');
        }
    }

var isLiked = false;

function toggleLike() {
    var likeIcon = document.getElementById('likeIcon');

    isLiked = !isLiked;

    if (isLiked) {
        likeIcon.classList.remove('far', 'fa-heart');
        likeIcon.classList.add('fas', 'fa-heart');
    } else {
        likeIcon.classList.remove('fas', 'fa-heart');
        likeIcon.classList.add('far', 'fa-heart');
    }
}

function resetLikeButton() {
    var likeIcon = document.getElementById('likeIcon');
    isLiked = false; 
    likeIcon.classList.remove('fas', 'fa-heart');
    likeIcon.classList.add('far', 'fa-heart');
}




    var isLooping = false;

function toggleLoop() {
  var loopIcon = document.getElementById('loopIcon');
  isLooping = !isLooping; 

  if (isLooping) {
    loopIcon.classList.add('looping');
    activeAudio.loop = true; 
  } else {
    loopIcon.classList.remove('looping');
    activeAudio.loop = false; 
  }
}

function resetLoopButtonColor() {
  var loopIcon = document.getElementById('loopIcon');
  isLooping = false;
  loopIcon.classList.remove('looping');
}



activeAudio.addEventListener('ended', function () {
   if (isLooping) {
     activeAudio.currentTime = 0;
     activeAudio.play();
   }
 });


var isShuffling = false;

function toggleShuffle() {
        var shuffleIcon = document.getElementById('shuffleIcon');
        isShuffling = !isShuffling; 

        if (isShuffling) {
            shuffleIcon.classList.add('shuffling');
            shuffleIcon.classList.remove('fa-random');
            shuffleIcon.classList.add('fa-random');
            shuffleAudioList(); 
            currentAudioIndex = 0; 
            nextAudio(); 
            updateNextSongInfo();
        } else {
            shuffleIcon.classList.remove('shuffling');
            shuffleIcon.classList.remove('fa-random');
            shuffleIcon.classList.add('fa-random');
            resetAudioListOrder(); 
        }
    }


function shuffleAudioList() {
    var originalAudioList = audioList.slice();

    for (var i = audioList.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [audioList[i], audioList[j]] = [audioList[j], audioList[i]];
    }

}

function resetAudioListOrder() {
    audioList = audioList.sort(function (a, b) {
        return originalAudioList.indexOf(a) - originalAudioList.indexOf(b);
    });

    currentAudioIndex = audioList.indexOf(activeAudio);
}
