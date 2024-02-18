import PlaylistAddCheckCircleIcon from "@mui/icons-material/PlaylistAddCheckCircle";
import styles from "./PlaylistThumbnail.module.css";
function PlaylistThumbnail({ videoSrc, onClickHandler, thumbnailStyle }) {
  return (
    <>
      <div>
        <PlaylistAddCheckCircleIcon
          className={styles.playlistIcon}
          style={{
            color: "#ed5624",
            width: "140px",
            height: "140px",
            fontSize: "16px",
          }}
        />
      </div>
    </>
  );
}

export default PlaylistThumbnail;
