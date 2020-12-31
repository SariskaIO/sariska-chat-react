import { useContext, useEffect, useRef, useState } from 'react'
import SocketContext from '../socket/SocketContext'

const CreateChannel = (topic, params, onJoin) => {

    const {socket} = useContext(SocketContext);
    const [channel, setChannel] = useState(null);

    const onJoinHandler = useRef(onJoin);
    onJoinHandler.current = onJoin;

    useEffect(()=>{
        if(socket===null){
            return;
        }
        const ch = socket.channel(topic, params);
        ch.join().receive('ok', message => onJoinHandler.current(ch, message));
        setChannel(ch);

        return () => {
            ch.leave();
            setChannel(null);
        }
    }, [socket, topic, params])
    return (
        channel
    )
}

export default CreateChannel;
