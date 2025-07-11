import React, { useState } from 'react';
import { Leaf, Handshake, Globe, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const ProducerForm = () => {
  const navigate = useNavigate();
  const { axios } = useAppContext();

  const [form, setForm] = useState({
    name: '',
    location: '',
    country: '',
    story: '',
    profileImageUrl: '',
    coverImageUrl: '',
    yearsInBusiness: '',
    specialties: '',
    email: '',
    mobileNumber: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = {
      ...form,
      specialties: form.specialties.split(',').map(s => s.trim())
    };
    try {
      const response = await axios.post('/api/producer/submit', data);
      if (response.data.message) {
        toast.success('Application submitted successfully!');
        navigate('/');
      }
    } catch (err) {
      toast.error('Submission failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f6ffff]">
      {/* Top Section */}
      <div className="text-center px-4 max-w-5xl mx-auto pt-32">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Join Our Community of <span className="text-green-600">Sustainable Producers</span>
        </h1>
        <p className="text-gray-700 text-md mb-12">
          Connect with conscious consumers worldwide. Share your story, showcase your sustainable products,
          and make a positive impact on our planet.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-6">Why Partner With One Planet Market?</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 mb-16">
          <div className="bg-white border rounded-xl p-4 text-center shadow-sm hover:shadow-md transition">
            <Leaf className="mx-auto text-green-600 mb-2" size={32} />
            <h3 className="font-semibold text-green-700 mb-1">Eco-Focused Audience</h3>
            <p className="text-sm text-gray-600">
              Reach customers who prioritize sustainability and ethical consumption.
            </p>
          </div>

          <div className="bg-white border rounded-xl p-4 text-center shadow-sm hover:shadow-md transition">
            <Handshake className="mx-auto text-blue-600 mb-2" size={32} />
            <h3 className="font-semibold text-blue-700 mb-1">Fair Trade Values</h3>
            <p className="text-sm text-gray-600">
              We ensure fair compensation and promote ethical business practices.
            </p>
          </div>

          <div className="bg-white border rounded-xl p-4 text-center shadow-sm hover:shadow-md transition">
            <Globe className="mx-auto text-purple-600 mb-2" size={32} />
            <h3 className="font-semibold text-purple-700 mb-1">Global Community</h3>
            <p className="text-sm text-gray-600">
              Join a network of like-minded artisans and producers worldwide.
            </p>
          </div>

          <div className="bg-white border rounded-xl p-4 text-center shadow-sm hover:shadow-md transition">
            <Award className="mx-auto text-orange-500 mb-2" size={32} />
            <h3 className="font-semibold text-orange-600 mb-1">Quality Recognition</h3>
            <p className="text-sm text-gray-600">
              Get verified status and showcase your commitment to sustainability.
            </p>
          </div>
        </div>
      </div>

      {/* Application Form Section */}
      <div className="flex justify-center items-center pb-20 px-4">
        <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Producer Application</h2>
          <p className="text-sm text-center text-gray-500 mb-8">
            Tell us about yourself and your sustainable products. All applications are carefully reviewed by our team.
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="flex flex-col md:flex-row gap-4">
              <input
                name="name"
                placeholder="Name *"
                className="w-full md:w-1/2 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                onChange={handleChange}
                required
              />
              <input
                name="location"
                placeholder="Location *"
                className="w-full md:w-1/2 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                onChange={handleChange}
                required
              />
              <input
                name="country"
                placeholder="Country *"
                className="w-full md:w-1/2 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                onChange={handleChange}
                required
              />
            </div>

            <input
              name="email"
              placeholder="Email Address *"
              type="email"
              className="w-full border rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              onChange={handleChange}
              required
            />

            <input
              name="mobileNumber"
              placeholder="Mobile Number *"
              className="w-full border rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              onChange={handleChange}
              required
            />

            <textarea
              name="story"
              placeholder="Your Story *"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              onChange={handleChange}
              rows={4}
              required
            />

            <div className="flex flex-col md:flex-row gap-4">
              <input
                name="profileImageUrl"
                placeholder="Profile Image URL *"
                className="w-full md:w-1/2 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                onChange={handleChange}
                required
              />
              <input
                name="coverImageUrl"
                placeholder="Cover Image URL *"
                className="w-full md:w-1/2 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                onChange={handleChange}
                required
              />
            </div>

            <input
              name="yearsInBusiness"
              type="number"
              placeholder="Years in Business *"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              onChange={handleChange}
              required
            />

            <input
              name="specialties"
              placeholder="Specialties * (e.g. Textiles, Ceramics, Woodwork)"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="w-full py-3 rounded-lg border border-green-600 bg-green-600 text-white font-semibold hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProducerForm;