import './App.css';
import Login from './pages/login/Login';
import Register from './pages/registration/Register';
import Dashboard from './pages/dashboard/Dashboard';
import Layout from './components/layout/Layout';
import { Routes, Route } from 'react-router-dom';
import {ToastContainer} from 'react-toastify'

function App() {
  return (
    <div className="wrapper">
      <Layout>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="dashboard" element={ <Dashboard/>}/>
        </Routes>
      
      
     

      </Layout>
      <ToastContainer/>
      
    </div>
  );
}

export default App;
