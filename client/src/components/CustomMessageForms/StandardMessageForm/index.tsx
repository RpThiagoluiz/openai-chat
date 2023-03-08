import {
  PaperAirplaneIcon,
  PaperClipIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import {
  MessageFormProps,
  ChatObject,
  MessageObject,
} from 'react-chat-engine-advanced';
import Dropzone from 'react-dropzone';

interface Props {
  messageProps: MessageFormProps;
  activeChat: ChatObject | undefined;
}

export function StandardMessageForm({ messageProps, activeChat }: Props) {
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState<any>('');
  const [preview, setPreview] = useState('');

  const handleClearImage = () => {
    setPreview('');
    setAttachment('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmitMessage = async () => {
    setPreview('');

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
    <div className="message-form-container">
      {preview && (
        <div className="message-form-preview">
          <img
            src={preview}
            alt="Preview"
            className="message-form-preview-image"
            onLoad={() => URL.revokeObjectURL(preview)}
          />
          <XMarkIcon
            className="message-form-icon-x"
            onClick={handleClearImage}
          />
        </div>
      )}
      <div className="message-form">
        <div className="message-form-input-container">
          <input
            className="message-form-input"
            type="text"
            value={message}
            onChange={handleInputChange}
            placeholder="Send a message..."
          />
        </div>
        <div className="message-form-icons">
          <Dropzone
            multiple={false}
            noClick
            onDrop={(acceptedFiles) => {
              setAttachment(acceptedFiles[0]);
              setPreview(URL.createObjectURL(acceptedFiles[0]));
            }}
          >
            {({ getRootProps, getInputProps, open }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <PaperClipIcon
                  className="message-form-icon-clip"
                  onClick={open}
                />
              </div>
            )}
          </Dropzone>
          <hr className="vertical-line" />
          <PaperAirplaneIcon
            className="message-form-icon-airplane"
            onClick={handleSubmitMessage}
          />
        </div>
      </div>
    </div>
  );
}
