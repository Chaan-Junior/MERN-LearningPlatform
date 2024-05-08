import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Perform logout actions here, e.g., clearing token from localStorage
    localStorage.removeItem("token");
    window.location.href = "/";
    // Redirect or perform any additional actions after logout if needed
    // Example: window.location.href = "/login";
  };

  return (
    <nav className="bg-gray-800 py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/userHome" className="text-white text-2xl font-semibold">
            Course Genius
          </Link>
          <div className="md:hidden">
            <button
              onClick={toggleNavbar}
              className="text-white focus:outline-none focus:text-white"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
          <div className={`md:flex ${isOpen ? "block" : "hidden"} md:block`}>
            <div className="flex flex-col md:flex-row">
              <Link
                to="/courseUser"
                className="text-white hover:text-gray-300 py-2 px-4 block md:inline-block"
              >
                Courses
              </Link>
              <Link
                to="/profile"
                className="text-white hover:text-gray-300 py-2 px-4 block md:inline-block"
              >
                Profile
              </Link>
            </div>
            <div className="flex flex-col md:flex-row mt-4 md:mt-0">
              <Link
                onClick={handleLogout}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 md:py-2 md:px-4 rounded block md:inline-block"
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
