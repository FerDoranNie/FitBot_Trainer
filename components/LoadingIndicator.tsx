import React from 'react';
import { BodyweightIcon } from '../constants';

const LoadingIndicator: React.FC = () => {
    return (
        <div className="flex items-end gap-2 my-2 justify-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white text-sky-600 flex items-center justify-center">
                <BodyweightIcon className="w-5 h-5"/>
            </div>
            <div className="max-w-md md:max-w-lg px-4 py-3 rounded-2xl shadow-md bg-white text-gray-800 rounded-bl-none">
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingIndicator;