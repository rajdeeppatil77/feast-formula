'use client';

import Image from 'next/image';
import { Star, Plus } from 'lucide-react';
import { Button } from './Button';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';

interface FoodCardProps {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    rating: number;
}

export function FoodCard({ id, name, description, price, image, rating }: FoodCardProps) {
    const { addItem } = useCart();
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-dark-lighter/50 backdrop-blur-sm border border-white/5 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 group"
        >
            <div className="relative h-48 w-full overflow-hidden">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-bold">{rating}</span>
                </div>
            </div>

            <div className="p-5">
                <h3 className="text-lg font-bold mb-1 truncate">{name}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{description}</p>

                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">${price.toFixed(2)}</span>
                    <Button
                        size="sm"
                        className="rounded-full w-8 h-8 p-0 flex items-center justify-center bg-white/10 hover:bg-primary text-white"
                        onClick={() => addItem({ id, name, price, image })}
                    >
                        <Plus size={18} />
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
