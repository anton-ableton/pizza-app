import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./shared/store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage/HomePage";
import CartPage from "./pages/CartPage/CartPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import OrderDetailsPage from "./pages/OrderDetailsPage/OrderDetailsPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import Layout from "./components/ui/Layout";
import ThemeProvider from "./shared/theme/ThemeProvider";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
            </Routes>
          </Layout>
          <ToastContainer />
        </ThemeProvider>
      </Router>
    </Provider>
  );
};

export default App;
