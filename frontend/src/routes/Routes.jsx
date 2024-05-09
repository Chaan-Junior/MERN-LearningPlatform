import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddCourse from '../components/Course/Instructor/AddCourse';
import DisplayCourse from '../components/Course/Instructor/DisplayCourse';
import AddModulesPage from '../components/Course/Instructor/AddModule';
import UpdateCourse from '../components/Course/Instructor/UpdateCourse';

import AdminCourse from '../components/Course/Admin/AdminCourses';
import AdminCourseContent from '../components/Course/Admin/CourseContent';

import UserCourse from '../components/Course/User/UserCourse';
import CourseDescription from '../components/Course/User/CourseDescription';
import CourseContent from '../components/Course/User/courseContent';

import Pay from '../components/Payment/pages/AddPayment';
import ViewPayment from '../components/Payment/pages/Payment';

import UserDashboard from '../components/UserHome/Home';
import SignProcess from '../components/Admin/user/SignProcess';
import Dashboard from '../components/Admin/home/Dashboard';

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/addCourses" element={<AddCourse />} />
        <Route exact path="/display" element={<DisplayCourse />} />
        <Route path="/courses/:courseCode" element={<AddModulesPage />} />
        <Route path="/courses/update/:courseCode" element={<UpdateCourse />} />

        <Route exact path="/courseAdmin" element={<AdminCourse />} />
        <Route exact path="/courseAdmin/:courseCode" element={<AdminCourseContent />} />

        <Route exact path="/courseUser" element={<UserCourse />} />
        <Route exact path="/courseContent/:courseCode" element={<CourseDescription />} />
        <Route exact path="/coursedetails/:courseCode" element={<CourseContent />} />

        <Route exact path="/addPay/:courseCode/:price" element={<Pay />} />
        <Route exact path="/pay" element={<ViewPayment/>} />

        <Route exact path="/admin" element={<Dashboard />} />
        <Route exact path="/userHome" element={<UserDashboard />} />
        <Route exact path="/" element={<SignProcess />} />
        
      </Routes>
    </div>
  );
};

export default AppRoutes;
