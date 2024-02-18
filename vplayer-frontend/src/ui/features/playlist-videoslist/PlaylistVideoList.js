// import { useSelector } from 'react-redux'

// import VideoPlayer from '../../shared-components/videoPlayer/VideoPlayer'
// import { SELECT_TABLE } from '../../../redux/applicationslice/appSlice'
// import styles from './PlaylistVideoList.module.css'
// import { useParams } from 'react-router-dom'
// import { useEffect, useState } from 'react'
// import VideoListItem from '../../shared-components/videoListItem/VideoListItem'
// import SearchBar from '../../shared-components/searchbar/SearchBar'

// function PlaylistVideoList() {
//   const [videoSrc, setVideoSrc] = useState('')
//   const [searchedKeys, setSearchedKeys] = useState('')
//   const [searchedData, setSearchedData] = useState([])

//   const params = useParams()

//   const playlistInfoWithVideosForPlaylistId = useSelector(
//     SELECT_TABLE.getSelectorForVideosUnderPlaylist([params.playlistId])
//   )

//   const videoListForThePlayList = playlistInfoWithVideosForPlaylistId[0].videos
//   useEffect(() => {
//     if (searchedKeys) {
//       const listOfSearchedVideos = videoListForThePlayList.filter(eachVideo => {
//         if (eachVideo.name.toLowerCase().includes(searchedKeys.toLowerCase())) {
//           return true
//         } else {
//           return false
//         }
//       })
//       setSearchedData(listOfSearchedVideos)
//     } else {
//       setSearchedData(videoListForThePlayList)
//     }
//   }, [searchedKeys, videoListForThePlayList, playlistInfoWithVideosForPlaylistId])

//   function handleOnclick(src) {
//     setVideoSrc(src)
//   }

//   function searchEventHandler(event) {
//     setSearchedKeys(event.target.value ? event.target.value : '')
//   }

//   return (
//     <div>
//       <div className={styles.homePageHeader}></div>
//       <div className={styles.videoListContainer}>
//         <VideoPlayer src={videoSrc} />
//         <div className={styles.outerWrapperVideoListContainer}>
//           <div>
//             <h1>Playlist : {playlistInfoWithVideosForPlaylistId[0].playlistName}</h1>
//             <SearchBar handleOnSearch={searchEventHandler}></SearchBar>
//           </div>
//           {searchedData?.map(eachVideo => {
//             return (
//               <VideoListItem
//                 key={eachVideo.id}
//                 eachVideo={eachVideo}
//                 onClickHandler={handleOnclick}
//               />
//             )
//           }) || ''}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PlaylistVideoList
import { useDispatch, useSelector } from 'react-redux'

import VideoPlayer from '../../shared-components/videoPlayer/VideoPlayer'
import { DATABASE_ACTIONS, SELECT_TABLE } from '../../../redux/applicationslice/appSlice'
import styles from './PlaylistVideoList.module.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import VideoListItem from '../../shared-components/videoListItem/VideoListItem'
import SearchBar from '../../shared-components/searchbar/SearchBar'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd' // Import draggable components

function PlaylistVideoList() {
  const [videoSrc, setVideoSrc] = useState('')
  const params = useParams()
  const dispatch = useDispatch() // Add dispatch to dispatch Redux actions

  const playlistInfoWithVideosForPlaylistId = useSelector(
    SELECT_TABLE.getSelectorForVideosUnderPlaylist([params.playlistId])
  )

  function handleOnclick(src) {
    setVideoSrc(src)
  }

  function onDragEnd(result) {
    if (!result.destination) return // If dropped outside the list, do nothing
    const startIndex = result.source.index
    const endIndex = result.destination.index
    const tempData = JSON.parse(JSON.stringify(playlistInfoWithVideosForPlaylistId[0]))
    const newVideos = Array.from(tempData.videos)
    const [removed] = newVideos.splice(startIndex, 1) // Remove dragged item
    newVideos.splice(endIndex, 0, removed)
    const playlisttableUpdateData = {
      playlistIds: [Number.parseInt(params.playlistId)],
      videoIds: newVideos.map(eachNewVideo => {
        return eachNewVideo.id
      })
    } // Insert dragged item at new position
    dispatch(DATABASE_ACTIONS.updatePlaylistVideos(playlisttableUpdateData)) // Dispatch action to update Redux store
  }

  return (
    <div>
      <div className={styles.homePageHeader}></div>
      <div className={styles.videoListContainer}>
        <VideoPlayer src={videoSrc} />
        <div className={styles.outerWrapperVideoListContainer}>
          <div>
            <h1>Playlist : {playlistInfoWithVideosForPlaylistId[0]?.playlistName}</h1>
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="videos">
              {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {playlistInfoWithVideosForPlaylistId[0]?.videos.map((eachVideo, index) => (
                    <Draggable key={eachVideo.id} draggableId={`${eachVideo.id}`} index={index}>
                      {provided => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <VideoListItem
                            key={eachVideo.id}
                            eachVideo={eachVideo}
                            onClickHandler={handleOnclick}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  )
}

export default PlaylistVideoList
