import { createSlice } from '@reduxjs/toolkit'
import { generatePlaylistId, generateVideoId } from '../../utilityFunction/generateId'

const createPlaylist = (state, newPlaylistdetail) => {
  const playListId = generatePlaylistId(state.playlist)
  const newPlaylistObject = {
    playListId,
    playlistName: newPlaylistdetail.playlistName
  }
  state.playlist.push(newPlaylistObject)
  return newPlaylistObject
}

export const appSlice = createSlice({
  name: 'database',
  initialState: {
    videos: [],
    playlist: [],
    playlist_videos: {}
  },
  reducers: {
    saveVideolist: (state, action) => {
      action.payload.forEach(eachVideo => {
        const result = {
          id: generateVideoId(state.videos),
          ...eachVideo
        }
        state.videos.push(result)
      })
    },

    savePlayList: (state, action) => {
      const { playlistName } = action.payload
      const newPlayListDetail = { playlistName: playlistName }

      createPlaylist(state, newPlayListDetail)
    },

    savePlayListTable: (state, action) => {
      const { playListIds, videoIds, newPlayListName } = action.payload

      if (newPlayListName) {
        const newPlayListDetail = { playlistName: newPlayListName }

        const newPlayListCreatedInState = createPlaylist(state, newPlayListDetail)
        playListIds.push(newPlayListCreatedInState.playListId)
      }

      playListIds.forEach(eachPlaylistId => {
        if (!(eachPlaylistId in state.playlist_videos)) {
          state.playlist_videos[eachPlaylistId] = new Set()
        }

        state.playlist_videos[eachPlaylistId].add(...videoIds)
        console.log(state.playlist_videos)
      })
    },
    updatePlaylistVideos: (state, action) => {
      const { playlistIds, videoIds } = action.payload

      playlistIds.forEach(eachPlaylistId => {
        state.playlist_videos[eachPlaylistId] = new Set()
        state.playlist_videos[eachPlaylistId].add(...videoIds)
        console.log(state.playlist_videos)
      })
    }
  }
})

// actions
const { saveVideolist, savePlayList, savePlayListTable, updatePlaylistVideos } = appSlice.actions
// const fetchVideos = () => async (dispatch, getState) => {
//   const { videos } = getState().database;
//   if (videos.length === 0) {
//     const fetchedBideos = await getVideoList();
//     dispatch(saveVideolist(fetchedBideos));
//   }
// };

// utility fn

// selectors
const selectVideos = state => state.database.videos
const selectPlayList = state => state.database.playlist
const selectPlayListVideos = state => state.database.playlist_videos

const getSelectorForVideosUnderPlaylist = playlistIds => {
  const playlistIdSet = new Set(...playlistIds)
  return state => {
    const requiredPlaylistInfo = state.database.playlist.filter(each =>
      playlistIdSet.has(`${each.playListId}`)
    )

    const playlistInfoWithVideos = requiredPlaylistInfo.reduce((acc, eachPlaylistInfo) => {
      const currPlaylistWithVideo = {
        ...eachPlaylistInfo,
        videos: []
      }

      const videoIdsUnderPlaylistId = state.database.playlist_videos[eachPlaylistInfo.playListId]

      if (videoIdsUnderPlaylistId && videoIdsUnderPlaylistId.size) {
        videoIdsUnderPlaylistId.forEach(eachVideoIdUnderPlaylistId => {
          // find the videodata for this id

          const videoDataForPlaylistId = state.database.videos.find(
            videInfo => videInfo.id === eachVideoIdUnderPlaylistId
          )

          // push it into the video array in the

          currPlaylistWithVideo.videos.push(videoDataForPlaylistId)
        })
      }

      acc.push(currPlaylistWithVideo)

      // videoIdsUnderPlaylistId.forEach(eachVideoIds);
      return acc
    }, [])

    return playlistInfoWithVideos
  }
}

export const SELECT_TABLE = {
  selectVideos,
  selectPlayList,
  selectPlayListVideos,
  getSelectorForVideosUnderPlaylist
}

export const DATABASE_ACTIONS = {
  saveVideolist,
  savePlayList,
  savePlayListTable,
  updatePlaylistVideos
}

export default appSlice.reducer
