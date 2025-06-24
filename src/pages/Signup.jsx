import { useState } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link} from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/recipes");
    } catch (error) {
      console.error("Signup error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="bg-darkBg text-textLight min-h-screen p-5 flex justify-center items-center">
      <form onSubmit={handleSignup} className="bg-darkCard p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold">Sign Up</h2>
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
        <button className="bg-primary text-white px-4 py-2 rounded w-full cursor-pointer">Sign Up</button>

        <p className="mt-4 text-gray-400">
          Already have an account?  
          <Link to="/login" className="text-blue-400 hover:underline ml-1">Log In</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;