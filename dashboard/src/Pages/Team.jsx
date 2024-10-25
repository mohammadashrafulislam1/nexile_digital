import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsPencilSquare } from 'react-icons/bs'; // Ensure you have react-icons installed
import { FaTrashAlt } from 'react-icons/fa'; // Ensure you have react-icons installed
import { endPoint } from '../Components/ForAll/ForAll'; // Adjust the import according to your file structure
import Swal from 'sweetalert2';

const Team = () => {
  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [role, setRole] = useState('');
  const [des, setDes] = useState('');
  const [image, setImage] = useState(null);
  const [entryId, setEntryId] = useState(null);
  const [entries, setEntries] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch all entries on component mount
  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${endPoint}/team`); // Adjust the endpoint based on your backend setup
      setEntries(response.data);
    } catch (error) {
      console.error("Error fetching entries:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'detail') setDetail(value);
    if (name === 'role') setRole(value);
    if (name === 'des') setDes(value);
  };

  // Handle image change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    const previewUrl = URL.createObjectURL(e.target.files[0]);
    setImage(previewUrl);
  };

  // Submit form handler for add or update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('detail', detail);
    formData.append('role', role);
    formData.append('des', des);
    if (image) {
      formData.append('image', image);
    }

    try {
      setLoading(true);
      if (isUpdating) {
        // Update entry
        await axios.put(`${endPoint}/team/${entryId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Team member updated successfully!`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        // Add new entry
        await axios.post(`${endPoint}/team`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Team member added successfully!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      // Clear form and reset state
      setName('');
      setDetail('');
      setRole('');
      setDes('');
      setImage(null);
      setIsUpdating(false);
      fetchEntries();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    } finally {
      setLoading(false);
    }
  };

  // Handle edit and delete actions
  const handleEditEntry = (entry) => {
    setIsUpdating(true);
    setName(entry.name);
    setDetail(entry.detail);
    setRole(entry.role);
    setDes(entry.des);
    setEntryId(entry._id); // Set the entry ID
  };

  const handleDeleteEntry = async (entryId) => {
    try {
      setLoading(true);
      await axios.delete(`${endPoint}/team/${entryId}`);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Team member deleted successfully!`,
        showConfirmButton: false,
        timer: 1500,
      });
      fetchEntries();
    } catch (error) {
      console.error('Error deleting entry:', error);
      alert('Error deleting entry');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="my-10 p-6">
      <h2 className="text-2xl font-semibold text-center mb-4">
        {isUpdating ? 'Update Team Member' : 'Add Team Member'}
      </h2>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-5 lg:w-1/2 md:w-[80%] w-[96%] mx-auto">
        {/* Form fields */}
        <div className='mb-3'>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className='mb-3'>
          <label className="block text-sm font-medium text-gray-700 mb-2">Detail:</label>
          <textarea
            name="detail"
            value={detail}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className='mb-3'>
          <label className="block text-sm font-medium text-gray-700 mb-2">Role:</label>
          <input
            type="text"
            name="role"
            value={role}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className='mb-3'>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description:</label>
          <textarea
            name="des"
            value={des}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className='mb-3'>
          <label className="block text-sm font-medium text-gray-700 mb-2">Image:</label>
          {image && (
                <img src={image} alt={name} className="w-32 h-32 rounded-md object-cover my-3" />
              )}
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="mt-1 file-input file-input-bordered w-full mb-3"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-5 btn btn-sm bg-black text-white font-semibold py-2 rounded-md transition duration-200"
        >
          {isUpdating ? 'Update Member' : 'Add Member'}
        </button>
      </form>

      {/* List of entries */}
      {entries.length > 0 ? (
        <h2 className="text-xl font-semibold mt-10">Team Members</h2>
      ) : (
        <p className="lg:w-1/2 md:w-[80%] w-[96%] mx-auto text-white p-4 bg-red-400 rounded-md mt-5">
          No entries found
        </p>
      )}
      <div className="mt-6 flex flex-wrap gap-4">
        {entries.map((entry) => (
          <div key={entry._id} className="p-4 border bg-white rounded-md">
            <div className="flex gap-3 items-center">
              {entry.image && (
                <img src={entry.image} alt={entry.name} className="w-32 h-32 rounded-md object-cover my-3" />
              )}
              <div>
                <h3 className="text-lg font-bold">{entry.name}</h3>
                <p>{entry.detail}</p>
                <p><strong>Role:</strong> {entry.role}</p>
              </div>
              <div className="flex justify-between gap-2 mt-4 items-center">
                <button className="text-2xl text-blue-600" onClick={() => handleEditEntry(entry)}>
                  <BsPencilSquare />
                </button>
                <button type="button" className="text-2xl text-red-600" onClick={() => handleDeleteEntry(entry._id)}>
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
