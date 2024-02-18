import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import CheckboxLabels from "../../checkbox/CheckboxLabels";
import styles from "./AddToPlaylist.modules.css";
import { useDispatch, useSelector } from "react-redux";
import {
  DATABASE_ACTIONS,
  SELECT_TABLE,
} from "../../../../redux/applicationslice/appSlice";

export default function AddToPlaylist({ videoId }) {
  console.log(videoId);
  const [checked, setChecked] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const playListSelector = useSelector(SELECT_TABLE.selectPlayList);
  const dispatch = useDispatch();

  const handleClickOpen = (e) => {
    e.stopPropagation();

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <React.Fragment>
      <AddCircleOutlineIcon
        variant="outlined"
        className={styles.buttonStyle}
        style={{
          color: "#e0e0e0",

          width: "40px",
          height: "auto",
          fontSize: "16px",
          border: "none",
        }}
        onClick={handleClickOpen}
      ></AddCircleOutlineIcon>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const playlistName = formJson.playlistName;

            const playListDetailObject = {
              playListIds: checked,
              videoIds: [videoId],
              newPlayListName: playlistName,
            };

            dispatch(DATABASE_ACTIONS.savePlayListTable(playListDetailObject));
            console.log(playlistName);
            console.log();

            handleClose();
          },
        }}
      >
        <DialogTitle>Add to Playlist</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <CheckboxLabels
              playlist={playListSelector}
              atToggle={handleToggle}
              checked={checked}
            />
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="playlistName"
            label=" enter playlist name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
