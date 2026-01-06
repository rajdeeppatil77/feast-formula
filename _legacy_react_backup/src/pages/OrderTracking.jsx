import React, { useEffect, useState } from 'react';
import { CheckCircle, Clock, ChefHat, Bike, MapPin, MoreHorizontal } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const OrderTracking = () => {
    // Status states: 'confirmed', 'preparing', 'out_for_delivery', 'delivered'
    const [status, setStatus] = useState('confirmed');

    useEffect(() => {
        // Simulate real-time updates
        const timer1 = setTimeout(() => setStatus('preparing'), 3000);
        const timer2 = setTimeout(() => setStatus('out_for_delivery'), 8000);
        const timer3 = setTimeout(() => setStatus('delivered'), 15000); // Fast forward for demo

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        }
    }, []);

    const steps = [
        { id: 'confirmed', label: 'Order Confirmed', icon: CheckCircle, desc: 'Restaurant has accepted your order.' },
        { id: 'preparing', label: 'Preparing Food', icon: ChefHat, desc: 'Chief is working on your delicious meal.' },
        { id: 'out_for_delivery', label: 'Out for Delivery', icon: Bike, desc: 'Rider John (Vaccinated) is on the way.' },
        { id: 'delivered', label: 'Delivered', icon: MapPin, desc: 'Enjoy your Feast!' },
    ];

    const getStepStatus = (stepId) => {
        const order = ['confirmed', 'preparing', 'out_for_delivery', 'delivered'];
        const currentIndex = order.indexOf(status);
        const stepIndex = order.indexOf(stepId);

        if (stepIndex < currentIndex) return 'completed';
        if (stepIndex === currentIndex) return 'active';
        return 'pending';
    };

    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4">
            <div className="container mx-auto max-w-2xl">
                {/* Header with Animation */}
                <div className="text-center mb-8">
                    <iframe src="https://lottie.host/embed/8b625624-9c9c-4860-9112-9c91f1ba4f74/5Q25s4L5hJ.json" className="w-48 h-48 mx-auto -mb-8 pointer-events-none"></iframe>
                    <h1 className="text-3xl font-bold mb-2">Order #FEAST-8821</h1>
                    <p className="text-muted-foreground">Estimated Delivery: 20 mins</p>
                </div>

                <Card>
                    <CardContent className="p-8">
                        <div className="space-y-8 relative">
                            {/* Vertical Line */}
                            <div className="absolute left-6 top-8 bottom-8 w-1 bg-slate-100 -z-10"></div>

                            {steps.map((step) => {
                                const stepStatus = getStepStatus(step.id);
                                return (
                                    <div key={step.id} className="flex gap-4">
                                        {/* Icon Bubble */}
                                        <div className={cn(
                                            "w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10 transition-all duration-500",
                                            stepStatus === 'completed' ? "bg-green-500 text-white" : "",
                                            stepStatus === 'active' ? "bg-brand-500 text-white scale-110 ring-4 ring-brand-100" : "",
                                            stepStatus === 'pending' ? "bg-slate-200 text-slate-400" : ""
                                        )}>
                                            <step.icon className="w-6 h-6" />
                                        </div>

                                        {/* Text Content */}
                                        <div className={cn(
                                            "flex-1 pt-1 transition-opacity duration-500",
                                            stepStatus === 'pending' ? "opacity-50" : "opacity-100"
                                        )}>
                                            <h3 className="font-bold text-lg">{step.label}</h3>
                                            <p className="text-sm text-slate-500">{step.desc}</p>

                                            {/* Micro-interaction for active state */}
                                            {stepStatus === 'active' && (
                                                <div className="mt-2 flex items-center gap-1">
                                                    <span className="flex gap-1">
                                                        <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                                        <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                                        <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce"></span>
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Map Placeholder */}
                <Card className="mt-6 overflow-hidden">
                    <CardContent className="p-0 h-64 bg-slate-200 relative">
                        <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-bold text-xl">
                            Live Map Tracking View
                        </div>
                        {status === 'out_for_delivery' && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-600 text-white p-2 rounded-full shadow-lg animate-pulse">
                                <Bike className="h-6 w-6" />
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default OrderTracking;
