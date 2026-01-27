import {Navigate, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
//import AdminHome from './pages/Admin/AdminHome/AdminHome'
//import AdminDashboard from './pages/Admin/AdminDashboard/AdminDashboard'
//import RoleSelection from './pages/RoleSelection/RoleSelection'
import Menu from './pages/Menu/Menu'
import Cart from './pages/Cart/Cart'
import Orders from './pages/Orders/Orders'
import './App.css'
import Reserve from './pages/Reserve/Reserve';
import HomeContents from './pages/HomeContents/HomeContents'
import {ToastContainer} from 'react-toastify'
import AuthProvider from './providers/AuthProvider'

function App() {

  return (
    <div>
      <AuthProvider>
      <Routes>
  <Route path="/" element={<Navigate to="/home" replace />} />

    <Route path="/home" element={<Home />}>
      <Route index element={<HomeContents/>} />
      <Route path="menu" element={<Menu />} />
      <Route path="orders" element={<Orders />} />
      <Route path="reserve" element={<Reserve />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Route>
  
        {/*<Route path='/admin' element={<AdminHome/>}>
          {/* <Route path='/admin_home' element={<AdminHome/>}/> */}
          {/*<Route path='/admin/dashboard' element={<AdminDashboard/>}/>
        </Route>*/}
        <Route path="/cart" element={<Cart />} />
        </Routes>
        </AuthProvider>
      <ToastContainer/>
    </div>
  )
}

export default App
