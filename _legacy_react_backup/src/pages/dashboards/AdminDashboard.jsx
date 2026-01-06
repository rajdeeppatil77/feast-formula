import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Users, DollarSign, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AdminDashboard = () => {
    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Admin Panel</h1>
                <div className="text-sm text-slate-500">Overview</div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-full"><Users className="h-6 w-6" /></div>
                        <div>
                            <p className="text-sm text-muted-foreground">Total Users</p>
                            <h3 className="text-2xl font-bold">12,450</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-3 bg-green-100 text-green-600 rounded-full"><DollarSign className="h-6 w-6" /></div>
                        <div>
                            <p className="text-sm text-muted-foreground">Revenue</p>
                            <h3 className="text-2xl font-bold">₹45.2L</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-3 bg-purple-100 text-purple-600 rounded-full"><Activity className="h-6 w-6" /></div>
                        <div>
                            <p className="text-sm text-muted-foreground">Orders Today</p>
                            <h3 className="text-2xl font-bold">854</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-3 bg-red-100 text-red-600 rounded-full"><AlertTriangle className="h-6 w-6" /></div>
                        <div>
                            <p className="text-sm text-muted-foreground">Fraud Alerts</p>
                            <h3 className="text-2xl font-bold text-red-600">3</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Fraud Alert UI */}
            <Card className="border-red-200">
                <CardHeader className="bg-red-50 border-b border-red-100">
                    <CardTitle className="text-red-700 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" /> High Risk Transactions Detected
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 uppercase font-medium">
                            <tr>
                                <th className="px-6 py-3">User ID</th>
                                <th className="px-6 py-3">Location</th>
                                <th className="px-6 py-3">Order Value</th>
                                <th className="px-6 py-3">Risk Factor</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            <tr className="bg-white hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium">USR-9921</td>
                                <td className="px-6 py-4">Mumbai (IP Mismatch)</td>
                                <td className="px-6 py-4">₹12,400</td>
                                <td className="px-6 py-4"><Badge variant="destructive">CRITICAL</Badge></td>
                                <td className="px-6 py-4"><button className="text-red-600 underline font-medium">Block User</button></td>
                            </tr>
                            <tr className="bg-white hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium">USR-3321</td>
                                <td className="px-6 py-4">Bangalore</td>
                                <td className="px-6 py-4">₹450</td>
                                <td className="px-6 py-4"><Badge className="bg-yellow-500 hover:bg-yellow-600">SUSPICIOUS</Badge></td>
                                <td className="px-6 py-4"><button className="text-blue-600 underline font-medium">Investigate</button></td>
                            </tr>
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminDashboard;
