
import React from 'react';

interface PhoneMockupProps {
    images: string[];
    currentImageIndex: number;
}

const PhoneMockup: React.FC<PhoneMockupProps> = ({ images, currentImageIndex }) => {
    return (
        <div className="hidden md:block relative w-[380px] h-[581px] bg-[url('https://static.cdninstagram.com/rsrc.php/v3/y4/r/_-506wz9q4C.png')] bg-no-repeat bg-center mr-8">
            <div className="absolute top-[27px] right-[60px] w-[250px] h-[538px]">
                {images.map((src, index) => (
                    <img
                        key={src}
                        src={src}
                        alt={`Instagram screenshot ${index + 1}`}
                        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default PhoneMockup;
