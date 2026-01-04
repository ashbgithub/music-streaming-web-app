import { useEffect, useState } from "react";
import TrackCard from "../components/TrackCard";
import { useAudio } from "../context/AudioContext";

function Home() {
  const [tracks, setTracks] = useState([]);
  const { setTracks: registerTracks } = useAudio();

  useEffect(() => {
    fetch("http://localhost:5000/tracks")
      .then((res) => res.json())
      .then((data) => {
        setTracks(data);
        registerTracks(data); // 🔥 REQUIRED FOR NEXT/PREV
      });
  }, []);

  return (
    <div style={{ paddingBottom: "120px" }}>
      <h2>Tracks</h2>
      {tracks.map((track) => (
        <TrackCard key={track.id} track={track} />
      ))}
    </div>
  );
}

export default Home;
