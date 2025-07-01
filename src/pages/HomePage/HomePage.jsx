import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from './HomePage.module.css';
import Card from '../../components/Card/Card';
import Pagination from '../../components/Pagination/Pagination';
import Modal from '../../components/Modal/Modal';

export default function HomePage() {
  const [initialBlogs, setInitialBlogs] = useState([]);
  const [blogs, setBlogs] = useState([initialBlogs]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(6);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);
  
   const fetchBlogs = async () => {
      try {
        const result = await axios.get('http://localhost:3000/blogs');
        setTimeout(() => {
          setInitialBlogs(result.data);
          setBlogs(result.data);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed');
        console.error(err);
        setLoading(false);
      }
    };

  const handleDeleteClick = (id) => {
    setBlogToDelete(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setBlogToDelete(null);
  };

  const confirmDeleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:3000/blogs/${blogToDelete}`);

      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogToDelete));
      setInitialBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogToDelete));
    } catch (error) {
      console.error('Failed to delete blog:', error);
    }finally {
      closeModal();
    }
  };

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div className={styles.centered}><h1>Loading...</h1></div>;
  }

  if (error) {
    return <div className={styles.centered}><h1>{error}</h1></div>;
  }

  return (
    <>
      <div className={styles.homePageContainer}>
        <div className={styles.cards}>
          <Card blogs={currentBlogs} onDeleteClick={handleDeleteClick} />
        </div>
        <Pagination
          blogsPerPage={blogsPerPage}
          totalBlogs={blogs.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
      {isModalOpen && (
        <Modal
          title="Are you sure you want to delete blog?"
          onClose={closeModal}
          onConfirm={confirmDeleteHandler}
        />
      )}
    </>
  );
};