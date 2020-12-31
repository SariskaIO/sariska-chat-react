import React, { useState } from 'react';
import './App.css';
import CreateChannel from './components/channel/CreateChannel';
import ChatMessage from './components/messages/ChatMessage';
import UseEventHandler from './components/messages/UseEventHandler';


function App(props) {
  
  const [messages, setMessages] = useState([]);

  const room = 'room';

  const {channel: chatChannel} = CreateChannel('chat: ' + room, undefined, (channel, { messages: initialMessages}) => {
    setMessages(initialMessages);
    }
  );

  UseEventHandler(chatChannel, 'new_message', message => {
    setMessages(messages.slice(0).concat([message]));
  })
  
  return (

      <div className="App">
          <ChatMessage messages={messages} />
      </div>
  );
}

export default App;
