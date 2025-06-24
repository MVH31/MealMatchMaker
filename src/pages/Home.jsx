import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-orange-300 to-yellow-300">
      <h1 className="text-4xl font-bold mb-4 text-gray-800 font-sans">Welcome to Meal Matchmaker</h1>
      <p className="text-lg text-gray-700 mb-6 font-serif">Find and try your favorite recipes easily!</p>
      <Link
        to="/recipes"
        className="bg-orange-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-orange-800 transition duration-300 transform hover:scale-105"
      >
        Get Started
      </Link>
    </div>
  );
};

export default Home;