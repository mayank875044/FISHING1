
import React from 'react';

const GetTheApp: React.FC = () => {
    return (
        <div className="text-center mt-4 w-full max-w-[350px]">
            <p className="text-sm mb-4">Get the app.</p>
            <div className="flex justify-center gap-2">
                <a href="#" className="h-10">
                    <img src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png" alt="Download on the App Store" className="h-full" />
                </a>
                <a href="#" className="h-10">
                    <img src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png" alt="Get it on Google Play" className="h-full" />
                </a>
            </div>
        </div>
    );
};

export default GetTheApp;
