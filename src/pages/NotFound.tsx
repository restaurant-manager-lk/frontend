import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-gray-900 tracking-widest">404</h1>
        <div className="bg-blue-500 px-2 text-sm rounded rotate-12 absolute">
          Page Not Found
        </div>
        <p className="text-gray-500 mt-2">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <a href="/" className="mt-5 inline-block px-5 py-3 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition duration-300">
          Go Home
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
