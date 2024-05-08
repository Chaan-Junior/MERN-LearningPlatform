import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "../../UserHome/NavBar";
import Footer from "../../UserHome/Footer";

const UserCourse = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  // Filter courses based on search term
  const filteredCourses = approvedCourses.filter(course =>
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to clear the search
  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <>
    <Navbar/>
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mt-8 mb-4 text-center text-purple-500">What to learn next</h1>
      <div className="border border-gray-300 shadow-md p-4 rounded-md mb-4 bg-red-50">
      <p className="text-lg mb-4 text-gray-700 font-medium leading-relaxed">Welcome to our extensive collection of courses designed to empower and inspire you on your learning journey. 
      Whether you're a beginner looking to explore new interests or an expert seeking to enhance your skills, 
      we offer a diverse range of courses catering to various interests and proficiency levels. 
      From programming and technology to arts, humanities, and beyond, our courses are curated to provide enriching experiences and valuable knowledge. Explore our selection, 
      embark on your learning adventure, and unlock new opportunities for personal and professional growth!</p></div>
      <div className="mb-4 text-center">
        <input
          type="text"
          placeholder="Search by course name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded-md px-4 py-2 mr-2"
        />
        <button onClick={clearSearch} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md ml-2">
          Clear Search
        </button>
      </div>
      <br/>
      <div className="grid grid-cols-3 gap-4">
        {filteredCourses.map(course => (
          <div key={course._id} className="border border-gray-200 rounded-md overflow-hidden bg-white shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
            <Link to={`/courseContent/${course.courseCode}`}>
              <img 
                src={course.courseThumbnail} 
                alt={course.courseName} 
                className="mb-2 object-cover h-60 w-full rounded-t-md" 
                style={{ maxHeight: '300px' }} 
              />
            </Link>
            <div className="bg-red-300">
              <div className="p-4 bg-purple-200 rounded-md overflow-hidden transform skew-y-6 relative">
                <h2 className="text-xl font-bold mb-2" style={{ transform: "skewY(-6deg)" }}>{course.courseName}</h2>
                <p className="text-gray-700 mb-2" style={{ transform: "skewY(-6deg)" }}>{course.price}</p>
                <p className="text-gray-700" style={{ transform: "skewY(-6deg)" }}>Instructor: {course.Instructor.join(', ')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default UserCourse;
