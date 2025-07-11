import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const NewsLetter = () => {
    const [email, setEmail] = useState('');
    const { axios } = useAppContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error('Please enter your email address');
            return;
        }
        
        try {
            const response = await axios.post('/api/newsletter/subscribe', { email });
            if (response.data.success) {
                toast.success('Successfully subscribed to newsletter!');
                setEmail('');
            } else {
                toast.error(response.data.message || 'Subscription failed');
            }
        } catch (error) {
            toast.error('Newsletter subscription failed. Please try again.');
            console.error(error);
        }
    };
    
    return (
        <div className="flex flex-col items-center justify-center text-center space-y-2 mt-24 pb-14">
            <h1 className="md:text-4xl text-2xl text-black font-bold font-sans-serif">Stay Connected</h1>
            <p className="md:text-lg text-gray-500/70 pb-8">
             Get updates on new products, producer stories, and sustainable living tips.
            </p>
            <form onSubmit={handleSubmit} className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12">
                <input
                    className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
                    type="email"
                    placeholder="Enter your email id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" className="md:px-12 px-8 h-full text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer rounded-md rounded-l-none">
                    Subscribe
                </button>
            
            </form>
        </div>
    )
}

export default NewsLetter