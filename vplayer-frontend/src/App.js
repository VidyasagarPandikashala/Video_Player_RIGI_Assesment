import HomePage from "./ui/features/homepage/HomePage";
import Playlist from "./ui/features/playList/Playlist";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PlaylistVideoList from "./ui/features/playlist-videoslist/PlaylistVideoList";
import Root from "./Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "playlist", element: <Playlist /> },
      { path: "playlist/:playlistId", element: <PlaylistVideoList /> },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router}>
      <div>
        <HomePage></HomePage>
      </div>
    </RouterProvider>
  );
}
export default App;
