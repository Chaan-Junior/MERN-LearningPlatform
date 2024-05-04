import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UserCourse = () => {
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

  // Filter courses with status "approved"
  const approvedCourses = courses.filter(course => course.status === 'approved');

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mt-8 mb-4 text-center">All Courses</h1>
      <div className="grid grid-cols-3 gap-4">
        {approvedCourses.map(course => (
          <div key={course._id} className="border p-4 rounded flex flex-col">
            <Link to={`/courses/${course.courseCode}`}>
              <img 
                src={course.courseThumbnail} 
                alt={course.courseName} 
                className="mb-2 object-cover h-60 w-full" 
                style={{ maxHeight: '300px' }} 
              />
            </Link>
            <h2 className="text-lg font-bold">{course.courseName}</h2>
            <p className="text-gray-600">{course.description}</p>
            <p className="text-gray-700 mt-2">Price: {course.price}</p>
            <p className="text-gray-700">Instructor: {course.Instructor.join(', ')}</p>
            <br/>
            <button className="bg-blue-400 hover:bg-blue-200 text-white font-bold py-2 px-4 rounded mr-2">
               Enroll
              </button>
            <br/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCourse;
