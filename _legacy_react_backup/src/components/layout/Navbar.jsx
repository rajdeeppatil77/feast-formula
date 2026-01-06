import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Search, ShoppingBag, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center px-4 max-w-7xl">
                {/* Logo */}
                <Link to="/" className="mr-8 flex items-center space-x-2">
                    <span className="text-2xl font-bold bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
                        Feast Formula
                    </span>
                </Link>

                {/* Location & Search (Hidden on mobile) */}
                <div className="hidden md:flex items-center flex-1 space-x-4">
                    <div className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                        <MapPin className="mr-1 h-4 w-4 text-brand-500" />
                        <span>Bangalore, India</span>
                    </div>

                    <div className="relative w-full max-w-md ml-4">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search for restaurants and food..."
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center space-x-4 ml-auto">
                    {/* Cart */}
                    <Link to="/cart">
                        <Button variant="ghost" size="icon" className="relative">
                            <ShoppingBag className="h-5 w-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
                                    {cartCount}
                                </span>
                            )}
                        </Button>
                    </Link>

                    {/* User Auth */}
                    {user ? (
                        <div className="flex items-center space-x-4">
                            <Link to="/profile">
                                <Button variant="ghost" className="flex items-center space-x-2">
                                    <User className="h-5 w-5" />
                                    <span className="hidden sm:inline-block">{user.name}</span>
                                </Button>
                            </Link>
                            <Button variant="ghost" size="icon" onClick={logout}>
                                <LogOut className="h-5 w-5 text-muted-foreground" />
                            </Button>
                        </div>
                    ) : (
                        <div className="flex space-x-2">
                            <Button variant="ghost" onClick={() => navigate('/auth')}>Login</Button>
                            <Button onClick={() => navigate('/auth')}>Sign Up</Button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
