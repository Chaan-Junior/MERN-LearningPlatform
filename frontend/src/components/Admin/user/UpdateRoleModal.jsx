import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import axios from "axios";

// In UpdateRoleModal.js
const UpdateRoleModal = ({ user, onClose, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // State to handle errors

  const handleUpdateRole = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:7000/api/users/role/update/${user?._id}`,
        { role: "instructor" }, // Update role to 'instructor'
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onSuccess(response.data.user); // Call onSuccess callback with updated user data
    } catch (error) {
      setError(error.message); // Set error state if request fails
    } finally {
      setIsLoading(false);
    }
  };

  // Rest of the component code...

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Update Role</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}{" "}
          {/* Display error message if request fails */}
          <p>
            Are you sure you want to update {user.name} s role to instructor?
          </p>
          <div className="mt-6 flex justify-end">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={handleUpdateRole} // Attach handleUpdateRole to onClick event
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add prop type validation
UpdateRoleModal.propTypes = {
  user: PropTypes.object.isRequired, // Ensure user prop is provided and is an object
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default UpdateRoleModal;
