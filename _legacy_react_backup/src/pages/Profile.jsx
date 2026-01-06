import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, MapPin, CreditCard, History } from 'lucide-react';

const Profile = () => {
    const { user, logout } = useAuth();

    if (!user) return <div className="p-8">Please log in.</div>;

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">My Account</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Sidebar */}
                <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start bg-brand-50 text-brand-700 font-bold"><User className="mr-2 h-4 w-4" /> Profile</Button>
                    <Button variant="ghost" className="w-full justify-start"><History className="mr-2 h-4 w-4" /> Orders</Button>
                    <Button variant="ghost" className="w-full justify-start"><MapPin className="mr-2 h-4 w-4" /> Addresses</Button>
                    <Button variant="ghost" className="w-full justify-start"><CreditCard className="mr-2 h-4 w-4" /> Payments</Button>
                    <Button variant="destructive" className="w-full justify-start mt-8" onClick={logout}>Log Out</Button>
                </div>

                {/* Content */}
                <div className="col-span-3 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-muted-foreground uppercase font-bold">Full Name</label>
                                    <div className="font-medium text-lg">{user.name}</div>
                                </div>
                                <div>
                                    <label className="text-xs text-muted-foreground uppercase font-bold">Email</label>
                                    <div className="font-medium text-lg">{user.email}</div>
                                </div>
                                <div>
                                    <label className="text-xs text-muted-foreground uppercase font-bold">Phone</label>
                                    <div className="font-medium text-lg">+91 98765 43210</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Orders</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[1, 2].map((i) => (
                                    <div key={i} className="flex justify-between items-start border-b pb-4 last:border-0 last:pb-0">
                                        <div>
                                            <h4 className="font-bold">Mehfil Biryani House</h4>
                                            <p className="text-xs text-muted-foreground">Koramangala • Delivered on Jan {i + 1}, 2024</p>
                                            <p className="text-sm mt-1 text-slate-600">1x Chicken Biryani, 2x Garlic Naan</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold">₹420</div>
                                            <Button variant="outline" size="sm" className="mt-2 h-8 text-brand-600 border-brand-200 hover:bg-brand-50">Reorder</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Profile;
