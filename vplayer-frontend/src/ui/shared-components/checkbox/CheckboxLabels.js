import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

export default function CheckboxLabels({ playlist, atToggle, checked }) {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {playlist.map((eachplaylist) => {
        const labelId = `checkbox-list-label-${eachplaylist.playListId}`;

        return (
          <ListItem key={eachplaylist.playListId} disablePadding>
            <ListItemButton
              role={undefined}
              onClick={atToggle(eachplaylist.playListId)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(eachplaylist.playListId) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={eachplaylist.playlistName} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
