
import type React from 'react';
import type { Message } from '../types';
import { BodyweightIcon } from '../constants'; // Using one icon as a generic Bot icon

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex items-end gap-2 my-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-200 flex items-center justify-center text-teal-700">
           <BodyweightIcon className="w-5 h-5"/>
        </div>
      )}
      <div
        className={`max-w-md md:max-w-lg px-4 py-3 rounded-2xl shadow-md ${
          isUser
            ? 'bg-lime-200 text-gray-800 rounded-br-none'
            : 'bg-white text-gray-800 rounded-bl-none'
        }`}
      >
        {message.text && <p className="text-sm">{message.text}</p>}
        {message.component && <div>{message.component}</div>}
      </div>
    </div>
  );
};

export default ChatMessage;
