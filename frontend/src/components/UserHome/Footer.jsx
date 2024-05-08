import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-4 mt-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <p className="text-white">© 2024 Course Genius. All rights reserved.</p>
          <div className="flex items-center">
            <a href="#" className="text-white hover:text-gray-300 px-2">
              Terms of Service
            </a>
            <span className="text-white"> | </span>
            <a href="#" className="text-white hover:text-gray-300 px-2">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
