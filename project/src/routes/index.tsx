import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthGuard from '../components/auth/AuthGuard';
import DashboardLayout from '../layouts/DashboardLayout';
import LoginPage from '../pages/LoginPage';

// Import pages directly to avoid dynamic import issues
import SalesPage from '../pages/dashboard/SalesPage';
import OrdersPage from '../pages/dashboard/sales/OrdersPage';
import CustomersPage from '../pages/dashboard/sales/CustomersPage';
import PaymentsPage from '../pages/dashboard/sales/PaymentsPage';
import ReportsPage from '../pages/dashboard/sales/ReportsPage';
import ProductsPage from '../pages/dashboard/ProductsPage';
import ProductListPage from '../pages/dashboard/products/ProductListPage';
import ProductFormPage from '../pages/dashboard/products/ProductFormPage';
import ProductKitsPage from '../pages/dashboard/products/ProductKitsPage';
import CategoriesPage from '../pages/dashboard/products/CategoriesPage';
import BrandsPage from '../pages/dashboard/products/BrandsPage';
import CharacteristicsPage from '../pages/dashboard/products/CharacteristicsPage';
import BatchUpdatePage from '../pages/dashboard/products/BatchUpdatePage';
import ProductReportsPage from '../pages/dashboard/products/ProductReportsPage';
import FinancesPage from '../pages/dashboard/FinancesPage';
import ShippingPage from '../pages/dashboard/ShippingPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      <Route
        path="/dashboard"
        element={
          <AuthGuard>
            <DashboardLayout />
          </AuthGuard>
        }
      >
        <Route index element={<Navigate to="/dashboard/sales" replace />} />
        <Route path="sales" element={<SalesPage />} />
        <Route path="sales/orders" element={<OrdersPage />} />
        <Route path="sales/customers" element={<CustomersPage />} />
        <Route path="sales/payments" element={<PaymentsPage />} />
        <Route path="sales/reports" element={<ReportsPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/list" element={<ProductListPage />} />
        <Route path="products/new" element={<ProductFormPage />} />
        <Route path="products/:id" element={<ProductFormPage />} />
        <Route path="products/:id/edit" element={<ProductFormPage />} />
        <Route path="products/kits" element={<ProductKitsPage />} />
        <Route path="products/categories" element={<CategoriesPage />} />
        <Route path="products/brands" element={<BrandsPage />} />
        <Route path="products/characteristics" element={<CharacteristicsPage />} />
        <Route path="products/batch-update" element={<BatchUpdatePage />} />
        <Route path="products/reports" element={<ProductReportsPage />} />
        <Route path="finances" element={<FinancesPage />} />
        <Route path="shipping" element={<ShippingPage />} />
      </Route>
      
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}