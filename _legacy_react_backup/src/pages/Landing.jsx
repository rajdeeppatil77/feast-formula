import React from 'react';
import { Search, ArrowRight, Pizza, Coffee, Utensils, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();

    const categories = [
        { name: 'Biryani', icon: '🥘' },
        { name: 'Pizza', icon: '🍕' },
        { name: 'Burger', icon: '🍔' },
        { name: 'Chinese', icon: '🥡' },
        { name: 'Rolls', icon: '🌯' },
        { name: 'Desserts', icon: '🍰' },
        { name: 'Healthy', icon: '🥗' },
        { name: 'Coffee', icon: '☕' },
    ];

    const featuredRestaurants = [
        {
            id: 1,
            name: "Mehfil Biryani House",
            cuisine: "North Indian, Biryani",
            rating: 4.5,
            time: "30-40 min",
            price: "₹350 for two",
            image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=500&auto=format&fit=crop"
        },
        {
            id: 2,
            name: "Truffles",
            cuisine: "American, Burgers",
            rating: 4.8,
            time: "25-30 min",
            price: "₹600 for two",
            image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=500&auto=format&fit=crop"
        },
        {
            id: 3,
            name: "Beijing Bites",
            cuisine: "Chinese, Thai",
            rating: 4.2,
            time: "40-50 min",
            price: "₹800 for two",
            image: "https://images.unsplash.com/photo-1541625602330-2277db6e7152?q=80&w=500&auto=format&fit=crop"
        },
        {
            id: 4,
            name: "Corner House Ice Creams",
            cuisine: "Desserts, Ice Cream",
            rating: 4.9,
            time: "15-20 min",
            price: "₹250 for two",
            image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=500&auto=format&fit=crop"
        }
    ];

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="bg-brand-50 py-20 lg:py-32">
                <div className="container px-4 md:px-6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                            Hungry? Desperate? <br />
                            <span className="text-brand-600">Feast Formula</span> is here.
                        </h1>
                        <p className="text-lg text-slate-600 max-w-[600px]">
                            Order food from favorite restaurants near you. Fast delivery, real-time tracking, and premium taste.
                        </p>
                        <div className="flex w-full max-w-sm items-center space-x-2">
                            <Input type="text" placeholder="Enter your delivery location..." className="h-12 text-base" />
                            <Button size="lg" className="h-12 px-8" onClick={() => navigate('/browse')}>Find Food</Button>
                        </div>
                        <div className="pt-4">
                            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Popular cities in India</p>
                            <div className="flex gap-2 text-sm text-slate-600 flex-wrap">
                                <span className="font-medium text-slate-900">Ahmedabad</span>
                                <span className="text-slate-300">•</span>
                                <span className="font-medium text-slate-900">Bangalore</span>
                                <span className="text-slate-300">•</span>
                                <span className="font-medium text-slate-900">Chennai</span>
                                <span className="text-slate-300">•</span>
                                <span className="font-medium text-slate-900">Delhi</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-4 bg-brand-200/50 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
                        <img
                            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop"
                            alt="Delicious Food"
                            className="relative rounded-3xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 object-cover w-full h-[500px]"
                        />
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-16 bg-background">
                <div className="container px-4 mx-auto">
                    <h2 className="text-2xl font-bold mb-8">What's on your mind?</h2>
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                        {categories.map((cat, idx) => (
                            <div key={idx} className="flex flex-col items-center group cursor-pointer" onClick={() => navigate('/browse')}>
                                <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center text-4xl shadow-sm group-hover:scale-110 transition-transform duration-300 group-hover:shadow-md mb-3 border-2 border-transparent group-hover:border-brand-200">
                                    {cat.icon}
                                </div>
                                <span className="font-medium text-slate-700">{cat.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Restaurants */}
            <section className="py-16 bg-slate-50">
                <div className="container px-4 mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold">Top Restaurants</h2>
                        <Button variant="ghost" className="text-brand-600 hover:text-brand-700" onClick={() => navigate('/browse')}>
                            See All <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredRestaurants.map((resto) => (
                            <Card key={resto.id} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate(`/restaurant/${resto.id}`)}>
                                <div className="h-48 overflow-hidden">
                                    <img src={resto.image} alt={resto.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                </div>
                                <CardContent className="p-4">
                                    <h3 className="font-bold text-lg mb-1">{resto.name}</h3>
                                    <div className="flex items-center space-x-1 mb-2">
                                        <div className="bg-green-600 text-white text-xs px-1.5 py-0.5 rounded flex items-center">
                                            <Star className="h-3 w-3 mr-0.5 fill-current" /> {resto.rating}
                                        </div>
                                        <span className="text-xs text-muted-foreground">• {resto.time}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground truncate">{resto.cuisine}</p>
                                    <p className="text-sm text-slate-500 mt-1">{resto.price}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* App Banner */}
            <section className="py-20">
                <div className="container px-4 mx-auto">
                    <div className="bg-slate-900 rounded-3xl p-12 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
                        <div className="z-10 space-y-6 md:w-1/2 text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-bold text-white">Get the Feast Formula App</h2>
                            <p className="text-slate-300 text-lg">
                                The best food delivery experience on your phone. <br />
                                Live tracking, faster delivery, and exclusive offers.
                            </p>
                            <div className="flex space-x-4 justify-center md:justify-start">
                                <Button className="bg-white text-slate-900 hover:bg-slate-100">Download on iOS</Button>
                                <Button variant="outline" className="border-white text-white hover:bg-white/10">Download on Android</Button>
                            </div>
                        </div>
                        <div className="md:w-1/2 mt-10 md:mt-0 relative z-10 flex justify-center">
                            {/* Phone Mockup Placeholder */}
                            <div className="w-64 h-96 bg-brand-500 rounded-[3rem] border-8 border-slate-800 shadow-2xl flex items-center justify-center">
                                <span className="text-white font-bold text-2xl">App UI</span>
                            </div>
                        </div>
                        {/* Background Decorative Elements */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-600 rounded-full opacity-20 filter blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-600 rounded-full opacity-20 filter blur-3xl"></div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;
