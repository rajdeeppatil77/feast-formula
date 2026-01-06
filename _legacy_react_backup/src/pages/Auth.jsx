import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const Auth = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        await login(email, password, 'customer'); // Default to customer
        navigate('/');
    };

    const handleOwnerLogin = async () => {
        // Shortcut for demo
        await login('owner@feast.com', 'password', 'owner');
        navigate('/dashboard/owner');
    }

    const handleAdminLogin = async () => {
        await login('admin@feast.com', 'password', 'admin');
        navigate('/dashboard/admin');
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-brand-600">Feast Formula</CardTitle>
                    <CardDescription>Welcome back! Please sign in to continue.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="login" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-4">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="signup">Sign Up</TabsTrigger>
                        </TabsList>

                        <TabsContent value="login">
                            <form onSubmit={handleLogin} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
                                        Email
                                    </label>
                                    <Input
                                        id="email"
                                        placeholder="name@example.com"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">
                                        Password
                                    </label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <Button className="w-full" type="submit">
                                    Sign In
                                </Button>
                            </form>
                        </TabsContent>

                        <TabsContent value="signup">
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">First Name</label>
                                        <Input placeholder="John" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Last Name</label>
                                        <Input placeholder="Doe" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email</label>
                                    <Input placeholder="name@example.com" type="email" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Password</label>
                                    <Input type="password" />
                                </div>
                                <Button className="w-full" size="lg">Create Account</Button>
                            </div>
                        </TabsContent>
                    </Tabs>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">Demo Accounts</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-4">
                            <Button variant="outline" size="sm" onClick={handleOwnerLogin}>Login as Owner</Button>
                            <Button variant="outline" size="sm" onClick={handleAdminLogin}>Login as Admin</Button>
                            <Button variant="outline" size="sm" className="col-span-2" onClick={() => {
                                login('driver@feast.com', 'password', 'delivery');
                                navigate('/dashboard/delivery');
                            }}>Login as Delivery Partner</Button>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center text-xs text-muted-foreground">
                    By clicking continue, you agree to our Terms of Service and Privacy Policy.
                </CardFooter>
            </Card>
        </div>
    );
};

export default Auth;
