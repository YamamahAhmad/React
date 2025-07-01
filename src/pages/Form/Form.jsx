import axios from 'axios';
import styles from './Form.module.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function Form() {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: "onBlur" });

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        await axios.post('http://localhost:3000/blogs', data)
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                console.error("Failed to add blog:", error);
            });
    };
    
    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>

            <div className={styles.formControl}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title"
                    {...register('title', {
                        required: 'Title is required',
                        maxLength: {
                            value: 50,
                            message: 'Title must be less than 50 characters'
                        },
                        pattern: {
                            value: /^[A-Z][a-zA-Z\s]*$/,
                            message: 'Must start with a capital letter and contain English letters/spaces only'

                        }
                    })}
                />
                {errors.title && <p className={styles.error}>{errors.title.message}</p>}
            </div>

            <div className={styles.formControl}>
                <label htmlFor="description">Description</label>
                <textarea id="description" rows="6"
                    {...register('description', {
                        required: 'Description is required',
                        maxLength: {
                            value: 1000,
                            message: 'Description must be less than 1000 characters'
                        },
                        pattern: {
                            value: /^[A-Za-z\s]*$/,
                            message: 'Description must contain English letters and spaces only'
                        }
                    })}
                />
                {errors.description && <p className={styles.error}>{errors.description.message}</p>}

            </div>

            <button className={`${!isValid && styles.buttonDisabled}`} type="submit" disabled={!isValid} >Add</button>
        </form>
    );
}