import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../UserHome/NavBar";
import Footer from "../../UserHome/Footer";
import Swal from "sweetalert2";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationType, setConfirmationType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(
          `http://localhost:7000/api/users/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUser(response.data.user);
        setFormData({
          name: response.data.user.name,
          email: response.data.user.email,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.put(
        `http://localhost:7000/api/users/profile/update/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUser(response.data.user);
      setEditMode(false);
      setSuccessMessage("Profile updated successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProfile = async () => {
    setConfirmationType("delete");
    setShowConfirmation(true);
  };

  const handleLogout = () => {
    setConfirmationType("logout");
    setShowConfirmation(true);
  };

  const handleRequest = async () => {
    setConfirmationType("confirm");
    setShowConfirmation(true);
  };

  const handleConfirmation = async (confirmed) => {
    setShowConfirmation(false);

    if (confirmed) {
      if (confirmationType === "delete") {
        try {
          const userId = localStorage.getItem("userId");
          await axios.delete(
            `http://localhost:7000/api/users/profile/delete/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          setSuccessMessage("Profile deleted successfully");
          navigate("/");
        } catch (error) {
          console.error(error);
        }
      } else if (confirmationType === "logout") {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setSuccessMessage("Logout successful");
        navigate("/");
      }else if(confirmationType==="confirm"){
        try{
          const tokenString = localStorage.getItem('token');
          const tokenPayload = JSON.parse(atob(tokenString.split(".")[1]));
          const name = tokenPayload.name;
          const email = tokenPayload.email;
          await axios.post("http://localhost:7000/api/users/InsSms",{name : name, email : email});
          Swal.fire({
            title: "Request Sent!",
            icon: "success",
          });

        }catch(err){
          console.log(err)
        }
      }

    }
  };

  const handleEnrolledCourses = () => {
    navigate("/enrolled-courses");
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="max-w-xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
          <div className="rounded-t-lg h-40 overflow-hidden">
            <img
              className="object-cover object-top w-full"
              src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
              alt="Mountain"
            />
          </div>
          <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
            <img
              className="object-cover object-center h-32"
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
              alt="Woman looking front"
            />
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg border mt-6">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-xl leading-6 font-semibold text-gray-900 text-center">
                User Profile
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500 text-center">
                All the required knowledge is gathered here.
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.name}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.email}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4">
              {successMessage}
            </div>
          )}
          {editMode ? (
            <form
              onSubmit={handleUpdateProfile}
              className="p-4 border-t mx-8 mt-2"
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="ml-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="p-4 border-t mx-8 mt-2">
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleEnrolledCourses}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Enrolled Courses
                </button>
                <button
                  onClick={handleRequest}
                  className="px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Request for Instructor Role
                </button>
                <button
                  onClick={handleDeleteProfile}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Delete Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white rounded-lg p-6 z-10">
            <h3 className="text-xl font-semibold mb-4">Confirmation</h3>
            <p className="mb-4">
              {confirmationType === "delete"
              ? "Are you sure you want to delete your profile? This action cannot be undone."
              : confirmationType === "logout"
              ? "Are you sure you want to logout?"
              : confirmationType === "confirm" 
              ? "Confirm to send Request?"
            : ""}

            </p>
            <div className="flex justify-end">
              <button
                onClick={() => handleConfirmation(true)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Yes
              </button>
              <button
                onClick={() => handleConfirmation(false)}
                className="ml-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default UserProfile;
