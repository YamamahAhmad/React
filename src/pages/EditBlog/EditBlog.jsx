import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BlogForm from '../../components/BlogForm/BlogForm';

export default function EditBlog() {
    const { blogId } = useParams();
    const navigate = useNavigate();
    const [blogData, setBlogData] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchBlogData();
    }, [blogId, navigate]);

    const fetchBlogData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/blogs/${blogId}`);
            setBlogData(response.data);
        } catch (error) {
            console.error("Failed to fetch blog data:", error);
            navigate('/');
        }
    };

    const handleUpdateBlog = async (data) => {
        setIsSubmitting(true);
        const updatedData = { ...data, id: blogId };
        try {
            await axios.put(`http://localhost:3000/blogs/${blogId}`, updatedData);
            navigate('/');
        } catch (error) {
            console.error("Failed to update blog:", error);
            setIsSubmitting(false);
        }
    };

    if (!blogData) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Update Blog</h2>
            <BlogForm
                onSubmitHandler={handleUpdateBlog}
                initialData={blogData}
                buttonText="Update Blog"
                isSubmitting={isSubmitting}
            />
        </div>
    );
}