import { Link } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="top-0 left-0 bg-orange-600 text-white p-4 shadow-md flex justify-between items-center z-50">
      <h1 className="text-2xl font-bold">
        <Link to="/">MEAL MATCHMAKER</Link>
      </h1>
      <div className="space-x-2">
        <Link to="/" className="px-1 py-1 hover:underline rounded-md transition duration-300">Home</Link>
        <Link to="/recipes" className="px-1 py-1 hover:underline rounded-md transition duration-300">Recipes</Link>
        {user ? (
          <>
            <Link to="/addrecipe" className="hover:underline hover:text-gray-200 transition duration-300">Add Recipe</Link>
            <button onClick={logout} className="rounded-md hover:underline transition duration-300">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="px-1 py-1 rounded-md hover:underline transition duration-300">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;