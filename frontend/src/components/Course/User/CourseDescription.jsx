import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faVideo, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

const CourseDescription = () => {
  const { courseCode } = useParams();
  const [course, setCourse] = useState(null);
  const [expandedModules, setExpandedModules] = useState([]);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8070/api/${courseCode}`);
        const data = await response.json();
        setCourse(data.course);
        // Initialize expandedModules state with false for each module
        setExpandedModules(Array(data.course.modules.length).fill(false));
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    // Check if there's data in localStorage
    const storedCourseData = localStorage.getItem('courseData');
    if (storedCourseData) {
      setCourse(JSON.parse(storedCourseData));
    } else {
      fetchCourseDetails();
    }
  }, [courseCode]);

  // Toggle the visibility of module items
  const toggleModule = (index) => {
    const newExpandedModules = [...expandedModules];
    newExpandedModules[index] = !newExpandedModules[index];
    setExpandedModules(newExpandedModules);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {course && (
        <div>
          <div className="bg-sky-700 px-6 py-4 rounded-t-lg w-full">
            <h1 className="text-3xl font-semibold text-white mb-4">{course.courseName}</h1>
            <div className="flex items-center justify-between">
              <p className="text-lg text-gray-300">Price: {course.price}</p>
              <p className="text-lg text-gray-300">Instructor: {course.Instructor.join(', ')}</p>
              <button className="bg-purple-600 text-white px-4 py-2 rounded">Add to cart</button>
            </div>
          </div>
          <br/>
          <div className="border border-gray-300 rounded-lg p-4 mb-6 shadow-md">
            <h2 className="text-2xl font-semibold text-black mb-4">What you'll learn</h2>
            <p className="text-lg text-gray-600">{course.description}</p>
          </div>
          {/* Display existing modules */}
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-sky-700">Modules:</h2>
          {course.modules.map((module, index) => (
            <div key={module._id} className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
              <div className="flex items-center justify-between bg-purple-200 py-3 px-4 cursor-pointer"
                onClick={() => toggleModule(index)}>
                <h3 className="text-lg font-semibold">{module.title}</h3>
                <FontAwesomeIcon icon={expandedModules[index] ? faAngleUp : faAngleDown} className="text-purple-700" />
              </div>
              {/* Display module items if expanded */}
              {expandedModules[index] && (
  <ul>
    {module.moduleItems.map(item => (
      <li key={item._id} className="border-t border-gray-300 py-4 px-6 flex items-center">
        {item.type === 'file' ? (
          <FontAwesomeIcon icon={faFile} className="text-purple-700 mr-2" />
        ) : (
          <FontAwesomeIcon icon={faVideo} className="text-purple-700 mr-2" />
        )}
        <div className="flex flex-col ml-2">
          <p className="text-lg font-semibold">{item.title}</p>
          <a href={item.url} className="text-blue-500 hover:underline">{item.url}</a>
        </div>
      </li>
    ))}
  </ul>
)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseDescription;
