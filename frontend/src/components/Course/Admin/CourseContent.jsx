import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CourseContent = () => {
  const { courseCode } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8070/api/${courseCode}`);
        const data = await response.json();
        setCourse(data.course);
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

  return (
    <div className="container mx-auto">
      {course && (
        <div>
          <h1 className="text-4xl font-bold mt-8 mb-4">{course.courseName}</h1>
          <p className="text-lg text-gray-600">{course.description}</p>
          <p className="text-lg text-gray-700 mt-2">Price: {course.price}</p>
          <p className="text-lg text-gray-700">Instructor: {course.Instructor.join(', ')}</p>
          {/* Display existing modules */}
          <h2 className="text-xl font-bold mt-4">Modules:</h2>
          {course.modules.map(module => (
            <div key={module._id} className="mt-4 border border-gray-300 rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-2">{module.title}</h3>
              {/* Display module items */}
              <ul>
                {module.moduleItems.map(item => (
                  <li key={item._id} className="bg-gray-200 rounded-lg p-4 shadow-md mb-2">
                    <div>
                      <p className="text-lg font-semibold mb-1">{item.title}</p>
                      <p className="text-gray-700">{item.type}</p>
                      <a href={item.url} className="text-blue-500 hover:underline">{item.url}</a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseContent;
