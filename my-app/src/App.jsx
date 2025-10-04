import React, { useContext } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Registration from './pages/registration.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/login.jsx';
import Nav from './component/Nav.jsx';
import { userDataContext } from './contaxt/UserContext.jsx';
import About from './pages/About.jsx';
import Collection from './pages/Collection.jsx';
import Contact from './pages/Contact.jsx';
import Product from './pages/Product.jsx';
import WhatsAppButton from './component/WhatsappButton.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import PlaceOrder from './pages/PlaceOrder.jsx';
import Order from './pages/Order.jsx';

function App() {
  const { userData } = useContext(userDataContext);
  const location = useLocation();

  const hideNavPaths = ['/login', '/signup'];
  const shouldHideNav = hideNavPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideNav && <Nav />}

      <Routes>
        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            userData ? (
              <Navigate to={location.state?.from || "/"} />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/signup"
          element={
            userData ? (
              <Navigate to={location.state?.from || "/"} />
            ) : (
              <Registration />
            )
          }
        />

        {/* ✅ Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product" element={<Product />} />
        <Route path="/productdetail/:productId" element={<ProductDetail />} />

        {/* 🔒 Protected Routes */}
        <Route
          path="/cart"
          element={
            userData ? (
              <Cart />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path="/placeorder"
          element={
            userData ? (
              <PlaceOrder />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path="/order"
          element={
            userData ? (
              <Order />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
      </Routes>

      {/* ✅ WhatsApp Button (login/signup ke alawa show hoga) */}
      {!shouldHideNav && <WhatsAppButton />}
    </>
  );
}

export default App;
