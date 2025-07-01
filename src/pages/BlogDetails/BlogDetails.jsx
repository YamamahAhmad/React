import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './BlogDetails.module.css';

export default function BlogDetails() {
    const { blogId } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/blogs/${blogId}`);
                setTimeout(() => {
                    setBlog(res.data);
                    setLoading(false);
                }, 1000);
            } catch (err) {
                setError('Could not find that blog post.');
                console.error(err);
                setLoading(false);
            }
        };
        fetchBlog();
    }, [blogId]);

    if (loading) {
        return <div className={styles.centered}><h1>Loading...</h1></div>;
    }

    if (error) {
        return <div className={styles.centered}><h1>{error}</h1></div>;
    }

    return (
        <div className={styles.detailsContainer}>
            {blog && (
                <div>
                    <h1 className={styles.title}>{blog.title}</h1>
                    <p className={styles.description}>{blog.description}</p>
                    <Link to="/" className={styles.backButton}>
                        ←
                    </Link>
                </div>
            )}
        </div>
    );
}