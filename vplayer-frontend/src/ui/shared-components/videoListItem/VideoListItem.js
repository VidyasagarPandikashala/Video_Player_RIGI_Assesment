import VideoPlayerThumbnail from "../videoPlayerThumbnail/VideoPlayerThumbnail";
import AddToPlaylist from "../dialog-popup/addtoplaylist/AddToPlaylist";
import styles from "./VideoListItem.module.css";

function VideoListItem({ eachVideo, onClickHandler }) {
  console.log(eachVideo);
  return (
    <div className={styles.eachVideoListWrapper}>
      <div
        className={styles.eachVideoContainer}
        onClick={() => onClickHandler(eachVideo.videoSrc)}
      >
        <VideoPlayerThumbnail
          videoSrc={eachVideo.videoSrc}
          thumbnailStyle={"thumbnailcontainer"}
        />

        <div className={styles.movieNameContainer}>
          <p className={styles.movieName}>{eachVideo.name.toUpperCase()}</p>
        </div>
      </div>
      <div className={styles.addToPlaylistContainer}>
        <AddToPlaylist videoId={eachVideo.id} />
      </div>
    </div>
  );
}

export default VideoListItem;
