import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { DATABASE_ACTIONS } from "../../../../redux/applicationslice/appSlice";
import { useEffect, useState } from "react";

const CreatePlayList = () => {
  const [open, setOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hideButton, setHideButton] = useState(false);
  let timeoutId = null;

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      setIsScrolled(window.scrollY > 0);
      setHideButton(false);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
        if (!isScrolled) {
          setHideButton(true);
        }
      }, 1000);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const playlistName = formJson.playlistName;
    dispatch(DATABASE_ACTIONS.savePlayList({ playlistName }));
    handleClose();
  };
  return (
    <div
      style={{
        visibility: hideButton ? "hidden" : "visible",
        position: "sticky",
        top: 0,
      }}
    >
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        style={{
          color: "#e0e0e0",
          background: "#ed5624",
          padding: "1rem",
          width: "auto",
          height: "auto",
          fontSize: "16px",
          border: "none",
          margin: "2rem",
          translate: "80vw",
          position: "sticky",
        }}
      >
        Create Playlist
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Create Playlist</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="playlistName"
            label=" Enter playlist name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create Playlist</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default CreatePlayList;
