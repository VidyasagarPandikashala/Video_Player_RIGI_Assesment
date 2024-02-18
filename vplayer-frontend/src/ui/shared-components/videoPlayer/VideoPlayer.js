import VideoPlayerThumbnail from "../videoPlayerThumbnail/VideoPlayerThumbnail";
import styles from "./VideoPlayer.module.css";

function VideoPlayer({ src }) {
  return (
    <>
      {src === "" ? (
        <VideoPlayerThumbnail thumbnailStyle={"thumbContainerVideoPlayer"} />
      ) : (
        <video
          className={styles.videoPlayer}
          autoPlay
          controls
          width="100%"
          src={src}
        ></video>
      )}
    </>
  );
}

export default VideoPlayer;
