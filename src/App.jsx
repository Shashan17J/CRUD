import React, { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    address: "",
  });

  const [isEdit, setIsEdit] = useState(false);

  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers) {
      setUsers(storedUsers);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      const updatedUsers = users.map((user, index) =>
        index === editIndex ? form : user
      );
      setUsers(updatedUsers);
      setIsEdit(false);
      setEditIndex(null);
    } else {
      setUsers([...users, form]);
    }
    setForm({
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      address: "",
    });
  };

  const handleEdit = (index) => {
    setForm(users[index]);
    setIsEdit(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CRUD Applications</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleInputChange}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 "
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleInputChange}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 "
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={form.dob}
            onChange={handleInputChange}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 "
            required
          />
        </div>
        <div className="mb-4">
          <select
            name="gender"
            value={form.gender}
            onChange={handleInputChange}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 "
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="other">other</option>
          </select>
        </div>
        <div className="mb-4">
          <textarea
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleInputChange}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 "
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isEdit ? "Update" : "Add"}
        </button>
      </form>

      <h2 className="text-xl font-bold mb-2">User List</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200">First Name</th>
            <th className="py-2 px-4 bg-gray-200">Last Name</th>
            <th className="py-2 px-4 bg-gray-200">Date Of Birth</th>
            <th className="py-2 px-4 bg-gray-200">Gender</th>
            <th className="py-2 px-4 bg-gray-200">Address</th>
            <th className="py-2 px-4 bg-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            <tr key={index}>
              <td className="border px-4 py-2">{user.firstName}</td>
              <td className="border px-4 py-2">{user.lastName}</td>
              <td className="border px-4 py-2">{user.dob}</td>
              <td className="border px-4 py-2">{user.gender}</td>
              <td className="border px-4 py-2">{user.address}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  Delete
                </button>
              </td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
