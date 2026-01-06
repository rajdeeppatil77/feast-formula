import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LayoutDashboard, ShoppingBag, PieChart, Users, Settings, LogOut, ShieldAlert } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Sidebar = ({ role }) => {
    const { logout } = useAuth();

    const links = {
        admin: [
            { name: 'Overview', to: '/dashboard/admin', icon: LayoutDashboard },
            { name: 'Users', to: '/dashboard/admin/users', icon: Users },
            { name: 'Restaurants', to: '/dashboard/admin/restaurants', icon: ShoppingBag },
            { name: 'Fraud Alerts', to: '/dashboard/admin/fraud', icon: ShieldAlert },
        ],
        owner: [
            { name: 'Orders', to: '/dashboard/owner', icon: LayoutDashboard },
            { name: 'Menu', to: '/dashboard/owner/menu', icon: ShoppingBag },
            { name: 'Analytics', to: '/dashboard/owner/analytics', icon: PieChart },
        ]
    };

    const currentLinks = links[role] || [];

    return (
        <div className="w-64 bg-slate-900 min-h-screen text-white flex flex-col p-4">
            <div className="mb-8 p-2">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-500 to-brand-400 bg-clip-text text-transparent">Feast Formula</h1>
                <Badge className="mt-2 bg-slate-800 text-slate-300 pointer-events-none uppercase text-[10px] tracking-wider">{role} Panel</Badge>
            </div>

            <nav className="space-y-2 flex-1">
                {currentLinks.map((link, i) => (
                    <NavLink
                        key={i}
                        to={link.to}
                        end
                        className={({ isActive }) => cn(
                            "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium",
                            isActive ? "bg-brand-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                        )}
                    >
                        <link.icon className="h-5 w-5" />
                        {link.name}
                    </NavLink>
                ))}
            </nav>

            <div className="pt-8 border-t border-slate-800">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg transition-colors text-sm font-medium text-red-400 hover:bg-red-400/10"
                >
                    <LogOut className="h-5 w-5" />
                    Logout
                </button>
            </div>
        </div>
    );
};

// Helper Badge component needed since I used it above but it might not be auto-imported if I didn't verify
import { Badge } from '@/components/ui/badge';

export default Sidebar;
