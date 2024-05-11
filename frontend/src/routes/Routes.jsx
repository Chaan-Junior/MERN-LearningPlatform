import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Importing all the necessary components
import AddCourse from "../components/Course/Instructor/AddCourse";
import DisplayCourse from "../components/Course/Instructor/DisplayCourse";
import AddModulesPage from "../components/Course/Instructor/AddModule";
import UpdateCourse from "../components/Course/Instructor/UpdateCourse";
import AdminCourse from "../components/Course/Admin/AdminCourses";
import AdminCourseContent from "../components/Course/Admin/CourseContent";
import UserCourse from "../components/Course/User/UserCourse";
import CourseDescription from "../components/Course/User/CourseDescription";
import CourseContent from "../components/Course/User/courseContent";
import Pay from "../components/Payment/pages/AddPayment";
import ViewPayment from "../components/Payment/pages/Payment";
import UserDashboard from "../components/UserHome/Home";
import SignProcess from "../components/Admin/user/SignProcess";
import Dashboard from "../components/Admin/home/Dashboard";
import InstructorDashboard from "../components/Admin/instructor/Dash";
import UserList from "../components/Admin/user/UserList";
import UserProfile from "../components/Admin/user/UserProfile";
import EnrolledCourses from "../components/Enrollment/Enroll";

const AppRoutes = () => {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserRole = async () => {
      const tokenString = localStorage.getItem('token');
      if (tokenString) {
        const tokenPayload = JSON.parse(atob(tokenString.split(".")[1]));
        setUserRole(tokenPayload.role);
      } else {
        if(userRole==='admin'){
        navigate('/admin');
        }
        else if(userRole==="instructor"){
          navigate('/instructor')
        }
        else if(userRole==="learner"){
          navigate('/userHome')
        }
        else{
          if(!tokenString){
            navigate("/")
          }
        }
      }
    };
  
    checkUserRole();
  }, [navigate]);

  return (
    <div>
      <Routes>
        {userRole === "instructor" && (
          <>
            <Route path="/instructor" element={<InstructorDashboard />} />
            <Route path="/addCourses" element={<AddCourse />} />
            <Route path="/display" element={<DisplayCourse />} />
            <Route path="/courses/:courseCode" element={<AddModulesPage />} />
            <Route path="/courses/update/:courseCode" element={<UpdateCourse />} />
          </>
        )}

        {userRole === "admin" && (
          <>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/courseAdmin" element={<AdminCourse />} />
            <Route path="/courseAdmin/:courseCode" element={<AdminCourseContent />} />
            <Route path="/admin/users" element={<UserList />} />
            <Route path="/pay" element={<ViewPayment />} />
          </>
        )}

        <Route path="/courseUser" element={<UserCourse />} />
        <Route path="/courseContent/:courseCode" element={<CourseDescription />} />
        <Route path="/coursedetails/:courseCode" element={<CourseContent />} />
        <Route path="/addPay/:courseCode/:price" element={<Pay />} />
        <Route path="/userHome" element={<UserDashboard />} />
        <Route path="/" element={<SignProcess />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/enrolled-courses" element={<EnrolledCourses />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
