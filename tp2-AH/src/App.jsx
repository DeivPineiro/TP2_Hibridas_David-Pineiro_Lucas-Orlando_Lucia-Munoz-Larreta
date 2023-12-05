import Footer from './components/Footer';
import Header from './components/Header';
import { RouterProvider, Outlet} from 'react-router-dom';
import route from './routes/route.jsx';
import './App.css';

function AppMain() {
  return (
    <div>      
      <Header />      
      <Outlet />
      <Footer />
    </div>
  )
}

function App() {
  return <>
    <RouterProvider router={route} />
  </>
}

export {
  App,
  Header ,
  AppMain 
}
export default App