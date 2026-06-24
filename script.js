const videos = [
  {
    id: "3U__mW0iKho",
    type: "video",
    title: "surrealism in contemporary filmmaking",
    duration: "10:41",
    meta: "101 views | 2 months ago",
  },
  {
    id: "odH6Xc_2YsY",
    type: "video",
    title: "my turn / grayson fianna",
    duration: "3:45",
    meta: "109 views | 11 months ago",
  },
  {
    id: "Q2EdthWeMCs",
    type: "video",
    title: "manners @ the smell",
    duration: "15:02",
    meta: "40 views | 1 year ago",
  },
  {
    id: "AWH2tygu024",
    type: "video",
    title: "fratmouse @ the smell la",
    duration: "12:39",
    meta: "47 views | 1 year ago",
  },
  {
    id: "zV7f367FLyE",
    type: "video",
    title: "views from the top floor",
    duration: "0:54",
    meta: "77 views | 1 year ago",
  },
  {
    id: "I6B6vkl5sWI",
    type: "video",
    title: "sick new world",
    duration: "5:31",
    meta: "73 views | 3 years ago",
  },
  {
    id: "WKwUoYb79G8",
    type: "video",
    title: "check your messages ..",
    duration: "0:31",
    meta: "42 views | 3 years ago",
  },
  {
    id: "b_bZjIJNbs4",
    type: "video",
    title: "beautiful day but the man on my right shoulder had something to say,",
    duration: "2:24",
    meta: "25 views | 3 years ago",
  },
  {
    id: "kOBUS84-XoE",
    type: "video",
    title: "naked in la",
    duration: "2:10",
    meta: "37 views | 3 years ago",
  },
  {
    id: "j1R-8o0JGFg",
    type: "video",
    title: "the outside, respectively from an insider",
    duration: "2:38",
    meta: "69 views | 3 years ago",
  },
  {
    id: "fS7fcklnnuk",
    type: "video",
    title: "i'm awake but not breathing",
    duration: "2:33",
    meta: "51 views | 3 years ago",
  },
];

const list = document.querySelector("#video-list");
const musicTracks = [
  {
    title: "site-track.mp3",
    src: "assets/music/site-track.mp3",
  },
];
const audio = document.querySelector("[data-audio]");
const playButton = document.querySelector("[data-player-play]");
const stopButton = document.querySelector("[data-player-stop]");
const progress = document.querySelector("[data-progress]");
const seek = document.querySelector("[data-seek]");
const statusText = document.querySelector("[data-track-status]");
const timeText = document.querySelector("[data-track-time]");
const visualizer = document.querySelector("[data-visualizer]");
const visualizerContext = visualizer.getContext("2d");
let audioContext;
let analyser;
let sourceNode;
let animationFrame;
let visualizerTick = 0;
let currentTrackIndex = -1;

function youtubeUrl(video) {
  return video.type === "short"
    ? `https://www.youtube.com/shorts/${video.id}`
    : `https://www.youtube.com/watch?v=${video.id}`;
}

function embedUrl(video) {
  return `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1`;
}

function thumbUrl(video) {
  return `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
}

function previewSrcdoc(video) {
  const title = `${video.title}`.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
  return `
    <style>
      * { box-sizing: border-box; }
      body {
        margin: 0;
        display: grid;
        min-height: 100vh;
        place-items: center;
        background: #000;
        color: #fff;
        font-family: Arial, Helvetica, sans-serif;
      }
      img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.75;
      }
      a {
        position: relative;
        display: grid;
        width: 86px;
        height: 62px;
        place-items: center;
        border: 2px solid #fff;
        background: #0000ee;
        color: #fff;
        font: bold 18px Arial, Helvetica, sans-serif;
        text-decoration: none;
      }
      span {
        position: absolute;
        left: 8px;
        right: 8px;
        bottom: 8px;
        padding: 4px 6px;
        background: rgba(0, 0, 0, 0.8);
        font-size: 12px;
      }
    </style>
    <img src="${thumbUrl(video)}" alt="">
    <a href="${embedUrl(video)}" aria-label="play ${title}">PLAY</a>
    <span>${title}</span>
  `;
}

function renderVideos() {
  list.innerHTML = videos
    .map((video, index) => {
      const number = String(index + 1).padStart(2, "0");
      return `
        <article class="video-entry ${video.type}">
          <div class="video-title-row">
            <a class="video-title" href="${youtubeUrl(video)}" target="_blank" rel="noreferrer">
              ${number}. ${video.title}
            </a>
            <span class="video-meta">${video.duration} / ${video.meta}</span>
          </div>
          <div class="video-frame">
            <iframe
              title="${video.title}"
              srcdoc='${previewSrcdoc(video).replaceAll("'", "&#39;")}'
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen>
            </iframe>
            <div class="video-links">
              <a href="${youtubeUrl(video)}" target="_blank" rel="noreferrer">open on youtube</a>
              <a href="#videos">back to list</a>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

