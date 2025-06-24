import { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/recipes");
    } catch (error) {
      console.error("Login error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="bg-darkBg text-textLight min-h-screen p-5 flex justify-center items-center">
      <form onSubmit={handleLogin} className="bg-darkCard p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input
          type="email"
          className="w-full p-2 mb-4 bg-darkInput text-white rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-2 mb-4 bg-darkInput text-white rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-primary text-white px-4 py-2 rounded w-full cursor-pointer">Login</button>
        <p className="mt-4 text-gray-400">
          Don't have an account?  
          <Link to="/signup" className="text-blue-400 hover:underline ml-1">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;