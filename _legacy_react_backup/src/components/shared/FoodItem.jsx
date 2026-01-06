import React from 'react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

const FoodItem = ({ item, restaurantId }) => {
    const { addToCart, updateQuantity, cart } = useCart();

    // Check if item is in cart
    const cartItem = cart.find(i => i.id === item.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    return (
        <div className="group flex justify-between items-start pb-6 border-b last:border-0 relative">
            <div className="flex-1 pr-4">
                <div className="mb-1">
                    {item.isVeg ? (
                        <span className="text-[10px] border border-green-600 text-green-600 px-1 rounded-sm">VEG</span>
                    ) : (
                        <span className="text-[10px] border border-red-600 text-red-600 px-1 rounded-sm">NON-VEG</span>
                    )}
                </div>
                <h3 className="font-bold text-lg text-slate-800 mb-1">{item.name}</h3>
                <span className="font-medium text-slate-900 block mb-2">{formatCurrency(item.price)}</span>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{item.desc}</p>
                {/* Diet Badge if applicable */}
                {item.diet && (
                    <span className="inline-block mt-2 text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-200">
                        🌿 {item.diet}
                    </span>
                )}
            </div>
            <div className="relative w-32 h-24 flex-shrink-0">
                {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                ) : (
                    <div className="w-full h-full bg-slate-100 rounded-lg flex items-center justify-center text-xs text-muted-foreground">No Image</div>
                )}

                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 shadow-lg bg-white rounded-lg border border-slate-100 p-1 flex items-center justify-between min-w-[100px]">
                    {quantity > 0 ? (
                        <div className="flex items-center justify-between w-full font-bold text-green-600 text-sm">
                            <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-1 hover:bg-green-50 rounded">-</button>
                            <span>{quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-1 hover:bg-green-50 rounded">+</button>
                        </div>
                    ) : (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-full text-green-600 font-bold hover:bg-green-50 hover:text-green-700"
                            onClick={() => addToCart(item, restaurantId)}
                        >
                            ADD
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FoodItem;
