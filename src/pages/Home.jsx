import { Link } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: "🔍",
      title: "Discover Recipes",
      description: "Browse through thousands of delicious recipes from around the world.",
    },
    {
      icon: "⭐",
      title: "Rated Recipes",
      description: "Find highly-rated recipes with detailed reviews and ratings.",
    },
    {
      icon: "📝",
      title: "Share Your Creations",
      description: "Add your own recipes and share them with our community.",
    },
    {
      icon: "⏱️",
      title: "Easy to Follow",
      description: "Get prep times, cook times, and step-by-step directions.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-400 via-orange-300 to-yellow-300 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Welcome to Meal Matchmaker
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 font-medium">
            Discover, Share & Cook Amazing Recipes
          </p>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community of food enthusiasts and find your perfect recipe match. 
            From quick weeknight dinners to impressive desserts, we've got you covered!
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/recipes"
              className="bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:bg-orange-700 transition duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Explore Recipes
            </Link>
            {!user && (
              <Link
                to="/signup"
                className="bg-white text-orange-600 px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:bg-gray-100 transition duration-300 border-2 border-orange-600"
              >
                Join Now
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Why Choose Meal Matchmaker?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105 text-center"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="text-white">
              <p className="text-5xl font-bold mb-2">1000+</p>
              <p className="text-lg font-semibold">Delicious Recipes</p>
            </div>
            <div className="text-white">
              <p className="text-5xl font-bold mb-2">500+</p>
              <p className="text-lg font-semibold">Active Members</p>
            </div>
            <div className="text-white">
              <p className="text-5xl font-bold mb-2">4.8★</p>
              <p className="text-lg font-semibold">Average Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-orange-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Browse</h3>
              <p className="text-gray-600">
                Explore our collection of recipes with detailed information.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-orange-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Choose</h3>
              <p className="text-gray-600">
                Select a recipe that matches your taste and skill level.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-orange-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Cook & Enjoy</h3>
              <p className="text-gray-600">
                Follow easy instructions and create delicious meals at home.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-orange-400 to-yellow-300 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Ready to Start Cooking?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Browse our recipe collection and find your next favorite meal!
          </p>
          
          <Link
            to="/recipes"
            className="inline-block bg-orange-600 text-white px-10 py-4 rounded-lg text-xl font-bold shadow-lg hover:bg-orange-700 transition duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            Start Exploring Now
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-2">© 2026 Meal Matchmaker. All rights reserved.</p>
          <p className="text-gray-400">Find your perfect recipe match today!</p>
        </div>
      </div>
    </div>
  );
};

export default Home;