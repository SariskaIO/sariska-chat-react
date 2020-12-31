import React from 'react';

const SendMessages = (channel, event, payload) => {

    const pushMessage = (msgContent) => {
        return new Promise((resolve, reject)=>{
            if(!msgContent){
                return reject("not sent");
            }
            msgContent
            .receive('ok', resolve)
            .receive('error', reject)
            .receive('timeout', reject('timeout'));

        })
    } 
    return (
        pushMessage(channel.push(event, payload))
    )
}

export default SendMessages
