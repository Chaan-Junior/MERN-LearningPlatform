/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route } from "react-router-dom";
import AddCourse from "../components/Course/Instructor/AddCourse";
import DisplayCourse from "../components/Course/Instructor/DisplayCourse";
import AddModulesPage from "../components/Course/Instructor/AddModule";
import UpdateCourse from "../components/Course/Instructor/UpdateCourse";

import AdminCourse from "../components/Course/Admin/AdminCourses";
import AdminCourseContent from "../components/Course/Admin/CourseContent";

import UserCourse from "../components/Course/User/UserCourse";
import Dashboard from "../pages/home/Dashboard";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<AddCourse />} />
        <Route exact path="/display" element={<DisplayCourse />} />
        <Route path="/courses/:courseCode" element={<AddModulesPage />} />
        <Route path="/courses/update/:courseCode" element={<UpdateCourse />} />

        <Route exact path="/courseAdmin" element={<AdminCourse />} />
        <Route
          exact
          path="/courseAdmin/:courseCode"
          element={<AdminCourseContent />}
        />

        <Route exact path="/courseUser" element={<UserCourse />} />
        <Route exact path="/admin" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
