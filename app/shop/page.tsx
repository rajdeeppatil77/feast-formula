'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { FoodCard } from '@/components/FoodCard';
import { foodItems } from '@/lib/data';
import { Button } from '@/components/Button';
import { motion } from 'framer-motion';

const categories = ['All', 'Burger', 'Pizza', 'Salad', 'Seafood', 'Dessert', 'Asian'];

export default function ShopPage() {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredItems = activeCategory === 'All'
        ? foodItems
        : foodItems.filter(item => item.category === activeCategory);

    return (
        <main className="min-h-screen bg-dark pt-32 pb-20 px-4 md:px-8">
            <Navbar />

            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Menu</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Explore our curated selection of delicious meals, prepared with love and the finest ingredients.
                    </p>
                </motion.div>

                {/* Filters */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={activeCategory === category ? 'primary' : 'ghost'}
                            onClick={() => setActiveCategory(category)}
                            className="rounded-full"
                        >
                            {category}
                        </Button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {filteredItems.map((item) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            key={item.id}
                        >
                            <FoodCard
                                id={item.id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                image={item.image}
                                rating={item.rating}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {filteredItems.length === 0 && (
                    <div className="text-center text-gray-400 py-20">
                        No items found in this category.
                    </div>
                )}
            </div>
        </main>
    );
}
