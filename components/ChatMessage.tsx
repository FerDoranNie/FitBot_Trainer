import type React from 'react';
import type { Message } from '../types';
import { BodyweightIcon } from '../constants'; // Using one icon as a generic Bot icon

interface ChatMessageProps {
  message: Message;
}

const renderTextWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
        if (part.match(urlRegex)) {
            return (
                <a
                    key={index}
                    href={part}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-600 hover:underline"
                >
                    {part}
                </a>
            );
        }
        return part;
    });
};


const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex items-end gap-2 my-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white text-sky-600 flex items-center justify-center">
           <BodyweightIcon className="w-5 h-5"/>
        </div>
      )}
      <div
        className={`max-w-md md:max-w-lg px-4 py-3 rounded-2xl shadow-md ${
          isUser
            ? 'bg-sky-200 text-gray-800 rounded-br-none'
            : 'bg-white text-gray-800 rounded-bl-none'
        }`}
      >
        {message.text && <p className="text-sm whitespace-pre-wrap break-words">{renderTextWithLinks(message.text)}</p>}
        {message.component && <div>{message.component}</div>}
      </div>
    </div>
  );
};

export default ChatMessage;