import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddCourse = () => {
  const [courseData, setCourseData] = useState({
    courseCode: '',
    courseName: '',
    description: '',
    price: '',
    courseThumbnail: '',
    Instructor: '',
    status: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    // For file input, set the value to files[0]
    setCourseData({
      ...courseData,
      [name]: name === 'courseThumbnail' && files ? files[0] : value,
    });
  };

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(courseData);
    try {
      const response = await fetch('http://localhost:8070/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert("Course added successfully!")
        navigate("/display");
      } else {
        alert('Failed to add course');
      }
    } catch (error) {
      console.error('Error adding course:', error);
      alert('An error occurred while adding the course');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-200 px-4 py-8 border border-black rounded-md">
      <h2 className="text-4xl font-bold mb-4 text-center">Add Course</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="courseCode" className="block text-lg font-medium text-gray-700">Course Code:</label>
          <input type="text" name="courseCode" id="courseCode" value={courseData.courseCode} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="courseName" className="block text-lg font-medium text-gray-700">Course Name:</label>
          <input type="text" name="courseName" id="courseName" value={courseData.courseName} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-lg font-medium text-gray-700">Description:</label>
          <textarea name="description" id="description" value={courseData.description} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-lg font-medium text-gray-700">Price:</label>
          <input type="text" name="price" id="price" value={courseData.price} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="courseThumbnail" className="block text-lg font-medium text-gray-700">Course Thumbnail:</label>
          <input type="text" name="courseThumbnail" id="courseThumbnail" onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="instructor" className="block text-lg font-medium text-gray-700">Instructor:</label>
          <input type="text" name="Instructor" id="instructor" value={courseData.Instructor} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md" />

        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-lg font-medium text-gray-700">Status:</label>
          <select name="status" id="status" value={courseData.status} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
          <option value=""></option>
            <option value="published">Published</option>
          </select>
        </div>
        <br />
        <div className="flex justify-between">
          <Link to={`/display`} className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700">View Details</Link>
          <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Course</button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;