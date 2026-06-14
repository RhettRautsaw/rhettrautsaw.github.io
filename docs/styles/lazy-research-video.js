(function () {
  function initLazyVideos() {
    var videos = document.querySelectorAll("video[data-lazy-video]:not([data-lazy-video-ready])");

    if (!videos.length) {
      return;
    }

    function loadVideo(video) {
      var sources = video.querySelectorAll("source[data-src]");

      sources.forEach(function (source) {
        if (!source.src) {
          source.src = source.dataset.src;
        }
      });

      if (!video.dataset.loaded) {
        video.load();
        video.dataset.loaded = "true";
      }
    }

    function playVideo(video) {
      loadVideo(video);

      var playPromise = video.play();

      if (playPromise) {
        playPromise.catch(function () {
          /* Browsers may block playback if muting or visibility rules change. */
        });
      }
    }

    function syncVisibleVideos() {
      videos.forEach(function (video) {
        var rect = video.getBoundingClientRect();
        var isVisible = rect.bottom > 0 && rect.top < window.innerHeight;

        if (isVisible && !document.hidden) {
          playVideo(video);
        } else {
          video.pause();
        }
      });
    }

    videos.forEach(function (video) {
      video.dataset.lazyVideoReady = "true";
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = "none";
    });

    var ticking = false;

    function requestSync() {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(function () {
        syncVisibleVideos();
        ticking = false;
      });
    }

    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);
    syncVisibleVideos();

    window.setInterval(syncVisibleVideos, 750);

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        videos.forEach(function (video) {
          video.pause();
        });
      } else {
        syncVisibleVideos();
      }
    });
  }

  if (window.document$) {
    window.document$.subscribe(initLazyVideos);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLazyVideos);
  } else {
    initLazyVideos();
  }
})();
