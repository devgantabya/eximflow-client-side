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
      .then(() => {
        toast.success("Registration successful!");
        navigate(from, { replace: true });
      })
      .catch((err) => toast.error(err.message || "Registration failed"))
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });
      })
      .then(() => {
        toast.success("Login successful!");
        navigate(from, { replace: true });
      })
      .catch((err) => toast.error(err.message || "Google login failed"));
  };

  return (
    <div
      className="
        min-h-screen flex items-center justify-center px-4
        bg-linear-to-br from-emerald-50 to-white
        dark:from-gray-900 dark:to-gray-950
      "
    >
      <div
        className="
          w-full max-w-md rounded-2xl p-8 my-10
          bg-white dark:bg-gray-900
          shadow-xl dark:shadow-black/40
        "
      >
        <h2 className="text-3xl font-extrabold text-center text-emerald-500 mb-6">
          Create account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="
                w-full rounded-lg px-4 py-2.5
                bg-white dark:bg-gray-800
                border border-gray-300 dark:border-gray-700
                text-gray-800 dark:text-gray-100 focus:outline-none
                focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
              "
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="
                w-full rounded-lg px-4 py-2.5
                bg-white dark:bg-gray-800
                border border-gray-300 dark:border-gray-700
                text-gray-800 dark:text-gray-100 focus:outline-none
                focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
              "
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Photo URL (optional)
            </label>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="https://example.com/avatar.jpg"
              className="
                w-full rounded-lg px-4 py-2.5
                bg-white dark:bg-gray-800
                border border-gray-300 dark:border-gray-700
                text-gray-800 dark:text-gray-100 focus:outline-none
                focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
              "
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                className="
                  w-full rounded-lg px-4 py-2.5 pr-12
                  bg-white dark:bg-gray-800
                  border border-gray-300 dark:border-gray-700
                  text-gray-800 dark:text-gray-100 focus:outline-none
                  focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                "
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute right-3 top-1/2 -translate-y-1/2
                  text-gray-500 dark:text-gray-400
                  hover:text-emerald-500
                "
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full flex items-center justify-center gap-2
              rounded-lg py-2.5 font-semibold text-white
              bg-emerald-500 hover:bg-emerald-600
              transition disabled:opacity-70
            "
          >
            {loading && <span className="loading loading-spinner loading-sm" />}
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <div className="my-6 text-center text-sm text-gray-500 dark:text-gray-400">
          OR
        </div>

        <button
          onClick={handleGoogleLogin}
          className="
            w-full flex items-center justify-center gap-3
            rounded-lg py-2.5 font-medium
            border border-gray-300 dark:border-gray-700
            bg-white dark:bg-gray-800
            text-gray-800 dark:text-gray-200
            hover:bg-gray-100 dark:hover:bg-gray-700
            transition
          "
        >
          <svg width="16" height="16" viewBox="0 0 512 512">
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            />
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            />
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            />
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            />
          </svg>
          Sign up with Google
        </button>

        <p className="mt-5 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-emerald-500 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
