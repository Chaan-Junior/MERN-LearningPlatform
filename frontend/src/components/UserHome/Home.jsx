import React from 'react';
import Navbar from "./NavBar";
import Footer from "./Footer";
import home from "../../assets/home.jpg";

const Home = () => {
  return (
    <>
      <Navbar/>
      <div className="flex flex-col justify-between h-screen">
        <div
          className="bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${home})`,
            minHeight: "calc(100vh - 5rem)",
            marginBottom: 0,
          }}
        >
          <div className="container mx-auto flex flex-col justify-center h-full">
            <div className="my-auto mx-auto lg:mx-0 w-10/12 lg:w-2/5">
              <h1 className="text-7xl mb-4">
                <span className="text-violet-500">
                  Empower Your Learning Journey
                </span>
              </h1>
              <p className="text-2xl mb-8">
                Discover a new way to learn with our comprehensive Learning
                Management System. Explore a wide range of courses, interact
                with instructors, and track your progress seamlessly.
              </p>
              <div className="flex items-center">
                <button className="rounded px-10 py-3 text-white bg-violet-500 hover:bg-violet-600">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
