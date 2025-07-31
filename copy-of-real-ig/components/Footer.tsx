
import React from 'react';

const footerLinks = [
    'Meta', 'About', 'Blog', 'Jobs', 'Help', 'API', 'Privacy', 'Terms', 
    'Locations', 'Instagram Lite', 'Threads', 'Contact Uploading & Non-Users', 'Meta Verified'
];

const Footer: React.FC = () => {
    return (
        <footer className="text-center text-xs text-gray-500 py-6 px-4">
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-4">
                {footerLinks.map(link => (
                    <a href="#" key={link} className="hover:underline">{link}</a>
                ))}
            </div>
            <div className="flex justify-center items-center gap-4">
                <select className="bg-transparent">
                    <option>English</option>
                    <option>Español</option>
                    <option>Français</option>
                </select>
                <span>© 2024 Instagram from Meta</span>
            </div>
        </footer>
    );
};

export default Footer;
