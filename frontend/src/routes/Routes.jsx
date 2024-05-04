import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddCourse from '../components/AddCourse';
import DisplayCourse from '../components/DisplayCourse';
import AddModulesPage from '../components/AddModule';
import UpdateCourse from '../components/UpdateCourse';
import AdminCourse from '../components/admin/AdminCourses';

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<AddCourse />} />
        <Route exact path="/display" element={<DisplayCourse />} />
        <Route path="/courses/:courseCode" element={<AddModulesPage />} />
        <Route path="/courses/update/:courseCode" element={<UpdateCourse />} />
        <Route exact path="/adminCourse" element={<AdminCourse />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
