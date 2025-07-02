import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { appRoutes } from './Routes';

const router = createBrowserRouter(appRoutes);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}