'use client';

import Link from 'next/link';
import { ShoppingCart, Search, User, Menu } from 'lucide-react';
import { Button } from './Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export function Navbar() {
    const { totalItems, toggleCart } = useCart();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <div className="fixed top-6 left-0 right-0 z-50 flex justify-center w-full px-4 pointer-events-none">
                <nav className="w-full max-w-6xl pointer-events-auto">
                    <div className="bg-dark-lighter/95 backdrop-blur-md border border-white/5 rounded-full px-6 py-4 flex items-center justify-between shadow-2xl shadow-black/40">

                        {/* Left: Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center relative overflow-hidden">
                                {/* Placeholder Logo matching reference style */}
                                <div className="absolute inset-0 border-2 border-dark rounded-full m-0.5"></div>
                                <span className="text-dark font-serif font-black text-[10px] text-center leading-none z-10">FEAST<br />FORMULA</span>
                            </div>
                        </Link>

                        {/* Middle: Navigation */}
                        <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
                            <Link href="/" className="bg-primary text-white px-6 py-2 rounded-full font-medium text-sm transition-transform hover:scale-105 shadow-lg shadow-orange-500/30">
                                Home
                            </Link>
                            <Link href="/shop" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                                Shop
                            </Link>
                            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                                Contact us
                            </Link>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 bg-dark/50 rounded-full px-2 py-1 border border-white/5">
                                <Button variant="icon" onClick={toggleCart} className="text-gray-400 hover:text-white relative w-10 h-10 bg-transparent hover:bg-white/10 rounded-full">
                                    <ShoppingCart size={18} />
                                    {totalItems > 0 && (
                                        <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-primary border-2 border-dark"></span>
                                    )}
                                </Button>
                                <Button variant="icon" className="text-gray-400 hover:text-white w-10 h-10 bg-transparent hover:bg-white/10 rounded-full hidden sm:flex">
                                    <Search size={18} />
                                </Button>
                                <Button variant="icon" className="text-gray-400 hover:text-white w-10 h-10 bg-transparent hover:bg-white/10 rounded-full hidden sm:flex">
                                    <User size={18} />
                                </Button>
                            </div>

                            <Link href="/contact" className="hidden sm:block">
                                <Button className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full font-medium text-sm shadow-xl shadow-orange-500/20 transition-transform hover:scale-105">
                                    Contact Us
                                </Button>
                            </Link>

                            {/* Mobile Menu Toggle */}
                            <Button
                                variant="icon"
                                className="md:hidden text-gray-400 ml-2"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                <Menu size={24} />
                            </Button>
                        </div>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-28 left-4 right-4 bg-dark-lighter border border-white/10 rounded-3xl p-6 z-40 flex flex-col gap-4 shadow-2xl md:hidden"
                    >
                        <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-white">Home</Link>
                        <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-white">Shop</Link>
                        <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-white">Contact</Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
