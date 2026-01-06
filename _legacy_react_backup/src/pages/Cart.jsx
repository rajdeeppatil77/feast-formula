import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Wallet, CreditCard, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const Cart = () => {
    const navigate = useNavigate();
    const { cart, cartTotal, updateQuantity, clearCart } = useCart();
    const { user } = useAuth();
    const [placingOrder, setPlacingOrder] = useState(false);

    // Fees
    const deliveryFee = 40;
    const platformFee = 5;
    const gst = Math.round(cartTotal * 0.05);
    const totalToPay = cartTotal + deliveryFee + platformFee + gst;

    const handlePlaceOrder = () => {
        if (!user) {
            navigate('/auth');
            return;
        }

        setPlacingOrder(true);
        // Simulate API call
        setTimeout(() => {
            clearCart();
            navigate('/tracking');
        }, 2000);
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
                <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
                <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart.</p>
                <Button onClick={() => navigate('/browse')}>Go to Restaurants</Button>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 bg-slate-50 min-h-screen">
            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Cart Items & Address */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Login Check */}
                    {!user && (
                        <Card>
                            <CardContent className="flex justify-between items-center p-6">
                                <div>
                                    <h3 className="font-bold text-lg">Account</h3>
                                    <p className="text-muted-foreground text-sm">To place your order now, log in to your existing account or sign up.</p>
                                </div>
                                <Button variant="outline" onClick={() => navigate('/auth')}>Log In</Button>
                            </CardContent>
                        </Card>
                    )}

                    {/* Delivery Address */}
                    <Card>
                        <CardHeader className="pb-3 border-b">
                            <CardTitle className="flex items-center text-lg">
                                <MapPin className="h-5 w-5 mr-2 text-brand-600" />
                                Delivery Address
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="flex items-start gap-4 p-4 border rounded-lg bg-white relative overflow-hidden group hover:border-brand-500 cursor-pointer transition-colors">
                                <div className="absolute top-0 left-0 bg-brand-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-br">HOME</div>
                                <MapPin className="h-5 w-5 text-slate-400 mt-1" />
                                <div>
                                    <h4 className="font-semibold text-slate-800">Home</h4>
                                    <p className="text-sm text-slate-500 mt-1">
                                        #102, Skyline Apartments, 4th Cross, Koramangala 5th Block, Bangalore - 560034
                                    </p>
                                    <div className="text-xs text-brand-600 mt-2 font-medium">30-40 MINS</div>
                                </div>
                                <CheckCircle className="h-5 w-5 text-brand-600 ml-auto opacity-100" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment Method */}
                    <Card>
                        <CardHeader className="pb-3 border-b">
                            <CardTitle className="flex items-center text-lg">
                                <Wallet className="h-5 w-5 mr-2 text-brand-600" />
                                Payment Method
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-3">
                            <div className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-slate-50">
                                <div className="w-4 h-4 rounded-full border border-brand-600 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-brand-600" />
                                </div>
                                <div className="flex-1 font-medium">PhonePe / UPI</div>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-4" />
                            </div>
                            <div className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-slate-50 opacity-60">
                                <div className="w-4 h-4 rounded-full border flex items-center justify-center"></div>
                                <div className="flex-1 font-medium flex items-center gap-2">
                                    Credit/Debit Card <CreditCard className="h-4 w-4" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Order Summary */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-24">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                {/* Placeholder Resto Image */}
                                <div className="bg-slate-200 h-12 w-12 rounded"></div>
                                <div>
                                    <h3 className="font-bold">Mehfil Biryani House</h3>
                                    <p className="text-xs text-muted-foreground">Koramangala</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Items */}
                            <div className="space-y-3 max-h-[300px] overflow-auto">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-2">
                                            {item.isVeg ? <div className="h-3 w-3 border border-green-600 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-green-600"></div></div> : <div className="h-3 w-3 border border-red-600 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-red-600"></div></div>}
                                            <span className="line-clamp-1 w-32">{item.name}</span>
                                        </div>
                                        <div className="flex items-center border rounded bg-slate-50">
                                            <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-0.5 text-slate-500 hover:text-green-600 font-bold">-</button>
                                            <span className="px-1 font-medium">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-0.5 text-green-600 hover:text-green-700 font-bold">+</button>
                                        </div>
                                        <span className="font-medium text-right w-16">{formatCurrency(item.price * item.quantity)}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Bill Details */}
                            <div className="border-t pt-4 space-y-2 text-sm text-slate-600">
                                <div className="flex justify-between">
                                    <span>Item Total</span>
                                    <span>{formatCurrency(cartTotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="underline decoration-dotted cursor-help">Delivery Fee</span>
                                    <span>{formatCurrency(deliveryFee)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Platform Fee</span>
                                    <span>{formatCurrency(platformFee)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>GST and Restaurant Charges</span>
                                    <span>{formatCurrency(gst)}</span>
                                </div>
                            </div>

                            <div className="border-t py-4">
                                <div className="flex justify-between items-center font-bold text-lg">
                                    <span>TO PAY</span>
                                    <span>{formatCurrency(totalToPay)}</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className="w-full h-12 text-lg font-bold"
                                onClick={handlePlaceOrder}
                                disabled={placingOrder}
                            >
                                {placingOrder ? "Processing..." : "Place Order"}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Cart;
