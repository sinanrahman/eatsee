import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, CheckCircle, Smartphone, User, MapPin } from 'lucide-react';

const Order = () => {
    const [step, setStep] = useState(1);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccess(true);
    };

    if (success) {
        return (
            <div className="pt-40 pb-40 flex items-center justify-center bg-white dark:bg-dark-bg px-6">
                <div className="max-w-md w-full text-center space-y-8 p-12 bg-primary/5 rounded-[3rem] border border-primary/20">
                    <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center mx-auto shadow-2xl">
                        <CheckCircle size={48} />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-4xl font-playfair font-black dark:text-white">Order Received!</h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            Thank you for choosing Eatsee Foods. Our team will contact you on your mobile number shortly to confirm the order and delivery details.
                        </p>
                    </div>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="w-full py-4 bg-primary text-white font-bold rounded-2xl"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-20 bg-zinc-50 dark:bg-dark-bg min-h-screen">
            <section className="section-padding">
                <div className="max-w-3xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <span className="text-primary font-bold uppercase tracking-widest text-sm">Express Order</span>
                        <h1 className="text-5xl md:text-6xl font-playfair font-black dark:text-white">Place Your Request</h1>
                        <p className="text-gray-500 max-w-lg mx-auto">
                            Fill out this simple form and we'll handle the rest. Fresh foods will be prepared and delivered based on your preference.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 rounded-[4rem] p-10 md:p-16 shadow-2xl border border-gray-100 dark:border-zinc-800">
                        <form onSubmit={handleSubmit} className="space-y-10">
                            {/* Product Selection */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 border-b border-gray-100 dark:border-zinc-800 pb-4">
                                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold">1</div>
                                    <h3 className="text-2xl font-bold dark:text-white">What would you like?</h3>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {["Pathiri", "Idiyappam", "Vellappam", "Chappathi", "Snacks Bundle", "Bulk Batter"].map((item) => (
                                        <label
                                            key={item}
                                            className="flex items-center p-6 bg-zinc-50 dark:bg-black rounded-3xl border-2 border-transparent hover:border-primary/50 cursor-pointer transition-all group"
                                        >
                                            <input type="checkbox" className="w-5 h-5 accent-primary mr-4" />
                                            <span className="font-bold dark:text-gray-300 group-hover:text-primary transition-colors">{item}</span>
                                        </label>
                                    ))}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400">Order Quantity / Special Notes</label>
                                    <textarea
                                        className="w-full px-6 py-4 bg-zinc-50 dark:bg-black rounded-2xl outline-none focus:ring-2 ring-primary/20 border border-gray-100 dark:border-zinc-800 dark:text-white h-32 resize-none"
                                        placeholder="e.g. 20 Pathiri, 10 Idiyappam for tomorrow morning."
                                    ></textarea>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 border-b border-gray-100 dark:border-zinc-800 pb-4">
                                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold">2</div>
                                    <h3 className="text-2xl font-bold dark:text-white">Where should we deliver?</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm font-bold text-gray-400 ml-2">
                                            <User size={14} /> Full Name
                                        </div>
                                        <input required type="text" className="w-full px-6 py-4 bg-zinc-50 dark:bg-black rounded-2xl outline-none border border-gray-100 dark:border-zinc-800 dark:text-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm font-bold text-gray-400 ml-2">
                                            <Smartphone size={14} /> Phone Number
                                        </div>
                                        <input required type="tel" className="w-full px-6 py-4 bg-zinc-50 dark:bg-black rounded-2xl outline-none border border-gray-100 dark:border-zinc-800 dark:text-white" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm font-bold text-gray-400 ml-2">
                                        <MapPin size={14} /> Delivery Location
                                    </div>
                                    <input required type="text" placeholder="Omassery / Koduvally / Area Name" className="w-full px-6 py-4 bg-zinc-50 dark:bg-black rounded-2xl outline-none border border-gray-100 dark:border-zinc-800 dark:text-white" />
                                </div>
                            </div>

                            <div className="pt-6">
                                <button type="submit" className="w-full py-6 bg-primary hover:bg-primary-dark text-white text-xl font-bold rounded-3xl transition-all shadow-xl hover:shadow-primary/20 flex items-center justify-center gap-4 group">
                                    Submit Order Request <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                                </button>
                                <p className="text-center text-xs text-gray-400 mt-6 font-medium">
                                    By submitting, you agree to receive a call/message from Eatsee Foods regarding this request.
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Order;
