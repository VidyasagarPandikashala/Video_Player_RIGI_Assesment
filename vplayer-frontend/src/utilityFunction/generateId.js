export const generatePlaylistId = (playlist) => {
  if (playlist.length === 0) {
    return 1;
  }
  const currentLastId = playlist[playlist.length - 1].playListId;
  return currentLastId + 1;
};

export const generateVideoId = (videos) => {
  if (videos.length === 0) {
    return 1;
  }
  const currentLastId = videos[videos.length - 1].id;
  return currentLastId + 1;
};
