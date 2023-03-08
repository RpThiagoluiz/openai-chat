import {
  useMultiChatLogic,
  MultiChatSocket,
  MultiChatWindow,
} from 'react-chat-engine-advanced';
import { CustomHeader } from '@/components/CustomHeader';
import { StandardMessageForm } from '@/components/CustomMessageForms/StandardMessageForm';

export function Chat() {
  const chatProps = useMultiChatLogic(
    import.meta.env.VITE_PROJECT_ID, //import env no vite.
    //User Data
    'testuser',
    '1234'
  );

  return (
    <div style={{ flexBasis: '100%' }}>
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow
        {...chatProps}
        style={{ height: '100vh' }}
        renderChatHeader={(chat) => <CustomHeader chat={chat} />}
        renderMessageForm={(props) => {
          return (
            <StandardMessageForm
              messageProps={props}
              activeChat={chatProps.chat}
            />
          );
        }}
      />
    </div>
  );
}
