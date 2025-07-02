import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogForm from '../../components/BlogForm/BlogForm';


export default function Form() {

    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddBlog = async (data) => {
        setIsSubmitting(true);
        try {
            await axios.post('http://localhost:3000/blogs', data);
            navigate('/');
        } catch (error) {
            console.error("Failed to add blog:", error);
            setIsSubmitting(false); 
        }
    };

    return (
                <div>
            <BlogForm 
                onSubmitHandler={handleAddBlog}
                buttonText="Add"
                isSubmitting={isSubmitting}
            />
        </div>
    );
}