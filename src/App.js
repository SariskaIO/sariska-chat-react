import React, { useState } from 'react';
import './App.css';
import CreateChannel from './components/channel/CreateChannel';
import UseEventHandler from './components/channel/UseEventHandler';
import MessageList   from './components/messages/MessageList';

const App = ()=> {
  const [user, setUser] = useState(null);
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);

  const chatChannel = CreateChannel('chat:room123');

  UseEventHandler(chatChannel, 'user_joined', response => {
       const {room, user}  = response;
       setUser(user);
       setRoom(room);
  });

  UseEventHandler(chatChannel, 'new_message', message => {
      setMessages(messages => [...messages, message])
  });

  UseEventHandler(chatChannel, 'archived_message', message => {
      setMessages(messages => [message, ...messages])
  });

  UseEventHandler(chatChannel, 'archived_message_count', payload => {
     const { page: { count }} = payload;
     console.log('total archived message count', count);
  });

  const pushMessage = (message)=>{
      setMessages(messages => [...messages, message]);
      chatChannel.push({content: message});
  };

  return (
      <div className="App">
          <MessageList messages={messages} pushMessage={pushMessage} />
      </div>
  );
}

export default App;
