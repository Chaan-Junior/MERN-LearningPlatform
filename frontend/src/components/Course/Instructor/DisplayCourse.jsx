import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:8070/api/courses'); 
        const data = await response.json();
        setCourses(data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleDelete = async (courseCode) => {
    try {
      const response = await fetch(`http://localhost:8070/api/${courseCode}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // If deletion is successful, fetch the updated course list
        const updatedCourses = courses.filter(course => course.courseCode !== courseCode);
        setCourses(updatedCourses);
      } else {
        console.error('Failed to delete course');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mt-8 mb-4 text-center">All Courses</h1>
      <div className="grid grid-cols-3 gap-4">
        {courses.map(course => (
          <div key={course._id} className="border p-4 rounded flex flex-col bg-gradient-to-r from-blue-100 to-green-100 text-sm">
            <Link to={`/courses/${course.courseCode}`}>
              <img 
                src={course.courseThumbnail} 
                alt={course.courseName} 
                className="mb-2 object-cover h-60 w-full" 
                style={{ maxHeight: '300px' }} 
              />
            </Link>
            <h2 className="text-lg font-bold">{course.courseName}</h2>
            <p className="text-gray-700 mt-2">Price: {course.price}</p>
            <p className="text-gray-700">Instructor: {course.Instructor.join(', ')}</p>
            <p className="text-gray-700 mt-2">Status: {course.status}</p>
            <br/>
            <div className="mt-auto flex justify-between">
            <Link to={`/courses/update/${course.courseCode}`}>
              <button className="bg-blue-500 hover:bg-blue-200 text-white font-bold py-2 px-4 rounded mr-2">
                Update
              </button>
            </Link>
              <button onClick={() => handleDelete(course.courseCode)} className="bg-red-500 hover:bg-blue-200 text-white font-bold py-2 px-4 rounded mr-2">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
