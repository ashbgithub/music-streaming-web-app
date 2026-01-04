import { useAudio } from "../context/AudioContext";

function TrackCard({ track }) {
  const { playTrack } = useAudio();

  return (
    <div
      style={{
        borderBottom: "1px solid #ddd",
        padding: "12px 0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <strong>{track.title}</strong>
        <p style={{ margin: 0, color: "#555" }}>{track.artist}</p>
      </div>

      <button onClick={() => playTrack(track)}>Play</button>
    </div>
  );
}

export default TrackCard;
