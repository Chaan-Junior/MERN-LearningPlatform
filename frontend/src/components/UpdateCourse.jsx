import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const UpdateCourse = () => {
  const { courseCode } = useParams(); // Get courseId from URL params
  const [course, setCourse] = useState({
    courseName: '',
    description: '',
    price: '',
    Instructor: [],
  });

  // Fetch course details using courseId and populate the form with existing data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:8070/api/${courseCode}`);
        if (!response.ok) {
          throw new Error('Failed to fetch course details');
        }
        const data = await response.json();
        setCourse(data.course);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };
    fetchCourse();
  }, [courseCode]); // Fix the dependency array

  // Handle form submission to update the course
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8070/api/${courseCode}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(course)
      });
      if (!response.ok) {
        throw new Error('Failed to update course');
      }
      // Redirect or show success message after successful update
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mt-8 mb-4 text-center">Update Course</h1>
      <form className="max-w-lg mx-auto"  onClick={handleSubmit} >
        <div className="mb-4">
          <label htmlFor="courseName" className="block text-sm font-medium text-gray-700">Course Name:</label>
          <input type="text" name="courseName" id="courseName" value={course.courseName} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
          <input type="text" name="description" id="description" value={course.description} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label>
          <input type="text" name="price" id="price" value={course.price} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="Instructor" className="block text-sm font-medium text-gray-700">Instructor:</label>
          <input type="text" name="Instructor" id="Instructor" value={course.Instructor} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>
        {/* Add more form fields for other course properties */}
        <Link to={`/display`}>
        <button type="submit" className="bg-blue-500 hover:bg-blue-200 text-white font-bold py-2 px-4 rounded">
          Update Course
        </button>
        </Link>
      </form>
    </div>
  );
};

export default UpdateCourse;
