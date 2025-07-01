import styles from "./Pagination.module.css";

const Pagination = ({ blogsPerPage, totalBlogs, paginate, currentPage }) => {
  const pageNumbers = [];

  const totalPages = Math.ceil(totalBlogs / blogsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  return (
    <nav>
      <ul className={styles.pagination}>
        <li className={styles.pageItem}>
          <button
            onClick={prevPage}
            className={styles.pageLink}
            disabled={currentPage === 1}>
            &lt;
          </button>
        </li>

        {pageNumbers.map((number) => (
          <li key={number} className={styles.pageItem}>
            <button
              onClick={() => paginate(number)}
              className={`${styles.pageLink} ${currentPage === number ? styles.active : ''}`}>
              {number}
            </button>
          </li>
        ))}

        <li className={styles.pageItem}>
          <button
            onClick={nextPage}
            className={styles.pageLink}
            disabled={currentPage === totalPages}>
            &gt;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;