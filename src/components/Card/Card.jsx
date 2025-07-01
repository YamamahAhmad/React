import styles from './Card.module.css';
import { Link } from 'react-router-dom';

export default function Card({ blogs, onDeleteClick }) {

  return (
    <>
      {blogs.map((blog) => (
        <div key={blog.id} className={styles.card}>

          <div className={styles.iconsContainer}>
            <Link to={`/edit/${blog.id}`} className={styles.editIcon}>
              ✏️
            </Link>
            <span className={styles.deleteIcon} onClick={() => onDeleteClick(blog.id)}>
              ✖
            </span>
          </div>

          <div className={styles.image}></div>
          <h3>{blog.title}</h3>
          <p>{blog.description.substring(0, 100)}</p>

          <div className={styles.cardActions}>
            <Link to={`/blog/${blog.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
              Read More
            </Link>
          </div>

        </div>
      ))}
    </>
  );
}
