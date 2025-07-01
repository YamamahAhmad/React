import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialIcons}>
        <a href="https://x.com/"><i className="fab fa-twitter"></i></a>
        <a href="https://www.facebook.com/"><i className="fab fa-facebook"></i></a>
        <a href="#"><i className="fas fa-rss"></i></a>
      </div>
    </footer>
  );
}
