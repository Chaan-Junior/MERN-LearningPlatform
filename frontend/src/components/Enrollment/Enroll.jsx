import React, { useState, useEffect } from 'react';
import HashLoader from "react-spinners/HashLoader";
import Navbar from "../UserHome/NavBar";
import Footer from "../UserHome/Footer";
import { Link } from 'react-router-dom';

export default function Enroll() {
    const [enroll, setEnroll] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const tokenString = localStorage.getItem('token');

    const tokenPayload = JSON.parse(atob(tokenString.split(".")[1]));
    const uid = tokenPayload.userId;
    const uname = tokenPayload.name;

    useEffect(() => {
        fetch(`http://localhost:3002/api/enroll/enrolledUser/${uid}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setEnroll(data.enrollments);
                setLoading(false);
                console.log(data);
                console.log(enroll);
            })
            .catch(error => {
                console.error('Error fetching enrollments:', error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center mt-10 text-lg"><HashLoader size={60} className='mx-auto'/>Loading....</div>;
    if (error) return <div className="text-center mt-10 text-lg text-red-500">Error: {error}</div>;

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="container mx-auto mt-10 flex-grow">
                <h1 className="text-4xl font-bold text-center mb-12">Enrolled Courses for {uname}</h1>
                {enroll.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {enroll.map((enrolls) => (
                            <div key={enrolls._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <img src={`https://source.unsplash.com/random/800x400?document&${enrolls._id}`} alt="Course" className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <h2 className="text-2xl font-semibold mb-4">{enrolls.courseCode}</h2>
                                    <div className="flex items-center mb-6">
                                        <div className="w-full bg-gray-200 rounded-full h-4">
                                            <div className="bg-blue-600 h-4 rounded-full transition-all duration-500 ease-in-out" style={{width: `${enrolls.percentage}%`}}></div>
                                        </div>
                                        <span className="ml-4 text-lg font-semibold">{enrolls.percentage}%</span>
                                    </div>
                                    <Link to={`/coursedetails/${enrolls.courseCode}`}>
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300">
                                        Continue Course
                                    </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center mt-10 text-xl text-gray-500">No enrolled courses found</div>
                )}
            </div>
            <Footer />
        </div>
    );
}
