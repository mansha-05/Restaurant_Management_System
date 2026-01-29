import {Navigate, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import AdminHome from './pages/Admin/AdminHome/AdminHome'
import AdminDashboard from './pages/Admin/AdminDashboard/AdminDashboard'
//import RoleSelection from './pages/RoleSelection/RoleSelection'
import Menu from './pages/Menu/Menu'
import Cart from './pages/Cart/Cart'
import Orders from './pages/Orders/Orders'
import './App.css'
import Reserve from './pages/Reserve/Reserve';
import HomeContents from './pages/HomeContents/HomeContents'
import {ToastContainer} from 'react-toastify'
import AuthProvider from './providers/AuthProvider'
import StaffManagement from './pages/Admin/StaffManagement/StaffManagement';
import UserManagement from './pages/Admin/UserManagement/UserManagement'
import CategoryManagement from './pages/Admin/CategoryManagement/CategoryManagement'
import ManagerHome from './pages/Manager/ManagerHome/ManagerHome'
import ManagerDashboard from './pages/Manager/ManagerDashboard/ManagerDashboard'
import OrdersManagement from './pages/Manager/OrdersManagement/OrdersManagement'
import ReservationsManagement from './pages/Manager/ReservationsManagement/ReservationsManagement'
import MenuManagement from './pages/Manager/MenuManagement/MenuManagement'
import TableManagement from './pages/Manager/TableManagement/TableManagement'
import FeedbackManagement from './pages/Manager/FeedbackManagement/FeedbackManagement'
import Feedback from './pages/Feedback/Feedback'

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
      <Route path="feedback" element={<Feedback />} />
      <Route path="cart" element={<Cart />} />
    </Route>
  
        <Route path='/admin' element={<AdminHome/>}>
          <Route path='/admin' element={<AdminHome/>}/>
          <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
          <Route path='/admin/staff' element={<StaffManagement/>}/>
          <Route path='/admin/users' element={<UserManagement/>}/>
          <Route path='/admin/categories' element={<CategoryManagement/>}/>
        </Route>
        <Route path='/manager' element={<ManagerHome/>}>
          <Route path='/manager' element={<ManagerHome/>}/>
          <Route path='/manager/dashboard' element={<ManagerDashboard/>}/>
          <Route path='/manager/orders' element={<OrdersManagement/>}/>
          <Route path='/manager/reservations' element={<ReservationsManagement/>}/>
          <Route path='/manager/menu' element={<MenuManagement/>}/>
          <Route path='/manager/table' element={<TableManagement/>}/>
          <Route path='/manager/feedback' element={<FeedbackManagement/>}/>
        </Route>
        
        </Routes>
        </AuthProvider>
      <ToastContainer/>
    </div>
  )
}

export default App
