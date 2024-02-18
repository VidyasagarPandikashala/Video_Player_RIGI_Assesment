import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDispatch } from "react-redux";
import { DATABASE_ACTIONS } from "../../../redux/applicationslice/appSlice";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function UploadComponent() {
  const dispatch = useDispatch();
  const handleFileUpload = (ev) => {
    const newFiles = Array.from(ev.target.files).map((each) => {
      return {
        name: each.name,
        videoSrc: URL.createObjectURL(each),
      };
    });

    dispatch(DATABASE_ACTIONS.saveVideolist(newFiles));
  };

  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload file
      <VisuallyHiddenInput type="file" onChange={handleFileUpload} />
    </Button>
  );
}
