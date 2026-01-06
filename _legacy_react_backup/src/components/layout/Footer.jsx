import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full border-t bg-slate-50 py-12">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold text-brand-600 mb-4">Feast Formula</h3>
                        <p className="text-muted-foreground text-sm">
                            Premium food delivery service. Bridging the gap between hunger and happiness.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>About Us</li>
                            <li>Careers</li>
                            <li>Team</li>
                            <li>Feast Instamart</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>Terms & Conditions</li>
                            <li>Cookie Policy</li>
                            <li>Privacy Policy</li>
                            <li>Investor Relations</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Social</h4>
                        <div className="flex space-x-4">
                            {/* Social placeholders */}
                            <div className="h-8 w-8 bg-slate-200 rounded-full"></div>
                            <div className="h-8 w-8 bg-slate-200 rounded-full"></div>
                            <div className="h-8 w-8 bg-slate-200 rounded-full"></div>
                        </div>
                    </div>
                </div>
                <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
                    © 2024 Feast Formula Technologies Pvt. Ltd.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
