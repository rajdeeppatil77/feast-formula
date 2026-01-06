import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Phone, CheckCircle } from 'lucide-react';

const DeliveryDashboard = () => {
    const [status, setStatus] = useState('online');

    return (
        <div className="p-4 md:p-8 max-w-lg mx-auto md:max-w-4xl">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Delivery Partner</h1>
                    <p className="text-muted-foreground">ID: DEL-8821</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Status:</span>
                    <Button
                        size="sm"
                        variant={status === 'online' ? 'default' : 'outline'}
                        className={status === 'online' ? 'bg-green-600 hover:bg-green-700' : ''}
                        onClick={() => setStatus(status === 'online' ? 'offline' : 'online')}
                    >
                        {status === 'online' ? 'ONLINE' : 'OFFLINE'}
                    </Button>
                </div>
            </div>

            {/* Earnings Summary */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <Card>
                    <CardContent className="p-4 text-center">
                        <div className="text-3xl font-bold text-brand-600">₹850</div>
                        <div className="text-xs text-muted-foreground">Today's Earnings</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 text-center">
                        <div className="text-3xl font-bold text-slate-800">12</div>
                        <div className="text-xs text-muted-foreground">Orders Delivered</div>
                    </CardContent>
                </Card>
            </div>

            {/* Current Order */}
            <h2 className="font-bold text-lg mb-4">Current Active Order</h2>
            <Card className="border-brand-500 shadow-md">
                <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 mb-2">PICKUP PENDING</Badge>
                            <h3 className="font-bold text-xl">Mehfil Biryani House</h3>
                            <p className="text-sm text-slate-500">Koramangala 5th Block</p>
                        </div>
                        <Button size="icon" variant="outline" className="rounded-full">
                            <Navigation className="h-5 w-5 text-blue-600" />
                        </Button>
                    </div>

                    <div className="relative pl-4 border-l-2 border-dashed border-slate-300 space-y-6">
                        <div className="relative">
                            <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-brand-500 ring-4 ring-white"></div>
                            <p className="text-xs font-bold text-slate-400">PICKUP</p>
                            <p className="font-medium">Mehfil Biryani House</p>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-slate-300 ring-4 ring-white"></div>
                            <p className="text-xs font-bold text-slate-400">DROP</p>
                            <p className="font-medium">Skyline Apartments, Flat 102</p>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t">
                        <Button className="flex-1 text-lg font-bold h-12">
                            <CheckCircle className="mr-2 h-5 w-5" />
                            Swipe to Pickup
                        </Button>
                        <Button size="icon" variant="secondary" className="h-12 w-12">
                            <Phone className="h-5 w-5" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default DeliveryDashboard;
