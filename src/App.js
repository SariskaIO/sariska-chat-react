import React, { useEffect, useState } from 'react';
import './App.css';
import CreateChannel from './components/channel/CreateChannel';
import UseEventHandler from './components/channel/UseEventHandler';
import ChatWindow from './components/messages/ChatWindow';

const App = ()=> {
  const [user, setUser] = useState(null);
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState(['hello', 'world']);
  const [chat, setchat] = useState('hello guru');

  const chatChannel = CreateChannel('chat:room123', {});

  UseEventHandler(chatChannel, 'user_joined', response => {
       const {room, user}  = response;
       setUser(user);
       console.log('userone is', user);
       setRoom(room);
       localStorage.setItem("user",JSON.stringify({id : user.id, name: user.name}));
   
  });

//console.log('usersed are: ', JSON.parse(localStorage.getItem("user")) || 'hello');

  UseEventHandler(chatChannel, 'new_message', message => {
      console.log('newMessage', message);
      setMessages(messages => [...messages, message])
  });

  UseEventHandler(chatChannel, 'archived_message', message => {
       console.log('archived', message)
      setMessages(messages => [message, ...messages])
  });

  UseEventHandler(chatChannel, 'archived_message_count', payload => {
     const { page: { count }} = payload;
     console.log('total archived message count', count);
  });

  const pushMessage = (message)=>{
      console.log('channel', chatChannel);
      setMessages(messages => [...messages, message]);
      chatChannel.push('new_message', {content: message});
      console.log('channel', chatChannel);
  };


  return (
      <div className="App">
          <ChatWindow messages={messages} pushMessage={pushMessage} user={user} room={room}/>
      </div>
  );
}

export default App;
