import { useAudio } from "../context/AudioContext";

function MiniPlayer() {
  const {
    currentTrack,
    isPlaying,
    playTrack,
    pauseTrack,
    playNext,
    playPrevious,
    currentTime,
    duration,
    seek,
    volume,
    changeVolume,
  } = useAudio();

  if (!currentTrack) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#111",
        color: "#fff",
        padding: "12px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        zIndex: 1000,
      }}
    >
      {/* Track Info */}
      <div style={{ fontWeight: "bold" }}>
        {currentTrack.title} – {currentTrack.artist}
      </div>

      {/* Seek Bar */}
      <input
        type="range"
        min="0"
        max={duration || 0}
        value={currentTime}
        onChange={(e) => seek(Number(e.target.value))}
        style={{ width: "100%" }}
      />

      {/* Controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Playback buttons */}
        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={playPrevious}>⏮</button>

          {isPlaying ? (
            <button onClick={pauseTrack}>⏸</button>
          ) : (
            <button onClick={() => playTrack(currentTrack)}>▶</button>
          )}

          <button onClick={playNext}>⏭</button>
        </div>

        {/* Volume */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => changeVolume(Number(e.target.value))}
        />
      </div>
    </div>
  );
}

export default MiniPlayer;
