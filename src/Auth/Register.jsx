import React, { useState, use } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import { Link, useNavigate, useLocation } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const Register = () => {
  const { createUser, signInWithGoogle } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (password) => {
    if (password.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(password))
      return "Password must include an uppercase letter";
    if (!/[a-z]/.test(password))
      return "Password must include a lowercase letter";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !email || !password) {
      toast.error("Please fill in all required fields");
      setLoading(false);
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      toast.error(passwordError);
      setLoading(false);
      return;
    }

    createUser(email, password)
      .then(() => {
        const newUser = {
          name,
          email,
          image: photoURL || null,
        };
        return fetch("https://eximflow-api-server.vercel.app/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });
      })
      .then((res) => res.json())
      .then((data) => {
        console.log("Form user saved:", data);
        toast.success("Registration successful!");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        toast.error(err.message || "Registration failed");
      })
      .finally(() => setLoading(false));
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };

        return fetch("https://eximflow-api-server.vercel.app/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("User saved:", data);
            toast.success("Login successful!");
            navigate(from, { replace: true });
          });
      })
      .catch((err) => {
        console.error("Google login error:", err);
        toast.error(err.message || "Google login failed");
      });
  };

  return (
    <div className="md:min-h-screen flex items-center justify-center bg-linear-to-r from-blue-100 to-blue-50 py-4 md:py-10 px-4 md:px-0">
      <div className="card w-full max-w-md md:shadow-2xl bg-base-100 p-8 rounded-xl">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          Register to EximFlow
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <label className="label">
              <span className="label-text font-medium">Name</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <div className="relative">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <div className="relative">
            <label className="label">
              <span className="label-text font-medium">Photo URL</span>
            </label>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="Enter photo URL (optional)"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="relative">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="input input-bordered w-full pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary z-10"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`btn w-full flex items-center justify-center gap-2 text-base font-semibold transition-all duration-300 ${
              loading
                ? "bg-primary/70 text-white cursor-not-allowed"
                : "btn-primary"
            }`}
          >
            {loading && (
              <span className="loading loading-spinner loading-sm text-white"></span>
            )}
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="divider my-4">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="btn bg-white text-black border-[#e5e5e5]"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Sign up with Google
        </button>

        <p className="text-center mt-5 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
