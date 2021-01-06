import React from 'react'
import MessageItem from "./MessageItem";

const MessageList = ({messages}) => {
    return (
        <div className="messageList">
            {messages.map((id, message) => <MessageItem>{message}</MessageItem>)}
        </div>
    )
}


export default MessageList;