import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './pages/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import Form from './pages/Form/Form';
import BlogDetails from './pages/BlogDetails/BlogDetails';
import EditBlog from './pages/EditBlog/EditBlog';

const router = createBrowserRouter([
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
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

