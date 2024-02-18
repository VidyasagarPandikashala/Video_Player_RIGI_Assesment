import styles from "./Logo.module.css";

function Logo() {
  return (
    <div className={styles.logoContainer}>
      <h1 className={styles.logoHeadingiprimary}>V</h1>
      <h1 className={styles.logoHeadingisecondary}>Player</h1>
    </div>
  );
}

export default Logo;
