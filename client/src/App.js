import {Routes, Route} from 'react-router-dom'
import HomePage from "./pages/homePage";
import Login from './pages/Login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import NotFound from './pages/notFound';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from './components/routes/PrivateRoute';
import PublicRoute from './components/routes/PublicRoute';

function App() {
  return (
    <>
      {" "}
      <ToastContainer/>
     <Routes>
      <Route path='/' element={<PublicRoute> <HomePage/> </PublicRoute>} />
      <Route path='/login' element={<PublicRoute> <Login/> </PublicRoute>} />
      <Route path='/register' element={<PublicRoute> <Register/> </PublicRoute>} />
      <Route path='/dashboard' element={<PrivateRoute> <Dashboard/> </PrivateRoute>}/>
      <Route path='*' element={<NotFound/>} />
     </Routes>
    </>
  );
}

export default App;
