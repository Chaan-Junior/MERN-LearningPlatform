import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faVideo, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import Navbar from "../../UserHome/NavBar";
import Footer from "../../UserHome/Footer";

const CourseContent = () => {
  const { courseCode } = useParams();
  const [course, setCourse] = useState(null);
  const [expandedModules, setExpandedModules] = useState([]);
  const [progressMap, setProgressMap] = useState({});
  const [progressPercentage, setProgressPercentage] = useState(0);

  const tokenString = localStorage.getItem('token');
  const tokenPayload = JSON.parse(atob(tokenString.split('.')[1]));
  const uid = tokenPayload.userId;

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8070/api/${courseCode}`);
        const data = await response.json();
        setCourse(data.course);
        setExpandedModules(Array(data.course.modules.length).fill(false));
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    const fetchEnrollmentDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8070/api/${courseCode}`);
        const data = await response.json();
        setCourse(data.course);
        setExpandedModules(Array(data.course.modules.length).fill(false));
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourseDetails();
  }, [courseCode]);

  // Retrieve progress map from local storage when component mounts
  useEffect(() => {
    const storedProgressMap = localStorage.getItem('progressMap');
    if (storedProgressMap) {
      setProgressMap(JSON.parse(storedProgressMap));
    }
  }, []);

  // Calculate progress percentage whenever progress map changes
  useEffect(() => {
    const calculateProgressPercentage = () => {
      if (!course) return; // Ensure course data is available

      const totalModuleItems = course.modules.reduce((acc, module) => acc + module.moduleItems.length, 0);
      const completedModuleItems = Object.values(progressMap).filter(value => value).length;
      const percentage = totalModuleItems === 0 ? 0 : (completedModuleItems / totalModuleItems) * 100;
      setProgressPercentage(percentage);


    };

    calculateProgressPercentage();
  }, [progressMap, course]);

  // Save progress map to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('progressMap', JSON.stringify(progressMap));
  }, [progressMap]);

  const handleProgressUpdate = async (moduleItemId) => {
    try {
      const totalModuleItems = course.modules.reduce((acc, module) => acc + module.moduleItems.length, 0);
      const completedModuleItems = Object.values(progressMap).filter(value => value).length;
      const percentage = totalModuleItems === 0 ? 0 : (completedModuleItems / totalModuleItems) * 100;

      const response = await fetch('http://localhost:3002/api/enroll/updateProgress', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: uid,
          courseId: course._id,
          percentage: percentage,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update progress');
      }

      const updatedProgressMap = {
        ...progressMap,
        [moduleItemId]: true,
      };
      setProgressMap(updatedProgressMap);
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const toggleModule = (index) => {
    const newExpandedModules = [...expandedModules];
    newExpandedModules[index] = !newExpandedModules[index];
    setExpandedModules(newExpandedModules);
  };

  const handleCheckboxChange = (moduleItemId) => {
    if (!progressMap[moduleItemId]) {
      handleProgressUpdate(moduleItemId);
    }
  };

  const renderModuleItems = (module) => {
    return module.moduleItems.map((item) => (
      <li key={item._id} className="border-t border-gray-300 py-4 px-6 flex items-center">
        {item.type === 'file' ? (
          <FontAwesomeIcon icon={faFile} className="text-purple-700 mr-2" />
        ) : (
          <FontAwesomeIcon icon={faVideo} className="text-purple-700 mr-2" />
        )}
        <div className="flex flex-col ml-2">
          <p className="text-lg font-semibold">{item.title}</p>
          <a href={item.url} className="text-blue-500 hover:underline">{item.url}</a>
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              checked={progressMap[item._id] || false}
              onChange={() => handleCheckboxChange(item._id)}
              className="form-checkbox h-5 w-5 text-purple-600"
            />
            <label className="ml-2">Mark as complete</label>
          </div>
        </div>
      </li>
    ));
  };

  return (
    <>
    <Navbar />
    <div className="container mx-auto px-4 py-8">
      {course && (
        <div>
          <div className="bg-sky-700 px-6 py-4 rounded-t-lg w-full">
            <h1 className="text-3xl font-semibold text-white mb-4">{course.courseName}</h1>
            <div className="flex items-center justify-between">
              <p className="text-lg text-gray-300">Price: ${course.price}</p>
              <p className="text-lg text-gray-300">Instructor: {course.Instructor.join(', ')}</p>
            </div>
          </div>
          <br />
          <div className="border border-gray-300 rounded-lg p-4 mb-6 shadow-md">
            <h2 className="text-2xl font-semibold text-black mb-4">What you'll learn</h2>
            <p className="text-lg text-gray-600">{course.description}</p>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800">Progress</h2>
            <div className="flex items-center mt-2">
              <div className="w-full bg-blue-500 h-3 rounded-full">
                <div className="bg-green-500 h-3 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
              </div>
              <p className="ml-2 text-sm text-gray-700">{progressPercentage.toFixed(2)}%</p>
            </div>
          </div>
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-sky-700">Modules:</h2>
          {course.modules.map((module, index) => (
            <div key={module._id} className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
              <div className="flex items-center justify-between bg-purple-200 py-3 px-4 cursor-pointer" onClick={() => toggleModule(index)}>
                <h3 className="text-lg font-semibold">{module.title}</h3>
                <FontAwesomeIcon icon={expandedModules[index] ? faAngleUp : faAngleDown} className="text-purple-700" />
              </div>
              {expandedModules[index] && (
                <ul>
                  {renderModuleItems(module)}
                </ul>
              )}
            </div>
          ))}
          
        </div>
      )}
    </div>
    <Footer />
    </>
  );
};

export default CourseContent;
