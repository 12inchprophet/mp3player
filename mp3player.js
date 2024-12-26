import React from '@blocklet/pages-kit/builtin/react';

export default function MP3Player({
  title1 = '', song1 = { url: '' },
  title2 = '', song2 = { url: '' },
  title3 = '', song3 = { url: '' },
  title4 = '', song4 = { url: '' },
  title5 = '', song5 = { url: '' },
  title6 = '', song6 = { url: '' },
  title7 = '', song7 = { url: '' },
  title8 = '', song8 = { url: '' },
  title9 = '', song9 = { url: '' },
  title10 = '', song10 = { url: '' },
  color = '#222', // Background color of the player
  containerColor = '#f8f8f8', // Background color of the bar
  containerTransparent = false, // Transparency toggle for the bar
  boxColor = '#333', // Slider box color
  padding = 'medium', // Padding size: none, small, medium, large
  fontFamily = 'Arial, sans-serif', // Font family for the player
  skin = 'dark', // Light or dark skin
  skinUrl, // Background image for the player box
  skinColor = '#222', // Background color for the player box if no skinUrl
  enableSkinUrl = false, // Toggle for skinUrl
}) {
  // Dynamically handle songs with uploaded MP3 URLs
  const songs = [
    { title: title1 || 'Song 1', song: song1?.url },
    { title: title2 || 'Song 2', song: song2?.url },
    { title: title3 || 'Song 3', song: song3?.url },
    { title: title4 || 'Song 4', song: song4?.url },
    { title: title5 || 'Song 5', song: song5?.url },
    { title: title6 || 'Song 6', song: song6?.url },
    { title: title7 || 'Song 7', song: song7?.url },
    { title: title8 || 'Song 8', song: song8?.url },
    { title: title9 || 'Song 9', song: song9?.url },
    { title: title10 || 'Song 10', song: song10?.url },
  ].filter(song => song.song); // Filter out empty or undefined songs

  const audioRef = React.useRef(null);
  const [selectedSong, setSelectedSong] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isLooping, setIsLooping] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);

  const isLightSkin = skin === 'light';

  // Padding size for container
  const paddingValues = {
    none: '0px',
    small: '20px',
    medium: '40px', // Default
    large: '60px',
  };

  const handleSelectSong = (index) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setSelectedSong(index);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleLoopToggle = () => {
    if (audioRef.current) {
      audioRef.current.loop = !isLooping;
    }
    setIsLooping(!isLooping);
  };

  const handleSliderChange = (event) => {
    const newTime = parseFloat(event.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  React.useEffect(() => {
    const audio = audioRef.current;

    const updateCurrentTime = () => {
      if (audio) setCurrentTime(audio.currentTime);
    };

    const updateDuration = () => {
      if (audio) setDuration(audio.duration);
    };

    if (audio) {
      audio.addEventListener('timeupdate', updateCurrentTime);
      audio.addEventListener('loadedmetadata', updateDuration);

      return () => {
        audio.removeEventListener('timeupdate', updateCurrentTime);
        audio.removeEventListener('loadedmetadata', updateDuration);
      };
    }
  }, [selectedSong]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw', // Full viewport width
        height: `calc(150px + ${paddingValues[padding]})`, // Adjust overall container height
        backgroundColor: containerTransparent ? 'transparent' : containerColor, // Transparency or color
        margin: 0,
        padding: 0,
        boxSizing: 'border-box', // Ensures proper sizing for padding and borders
        overflow: 'hidden', // Prevents overflow cutoff issues
      }}
    >
      <div
        style={{
          width: '90%',
          maxWidth: '800px', // Keeps the player compact
          padding: '20px', // Fixed padding for the player itself
          borderRadius: '10px',
          backgroundColor: enableSkinUrl
            ? 'transparent'
            : skinColor, // Player box background color if no skin image
          backgroundImage: enableSkinUrl && skinUrl?.url ? `url(${skinUrl.url})` : undefined, // Apply skin image
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Optional shadow for aesthetics
          color: isLightSkin ? '#000' : '#fff',
          textAlign: 'center',
          fontFamily: fontFamily, // Dynamically apply font family
        }}
      >
        <select
          value={selectedSong}
          onChange={(e) => handleSelectSong(parseInt(e.target.value))}
          style={{
            width: '100%',
            marginBottom: '10px',
            padding: '10px',
            backgroundColor: isLightSkin ? '#fff' : '#333',
            color: isLightSkin ? '#000' : '#fff',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontFamily: fontFamily,
          }}
        >
          {songs.map((song, index) => (
            <option key={index} value={index}>
              {song.title}
            </option>
          ))}
        </select>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '15px',
          }}
        >
          <button
            onClick={handleRestart}
            style={{
              padding: '10px',
              cursor: 'pointer',
              backgroundColor: '#444',
              color: '#fff',
              border: '1px solid #ccc',
              borderRadius: '5px',
              fontFamily: fontFamily,
            }}
          >
            🔄
          </button>
          <button
            onClick={handlePlayPause}
            style={{
              padding: '10px',
              cursor: 'pointer',
              backgroundColor: isPlaying ? '#666' : '#444',
              color: '#fff',
              border: '1px solid #ccc',
              borderRadius: '5px',
              fontFamily: fontFamily,
            }}
          >
            {isPlaying ? '⏸' : '▶️'}
          </button>
          <button
            onClick={handleLoopToggle}
            style={{
              padding: '10px',
              cursor: 'pointer',
              backgroundColor: isLooping ? '#666' : '#444',
              color: '#fff',
              border: '1px solid #ccc',
              borderRadius: '5px',
              fontFamily: fontFamily,
            }}
          >
            🔁
          </button>
        </div>

        <div
          style={{
            margin: '10px 0',
            padding: '10px',
            backgroundColor: boxColor,
            borderRadius: '5px',
          }}
        >
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={handleSliderChange}
            style={{
              width: '80%',
              margin: '0 10px',
              backgroundColor: isLightSkin ? '#ddd' : '#444',
            }}
          />
          <span>{formatTime(duration)}</span>
        </div>

        {songs.length > 0 && <audio ref={audioRef} src={songs[selectedSong]?.song} preload="metadata" />}
      </div>
    </div>
  );
}

// Utility to format time in MM:SS
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};
