import {
  PaperAirplaneIcon,
  PaperClipIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import Dropzone from 'react-dropzone';

interface Props {
  message: string;
  setAttachment: React.Dispatch<any>;
  handleSubmitMessage: () => Promise<void>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function MessageFormUI({
  message,
  setAttachment,
  handleSubmitMessage,
  handleInputChange,
}: Props) {
  const [preview, setPreview] = useState('');

  const submitMessage = () => {
    setPreview('');
    handleSubmitMessage();
  };

  const handleClearImage = () => {
    setPreview('');
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
            onClick={submitMessage}
          />
        </div>
      </div>
    </div>
  );
}
