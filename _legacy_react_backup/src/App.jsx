import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';

// Pages
import Landing from '@/pages/Landing';
import Auth from '@/pages/Auth';
import Browse from '@/pages/Browse';
import Restaurant from '@/pages/Restaurant';
import Cart from '@/pages/Cart';
import OrderTracking from '@/pages/OrderTracking';

// Dashboards
import AdminDashboard from '@/pages/dashboards/AdminDashboard';
import OwnerDashboard from '@/pages/dashboards/OwnerDashboard';
import CustomerDashboard from '@/pages/dashboards/CustomerDashboard';
import DeliveryDashboard from '@/pages/dashboards/DeliveryDashboard';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

const Layout = ({ children }) => {
    const location = useLocation();
    // Don't show Navbar/Footer on Dashboard routes (except Customer for now)
    const isDashboard = location.pathname.startsWith('/dashboard') && !location.pathname.startsWith('/dashboard/customer');

    return (
        <div className="flex flex-col min-h-screen">
            {!isDashboard && <Navbar />}
            <main className="flex-1">
                {children}
            </main>
            {!isDashboard && <Footer />}
        </div>
    )
}

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <ScrollToTop />
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Layout><Landing /></Layout>} />
                        <Route path="/auth" element={<Layout><Auth /></Layout>} />
                        <Route path="/browse" element={<Layout><Browse /></Layout>} />
                        <Route path="/restaurant/:id" element={<Layout><Restaurant /></Layout>} />
                        <Route path="/cart" element={<Layout><Cart /></Layout>} />
                        <Route path="/tracking" element={<Layout><OrderTracking /></Layout>} />

                        {/* Redirects */}
                        <Route path="/profile" element={<Layout><CustomerDashboard /></Layout>} />

                        {/* Dashboard Routes */}
                        <Route path="/dashboard/customer" element={<Layout><CustomerDashboard /></Layout>} />

                        <Route path="/dashboard/delivery" element={<div className="min-h-screen bg-slate-100"><Navbar /><DeliveryDashboard /></div>} />

                        {/* Admin & Owner */}
                        <Route path="/dashboard/admin/*" element={
                            <DashboardLayout role="admin">
                                <AdminDashboard />
                            </DashboardLayout>
                        } />

                        <Route path="/dashboard/owner/*" element={
                            <DashboardLayout role="owner">
                                <OwnerDashboard />
                            </DashboardLayout>
                        } />

                    </Routes>
                </Router>
            </CartProvider>
        </AuthProvider>
    )
}

export default App
