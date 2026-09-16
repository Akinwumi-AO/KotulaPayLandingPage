import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';

export default function App() {
  useEffect(() => {
    document.title = 'Kotulapay';
  }, []);

  return <RouterProvider router={router} />;
}
