import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, MapPin, Search as SearchIcon, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import FoodItem from '@/components/shared/FoodItem';
import DietWidget from '@/components/shared/DietWidget'; // IMP: Added DietWidget

const Restaurant = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { cart, updateQuantity, cartTotal, cartCount } = useCart();

    // Mock Data based on ID (simplified)
    const restaurant = {
        id: id,
        name: "Mehfil Biryani House",
        cuisine: "North Indian, Biryani, Mughlai",
        rating: 4.5,
        ratingCount: "10K+",
        time: "30-40 min",
        location: "Koramangala, Bangalore",
        distance: "2.5 km",
        offers: ["50% OFF up to ₹100", "Free Delivery"]
    };

    const categories = [
        {
            title: "Recommended",
            items: [
                { id: 101, name: "Chicken Biryani", price: 280, desc: "Aromatic basmati rice cooked with tender chicken pieces and spices.", isVeg: false, image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=200&auto=format&fit=crop", diet: "High Protein" },
                { id: 102, name: "Paneer Butter Masala", price: 240, desc: "Cottage cheese simmered in a rich tomato gravy.", isVeg: true, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=200&auto=format&fit=crop", diet: "Vegetarian" },
                { id: 103, name: "Garlic Naan", price: 60, desc: "Soft indian bread topped with garlic butter.", isVeg: true, image: null },
            ]
        },
        {
            title: "Starters",
            items: [
                { id: 104, name: "Chicken 65", price: 220, desc: "Spicy, deep-fried chicken dish.", isVeg: false, image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=200&auto=format&fit=crop", diet: "Spicy" },
                { id: 105, name: "Gobi Manchurian", price: 180, desc: "Cauliflower florets tossed in soya garlic sauce.", isVeg: true, image: null },
            ]
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* Restaurant Header */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6">
                    <div>
                        <h1 className="text-3xl font-extrabold mb-2">{restaurant.name}</h1>
                        <p className="text-muted-foreground mb-1">{restaurant.cuisine}</p>
                        <p className="text-muted-foreground text-sm flex items-center">
                            <MapPin className="h-3 w-3 mr-1" /> {restaurant.location} | {restaurant.distance}
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0 bg-white border rounded-lg p-3 shadow-sm text-center min-w-[100px]">
                        <div className="flex items-center justify-center text-green-700 font-bold text-xl mb-1">
                            <Star className="h-4 w-4 fill-current mr-1" /> {restaurant.rating}
                        </div>
                        <div className="text-xs text-muted-foreground border-t pt-2 mt-1">
                            {restaurant.ratingCount} ratings
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-2">
                    <div className="flex items-center gap-2 bg-brand-50 text-brand-700 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">
                        <Clock className="h-4 w-4" /> {restaurant.time}
                    </div>
                    {restaurant.offers.map((offer, i) => (
                        <div key={i} className="flex items-center gap-2 border border-brand-200 text-brand-600 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border-dashed">
                            🎟️ {offer}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Menu Column */}
                <div className="flex-1">
                    {/* Menu Search */}
                    <div className="relative mb-6">
                        <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search for dishes..." className="pl-10 bg-slate-50" />
                    </div>

                    {/* Diet Widget Embedded */}
                    <div className="mb-8">
                        <DietWidget />
                    </div>

                    {categories.map((cat, catIdx) => (
                        <div key={catIdx} className="mb-8">
                            <h2 className="text-xl font-bold mb-4 flex items-center">
                                {cat.title} <span className="text-sm font-normal text-muted-foreground ml-2">({cat.items.length})</span>
                            </h2>
                            <div className="space-y-0">
                                {cat.items.map((item) => (
                                    <FoodItem key={item.id} item={item} restaurantId={restaurant.id} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Cart Floating Panel (Desktop) */}
                <div className="hidden lg:block w-[350px] flex-shrink-0">
                    <div className="sticky top-24">
                        {cartCount > 0 ? (
                            <Card className="border-0 shadow-xl bg-white">
                                <CardContent className="p-0">
                                    <div className="p-4 border-b">
                                        <h3 className="font-bold text-lg">Cart</h3>
                                        <p className="text-xs text-muted-foreground">from {restaurant.name}</p>
                                    </div>
                                    <div className="max-h-[300px] overflow-y-auto p-4 space-y-4">
                                        {cart.map((item) => (
                                            <div key={item.id} className="flex justify-between items-center text-sm">
                                                <div className="flex items-center gap-2">
                                                    {item.isVeg ? <div className="h-3 w-3 border border-green-600 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-green-600"></div></div> : <div className="h-3 w-3 border border-red-600 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-red-600"></div></div>}
                                                    <span className="line-clamp-1 w-32">{item.name}</span>
                                                </div>
                                                <div className="flex items-center border rounded bg-slate-50">
                                                    <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-0.5 text-slate-500 hover:text-green-600 font-bold">-</button>
                                                    <span className="px-1 font-medium">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-0.5 text-green-600 hover:text-green-700 font-bold">+</button>
                                                </div>
                                                <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-4 bg-slate-50">
                                        <div className="flex justify-between font-bold text-lg mb-4">
                                            <span>Subtotal</span>
                                            <span>{formatCurrency(cartTotal)}</span>
                                        </div>
                                        <p className="text-xs text-center text-muted-foreground mb-4">Extra charges may apply</p>
                                        <Button className="w-full text-lg font-bold py-6" onClick={() => navigate('/cart')}>
                                            Checkout <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="text-center p-8 bg-slate-50 rounded-lg text-slate-400">
                                <ShoppingBag className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                <h3 className="font-semibold">Cart is Empty</h3>
                                <p className="text-sm">Add items to start your feast.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Floating Cart Button */}
            {cartCount > 0 && (
                <div className="fixed bottom-4 left-4 right-4 z-50 lg:hidden">
                    <Button className="w-full h-14 rounded-xl shadow-2xl flex justify-between items-center px-4 text-lg font-bold" onClick={() => navigate('/cart')}>
                        <span className="flex items-center gap-2">
                            {cartCount} Items | {formatCurrency(cartTotal)}
                        </span>
                        <span className="flex items-center">
                            View Cart <ShoppingBag className="ml-2 h-5 w-5" />
                        </span>
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Restaurant;
