import styles from './SearchBar.module.css'

function SearchBar({ handleOnSearch }) {
  return (
    <div>
      <input
        className={styles.search_bar}
        onKeyUp={handleOnSearch}
        type="search"
        placeholder="SEARCH VIDEOS"
      />
    </div>
  )
}

export default SearchBar
