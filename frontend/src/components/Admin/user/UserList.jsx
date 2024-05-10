import { useState, useEffect } from "react";
import axios from "axios";
import UpdateRoleModal from "./UpdateRoleModal";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Fetch user list from the server
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
        const response = await axios.get(
          "http://localhost:7000/api/users/users",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in the request headers
            },
          }
        );
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleUpdateRole = (user) => {
    setSelectedUser(user);
    console.log(user.role);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">User List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white shadow-md rounded-md p-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-bold">{user.name}</h2>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
            </div>
            {user.role !== "instructor" && (
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={() => handleUpdateRole(user)}
              >
                Make Instructor
              </button>
            )}
          </div>
        ))}
      </div>
      {showModal && (
        <UpdateRoleModal
          user={selectedUser}
          onClose={handleCloseModal}
          onSuccess={(updatedUser) => {
            setUsers((prevUsers) =>
              prevUsers.map((user) =>
                user._id === updatedUser._id ? updatedUser : user
              )
            );
            handleCloseModal();
          }}
        />
      )}
    </div>
  );
};

export default UserList;
