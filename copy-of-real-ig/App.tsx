
import React, { useState, useEffect } from 'react';
import PhoneMockup from './components/PhoneMockup.tsx';
import LoginForm from './components/LoginForm.tsx';
import SignUpBox from './components/SignUpBox.tsx';
import GetTheApp from './components/GetTheApp.tsx';
import Footer from './components/Footer.tsx';

const images = [
    'https://picsum.photos/247/534?random=1',
    'https://picsum.photos/247/534?random=2',
    'https://picsum.photos/247/534?random=3',
    'https://picsum.photos/247/534?random=4',
];

const App: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 4000);

        return () => clearInterval(intervalId);
    }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex items-center justify-center w-full py-8">
        <div className="flex items-center justify-center max-w-4xl w-full">
          <PhoneMockup images={images} currentImageIndex={currentImageIndex} />
          <div className="flex flex-col w-full max-w-[350px] md:w-auto">
            <div className="bg-white border border-gray-300 p-10 flex flex-col items-center">
              <h1 className="w-[175px] h-auto mb-8">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png" alt="Instagram" />
              </h1>
              <LoginForm />
              <div className="flex items-center w-full my-4">
                <div className="flex-grow h-px bg-gray-300"></div>
                <span className="mx-4 text-xs font-semibold text-gray-500">OR</span>
                <div className="flex-grow h-px bg-gray-300"></div>
              </div>
              <button className="flex items-center justify-center font-semibold text-sm text-blue-900 mt-2 mb-4">
                <svg aria-hidden="true" className="w-4 h-4 mr-2" viewBox="0 0 512 512">
                  <path fill="currentColor" d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path>
                </svg>
                Log in with Facebook
              </button>
              <a href="#" className="text-xs text-blue-900">Forgot password?</a>
            </div>
            <SignUpBox />
            <GetTheApp />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;