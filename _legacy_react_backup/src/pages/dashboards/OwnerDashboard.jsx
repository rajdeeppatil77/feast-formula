import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const OwnerDashboard = () => {
    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Restaurant Dashboard</h1>
                <Button><Plus className="mr-2 h-4 w-4" /> Add New Item</Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <CardHeader><CardTitle>Live Orders</CardTitle></CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="p-4 border rounded-lg bg-green-50 border-green-200">
                                <div className="flex justify-between mb-2">
                                    <span className="font-bold">#ORD-4421</span>
                                    <span className="bg-green-200 text-green-800 px-2 py-0.5 rounded text-xs font-bold">NEW</span>
                                </div>
                                <div className="text-sm mb-3">2x Chicken Biryani, 1x Coke</div>
                                <div className="flex gap-2">
                                    <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">Accept</Button>
                                    <Button size="sm" variant="outline" className="w-full text-red-600 hover:bg-red-50 hover:text-red-700">Reject</Button>
                                </div>
                            </div>
                            <div className="p-4 border rounded-lg">
                                <div className="flex justify-between mb-2">
                                    <span className="font-bold">#ORD-4420</span>
                                    <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs font-bold">PREPARING</span>
                                </div>
                                <div className="text-sm mb-3">1x Paneer Butter Masala, 2x Roti</div>
                                <Button size="sm" variant="outline" className="w-full">Mark Ready</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Menu Performance</CardTitle></CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            <li className="flex justify-between items-center p-2 bg-slate-50 rounded">
                                <span>Chicken Biryani</span>
                                <span className="font-bold text-green-600">84 Orders</span>
                            </li>
                            <li className="flex justify-between items-center p-2 bg-slate-50 rounded">
                                <span>Garlic Naan</span>
                                <span className="font-bold text-green-600">56 Orders</span>
                            </li>
                            <li className="flex justify-between items-center p-2 bg-slate-50 rounded">
                                <span>Veg Pizza</span>
                                <span className="font-bold text-orange-400">12 Orders</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default OwnerDashboard;
