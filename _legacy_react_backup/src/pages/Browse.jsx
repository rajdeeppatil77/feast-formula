import React, { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RestaurantCard from '@/components/shared/RestaurantCard';

const Browse = () => {
    const [filter, setFilter] = useState('All');

    const filters = ["All", "Fast Delivery", "Rating 4.0+", "Pure Veg", "Offers"];

    const restaurants = [
        {
            id: 1,
            name: "Mehfil Biryani House",
            cuisine: "North Indian, Biryani",
            rating: 4.5,
            time: "30-40 min",
            price: "₹350 for two",
            discount: "50% OFF",
            image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=500&auto=format&fit=crop"
        },
        {
            id: 2,
            name: "Truffles",
            cuisine: "American, Burgers",
            rating: 4.8,
            time: "25-30 min",
            price: "₹600 for two",
            discount: "Free Delivery",
            image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=500&auto=format&fit=crop"
        },
        {
            id: 3,
            name: "Beijing Bites",
            cuisine: "Chinese, Thai",
            rating: 4.2,
            time: "40-50 min",
            price: "₹800 for two",
            discount: "Flat ₹100 OFF",
            image: "https://images.unsplash.com/photo-1541625602330-2277db6e7152?q=80&w=500&auto=format&fit=crop"
        },
        {
            id: 4,
            name: "Corner House Ice Creams",
            cuisine: "Desserts, Ice Cream",
            rating: 4.9,
            time: "15-20 min",
            price: "₹250 for two",
            discount: null,
            image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=500&auto=format&fit=crop"
        },
        {
            id: 5,
            name: "Pizza Hut",
            cuisine: "Pizza, Italian",
            rating: 3.8,
            time: "40-45 min",
            price: "₹400 for two",
            discount: "Buy 1 Get 1",
            image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=500&auto=format&fit=crop"
        },
        {
            id: 6,
            name: "Chai Point",
            cuisine: "Tea, Fast Food",
            rating: 4.3,
            time: "20-25 min",
            price: "₹150 for two",
            discount: "20% OFF",
            image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=500&auto=format&fit=crop"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Breadcrumb / Title */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Best Food in Bangalore</h1>
                <p className="text-muted-foreground">Found {restaurants.length} premium restaurants near you</p>
            </div>

            {/* Filters sticky bar */}
            <div className="sticky top-16 z-40 bg-background py-4 flex gap-2 overflow-x-auto no-scrollbar border-b mb-8 items-center bg-opacity-95 backdrop-blur-sm">
                <Button variant="outline" className="rounded-full flex items-center gap-2">
                    Filter <Filter className="h-4 w-4" />
                </Button>
                {filters.map((f, i) => (
                    <Button
                        key={i}
                        variant={filter === f ? "default" : "outline"}
                        className="rounded-full whitespace-nowrap"
                        onClick={() => setFilter(f)}
                    >
                        {f}
                    </Button>
                ))}
                <Button variant="outline" className="rounded-full flex items-center gap-2 ml-auto">
                    Sort By <ChevronDown className="h-4 w-4" />
                </Button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {restaurants.map((resto) => (
                    <RestaurantCard key={resto.id} restaurant={resto} />
                ))}
            </div>
        </div>
    );
};

export default Browse;
