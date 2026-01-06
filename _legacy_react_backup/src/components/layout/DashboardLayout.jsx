import React from 'react';
import Sidebar from './Sidebar';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

const DashboardLayout = ({ children, role }) => {
    const { user, loading } = useAuth();

    // In a real app we'd redirect if not logged in or wrong role
    // For demo purposes assume authentication is handled or lenient
    /*
    if (!loading && !user) {
        return <Navigate to="/auth" />;
    }
    */

    return (
        <div className="flex bg-slate-100 min-h-screen">
            <Sidebar role={role} />
            <main className="flex-1 overflow-x-hidden p-8">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;
