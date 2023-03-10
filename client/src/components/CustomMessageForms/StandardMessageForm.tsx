import { useState } from 'react';
import {
  MessageFormProps,
  ChatObject,
  MessageObject,
} from 'react-chat-engine-advanced';
import { MessageFormUI } from './MessageFormUI';

interface Props {
  messageProps: MessageFormProps;
  activeChat: ChatObject | undefined;
}

export function StandardMessageForm({ messageProps, activeChat }: Props) {
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState<any>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmitMessage = async () => {
    const date = new Date()
      .toISOString()
      .replace('T', ' ')
      .replace('Z', `${Math.floor(Math.random() * 100)}+00:00`);

    const at = attachment
      ? [
          {
            id: Math.floor(Math.random() * 100),
            created: new Date().toISOString(),
            blob: attachment,
            file: attachment.name,
          },
        ]
      : [];

    const form = {
      attachments: at,
      created: date,
      sender_username: messageProps.username ?? '',
      text: message,
      activeChatId: activeChat?.id ?? '',
      custom_json: '',
    };

    const payload = form as MessageObject;

    messageProps.onSubmit && messageProps.onSubmit(payload);

    setMessage('');
    setAttachment('');
  };

  return (
    <MessageFormUI
      message={message}
      handleSubmitMessage={handleSubmitMessage}
      handleInputChange={handleInputChange}
      setAttachment={setAttachment}
    />
  );
}
