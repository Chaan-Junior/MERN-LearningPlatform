import { useState } from "react";
import { FaUserCircle, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import backImage from "../../../assets/bg-image.jpg";
import { useNavigate } from "react-router-dom";

const SignProcess = () => {
  const navigate = useNavigate();
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    rememberMe: false,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, rememberMe: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLoginPage) {
        // Handle login
        const response = await fetch("http://localhost:7000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();

        console.log("Login data:", data);
        // Save token to local storage
        localStorage.setItem("token", data.token);

        // Extract role from token
        const tokenPayload = JSON.parse(atob(data.token.split(".")[1]));

        console.log("Token payload:", tokenPayload);
        const userRole = tokenPayload.role;

        if (userRole === "admin") {navigate("/admin")}
        else if (userRole === "instructor") {navigate("/instructor")}
        else {
          navigate("/userHome");
        }
      } else {
        // Handle register
        const response = await fetch(
          "http://localhost:7000/api/users/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        const data = await response.json();
        // Save token to local storage
        localStorage.setItem("token", data.token);
      }

      // Clear form data
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        rememberMe: false,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const togglePage = () => {
    setIsLoginPage(!isLoginPage);
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      rememberMe: false,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const formVariants = {
    hidden: { x: isLoginPage ? "-100%" : "100%" },
    visible: { x: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  };

  const welcomeVariants = {
    hidden: { x: isLoginPage ? "100%" : "-100%" },
    visible: { x: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${backImage})`,
      }}
    >
      <motion.div
        className="flex rounded-2xl shadow-2xl bg-white overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {isLoginPage && (
          <motion.div
            className="relative w-full md:w-1/2 flex flex-col justify-center items-center px-10 py-16 text-white"
            variants={welcomeVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-blue-800 opacity-100 transition-opacity duration-500 ease-in-out"></div>
            <div className="relative z-10 text-center">
              <motion.h2
                className="text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Hello, Leaners !
              </motion.h2>
              <motion.p
                className="text-lg mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Connect with us to unleash your potential and learn new skills.
              </motion.p>
              <motion.button
                className="py-3 px-6 rounded-lg bg-white text-blue-800 hover:bg-teal-100 font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                onClick={togglePage}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Create an account
              </motion.button>
            </div>
          </motion.div>
        )}
        <motion.div
          className="relative w-full md:w-1/2 flex flex-col justify-center items-center px-10 py-16"
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-blue-800 opacity-75 transition-opacity duration-500 ease-in-out"></div>
          <div className="relative z-10">
            <form onSubmit={handleSubmit} className="w-full max-w-md">
              {!isLoginPage && (
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="relative">
                    <FaUserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-600" />
                    <input
                      className="appearance-none border rounded-lg px-10 py-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-600"
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Name"
                      required
                    />
                  </div>
                </motion.div>
              )}
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="relative">
                  <FaUserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-600" />

                  <input
                    className="appearance-none border rounded-lg px-10 py-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-600"
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                  />
                </div>
              </motion.div>
              {!isLoginPage && (
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <div className="relative">
                    <FaUserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-600" />
                    <input
                      className="appearance-none border rounded-lg px-10 py-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-600"
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone"
                      required
                    />
                  </div>
                </motion.div>
              )}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-600" />
                  <input
                    className="appearance-none border rounded-lg px-10 py-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-600"
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    required
                  />
                </div>
              </motion.div>
              {!isLoginPage && (
                <motion.div
                  className="mb-10 flex items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <input
                    type="checkbox"
                    name="rememberMe"
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleCheckboxChange}
                    className="mr-2 focus:ring-blue-600 h-5 w-5 text-teal-600 border-gray-300 rounded"
                  />
                  <label
                    className="text-white font-semibold"
                    htmlFor="rememberMe"
                  >
                    Keep me signed in
                  </label>
                </motion.div>
              )}
              <motion.button
                type="submit"
                className="w-full py-4 rounded-lg bg-blue-500 hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 text-white font-semibold transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoginPage ? "Login" : "Register"}
              </motion.button>
            </form>
          </div>
        </motion.div>
        {!isLoginPage && (
          <motion.div
            className="relative w-full md:w-1/2 flex flex-col justify-center items-center px-10 py-16 text-white"
            variants={welcomeVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-blue-800 opacity-75 transition-opacity duration-500 ease-in-out"></div>
            <div className="relative z-10 text-center">
              <motion.h2
                className="text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Welcome Back Learner !
              </motion.h2>
              <motion.p
                className="text-lg mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                To keep connected with us please Login with your credentials.
              </motion.p>
              <motion.button
                className="py-3 px-6 rounded-lg bg-white text-indigo-600 hover:bg-gray-100 font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                onClick={togglePage}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default SignProcess;
