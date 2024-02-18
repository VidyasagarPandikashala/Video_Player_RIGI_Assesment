import styles from "./VideoPlayerThumbnail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlay } from "@fortawesome/free-solid-svg-icons";
function VideoPlayerThumbnail({ videoSrc, onClickHandler, thumbnailStyle }) {
  return (
    <div className={styles[thumbnailStyle]}>
      <div>
        <FontAwesomeIcon className={styles.iconStyle} icon={faPlay} />
      </div>
    </div>
  );
}

export default VideoPlayerThumbnail;
