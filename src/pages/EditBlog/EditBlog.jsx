import { useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './EditBlog.module.css';

export default function EditBlog() {
    const { blogId } = useParams();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({
        mode: 'onBlur',
    });

    useEffect(() => {

        fetchBlogData();
    }, [blogId, reset, navigate]);

    const fetchBlogData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/blogs/${blogId}`);
            reset(response.data);
        } catch (error) {
            console.error("Failed to fetch blog data:", error);
            navigate('/');
        }
    };

    const onSubmit = async (data) => {
        const { title, description } = data;
        await axios.put(`http://localhost:3000/blogs/${blogId}`, { title, description, id: blogId })
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                console.error("Failed to update blog:", error);
            });
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <h2>Update Blog</h2>
            <div className={styles.formControl}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" {...register('title', {
                    required: 'Title is required',
                    maxLength: {
                        value: 50,
                        message: 'Title must be less than 50 characters'
                    },
                    pattern: {
                        value: /^[A-Z][a-zA-Z\s]*$/,
                        message: 'Must start with a capital letter and contain English letters/spaces only',
                    },
                })} />
                {errors.title && <p className={styles.error}>{errors.title.message}</p>}
            </div>

            <div className={styles.formControl}>
                <label htmlFor="description">Description</label>
                <textarea id="description" rows="6" {...register('description', {
                    required: 'Description is required',
                    maxLength: {
                        value: 1000,
                        message: 'Description must be less than 1000 characters'
                    },
                    pattern: {
                        value: /^[a-zA-Z\s]*$/,
                        message: 'Description must contain english letters and spaces only',
                    },

                })}>

                </textarea>
                {errors.description && <p className={styles.error}>{errors.description.message}</p>}
            </div>

            <button className={`${styles.button} ${!isValid && styles.buttonDisabled}`} type="submit" disabled={!isValid}>
                Update
            </button>
        </form>
    );
}