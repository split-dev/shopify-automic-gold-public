//      
/* globals $ */

                       

              
                  
                   
                            
                    
                        
                    
                     
 

document.addEventListener('DOMContentLoaded', function(){
    "use strict";

    var $videoSlider = $("[data-js='video-slider']");
    if ($videoSlider.length) {
        initializeVideoSlider($videoSlider);
    }

    var $slider = $("[data-js='slider']");
    if ($slider.length) {
        initializeMixedSlider($slider);
    }
});

function initializeMixedSlider($slider        ) {
    var $thumbnails         = $("[data-js='slider-thumbnail']");
    var $currentThumbnail         ;

    var slider = new Swipe($slider[0], {
        startSlide: 0,
        draggable: true,
        autoRestart: true,
        continuous: true,
        disableScroll: false,
        stopPropagation: true,
        callback: function (index) {
            showThumbnail(index);
        }
    });
    window.slider = slider;

    $('[data-js="slider-prev"]').click(function prevButtonClicked() {
        slider.prev();
    });
    $('[data-js="slider-next"]').click(function nextButtonClicked() {
        slider.next();
    });

    $thumbnails.click(function(event       ) {
        var index         = parseInt($(event.currentTarget).attr('data-js-index'));
        slider.slide(index);
    });

    showThumbnail(0);

    function showThumbnail(index        ) {
        if ($currentThumbnail) {
            $currentThumbnail.removeClass('active');
        }
        $thumbnails.eq(index).addClass('active');
        $currentThumbnail = $thumbnails.eq(index);
    }
}

function initializeVideoSlider($videoSlider) {
    var videos          = [];
    var currentIndex = 0;

    $videoSlider.find('video').each(function (index        , element         ) {
        var $video = $(element);
        var videoEl = $video[0];
        var $source = $video.find('source');

        if (!(videoEl instanceof HTMLMediaElement)) {
            throw new Error('Something went wrong with Slider initialization');
        }

        videos.push({
            index: index,
            $video: $video,
            video: videoEl,
            $source: $source,
            source: $source[0],
            loaded: false,
            loading: false
        });
    });

    loadVideo(0, function () {
        loadVideo(1);
    });

    var slider = new Swipe($videoSlider[0], {
        startSlide: 0,
        auto: 5000,
        draggable: true,
        autoRestart: true,
        continuous: true,
        disableScroll: false,
        stopPropagation: true,
        callback: function (index) {
            currentIndex = index;

            // Play video or load and play it
            if (!videos[index].loaded) {
                loadVideo(index, function() {
                    playVideo(index);
                });
            } else {
                playVideo(index);
            }

            // Pause previous video
            if (index === 0) {
                pauseVideo(videos.length - 1);
            } else {
                pauseVideo(index - 1);
            }

            // Pre-load next video
            var nextVideo = videos[index + 1];
            if (nextVideo) {
                if (!nextVideo.loaded && !nextVideo.loading) {
                    loadVideo(index + 1);
                }
            }
        }
    });

    $('[data-js="slider-prev"]').click(function prevButtonClicked() {
        slider.prev();
    });
    $('[data-js="slider-next"]').click(function nextButtonClicked() {
        slider.next();
    });

    function pauseVideo(index        ) {
        if (!videos[index]) throw Error('No video with index ' + index);

        var video = videos[index];
        if (video.loaded) {
            video.video.pause();
        }
    }

    function playVideo(index        ) {
        if (!videos[index]) throw Error('No video with index ' + index);

        var video = videos[index];
        if (video.loaded) {
            video.video.play();
        }
    }

    function loadVideo(index        , callback             ) {
        if (!videos[index]) throw Error('No video with index ' + index);

        var video = videos[index];

        video.loading = true;

        var videoUrl = video.$source.attr('data-src');
        video.$source.attr('src', videoUrl);

        function videoLoadedCallback() {
            video.loaded = true;
            video.loading = false;

            if (callback) {
                callback();
            }

            if (currentIndex === index) {
                video.video.play();
            }

            video.$video[0].removeEventListener('canplaythrough', videoLoadedCallback);

            console.log('Loaded video ' + index);
        }

        video.video.addEventListener('canplaythrough', videoLoadedCallback);
        video.video.load();

        console.log('Loading video ' + index);
    }
}
