import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
    const navigate = useNavigate();

    return (
        <Card
            className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 border-transparent hover:border-brand-100"
            onClick={() => navigate(`/restaurant/${restaurant.id}`)}
        >
            <div className="relative h-60 overflow-hidden rounded-t-lg">
                <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {restaurant.discount && (
                    <div className="absolute bottom-3 left-3 bg-brand-600 text-white text-xs font-bold px-2 py-1 rounded-sm shadow-sm">
                        {restaurant.discount}
                    </div>
                )}
            </div>
            <CardContent className="p-4">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-lg text-slate-900 line-clamp-1">{restaurant.name}</h3>
                    <div className="bg-green-700 text-white text-xs px-1.5 py-0.5 rounded flex items-center flex-shrink-0">
                        {restaurant.rating} <Star className="h-3 w-3 ml-0.5 fill-current" />
                    </div>
                </div>
                <div className="flex justify-between items-center text-sm text-slate-500 mb-2">
                    <span className="truncate max-w-[60%]">{restaurant.cuisine}</span>
                    <span>{restaurant.price}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-dashed">
                    <span className="text-xs font-medium text-slate-400 flex items-center">
                        <Clock className="h-3 w-3 mr-1" /> {restaurant.time}
                    </span>
                    <Button variant="ghost" size="sm" className="h-8 text-brand-600 hover:text-brand-700 hover:bg-brand-50 p-0 font-bold uppercase text-xs">
                        Quick View
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default RestaurantCard;
