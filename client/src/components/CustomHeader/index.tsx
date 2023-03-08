import { ChatBubbleLeftRightIcon, PhoneIcon } from '@heroicons/react/24/solid';
import { ChatHeaderProps } from 'react-chat-engine-advanced';

interface Props {
  chat: ChatHeaderProps;
}

export function CustomHeader({ chat }: Props) {
  const defaultChatDescription = '⬅️ ⬅️ ⬅️';

  return (
    <div className="chat-header">
      <div className="flexbetween">
        <ChatBubbleLeftRightIcon className="icon-chat" />
        <h3 className="header-text">{chat.title}</h3>
      </div>
      <div className="flexbetween">
        <PhoneIcon className="icon-phone" />
        {chat.description !== defaultChatDescription ? (
          <p className="header-text">{chat.description}</p>
        ) : (
          <p className="header-text">no chat selected</p>
        )}
      </div>
    </div>
  );
}
