import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Leaf, Flame, Droplet } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DietWidget = () => {
    return (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-green-800 text-lg">
                    <Leaf className="mr-2 h-5 w-5" /> Diet Recommendations
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-green-700 mb-4">Based on your preferences, we recommend:</p>
                <div className="space-y-3">
                    <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border border-green-100">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                <Flame className="h-4 w-4" />
                            </div>
                            <div>
                                <div className="font-bold text-sm">High Protein</div>
                                <div className="text-xs text-muted-foreground">Grilled Chicken Salad</div>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-green-600 h-8">View</Button>
                    </div>

                    <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border border-green-100">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                <Droplet className="h-4 w-4" />
                            </div>
                            <div>
                                <div className="font-bold text-sm">Low Calorie</div>
                                <div className="text-xs text-muted-foreground">Fruit Bowl</div>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-green-600 h-8">View</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default DietWidget;
