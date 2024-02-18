import React, { useState, useEffect } from 'react'

import VideoPlayer from '../../shared-components/videoPlayer/VideoPlayer.js'

import styles from './HomePage.module.css'
import { useSelector } from 'react-redux'
import { SELECT_TABLE } from '../../../redux/applicationslice/appSlice.js'
import VideoListItem from '../../shared-components/videoListItem/VideoListItem.js'
import SearchBar from '../../shared-components/searchbar/SearchBar.js'

function HomePage() {
  const [videoSrc, setVideoSrc] = useState('')
  const [searchedKeys, setSearchedKeys] = useState('')
  const [searchedData, setSearchedData] = useState([])

  const selectVideos = useSelector(SELECT_TABLE.selectVideos)

  useEffect(() => {
    if (searchedKeys) {
      const listOfSearchedVideos = selectVideos.filter(eachVideo => {
        if (eachVideo.name.toLowerCase().includes(searchedKeys.toLowerCase())) {
          return true
        } else {
          return false
        }
      })
      setSearchedData(listOfSearchedVideos)
    } else {
      setSearchedData(selectVideos)
    }
  }, [searchedKeys, selectVideos])

  function handleOnclick(src) {
    setVideoSrc(src)
    console.log('hi')
  }
  function searchEventHandler(event) {
    setSearchedKeys(event.target.value ? event.target.value : '')
  }
  return (
    <div>
      <div className={styles.videoListContainer}>
        <VideoPlayer src={videoSrc} />

        <div className={styles.outerWrapperVideoListContainer}>
          <div className={styles.listHeading}>
            <h1>All Videos</h1>
            <SearchBar handleOnSearch={searchEventHandler}></SearchBar>
          </div>

          {searchedData.map(eachVideo => {
            return (
              <VideoListItem
                key={eachVideo.id}
                eachVideo={eachVideo}
                onClickHandler={handleOnclick}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default HomePage
