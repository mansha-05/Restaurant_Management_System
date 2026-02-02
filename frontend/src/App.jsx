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
//import ManagerDashboard from './pages/Manager/ManagerDashboard/ManagerDashboard'
import OrdersManagement from './pages/Manager/OrdersManagement/OrdersManagement'
import ReservationsManagement from './pages/Manager/ReservationsManagement/ReservationsManagement'
import MenuManagement from './pages/Manager/MenuManagement/MenuManagement'
import TableManagement from './pages/Manager/TableManagement/TableManagement'
import FeedbackManagement from './pages/Manager/FeedbackManagement/FeedbackManagement'
import Feedback from './pages/Feedback/Feedback'
import Checkout from './pages/Checkout/Checkout'
//import OrderSuccess from './pages/OrderSuccess/OrderSuccess'
import PaymentSuccess from './pages/PaymentSuccess/PaymentSuccess'
import Profile from './pages/Profile/Profile'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'

function App() {
  return (
    <div>
    <AuthProvider>
      <Routes>
        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/home" replace />} />

    <Route path="/home" element={<Home />}>
      <Route index element={<HomeContents/>} />
      <Route path="menu" element={<Menu />} />
      <Route path="orders" element={<Orders />} />
      <Route path="reserve" element={<Reserve />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="feedback" element={<ProtectedRoutes><Feedback /></ProtectedRoutes>} />
      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={<ProtectedRoutes><Checkout /></ProtectedRoutes>} />
      <Route path="payment-success" element={<ProtectedRoutes><PaymentSuccess /></ProtectedRoutes>} />
      <Route path="order-success" element={<h2>Order Placed Successfully 🎉</h2>} />
      <Route path="profile" element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
    </Route>
      <Route path="/payment-success" element={<PaymentSuccess />} />
  
        <Route path='/admin' element={<ProtectedRoutes allowedRoles={["ADMIN"]}><AdminHome /></ProtectedRoutes>}>
          <Route path='/admin' element={<AdminHome/>}/>
          <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
          <Route path='/admin/staff' element={<StaffManagement/>}/>
          <Route path='/admin/users' element={<UserManagement/>}/>
          <Route path='/admin/categories' element={<CategoryManagement/>}/>
        </Route>
        <Route path='/manager' element={<ProtectedRoutes allowedRoles={["MANAGER"]}><ManagerHome /></ProtectedRoutes>}>
          <Route path='/manager' element={<OrdersManagement/>}/>
          <Route path='/manager/orders' element={<OrdersManagement/>}/>
          <Route path='/manager/reservations' element={<ReservationsManagement/>}/>
          <Route path='/manager/menu' element={<MenuManagement/>}/>
          <Route path='/manager/tables' element={<TableManagement/>}/>
          <Route path='/manager/feedback' element={<FeedbackManagement/>}/>
        </Route>
        
        </Routes>
        </AuthProvider>
      <ToastContainer/>
      </div>
  )
}

export default App;