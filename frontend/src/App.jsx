import { Navigate, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Menu from "./pages/Menu/Menu";
import Cart from "./pages/Cart/Cart";
import Orders from "./pages/Orders/Orders";
import Reserve from "./pages/Reserve/Reserve";
import HomeContents from "./pages/HomeContents/HomeContents";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./providers/AuthProvider";
import ManagerHome from './pages/Manager/ManagerHome/ManagerHome'

// import ManagerLayout from "./pages/Manager/ManagerLayout";
// import ManagerDashboard from "./pages/Manager/ManagerDashboard/ManagerDashboard";
// import ReservationsManagement from "./pages/Manager/ReservationsManagement";
// Import the new Table Management component

import TableManagement from "./components/table/TableManagement"; 

import "./App.css";
import ReservationsManagement from './pages/Manager/ReservationsManagement/ReservationsManagement';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* CUSTOMER ROUTES */}
        <Route path="/home" element={<Home />}>
          <Route index element={<HomeContents />} />
          <Route path="menu" element={<Menu />} />
          <Route path="orders" element={<Orders />} />
          <Route path="reserve" element={<Reserve />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* MANAGER ROUTES */}
        <Route path='/manager' element={<ManagerHome/>}>
          <Route path='/manager' element={<ManagerHome/>}/>
          {/* <Route path='/manager/dashboard' element={<ManagerDashboard/>}/> */}
          {/* <Route path='/manager/orders' element={<OrdersManagement/>}/> */}
          <Route path='/manager/reservations' element={<ReservationsManagement/>}/>
          {/* <Route path='/manager/menu' element={<MenuManagement/>}/> */}
          <Route path='/manager/table' element={<TableManagement/>}/>
          {/* <Route path='/manager/feedback' element={<FeedbackManagement/>}/> */}
        </Route>

        {/* COMMON */}
        <Route path="/cart" element={<Cart />} />
      </Routes>

      <ToastContainer />
    </AuthProvider>
  );
}

export default App;