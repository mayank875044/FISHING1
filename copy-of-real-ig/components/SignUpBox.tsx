
import React from 'react';

const SignUpBox: React.FC = () => {
    return (
        <div className="bg-white border border-gray-300 p-6 text-center mt-4 w-full max-w-[350px] text-sm">
            <span className="text-black">Don't have an account? </span>
            <a href="#" className="font-semibold text-sky-500 hover:text-sky-600">
                Sign up
            </a>
        </div>
    );
};

export default SignUpBox;
