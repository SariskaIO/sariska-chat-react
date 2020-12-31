import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Socket } from 'phoenix';

import SocketContext from './SocketContext';

const SocketProvider = ({wsUrl, options, children}) => {

    const [socket, setSocket] = useState(null);

  
  useEffect(() => { 
    const s = new Socket(wsUrl, { params: options });
      s.connect(); 
        setSocket(s);
        return ()=>{
            s.disconnect();
            setSocket(null);
        }
    }, [options, wsUrl])

  return (
    <SocketContext.Provider value={socket}>
      { children }
    </SocketContext.Provider>
   )
 }

SocketProvider.defaultProps = {
 options: {}
}

SocketProvider.propTypes = {
  wsUrl: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
}

export default SocketProvider