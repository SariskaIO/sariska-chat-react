import React from 'react'

const ChatMessage = ({messages}) => {
    return (
        <div>
            <ul>
                {messages.map(({id, msg}) => {
                    return (
                    <li>{msg}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default ChatMessage
