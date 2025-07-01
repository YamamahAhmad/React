import styles from './Header.module.css';
import { Link } from 'react-router-dom';

export default function Header() {

  const toggleMenu = () => {
    const nav = document.getElementById('main-nav-links');
    if (nav) {
      nav.classList.toggle(styles.active);
    }
  };

  const handleLinkClick = () => {
    const nav = document.getElementById('main-nav-links');
    if (nav && nav.classList.contains(styles.active)) {
      nav.classList.remove(styles.active);
    }
  };

  return (
    <header className={styles.container}>
      <h1 className={styles.logo}>onextrapixel</h1>

      <nav id="main-nav-links" className={styles.centerNav}>
        <ul>
          <li>
            <Link to="/" onClick={handleLinkClick}>HomePage</Link>
          </li>
          <li>
            <Link to="/add" onClick={handleLinkClick}>Add New Blog</Link>
          </li>
        </ul>
      </nav>

      <div className={styles.hamburgerMenu} onClick={toggleMenu}>
        ☰
      </div>
    </header>
  );
}