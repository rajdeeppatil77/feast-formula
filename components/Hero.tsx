'use client';

import { motion } from 'framer-motion';
import { Button } from './Button';
import Image from 'next/image';

// Using high-quality food images that match the dark/premium aesthetic
const heroImages = [
    'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1000', // Ribs/Steak (Main)
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1000', // BBQ/Grill (Top Right)
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=1000', // Pizza (Bottom Left)
];

export function Hero() {
    return (
        <section className="relative w-full min-h-screen bg-dark flex items-center justify-center overflow-hidden px-6 md:px-12 pt-32 pb-20">

            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left: Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-start gap-8 z-10"
                >
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1]">
                            Tasty Meals
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-lg font-light">
                            This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.
                        </p>
                    </div>

                    <div className="h-px w-24 bg-white/10 my-2"></div>

                    <Button className="bg-primary hover:bg-primary-hover text-white px-10 py-6 text-lg font-medium rounded-full shadow-lg shadow-orange-500/25 transition-transform hover:scale-105 active:scale-95">
                        Start Now &gt;
                    </Button>
                </motion.div>

                {/* Right: 3 Overlapping Images (Strict adherence to reference) */}
                <div className="relative h-[500px] w-full flex items-center justify-center">

                    {/* 1. Back/Top-Right Image (Kitchen/Chef) */}
                    <motion.div
                        initial={{ opacity: 0, y: -20, x: 20 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="absolute top-0 right-10 w-64 h-80 rounded-[32px] overflow-hidden shadow-2xl border-[6px] border-white/5 z-0"
                        style={{ transform: 'rotate(5deg)' }}
                    >
                        <Image
                            src={heroImages[1]}
                            alt="Chef Cooking"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/10"></div>
                    </motion.div>

                    {/* 2. Front/Bottom-Left Image (Bread/Ingredients) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20, x: -20 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="absolute bottom-0 left-10 w-72 h-64 rounded-[32px] overflow-hidden shadow-2xl border-[6px] border-white/5 z-20"
                        style={{ transform: 'rotate(-3deg)' }}
                    >
                        <Image
                            src={heroImages[2]}
                            alt="Fresh Ingredients"
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    {/* 3. Center/Main Image (Plated Food) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-96 rounded-[32px] overflow-hidden shadow-2xl shadow-black/50 border-[6px] border-dark z-10"
                    >
                        <Image
                            src={heroImages[0]}
                            alt="Delicious Meal"
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                </div>

            </div>
        </section>
    );
}
