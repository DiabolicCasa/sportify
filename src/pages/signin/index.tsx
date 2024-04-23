import React from 'react';
import SigninForm from './SigninForm';

const Signin: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-md p-5 rounded-xl w-full space-y-8 border bg-white shadow-xl">
       
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">Sign in</h2>
        </div>
        <SigninForm/>
      </div>
    </div>
  );
};

export default Signin;
