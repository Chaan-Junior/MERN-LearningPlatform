import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faFile,
  faVideo,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../UserHome/NavBar";
import Footer from "../../UserHome/Footer";

const CourseDescription = () => {
  const { courseCode } = useParams();
  const [course, setCourse] = useState(null);
  const [expandedModules, setExpandedModules] = useState([]);
  const [enrollmentStatus, setEnrollmentStatus] = useState(false); // New state for enrollment status

  const tokenString = localStorage.getItem('token');

    const tokenPayload = JSON.parse(atob(tokenString.split(".")[1]));
    const uid = tokenPayload.userId;

    useEffect(() => {
      const fetchCourseDetails = async () => {
        try {
          const response = await fetch(`http://localhost:8070/api/${courseCode}`);
          const data = await response.json();
          setCourse(data.course);
          setExpandedModules(Array(data.course.modules.length).fill(false));
    
          // Check enrollment status when course details are fetched
          const enrollmentResponse = await fetchEnrollmentStatus(data.course._id); // Assuming you have a function fetchEnrollmentStatus
          setEnrollmentStatus(enrollmentResponse.value);
        } catch (error) {
          console.error("Error fetching course details:", error);
        }
      };
    
      // Check if there's data in localStorage
      const storedCourseData = localStorage.getItem("courseData");
      if (storedCourseData) {
        setCourse(JSON.parse(storedCourseData));
      } else {
        fetchCourseDetails();
      }
    }, [courseCode]);
    
    // Function to fetch enrollment status
    const fetchEnrollmentStatus = async (courseId) => {
      console.log('Course ID:', courseId);
      try {
        const response = await fetch("http://localhost:3002/api/enroll/checkEnrollment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseId : courseId,
            userId: uid,
          }),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching enrollment status:", error);
        return { value: false }; // Default to false in case of error
      }
    };
    

  // Toggle the visibility of module items
  const toggleModule = (index) => {
    const newExpandedModules = [...expandedModules];
    newExpandedModules[index] = !newExpandedModules[index];
    setExpandedModules(newExpandedModules);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {course && (
          <div>
            <div className="bg-sky-700 px-6 py-4 rounded-t-lg w-full">
              <h1 className="text-3xl font-semibold text-white mb-4">
                {course.courseName}
              </h1>
              <div className="flex items-center justify-between">
                <p className="text-lg text-gray-300">Price: ${course.price}</p>
                <p className="text-lg text-gray-300">
                  Instructor: {course.Instructor.join(", ")}
                </p>
                {enrollmentStatus ? (
                  <Link to={`/coursedetails/${course.courseCode}`}> {/* Assuming viewCourse route exists */}
                    <button className="bg-green-600 text-white px-4 py-2 rounded">
                      View
                    </button>
                  </Link>
                ) : (
                  <Link to={`/addPay/${course.courseCode}/${course.price}`}>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded">
                      Buy
                    </button>
                  </Link>
                )}
              </div>
            </div>
            <br />
            <div className="border border-gray-300 rounded-lg p-4 mb-6 shadow-md">
              <h2 className="text-2xl font-semibold text-black mb-4">
                What you'll learn
              </h2>
              <p className="text-lg text-gray-600">{course.description}</p>
            </div>
            {/* Display existing modules */}
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-sky-700">
              Modules:
            </h2>
            {course.modules.map((module, index) => (
              <div
                key={module._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden mb-6"
              >
                <div
                  className="flex items-center justify-between bg-purple-200 py-3 px-4 cursor-pointer"
                  onClick={() => toggleModule(index)}
                >
                  <h3 className="text-lg font-semibold">{module.title}</h3>
                  <FontAwesomeIcon
                    icon={expandedModules[index] ? faAngleUp : faAngleDown}
                    className="text-purple-700"
                  />
                </div>
                {/* Display module items if expanded */}
                {expandedModules[index] && (
                  <ul>
                    {module.moduleItems.map((item) => (
                      <li
                        key={item._id}
                        className="border-t border-gray-300 py-4 px-6 flex items-center"
                      >
                        {item.type === "file" ? (
                          <FontAwesomeIcon
                            icon={faFile}
                            className="text-purple-700 mr-2"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faVideo}
                            className="text-purple-700 mr-2"
                          />
                        )}
                        <div className="flex flex-col ml-2">
                          <p className="text-lg font-semibold">{item.title}</p>
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
      <Footer />
    </>
  );
};

export default CourseDescription;
