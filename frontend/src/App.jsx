import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layout & Components
import Sidebar from './components/Sidebar';
import AlertCenter from './components/AlertCenter';
import Breadcrumb from './components/Breadcrumb';
import LandingNavbar from './components/LandingNavbar';
import { Navigate } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import IntelligenceOverview from './pages/IntelligenceOverview';
import SearchPage from './pages/SearchPage';
import IntelligencePage from './pages/IntelligencePage';
import RelationshipGraphPage from './pages/RelationshipGraphPage';
import DirectoryPage from './pages/DirectoryPage';
import ReviewQueuePage from './pages/ReviewQueuePage';
import UploadDataPage from './pages/UploadDataPage';

// Auth Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// Services
import { DataService } from './services/dataService';

// Layout for Dashboard Pages
const DashboardLayout = ({ children, reviewCount }) => {
  return (
    <div className="dashboard-container">
      <Sidebar reviewCount={reviewCount} />
      <main className="main-content">
        <Breadcrumb />
        <div className="animate-fade-in">
          {children}
        </div>
      </main>
      <AlertCenter />
    </div>
  );
};

// Layout for Landing Page
const LandingLayout = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#060913' }}>
      <LandingNavbar />
      <div className="animate-fade-in">
        {children}
      </div>
    </div>
  );
};

// Layout for Auth Pages
const AuthLayout = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#060913', display: 'grid', placeItems: 'center' }}>
      <div className="animate-fade-in" style={{ width: '100%' }}>
        {children}
      </div>
    </div>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('ubid_session');
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  const [reviewCount, setReviewCount] = useState(8);

  useEffect(() => {
    DataService.init();
  }, []);

  const decrementReviewCount = () => {
    setReviewCount(prev => Math.max(0, prev - 1));
  };

  return (
    <Router>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a2035',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
          },
        }}
      />
      
      <Routes>
        {/* Landing Page Route */}
        <Route path="/" element={
          <LandingLayout>
            <Home />
          </LandingLayout>
        } />
        
        {/* Dashboard Routes (All wrapped in DashboardLayout and ProtectedRoute) */}
        <Route path="/intelligence-overview" element={
          <ProtectedRoute>
            <DashboardLayout reviewCount={reviewCount}>
              <IntelligenceOverview />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/search" element={
          <ProtectedRoute>
            <DashboardLayout reviewCount={reviewCount}>
              <SearchPage />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/intelligence" element={
          <ProtectedRoute>
            <DashboardLayout reviewCount={reviewCount}>
              <IntelligencePage />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/relationship-graph" element={
          <ProtectedRoute>
            <DashboardLayout reviewCount={reviewCount}>
              <RelationshipGraphPage />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/directory" element={
          <ProtectedRoute>
            <DashboardLayout reviewCount={reviewCount}>
              <DirectoryPage />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/review-queue" element={
          <ProtectedRoute>
            <DashboardLayout reviewCount={reviewCount}>
              <ReviewQueuePage onAction={decrementReviewCount} />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/upload-data" element={
          <ProtectedRoute>
            <DashboardLayout reviewCount={reviewCount}>
              <UploadDataPage />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout reviewCount={reviewCount}>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        } />

        {/* Auth Routes */}
        <Route path="/login" element={
          <AuthLayout>
            <Login />
          </AuthLayout>
        } />
        <Route path="/signup" element={
          <AuthLayout>
            <Signup />
          </AuthLayout>
        } />
        <Route path="/forgot-password" element={
          <AuthLayout>
            <ForgotPassword />
          </AuthLayout>
        } />
        <Route path="/reset-password" element={
          <AuthLayout>
            <ResetPassword />
          </AuthLayout>
        } />

        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
