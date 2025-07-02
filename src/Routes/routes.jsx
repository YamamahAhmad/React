import Layout from '../pages/Layout/Layout';
import HomePage from '../pages/HomePage/HomePage';
import Form from '../pages/Form/Form';
import BlogDetails from '../pages/BlogDetails/BlogDetails';
import EditBlog from '../pages/EditBlog/EditBlog';

export const appRoutes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "add",
        element: <Form />,
      },
      {
        path: 'blog/:blogId',
        element: <BlogDetails />,
      },
      {
        path: 'edit/:blogId',
        element: <EditBlog />,
      },
    ]
  },
];