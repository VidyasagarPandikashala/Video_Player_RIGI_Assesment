import { useSelector } from 'react-redux'
import PlayListCard from '../../shared-components/playlistCard/PlayListCard'

import CreatePlayList from '../../shared-components/dialog-popup/createplaylist/CreatePlayList'
import { SELECT_TABLE } from '../../../redux/applicationslice/appSlice'
import { Link } from 'react-router-dom'
import styles from './Playlist.module.css'

function Playlist() {
  const selectPlayList = useSelector(SELECT_TABLE.selectPlayList)
  console.log(selectPlayList)

  return (
    <>
      <CreatePlayList />
      <div className={styles.noPlaylistBackground}>
        {selectPlayList.length === 0 ? (
          <div className={styles.noPlaylist}> No playlist available</div>
        ) : (
          selectPlayList.map(eachPlaylist => {
            return (
              <div key={eachPlaylist.playListId}>
                <Link to={`/playlist/${eachPlaylist.playListId}`} className={styles.linkStyle}>
                  <PlayListCard playlistName={eachPlaylist.playlistName} />
                </Link>
              </div>
            )
          })
        )}
      </div>
    </>
  )
}

export default Playlist
