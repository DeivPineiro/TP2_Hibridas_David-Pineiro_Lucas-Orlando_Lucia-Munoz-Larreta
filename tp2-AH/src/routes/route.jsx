import PlantsList from '../PlantsList';
import PlaguesList from '../PlaguesList';
import AboutPage from '../pages/AboutPage';
import NotFoundPage from '../pages/NotFoundPage';
import PlantViewPage from '../pages/PlantViewPage';
import PlagueViewPage from '../pages/PlagueViewPage';
import CreatePlantPage from '../pages/CreatePlantPage';
import CreatePlaguePage from '../pages/CreatePlaguePage';
import EditPlantPage from '../pages/EditPlantPage';
import EditPlaguePage from '../pages/EditPlaguePage';
import PrivateRoute from '../components/PrivateRoute';
import Logout from '../components/logOut';
import Login from '../pages/Login';
import HomePage from '../pages/HomePage';
import Register from '../pages/Register';
import { createBrowserRouter, Outlet} from 'react-router-dom';
import { AppMain } from '../App';
const route = createBrowserRouter([
    {
      path: '/',
      element: <PrivateRoute> <AppMain /></PrivateRoute>,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: 'plants',
          element: <Outlet />,
          children: [
            {
              path: '',
              element: <PlantsList />
            }, 
            {
              path: 'create',
              element: <CreatePlantPage />
            },
            {
              path: ':idPlant',
              element: <PlantViewPage />            
            },
            {
              path: ':idPlant/edit',
              element: <EditPlantPage />
            }
          ]
        },
        {
          path: 'plagues',
          element: <Outlet />,
          children: [
            {
              path: '',
              element: <PlaguesList />
            }, 
            {
              path: 'create',
              element: <CreatePlaguePage />
            },
            {
              path: ':idPlague',
              element: <PlagueViewPage />
            },
            {
              path: ':idPlague/edit',
              element: <EditPlaguePage />
            }
          ]
        },
        {
          path: 'home',
          element: <HomePage />
        },
        {
          path: 'about',
          element: <AboutPage />
        }  
      ]
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/logout',
      element: <Logout />
    },
    {
      path: '/register',
      element: <Register />
    }
  ]);

  export default route;