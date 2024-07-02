import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Brands from './components/Brands/Brands';
import Notfound from './components/Notfound/Notfound';
import Categories from './components/Categories/Categories';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Cart from './components/Cart/Cart';
import Products from './components/Products/Products';
import Wishlist from './components/Wishlist/Wishlist';
import ProductDetails from './components/ProductDetails/ProductDetails';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import UserContextProvider from './Context/UserContext';
import CounterContextProvider from './Context/CounterContext';
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Profile from './components/Profile/Profile';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import ResetCode from './components/ResetCode/ResetCode';
import ResetPassword from './components/ResetPassword/ResetPassword';
import WishListContextProvider from './Context/WishListContext';
import UpdateUserPassword from './components/UpdateUserPassword/UpdateUserPassword';
import UserAddresses from './components/UserAddresses/UserAddresses';
import AddressContextProvider from './Context/AddressesContext';
import Orders from './components/Orders/Orders';
import OrdersDetails from './components/OrdersDetails/OrdersDetails';



const routers = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <ProtectedRoute> <Home /> </ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute> <Brands /> </ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: 'UpdateUserPassword', element: <ProtectedRoute><UpdateUserPassword /></ProtectedRoute> },
      { path: 'Addresses', element: <ProtectedRoute><UserAddresses /></ProtectedRoute> },
      { path: 'Login', element: <Login /> },
      { path: 'Register', element: <Register /> },
      { path: 'forgetPassword', element: <ForgetPassword /> },
      { path: 'resetCode', element: <ResetCode /> },
      { path: 'resetPassword', element: <ResetPassword /> },
      { path: 'Cart', element: <ProtectedRoute> <Cart /></ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute> <Orders /></ProtectedRoute> },
      { path: 'orders/:id', element: <ProtectedRoute> <OrdersDetails /></ProtectedRoute> },
      { path: 'wishlist', element: <ProtectedRoute>  <Wishlist /> </ProtectedRoute> },
      { path: 'Products', element: <ProtectedRoute> <Products /> </ProtectedRoute> },
      { path: 'Profile', element: <ProtectedRoute> <Profile /> </ProtectedRoute> },
      { path: 'ProductDetails/:id/:category', element: <ProtectedRoute> <ProductDetails /> </ProtectedRoute> },
      { path: '*', element: <Notfound /> },
    ]
  }
])
function App() {

  return (

    <UserContextProvider>
        <WishListContextProvider>
      <CartContextProvider >
          <AddressContextProvider>

            <CounterContextProvider>
              <RouterProvider router={routers} />

            </CounterContextProvider>
          </AddressContextProvider>

        <Toaster />
      </CartContextProvider>
        </WishListContextProvider>
    </UserContextProvider>

  );
}

export default App;
