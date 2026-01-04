import { createContext, useContext, useRef, useState, useEffect } from "react";

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const audioRef = useRef(new Audio());

  const [currentTrack, setCurrentTrack] = useState(null);
  const [trackList, setTrackList] = useState([]); // 🔥 REQUIRED
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;

    audio.addEventListener("timeupdate", () =>
      setCurrentTime(audio.currentTime)
    );
    audio.addEventListener("loadedmetadata", () =>
      setDuration(audio.duration || 0)
    );
  }, []);

  const playTrack = (track) => {
    if (!currentTrack || currentTrack.id !== track.id) {
      audioRef.current.src = track.audio_url;
      setCurrentTrack(track);
    }
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const seek = (time) => {
    audioRef.current.currentTime = time;
  };

  const changeVolume = (v) => {
    audioRef.current.volume = v;
    setVolume(v);
  };

  // 🔥 NEXT
  const playNext = () => {
    if (!currentTrack || trackList.length === 0) return;

    const index = trackList.findIndex(
      (t) => t.id === currentTrack.id
    );
    const nextIndex = (index + 1) % trackList.length;
    playTrack(trackList[nextIndex]);
  };

  // 🔥 PREVIOUS
  const playPrevious = () => {
    if (!currentTrack || trackList.length === 0) return;

    const index = trackList.findIndex(
      (t) => t.id === currentTrack.id
    );
    const prevIndex =
      (index - 1 + trackList.length) % trackList.length;
    playTrack(trackList[prevIndex]);
  };

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        duration,
        currentTime,
        volume,
        playTrack,
        pauseTrack,
        seek,
        changeVolume,
        setTracks: setTrackList, // 🔥 VERY IMPORTANT
        playNext,
        playPrevious,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext);
