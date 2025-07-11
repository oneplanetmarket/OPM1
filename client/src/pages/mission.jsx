import React from "react";
import { Link } from "react-router-dom";
import { assets, features } from '../assets/assets'

import { Globe, Leaf, Users, Heart, Award, TreePine } from "lucide-react";

const Mission = () => {
  return (
    <div className="mt-20 px-4 sm:px-12 md:px-24 lg:px-32 text-center text-gray-800">

      {/* Section: Our Mission */}
      <section className="mb-20">
        <h1 className="text-4xl font-extrabold">
          Our <span className="text-green-700">Mission</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600">
          To democratize global commerce while protecting our planet and empowering communities. 
          We believe every purchase is a vote for the kind of world we want to live in.
        </p>
      </section>

      {/* Section: Core Values */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold">Our Core Values</h2>
        <p className="text-gray-600 mt-2 mb-10">
          Everything we do is guided by these fundamental principles
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {[
            { icon: <Globe />, title: "Global Impact", text: "Supporting producers across 67 countries with fair wages and sustainable practices that create lasting positive change." },
            { icon: <Leaf />, title: "Environmental Stewardship", text: "Carbon-neutral shipping, recycled packaging, and partnerships with producers who prioritize environmental responsibility." },
            { icon: <Users />, title: "Community First", text: "85% of profits go directly to producers and community development programs, ensuring sustainable livelihoods." },
            { icon: <Heart />, title: "Authentic Craftsmanship", text: "Celebrating traditional techniques and cultural heritage while supporting artisan communities worldwide." },
            { icon: <Award />, title: "Quality & Ethics", text: "Rigorous quality standards and ethical sourcing ensure every product meets our high standards for sustainability." },
            { icon: <TreePine />, title: "Future Generations", text: "Building a sustainable marketplace that preserves traditional crafts and protects the planet for future generations." },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-green-800 text-white p-4 rounded-full mb-4">{item.icon}</div>
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-sm text-gray-600 mt-2 max-w-xs">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Impact Numbers */}
      <section className="bg-black text-white py-16 rounded-xl mb-20">
        <h2 className="text-2xl font-bold">Our Impact by Numbers</h2>
        <p className="text-sm text-gray-400 mt-2">Real results from our commitment to sustainable commerce</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 text-green-400 font-bold text-lg">
          <div>
            <p className="text-2xl">2,847</p>
            <p className="text-white text-sm font-normal">Producers Supported</p>
          </div>
          <div>
            <p className="text-2xl">67</p>
            <p className="text-white text-sm font-normal">Countries Reached</p>
          </div>
          <div>
            <p className="text-2xl">18,492</p>
            <p className="text-white text-sm font-normal">Products Listed</p>
          </div>
          <div>
            <p className="text-2xl">15,000+</p>
            <p className="text-white text-sm font-normal">Families Impacted</p>
          </div>
          <div>
            <p className="text-2xl">$2.4M</p>
            <p className="text-white text-sm font-normal">Direct to Producers</p>
          </div>
          <div>
            <p className="text-2xl">Carbon Negative</p>
            <p className="text-white text-sm font-normal">Shipping Operations</p>
          </div>
          <div>
            <p className="text-2xl">95%</p>
            <p className="text-white text-sm font-normal">Sustainable Materials</p>
          </div>
          <div>
            <p className="text-2xl">100%</p>
            <p className="text-white text-sm font-normal">Verified Producers</p>
          </div>
        </div>
      </section>

      {/* Section: Our Story */}
      <section className="flex flex-col lg:flex-row items-center justify-between gap-10 mb-20">
        <div className="text-left max-w-xl">
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            One Planet Market was born from a simple realization: the global marketplace was failing both producers and consumers.
            Small artisans struggled to reach global markets, while conscious consumers couldn’t find authentic, sustainable products.
          </p>
          <p className="text-gray-600 mb-4">
            Founded in 2019 by a team of entrepreneurs, designers, and sustainability advocates, we set out to create a different kind of marketplace—
            one that puts people and planet before profit.
          </p>
          <p className="text-gray-600 mb-4">
            Today, we’re proud to be the world’s largest platform for verified sustainable products, connecting conscious consumers 
            with artisans and eco-friendly producers in 67 countries.
          </p>
          <button className="bg-black text-white px-6 py-2 rounded-full mt-2 hover:bg-gray-800">Meet Our Team</button>
        </div>
        <img src={assets.mission} alt="Team" className="w-full max-w-md rounded-2xl" />

      </section>

      {/* Section: Sustainability Commitments */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-2">Our Sustainability Commitments</h2>
        <p className="text-gray-600 mb-10">Concrete actions we're taking to create a more sustainable future</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="bg-white border border-gray-200 p-6 rounded-xl">
            <h4 className="font-bold">Carbon Neutrality</h4>
            <p className="text-gray-600 mt-1">We’ve achieved carbon-neutral shipping operations and are working toward becoming carbon negative by 2025 through reforestation partnerships.</p>
            <p className="text-green-600 mt-2 font-medium">Target: Carbon negative by 2025</p>
          </div>
          <div className="bg-white border border-gray-200 p-6 rounded-xl">
            <h4 className="font-bold">Circular Economy</h4>
            <p className="text-gray-600 mt-1">100% of our packaging is made from recycled materials, and we offer take-back programs for product lifecycle management.</p>
            <p className="text-green-600 mt-2 font-medium">Current: 100% recycled packaging</p>
          </div>
          <div className="bg-white border border-gray-200 p-6 rounded-xl">
            <h4 className="font-bold">Fair Trade Plus</h4>
            <p className="text-gray-600 mt-1">We guarantee producers receive at least 85% of product sales value, well above traditional fair trade minimums.</p>
            <p className="text-green-600 mt-2 font-medium">Standard: 85% direct to producers</p>
          </div>
          <div className="bg-white border border-gray-200 p-6 rounded-xl">
            <h4 className="font-bold">Community Investment</h4>
            <p className="text-gray-600 mt-1">5% of our profits fund education, healthcare, and infrastructure projects in producer communities.</p>
            <p className="text-green-600 mt-2 font-medium">Commitment: 5% of profits to communities</p>
          </div>
        </div>
      </section>

      {/* Section: Call to Action */}
      <section className="text-center mb-20">
        <h2 className="text-2xl font-bold">
          Join the <span className="text-green-700">Movement</span>
        </h2>
        <p className="text-gray-600 mt-2 mb-6">
          Every purchase makes a difference. Be part of the solution for a more sustainable and equitable world.
        </p>
        <div className="flex justify-center gap-4">
        <Link to="/products">
        <button className="bg-black text-white px-6 py-2 rounded-full">
          Start Shopping
        </button>
        </Link>
        <Link to="/producerform">
        <button className="border border-black text-black px-6 py-2 rounded-full">
        Become a Producer
        </button>
        </Link>
        </div>
      </section>
    </div>
  );
};

export default Mission;
