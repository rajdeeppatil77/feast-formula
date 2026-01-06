import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, MapPin, CreditCard, History, Wallet, Bell } from 'lucide-react';
import { Input } from '@/components/ui/input';

const CustomerDashboard = () => {
    const { user, logout } = useAuth();

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Hello, {user?.name || 'Foodie'}!</h1>
                    <p className="text-muted-foreground">Manage your orders and preferences.</p>
                </div>
                <div className="flex gap-4">
                    <Card className="bg-brand-600 text-white border-none flex items-center px-4 py-2 gap-3 min-w-[150px]">
                        <Wallet className="h-5 w-5" />
                        <div>
                            <div className="text-[10px] uppercase font-bold text-brand-100">Wallet Balance</div>
                            <div className="font-bold text-xl">₹1,250</div>
                        </div>
                    </Card>
                </div>
            </div>

            <Tabs defaultValue="orders" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="orders">My Orders</TabsTrigger>
                    <TabsTrigger value="wallet">Wallet & Coupons</TabsTrigger>
                    <TabsTrigger value="profile">Profile Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="orders">
                    <Card>
                        <CardHeader><CardTitle>Past Orders</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="flex justify-between items-center p-4 border rounded-lg hover:border-brand-200 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className="h-16 w-16 bg-slate-100 rounded-lg flex items-center justify-center text-2xl">🥘</div>
                                        <div>
                                            <h3 className="font-bold text-lg">Mehfil Biryani House</h3>
                                            <p className="text-sm text-slate-500">Koramangala • Delivered on Jan {i + 1}, 2024</p>
                                            <div className="flex gap-2 mt-2">
                                                <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">Chicken Biryani x1</span>
                                                <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">Coke x2</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-lg">₹420</div>
                                        <Button variant="ghost" className="text-brand-600 hover:text-brand-700 font-bold text-sm">Repeat Order</Button>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="wallet">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader><CardTitle>Available Coupons</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="border border-dashed border-brand-300 bg-brand-50 p-4 rounded-lg flex justify-between items-center relative overflow-hidden">
                                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full"></div>
                                    <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full"></div>
                                    <div>
                                        <div className="font-bold text-brand-700 text-lg">FEAST50</div>
                                        <div className="text-sm text-brand-600">50% OFF up to ₹100</div>
                                    </div>
                                    <Button size="sm" variant="outline" className="border-brand-300 text-brand-700">Copy</Button>
                                </div>
                                <div className="border border-dashed border-slate-300 bg-slate-50 p-4 rounded-lg flex justify-between items-center">
                                    <div>
                                        <div className="font-bold text-slate-700 text-lg">WELCOME20</div>
                                        <div className="text-sm text-slate-600">Flat 20% OFF on first order</div>
                                    </div>
                                    <Button size="sm" variant="outline">Copy</Button>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle>Add Money</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-muted-foreground">Top up your wallet for faster checkouts.</p>
                                <div className="flex gap-4">
                                    <Button variant="outline">₹100</Button>
                                    <Button variant="outline">₹200</Button>
                                    <Button variant="outline">₹500</Button>
                                </div>
                                <div className="flex gap-4">
                                    <Input placeholder="Enter custom amount" />
                                    <Button>Add</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="profile">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Details</CardTitle>
                            <CardDescription>Update your contact information.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 max-w-md">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Full Name</label>
                                <Input defaultValue={user?.name} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email</label>
                                <Input defaultValue={user?.email} disabled />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Phone Number</label>
                                <Input defaultValue="+91 9876543210" />
                            </div>
                            <Button>Save Changes</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default CustomerDashboard;
