import './style.css';
import { songs } from './songs.js';

document.addEventListener('DOMContentLoaded', () => {
  const songList = document.getElementById('song-list');
  const albumArt = document.getElementById('album-art');
  const songTitle = document.getElementById('song-title');
  const songArtist = document.getElementById('song-artist');
  const playBtn = document.getElementById('play-btn');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const progressBar = document.getElementById('progress-bar');
  const audioSource = document.getElementById('audio-source');

  let currentSongIndex = 0;
  let isPlaying = false;

  function loadSong(song) {
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    albumArt.src = song.artwork;
    audioSource.src = song.url;
  }

  function renderPlaylist() {
    songs.forEach((song, index) => {
      const li = document.createElement('li');
      li.textContent = `${song.title} - ${song.artist}`;
      li.dataset.index = index;
      li.addEventListener('click', () => {
        currentSongIndex = index;
        loadSong(songs[currentSongIndex]);
        playSong();
      });
      songList.appendChild(li);
    });
  }

  function playSong() {
    isPlaying = true;
    playBtn.textContent = 'Pausa';
    audioSource.play();
  }

  function pauseSong() {
    isPlaying = false;
    playBtn.textContent = 'Play';
    audioSource.pause();
  }

  function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
  }

  function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
  }

  function updateProgressBar() {
    if (audioSource.duration) {
      const progressPercent = (audioSource.currentTime / audioSource.duration) * 100;
      progressBar.value = progressPercent;
    }
  }

  function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audioSource.duration;
    audioSource.currentTime = (clickX / width) * duration;
  }

  playBtn.addEventListener('click', () => {
    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  });

  prevBtn.addEventListener('click', prevSong);
  nextBtn.addEventListener('click', nextSong);
  audioSource.addEventListener('timeupdate', updateProgressBar);
  progressBar.addEventListener('input', setProgress);

  // Carga inicial
  if (songs.length > 0) {
    renderPlaylist();
    loadSong(songs[currentSongIndex]);
  }
});
