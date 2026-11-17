import React from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";
import { CartProvider, useCart } from "./context/CartContext";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import AdminProductsPage from "./pages/AdminProductsPage";
import AdminTransactionsPage from "./pages/AdminTransactionsPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import CartPage from "./pages/CartPage";
import FundWalletPage from "./pages/FundWalletPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import NotFoundPage from "./pages/NotFoundPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import ProductPage from "./pages/ProductPage";
import ReceiptPage from "./pages/ReceiptPage";
import RegisterPage from "./pages/RegisterPage";
import SendMoneyPage from "./pages/SendMoneyPage";
import TransactionsPage from "./pages/TransactionsPage";
import WalletPage from "./pages/WalletPage";

function ProtectedRoute({ children, admin = false }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <p role="status">Chargement...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (admin && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

function Application() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const location = useLocation();
  const hideLayout = ["/login", "/register"].includes(location.pathname);

  if (hideLayout) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    );
  }

  return (
    <div className="app-shell">
      <Navbar user={user} onLogout={logout} cartCount={itemCount} />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wallet" element={<ProtectedRoute><WalletPage /></ProtectedRoute>} />
          <Route path="/wallet/fund" element={<ProtectedRoute><FundWalletPage /></ProtectedRoute>} />
          <Route path="/wallet/send" element={<ProtectedRoute><SendMoneyPage /></ProtectedRoute>} />
          <Route path="/wallet/transactions" element={<ProtectedRoute><TransactionsPage /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><MyOrdersPage /></ProtectedRoute>} />
          <Route path="/orders/:id" element={<ProtectedRoute><OrderDetailPage /></ProtectedRoute>} />
          <Route path="/orders/:id/receipt" element={<ProtectedRoute><ReceiptPage /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute admin><AdminDashboardPage /></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute admin><AdminProductsPage /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute admin><AdminOrdersPage /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute admin><AdminUsersPage /></ProtectedRoute>} />
          <Route path="/admin/transactions" element={<ProtectedRoute admin><AdminTransactionsPage /></ProtectedRoute>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Application />
      </CartProvider>
    </BrowserRouter>
  );
}
