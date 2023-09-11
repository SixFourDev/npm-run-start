import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import WelcomePage from './pages/WelcomePage';
import SearchResults from './pages/SearchResults';
import ShoeDetails from './pages/ShoeDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <WelcomePage />
      }, 
      {
        path: '/search',
        element: <SearchResults />
      }, 
      {
        path: '/shoe/:id',
        element: <ShoeDetails />
      }, 
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
