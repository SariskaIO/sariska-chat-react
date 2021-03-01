import React, { useEffect, useState } from 'react';
import './App.css';
import CreateChannel from './components/channel/CreateChannel';
import UseEventHandler from './components/channel/UseEventHandler';
import ChatWindow from './components/messages/ChatWindow';

const App = ()=> {
  const [user, setUser] = useState(null);
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chat, setchat] = useState('hello guru');

  const chatChannel = CreateChannel('chat:yo', {});

  UseEventHandler(chatChannel, 'user_joined', response => {
       const {room, user}  = response;
       setUser(user);
       setRoom(room);
       localStorage.setItem("user",JSON.stringify({id : user.id, name: user.name}));
       localStorage.setItem("room",JSON.stringify({session_id : room.session_id, created_by: room.created_by, inserted_at: room.inserted_at}));
  });

//console.log('usersed are: ', JSON.parse(localStorage.getItem("user")) || 'hello');

  UseEventHandler(chatChannel, 'new_message', message => {
    console.log("new_message", message);
      setMessages(messages => [...messages, message])
  });

  UseEventHandler(chatChannel, 'archived_message', message => {
       console.log('archived', JSON.stringify(message));
      setMessages(messages => [message, ...messages])
  });

  UseEventHandler(chatChannel, 'archived_message_count', payload => {
     const { page: { count }} = payload;
     console.log('total archived message count', count);
  });

  const pushMessage = (message)=>{
      const new_message =  {content: message}
      setMessages(messages => [...messages, new_message]);
      chatChannel.push('new_message', new_message);
  };

  console.log('message one two', messages);

  return (
      <div className="App">
          <ChatWindow messages={messages} pushMessage={pushMessage} user={user} room={room}/>
      </div>
  );
}

export default App;
