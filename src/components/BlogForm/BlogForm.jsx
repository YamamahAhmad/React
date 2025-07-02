import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './BlogForm.module.css'; 

export default function BlogForm({ onSubmitHandler, initialData = null, buttonText, isSubmitting = false }) {
    
    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({
        mode: "onBlur",
        defaultValues: initialData || { title: '', description: '' }
    });

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        }
    }, [initialData, reset]);

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)} noValidate>
            
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
                            value: /^[A-Z][a-zA-Z0-9\s]*$/,
                            message: 'Must start with a capital letter and can contain letters, numbers, and spaces'
                        }
                    })}
                />
                {errors.title && <p className={styles.error}>{errors.title.message}</p>}
            </div>

            <div className={styles.formControl}>
                <label htmlFor="description">Blog Content</label>
                <textarea id="description" rows="15"
                    {...register('description', {
                        required: 'Description is required',
                        maxLength: {
                            value: 5000,
                            message: 'Description must be less than 5000 characters'
                        }
                    })}
                />
                {errors.description && <p className={styles.error}>{errors.description.message}</p>}
            </div>
             <button 
                className={`${!isValid && styles.buttonDisabled}`} 
                type="submit" 
                disabled={!isValid || isSubmitting}
            >
                {isSubmitting ? 'Submitting...' : buttonText}
            </button>
        </form>
    );
}