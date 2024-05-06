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

  const handleApproveCourse = async (courseId) => {
    try {
      const response = await fetch(`http://localhost:8070/api/${courseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'approved' }) // Update the status to 'approved'
      });

      if (response.ok) {
        // Optionally, update the state to reflect the changes
        const updatedCourses = courses.map(course => {
          if (course.courseCode === courseId) {
            return { ...course, status: 'approved' };
          }
          return course;
        });
        setCourses(updatedCourses);
      } else {
        console.error('Error approving course:', response.statusText);
      }
    } catch (error) {
      console.error('Error approving course:', error);
    }
  };

  const handleRejectCourse = async (courseId) => {
    try {
      const response = await fetch(`http://localhost:8070/api/${courseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'rejected' }) // Update the status to 'rejected'
      });

      if (response.ok) {
        // Optionally, update the state to reflect the changes
        const updatedCourses = courses.map(course => {
          if (course.courseCode === courseId) {
            return { ...course, status: 'rejected' };
          }
          return course;
        });
        setCourses(updatedCourses);
      } else {
        console.error('Error rejecting course:', response.statusText);
      }
    } catch (error) {
      console.error('Error rejecting course:', error);
    }
  };

  const publishedCourses = courses.filter(course => course.status === 'published');
  const approvedCourses = courses.filter(course => course.status === 'approved');
  const republishCourses = courses.filter(course => course.status === 'republish');

  return (
    <div className="container mx-auto">
    <h1 className="text-4xl font-bold mt-8 mb-4 text-center">All Courses</h1>
    {/* Published Courses */}
    <h2 className="text-2xl font-bold mt-8 mb-4">Published Courses</h2>
    <table className="border-collapse w-full">
      <thead>
        <tr className="bg-gray-300">
          <th className="border p-4">Thumbnail</th>
          <th className="border p-4">Course Name</th>
          <th className="border p-4">Price</th>
          <th className="border p-4">Instructor</th>
          <th className="border p-4">Content</th>
          <th className="border p-4">Approval</th>
          <th className="border p-4">Rejection</th>
        </tr>
      </thead>
      <tbody>
        {publishedCourses.map(course => (
          <tr key={course._id} className="hover:bg-gray-100">
            {/* Render each published course */}
            <td className="border p-4">
              <img 
                src={course.courseThumbnail} 
                alt={course.courseName} 
                className="object-cover h-32 w-32 mx-auto" 
              />
            </td>
            <td className="border p-4">{course.courseName}</td>
            <td className="border p-4">{course.price}</td>
            <td className="border p-4">{course.Instructor.join(', ')}</td>
            <td className="border p-4">
              <Link to={`/courseAdmin/${course.courseCode}`}>
                <button 
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                  View Content
                </button>
              </Link>
            </td>
            <td className="border p-4">
              <button 
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleApproveCourse(course.courseCode)}
              >
                Approve
              </button>
            </td>
            <td className="border p-4">
              <button 
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleRejectCourse(course.courseCode)}
              >
                Reject
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* RePublished Courses */}
    <h2 className="text-2xl font-bold mt-8 mb-4">RePublished Courses</h2>
    <table className="border-collapse w-full">
      <thead>
        <tr className="bg-gray-300">
          <th className="border p-4">Thumbnail</th>
          <th className="border p-4">Course Name</th>
          <th className="border p-4">Price</th>
          <th className="border p-4">Instructor</th>
          <th className="border p-4">Content</th>
          <th className="border p-4">Approval</th>
          <th className="border p-4">Rejection</th>
        </tr>
      </thead>
      <tbody>
        {republishCourses.map(course => (
          <tr key={course._id} className="hover:bg-gray-100">
            {/* Render each published course */}
            <td className="border p-4">
              <img 
                src={course.courseThumbnail} 
                alt={course.courseName} 
                className="object-cover h-32 w-32 mx-auto" 
              />
            </td>
            <td className="border p-4">{course.courseName}</td>
            <td className="border p-4">{course.price}</td>
            <td className="border p-4">{course.Instructor.join(', ')}</td>
            <td className="border p-4">
              <Link to={`/courseAdmin/${course.courseCode}`}>
                <button 
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                  View Content
                </button>
              </Link>
            </td>
            <td className="border p-4">
              <button 
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleApproveCourse(course.courseCode)}
              >
                Approve
              </button>
            </td>
            <td className="border p-4">
              <button 
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleRejectCourse(course.courseCode)}
              >
                Reject
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

{/* Approved Courses */}
<h2 className="text-2xl font-bold mt-8 mb-4">Approved Courses</h2>
    <table className="border-collapse w-full">
      <thead>
        <tr className="bg-gray-300">
          <th className="border p-4">Thumbnail</th>
          <th className="border p-4">Course Name</th>
          <th className="border p-4">Price</th>
          <th className="border p-4">Instructor</th>
          <th className="border p-4">Content</th>
        </tr>
      </thead>
      <tbody>
        {approvedCourses.map(course => (
          <tr key={course._id} className="hover:bg-gray-100">
            {/* Render each approved course */}
            <td className="border p-4">
              <img 
                src={course.courseThumbnail} 
                alt={course.courseName} 
                className="object-cover h-32 w-32 mx-auto" 
              />
            </td>
            <td className="border p-4">{course.courseName}</td>
            <td className="border p-4">{course.price}</td>
            <td className="border p-4">{course.Instructor.join(', ')}</td>
            <td className="border p-4">
              <Link to={`/courseAdmin/${course.courseCode}`}>
                <button 
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                  View Content
                </button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default Courses;
