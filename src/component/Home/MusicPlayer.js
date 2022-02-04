import React from "react";

import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";

import "./music.css"

export default function MusicPlayer({ musics, selectedMusicIndex }) {
    // console.log(musics)
    const audioLists = musics.map((music, index) => ({
        key: index,
        name: music.title,
        singer: music.artis.name,
        cover: music.thumbnail,
        musicSrc: music.atthace
  }));

  const options = {
    playIndex: selectedMusicIndex,
    mode: "full",
    audioLists,
    defaultPlayIndex: 0,
    theme: "dark",
    remove: true,
    showPlay: true,
    showDestroy: false,
    responsive: true,
    defaultPosition: { bottom: 0, left: 0 },
    toggleMode: false,
    showDownload: false,
    showPlayMode: false,
    showThemeSwitch: false,
    showLyric: false,
    showReload: false,
    glassBg: true,
    autoPlay: false,
  };
  return (
    <>
      <ReactJkMusicPlayer {...options} />
    </>
  );
}