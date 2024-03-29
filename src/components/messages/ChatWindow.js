import React from 'react'
import MessageItem from "./MessageItem";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { COMPANY_LOGO } from '../../constants';
import MessageList from './MessageList';



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textAlign: 'left'
    },
  }));

const ChatWindow = ({messages, pushMessage, loading, pushVote, newVotes, messageId}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <MessageList messages={messages} pushMessage={pushMessage} loading={loading} pushVote={pushVote} newVotes={newVotes} messageId={messageId} />
        </div>
    )
}


export default ChatWindow;
