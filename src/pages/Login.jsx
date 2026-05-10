import { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const EyeIcon = ({ open }) => (
    open ? (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ) : (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
        <path d="M3 3l18 18" />
        <path d="M10.6 10.6A3 3 0 0 0 12 15a3 3 0 0 0 2.4-1.2" />
        <path d="M9.9 5.1A10.6 10.6 0 0 1 12 5c6.5 0 10 7 10 7a18.6 18.6 0 0 1-3.2 4.5" />
        <path d="M6.1 6.1C3.7 8.1 2 12 2 12s3.5 7 10 7c1 0 1.9-.1 2.8-.4" />
      </svg>
    )
  );

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/recipes");
    } catch (error) {
      console.error("Login error:", error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-center text-gray-600 mb-8">Sign in to your account</p>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-6 rounded">
              <p className="font-semibold text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-5">
              <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-orange-300 rounded-lg focus:border-orange-600 focus:outline-none transition duration-300"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-20 border-2 border-orange-300 rounded-lg focus:border-orange-600 focus:outline-none transition duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-600 hover:text-orange-800 transition duration-300"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 text-white font-bold py-3 rounded-lg hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300 mb-4"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-gray-600">
            Don't have an account?
            <Link to="/signup" className="text-orange-600 font-semibold hover:text-orange-800 ml-1">
              Sign Up
            </Link>
          </p>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-gray-600 hover:text-orange-600 transition duration-300">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;