renderVideos();

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const wholeSeconds = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${wholeSeconds}`;
}

function drawIdleVisualizer() {
  const width = visualizer.width;
  const height = visualizer.height;
  visualizerTick += 0.035;
  visualizerContext.fillStyle = "#050505";
  visualizerContext.fillRect(0, 0, width, height);

  for (let y = 0; y < height; y += 4) {
    for (let x = 0; x < width; x += 4) {
      const wave =
        Math.sin(x * 0.08 + visualizerTick) +
        Math.cos(y * 0.09 - visualizerTick * 1.3) +
        Math.sin((x + y) * 0.045 + visualizerTick * 0.7);
      const shade = Math.floor(42 + wave * 28);
      visualizerContext.fillStyle = `rgb(0, ${Math.max(24, shade)}, ${Math.max(18, shade - 18)})`;
      visualizerContext.fillRect(x, y, 4, 4);
    }
  }

  visualizerContext.strokeStyle = "#00ff00";
  visualizerContext.beginPath();
  for (let x = 0; x < width; x += 6) {
    const y = height / 2 + Math.sin(x * 0.08 + visualizerTick * 4) * 18;
    if (x === 0) visualizerContext.moveTo(x, y);
    else visualizerContext.lineTo(x, y);
  }
  visualizerContext.stroke();
  animationFrame = requestAnimationFrame(drawIdleVisualizer);
}

function setupAudioGraph() {
  if (audioContext) return;
  audioContext = new AudioContext();
  analyser = audioContext.createAnalyser();
  analyser.fftSize = 128;
  sourceNode = audioContext.createMediaElementSource(audio);
  sourceNode.connect(analyser);
  analyser.connect(audioContext.destination);
}

function drawVisualizer() {
  const width = visualizer.width;
  const height = visualizer.height;
  const data = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(data);
  visualizerTick += 0.055;

  const energy = data.reduce((sum, value) => sum + value, 0) / data.length / 255;
  visualizerContext.fillStyle = "#050505";
  visualizerContext.fillRect(0, 0, width, height);

  for (let y = 0; y < height; y += 3) {
    for (let x = 0; x < width; x += 3) {
      const centerX = x - width / 2;
      const centerY = y - height / 2;
      const radius = Math.sqrt(centerX * centerX + centerY * centerY);
      const angle = Math.atan2(centerY, centerX);
      const band = data[Math.floor((radius / Math.max(width, height)) * data.length)] || 0;
      const pulse = Math.sin(radius * 0.14 - visualizerTick * 9 + band * 0.03);
      const swirl = Math.sin(angle * 6 + visualizerTick * 3);
      const value = Math.max(0, Math.min(255, 72 + band * 0.78 + pulse * 70 + swirl * 38));
      visualizerContext.fillStyle = `rgb(${Math.floor(value * 0.55)}, ${Math.floor(value)}, ${Math.floor(255 - value * 0.35)})`;
      visualizerContext.fillRect(x, y, 3, 3);
      visualizerContext.fillRect(width - x - 3, y, 3, 3);
    }
  }

  visualizerContext.strokeStyle = "#ffffff";
  visualizerContext.lineWidth = 1;
  for (let ring = 1; ring < 5; ring += 1) {
    visualizerContext.beginPath();
    visualizerContext.ellipse(
      width / 2,
      height / 2,
      ring * (18 + energy * 18),
      ring * (8 + energy * 7),
      visualizerTick + ring,
      0,
      Math.PI * 2
    );
    visualizerContext.stroke();
  }

  animationFrame = requestAnimationFrame(drawVisualizer);
}

function updateTime() {
  const percent = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
  progress.style.width = `${percent}%`;
  timeText.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
}

function pickRandomTrack() {
  if (musicTracks.length === 1) return 0;

  let nextIndex = currentTrackIndex;
  while (nextIndex === currentTrackIndex) {
    nextIndex = Math.floor(Math.random() * musicTracks.length);
  }
  return nextIndex;
}

function setTrack(index) {
  const track = musicTracks[index];
  currentTrackIndex = index;
  audio.src = track.src;
  audio.load();
  statusText.textContent = `ready: ${track.title}`;
  updateTime();
}

function currentTrackTitle() {
  return musicTracks[currentTrackIndex]?.title || "random track";
}

playButton.addEventListener("click", async () => {
  if (currentTrackIndex === -1) setTrack(pickRandomTrack());
  setupAudioGraph();
  await audioContext.resume();

  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

stopButton.addEventListener("click", () => {
  audio.pause();
  audio.currentTime = 0;
});

seek.addEventListener("click", (event) => {
  if (!audio.duration) return;
  const bounds = seek.getBoundingClientRect();
  const ratio = (event.clientX - bounds.left) / bounds.width;
  audio.currentTime = Math.max(0, Math.min(audio.duration, ratio * audio.duration));
});

audio.addEventListener("play", () => {
  playButton.textContent = "pause";
  statusText.textContent = `playing: ${currentTrackTitle()}`;
  cancelAnimationFrame(animationFrame);
  drawVisualizer();
});

audio.addEventListener("pause", () => {
  playButton.textContent = "play";
  statusText.textContent = audio.currentTime ? "paused" : `ready: ${currentTrackTitle()}`;
  cancelAnimationFrame(animationFrame);
  drawIdleVisualizer();
});

audio.addEventListener("ended", async () => {
  playButton.textContent = "play";
  setTrack(pickRandomTrack());
  statusText.textContent = `next: ${currentTrackTitle()}`;

  try {
    await audio.play();
  } catch {
    cancelAnimationFrame(animationFrame);
    drawIdleVisualizer();
  }
});

audio.addEventListener("error", () => {
  statusText.textContent = `missing: ${currentTrackTitle()}`;
  cancelAnimationFrame(animationFrame);
  drawIdleVisualizer();
});

audio.addEventListener("timeupdate", updateTime);
audio.addEventListener("loadedmetadata", updateTime);

setTrack(pickRandomTrack());
cancelAnimationFrame(animationFrame);
drawIdleVisualizer();
